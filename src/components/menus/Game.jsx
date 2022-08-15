import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../storage/tokenStorage';
import { GAME_STATE_START_OR_LOAD, GAME_STATUS_FAILED, GAME_STATUS_IN_PROCESS, GAME_STATUS_WON, TILE_BOMB, TILE_BOMB_CHECKED, TILE_BOMB_CORRECT_MARK, TILE_MARKED, TILE_NOT_CHECKED } from '../../utils/constants';
import Tile from '../gameObjects/Tile';
import { checkTile, getSaveGame, markTile, newGame } from '../../utils/requests';
import GameInfo from '../gameObjects/GameInfo';

const Game = ({setMenuState, gameData, setSaveGameExists, setGameData, setPlayerMenuLoading, logout}) => {

    const [restartLoading, setRestartLoading] = useState(false);
    const [loadingTile, setLoadingTile] = useState(false);
    const token = useContext(TokenContext);

    const [grid, setGrid] = useState(false);
    const [bombsNumberRendered, setBombsNumberRendered] = useState(0);
    const [gameStatus, setGameStatus] = useState(GAME_STATUS_IN_PROCESS);

    //generate grid based on width and height
    function generateGrid(width, height){
        let gridArray = [];
        for (let i=0; i < height; i++){
            gridArray[i] = [];
            for (let j=0; j < width; j++){
                gridArray[i][j] = TILE_NOT_CHECKED;
            }
        }
        setGrid(gridArray);
    }

    //generate loaded level
    function generateLoadedGrid(width, height, hints, marked, checked){
        let index = 0;
        let gridArray = [];
        for (let i=0; i < height; i++){
            gridArray[i] = [];
            for (let j=0; j < width; j++){
                gridArray[i][j] = checked[index] ? hints[index] : marked[index] ? TILE_MARKED : TILE_NOT_CHECKED;
                index++;
            }
        }
        setGrid(gridArray);
    }

    useEffect(() => {
        if (gameData){
            if (!gameData.isLoaded){
                setBombsNumberRendered(gameData.data.bombCount);
                generateGrid(gameData.data.width, gameData.data.height);
            } else {
                let markedCount = gameData.data.marked.filter(e => e == 1).length;
                setBombsNumberRendered(gameData.data.bombCount - markedCount);
                generateLoadedGrid(gameData.data.width, gameData.data.height, gameData.data.hints, gameData.data.marked, gameData.data.checked);
            }
        }
    }, [gameData]);

    function goToMainMenu(){
        if (!loadingTile){
            setMenuState(GAME_STATE_START_OR_LOAD);
            setPlayerMenuLoading(true);
            getSaveGame(token.value).then(r => {
                setSaveGameExists(r.data);
            }).finally(() => {
                setPlayerMenuLoading(false);
            });
        }
    }

    //mark tile as a bomb with right click
    function setMarked(i, j){
        if ((grid[i][j] == TILE_NOT_CHECKED || grid[i][j] == TILE_MARKED) && gameStatus == GAME_STATUS_IN_PROCESS && !loadingTile && !restartLoading){
            let copy = new Array(grid.length);
            for (let i=0; i < grid.length; i++){
                copy[i] = grid[i].slice(0);
            }
            copy[i][j] = copy[i][j] == TILE_NOT_CHECKED ? TILE_MARKED : TILE_NOT_CHECKED;
            setGrid(copy);
            setBombsNumberRendered(copy[i][j] == TILE_NOT_CHECKED ? bombsNumberRendered+1 : bombsNumberRendered-1);
            markTile(i, j, token.value).catch(e => {
                if (e.response.status == 401){
                    logout();
                }
            })
        }
    }

    //check tile for hint number or a bomb with a left click
    function setChecked(i, j){
        if (grid[i][j] != TILE_MARKED && grid[i][j] != TILE_BOMB && gameStatus == GAME_STATUS_IN_PROCESS && !loadingTile && !restartLoading){
            setLoadingTile({i, j});
            checkTile(i, j, token.value).then(r => {
                setLoadingTile(false);
                let {gameStatus, result} = r.data;
                setGameStatus(gameStatus);
                let copy = new Array(grid.length);
                for (let i=0; i < grid.length; i++){
                    copy[i] = grid[i].slice(0);
                }
                let wrongMarks = 0;
                result.forEach(e => {
                    copy[e.i][e.j] = e.containsBomb ? TILE_BOMB : e.hintNumber;
                    if (grid[e.i][e.j] == TILE_MARKED && copy[e.i][e.j] >= 0){
                        wrongMarks++;
                    } else
                    if (grid[e.i][e.j] == TILE_MARKED && copy[e.i][e.j] == TILE_BOMB && gameStatus == GAME_STATUS_FAILED){
                        copy[e.i][e.j] = TILE_BOMB_CORRECT_MARK;
                    }
                });
                if (gameStatus == GAME_STATUS_FAILED){
                    copy[i][j] = TILE_BOMB_CHECKED;
                }
                if (gameStatus == GAME_STATUS_WON){
                    for (let i=0; i < copy.length; i++){
                        for (let j=0; j < copy[i].length; j++){
                            if (copy[i][j] == TILE_NOT_CHECKED){
                                copy[i][j] = TILE_MARKED;
                            }
                        }
                    }
                }
                setBombsNumberRendered(bombsNumberRendered+wrongMarks);
                setGrid(copy);
            }).catch(e => {
                setLoadingTile(false);
                if (e.response.status == 401){
                    logout();
                }
            });
        }
    }

    //restart the game
    function restart(){
        if (!loadingTile){
            setRestartLoading(true);
            newGame(token.value).then(r => {
                setRestartLoading(false);
                let {bombCount, height, width} = r.data;
                setGameData({
                    isLoaded: false,
                    data: {
                        bombCount, height, width
                    }
                });
                setGameStatus(GAME_STATUS_IN_PROCESS);
            }).catch(e => {
                setRestartLoading(false);
                if (e.response.status == 401){
                    logout();
                }
            });
        }
    }

    let gridLines = [];
    if (grid){
        for (let i=0; i < grid.length; i++){
            let line = [];
            for (let j=0; j < grid[i].length; j++){
                let loadingCheck = false;
                if (loadingTile && (loadingTile.i == i && loadingTile.j == j)){
                    loadingCheck = true;
                }
                line.push(<Tile 
                    markClick={() => setMarked(i, j)} 
                    checkClick={() => setChecked(i, j)} 
                    value={grid[i][j]}
                    loadingCheck={loadingCheck}
                />);
            }
            gridLines.push(
                <div className='tile-line'>
                    {line}
                </div>
            )
        }
    }

    return (
        <div >
            <GameInfo restartLoading={restartLoading} bombsLeft={bombsNumberRendered} gameStatus={gameStatus} goBack={goToMainMenu} restart={restart}/>
            {grid && <div className='game-board-grid'>{gridLines}</div>}
        </div>
    );

};

export default Game;