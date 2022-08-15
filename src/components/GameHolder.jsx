import React, { useContext, useState } from 'react';
import { TokenContext } from '../storage/tokenStorage';
import { GAME_STATE_MENU_LOGIN, GAME_STATE_MENU_REGISTER, GAME_STATE_RUNNING, GAME_STATE_START_OR_LOAD, STATE_AUTHORIZED, STATE_NOT_AUTHORIZED } from '../utils/constants';
import Game from './menus/Game';
import Login from './menus/Login';
import PlayerMenu from './menus/PlayerMenu';
import Register from './menus/Register';

const GameHolder = (props) => {

    const [userAuthorizationState, setUserAuthorizationState] = useState(STATE_NOT_AUTHORIZED);
    const [menuState, setMenuState] = useState(GAME_STATE_MENU_LOGIN);

    const [saveGameExists, setSaveGameExists] = useState(false);
    const [gameData, setGameData] = useState(false);

    const [playerMenuLoading, setPlayerMenuLoading] = useState(false);

    const token = useContext(TokenContext);

    function logout(){
        token.setValue(false);
        setUserAuthorizationState(STATE_NOT_AUTHORIZED);
        setMenuState(GAME_STATE_MENU_LOGIN);
    }

    let menuSelected = false;
    if (userAuthorizationState == STATE_AUTHORIZED){
        if (menuState == GAME_STATE_START_OR_LOAD)
            menuSelected = <PlayerMenu 
                setGameData={setGameData} 
                setUserAuthorizationState={setUserAuthorizationState} 
                saveGameExists={saveGameExists} 
                setMenuState={setMenuState}
                loading={playerMenuLoading}
                setLoading={setPlayerMenuLoading}
            />;
        else
            menuSelected = <Game 
                gameData={gameData} 
                setGameData={setGameData} 
                setMenuState={setMenuState} 
                setSaveGameExists={setSaveGameExists}
                setPlayerMenuLoading={setPlayerMenuLoading}
                logout={logout}
            />;
    } else {
        if (menuState == GAME_STATE_MENU_LOGIN)
            menuSelected = <Login 
                    setUserAuthorizationState={setUserAuthorizationState} 
                    setMenuState={setMenuState} 
                    setSaveGameExists={setSaveGameExists}
                />
        else if (menuState == GAME_STATE_MENU_REGISTER)
            menuSelected = <Register 
                    setUserAuthorizationState={setUserAuthorizationState} 
                    setMenuState={setMenuState}
                />

    }

    return (
        <div className='game-board'>
            {menuSelected}
        </div>
    );

};

export default GameHolder;