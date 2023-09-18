import React from 'react';

interface Tileprops {
    value: number;
    onClick: () => void;
}

const Tile: React.FC<Tileprops> = ({value, onClick}) => {

    const isEmpty = value === 0;


    return (
        <div
            className={`tile ${isEmpty ? 'empty' : ''}`}
            onClick={() => {
                if (!isEmpty) {
                    onClick();
                }
            }}
        >
            <span className='tile-text'> {isEmpty ? '' : value}</span>

        </div>
    );
};

export default Tile;