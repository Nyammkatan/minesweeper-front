import { CircularProgress } from '@mui/material';
import React from 'react';
import { GAME_STATUS_FAILED, GAME_STATUS_WON } from '../../utils/constants';

const LoadingCatHead = ({restart}) => {

    return(
        <div className='game-info-top-block-element game-info-top-block-element-pressable' onClick={restart} style={{cursor: 'pointer'}}>
            <div style={{position: 'absolute', top: 2}}>
                <img src='images/cat_normal.png'/>
            </div>
            <div style={{position: 'absolute'}}>
                <CircularProgress/> 
            </div>
        </div>
    );

};

const SimpleCatHead = ({restart, statusImageSrc}) => {

    return(
        <div className='game-info-top-block-element game-info-top-block-element-pressable' onClick={restart} style={{cursor: 'pointer'}}>
            <img src={statusImageSrc}/>
        </div>
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
        <div className='game-info-top-block'>
            <div className='game-info-top-block-element'>
                {bombsLeft}
            </div>
            {catHead}
            <div className='game-info-top-block-element game-info-top-block-element-pressable' onClick={goBack} style={{cursor: 'pointer'}}>
                <img src='images/go-back.png'/>
            </div>
        </div>
    );

};

export default GameInfo;