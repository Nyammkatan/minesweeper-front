import React from 'react';

const CorrectMarkedBombContent = () => {

    return (
        <div className='bomb tile-size'>
            <div className='bomb-marked-image'>
                <img src='images/bomb.png'/>
            </div>
            <div className='bomb-marked-image'>
                <img src='images/tile_warning_marked.png'/>
            </div>
        </div>
    );

};

export default CorrectMarkedBombContent;