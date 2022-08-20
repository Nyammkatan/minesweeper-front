import React from 'react';
import { TILE_BOMB_CHECKED } from '../../../utils/constants';
import BombStyledComponent from '../../styled/BombStyledComponent';

const BombTileContent = ({value}) => {

    return (
        <BombStyledComponent rotating={value == TILE_BOMB_CHECKED}>
            <img src='images/bomb.png'/>
        </BombStyledComponent>
    );

};

export default BombTileContent;