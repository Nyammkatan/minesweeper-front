import { CircularProgress } from '@mui/material';
import React from 'react';
import { TILE_BOMB, TILE_BOMB_CHECKED, TILE_BOMB_CORRECT_MARK, TILE_EMPTY, TILE_MARKED, TILE_NOT_CHECKED } from '../../utils/constants';
import TileEmptyStyled from '../styled/TileEmptyStyled';
import TileStyled from '../styled/TileStyledComponent';
import BombTileContent from './tileContent/BombTileContent';
import CorrectMarkedBombContent from './tileContent/CorrectMarkedBombContent';
import MarkedTileContent from './tileContent/MarkedTileContent';

export const colors = ['darkslateblue', 'crimson', 'lawngreen', 'darkviolet', 'pink', 'cyan', 'springgreen', 'darkred'];

const Tile = ({checkClick, markClick, value, loadingCheck}) => {

    let StyledComponentSelected = TileStyled;
    if (value == TILE_NOT_CHECKED || value == TILE_MARKED){
        StyledComponentSelected = TileStyled;
    } else
    if (value == TILE_EMPTY || value == TILE_BOMB || value == TILE_BOMB_CHECKED || value == TILE_BOMB_CORRECT_MARK || value > 0){
        StyledComponentSelected = TileEmptyStyled;
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
        return (<StyledComponentSelected style={{color: colorSelected}} onClick={checkClick} onContextMenu={mark}>
            <CircularProgress style={{width: 32, height: 32}}/>
        </StyledComponentSelected>);
    }

    return (<StyledComponentSelected style={{color: colorSelected}} onClick={checkClick} onContextMenu={mark}>
                {content}
            </StyledComponentSelected>);

}

export default Tile;