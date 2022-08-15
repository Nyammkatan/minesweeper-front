import { CircularProgress } from '@mui/material';
import React from 'react';
import { TILE_BOMB, TILE_BOMB_CHECKED, TILE_BOMB_CORRECT_MARK, TILE_EMPTY, TILE_MARKED, TILE_NOT_CHECKED } from '../../utils/constants';
import BombTileContent from './BombTileContent';
import CorrectMarkedBombContent from './CorrectMarkedBombContent';
import MarkedTileContent from './MarkedTileContent';

export const colors = ['darkslateblue', 'crimson', 'lawngreen', 'darkviolet', 'pink', 'cyan', 'springgreen', 'darkred'];

const Tile = ({checkClick, markClick, value, loadingCheck}) => {

    let classNameSelected = false;
    if (value == TILE_NOT_CHECKED || value == TILE_MARKED){
        classNameSelected = 'tile tile-size';
    } else
    if (value == TILE_EMPTY || value == TILE_BOMB || value == TILE_BOMB_CHECKED || value == TILE_BOMB_CORRECT_MARK || value > 0){
        classNameSelected = 'tile-empty tile-size';
    }
    
    let content = '';
    if (value == TILE_MARKED){
        content = <MarkedTileContent/>
    }
    else if (value == TILE_BOMB || value == TILE_BOMB_CHECKED){
        content = <BombTileContent value={value}/>
    }
    else if (value == TILE_BOMB_CORRECT_MARK){
        content = <CorrectMarkedBombContent/>
    }
    else {
        content = value > 0 ? value : '';
    }

    function mark(e){
        e.preventDefault();
        markClick();
    }

    let colorSelected = 'white';
    if (value >= 1 && value <= 8){
        colorSelected = colors[value-1];
    }

    if (loadingCheck){
        return (<div className={classNameSelected} style={{color: colorSelected}} onClick={checkClick} onContextMenu={mark}>
            <CircularProgress style={{width: 32, height: 32}}/>
        </div>);
    }

    return (<div className={classNameSelected} style={{color: colorSelected}} onClick={checkClick} onContextMenu={mark}>
                {content}
            </div>);

}

export default Tile;