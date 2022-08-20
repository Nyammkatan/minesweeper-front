import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { TokenContext } from '../../storage/tokenStorage';
import { GAME_STATE_MENU_LOGIN, GAME_STATE_RUNNING, STATE_NOT_AUTHORIZED } from '../../utils/constants';
import { loadGame, newGame } from '../../utils/requests';
import { CircularProgress } from '@mui/material';
import GameMenuStyled, { MenuItemBlockStyled } from '../styled/GameMenuStyled';

export const menuButtonStyle = {
    color: 'yellow', 
    backgroundColor: 'brown',
    width: 150,
    "&:hover": {
        backgroundColor: '#51361A'
    }
};

const PlayerMenu = ({setUserAuthorizationState, saveGameExists, setMenuState, setGameData, loading, setLoading}) => {

    const token = useContext(TokenContext);
    const [error, setError] = useState(false);

    function startANewGame(){
        if (token){
            setLoading(true);
            newGame(token.value).then(r => {
                let {bombCount, height, width} = r.data;
                setGameData({
                    isLoaded: false,
                    data: {
                        bombCount, height, width
                    }
                });
                setMenuState(GAME_STATE_RUNNING);
                setLoading(false);
            }).catch(e => {
                setError("Something went wrong!");
                setLoading(false);
                if (e.response.status == 401){
                    logout();
                }
            });
        }
    }

    function loadExistingGame(){
        if (token){
            setLoading(true);
            loadGame(token.value).then(r => {
                let {bombCount, height, width, hints, marked, checked} = r.data;
                setGameData({
                    isLoaded: true,
                    data: {
                        bombCount, height, width, hints, marked, checked
                    }
                });
                setMenuState(GAME_STATE_RUNNING);
                setLoading(false);
            }).catch(e => {
                setError("Something went wrong!");
                setLoading(false);
                if (e.response.status == 401){
                    logout();
                }
            });
        }
    }

    function logout(){
        token.setValue(false);
        setUserAuthorizationState(STATE_NOT_AUTHORIZED);
        setMenuState(GAME_STATE_MENU_LOGIN);
    }

    if (loading){
        return (
            <GameMenuStyled>
                <img src='images/cat_normal.png'/>
                <CircularProgress style={{marginTop: 28, color: 'brown'}}/>
            </GameMenuStyled>
        );
    }

    return (
        <GameMenuStyled>
            <img src='images/cat_normal.png'/>
            <MenuItemBlockStyled>
                <Button variant="contained" onClick={startANewGame} sx={menuButtonStyle}>New Game</Button>
            </MenuItemBlockStyled>
            {saveGameExists && <MenuItemBlockStyled>
                  <Button variant="contained" onClick={loadExistingGame} sx={menuButtonStyle}>Load Game</Button>
            </MenuItemBlockStyled>}
            <MenuItemBlockStyled>
                <Button variant="contained" onClick={logout} sx={menuButtonStyle}>Log Out</Button>
            </MenuItemBlockStyled>    
            {error && <div style={{color: 'red'}}>{error}</div>}
        </GameMenuStyled>
    );

};

export default PlayerMenu;