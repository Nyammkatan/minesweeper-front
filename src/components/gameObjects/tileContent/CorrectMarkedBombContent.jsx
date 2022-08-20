import React from 'react';
import styled from 'styled-components';
import BombStyledComponent from '../../styled/BombStyledComponent';

const BombMarkedImage = styled.div`
    position: absolute;
`;

const CorrectMarkedBombContent = () => {

    return (
        <BombStyledComponent>
            <BombMarkedImage>
                <img src='images/bomb.png'/>
            </BombMarkedImage>
            <BombMarkedImage>
                <img src='images/tile_warning_marked.png'/>
            </BombMarkedImage>
        </BombStyledComponent>
    );

};

export default CorrectMarkedBombContent;