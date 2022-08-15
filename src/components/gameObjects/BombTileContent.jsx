import React from 'react';
import { TILE_BOMB_CHECKED } from '../../utils/constants';

const BombTileContent = ({value}) => {

    return (
        <div className={value == TILE_BOMB_CHECKED ? 'bomb-rotating tile-size' : 'bomb tile-size'}><img src='images/bomb.png'/></div>
    );

};

export default BombTileContent;