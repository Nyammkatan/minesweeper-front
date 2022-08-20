import { CircularProgress } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { GAME_STATUS_FAILED, GAME_STATUS_WON } from '../../utils/constants';
import { GameInfoTopBlockStyled, GameInfoTopBlockElementStyled, GameInfoTopBlockElementPressableStyled } from '../styled/GameInfoTopBlockStyled';

const LoadingCatHead = ({restart}) => {

    return(
        <GameInfoTopBlockElementPressableStyled onClick={restart} style={{cursor: 'pointer'}}>
            <div style={{position: 'absolute', top: 2}}>
                <img src='images/cat_normal.png'/>
            </div>
            <div style={{position: 'absolute'}}>
                <CircularProgress/> 
            </div>
        </GameInfoTopBlockElementPressableStyled>
    );

};

const SimpleCatHead = ({restart, statusImageSrc}) => {

    return(
        <GameInfoTopBlockElementPressableStyled onClick={restart} style={{cursor: 'pointer'}}>
            <img src={statusImageSrc}/>
        </GameInfoTopBlockElementPressableStyled>
    );

};

const GameInfo = ({bombsLeft, gameStatus, restart, goBack, restartLoading}) => {

    let statusImageSrc = 'images/cat_normal.png';
    if (gameStatus == GAME_STATUS_WON){
        statusImageSrc = 'images/cat_happy.png';
    } else
    if (gameStatus == GAME_STATUS_FAILED){
        statusImageSrc = 'images/cat_sad.png';
    }

    const catHead = restartLoading ? <LoadingCatHead restart={restart}/> : <SimpleCatHead restart={restart} statusImageSrc={statusImageSrc}/>

    return(
        <GameInfoTopBlockStyled>
            <GameInfoTopBlockElementStyled>
                {bombsLeft}
            </GameInfoTopBlockElementStyled>
            {catHead}
            <GameInfoTopBlockElementPressableStyled onClick={goBack} style={{cursor: 'pointer'}}>
                <img src='images/go-back.png'/>
            </GameInfoTopBlockElementPressableStyled>
        </GameInfoTopBlockStyled>
    );

};

export default GameInfo;