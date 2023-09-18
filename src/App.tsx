import React, {useState} from 'react';

import './App.css';

import Board from "./components/Board";

// function App() {

const App: React.FC = () => {

    const initialTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const [tiles, setTiles] = useState(initialTiles);

    // перемешивание игровых плиток
    const Shuffle = () => {

        const shuffledTiles = [...initialTiles]

        for (let i = shuffledTiles.length - 1; i > 0; i--) {
            const randomTile = Math.floor(Math.random() * (i + 1));
            [shuffledTiles[i], shuffledTiles[randomTile]] = [shuffledTiles[randomTile], shuffledTiles[i]] //деструктурирующее присваивание
        }
        setTiles(shuffledTiles)
    }

    // клик по игровой плитке

    const handleClick = (index: number) => {
        if (canMoveTile(index)) {
            const newTiles = [...tiles] //копия массива
            const emptyIndex = newTiles.indexOf(0);

            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]]
            setTiles(newTiles)

            //если игра закончилась, то надпись
            if (isGameComplete(newTiles)) {
                alert('Congratulation: You won!')
            }
        }
    }

    // функция перемещения на пустой индекс
    const canMoveTile = (index: number) => {
        const emptyIndex = tiles.indexOf(0);

        const row = Math.floor(emptyIndex / 4);

        return (

            //можно ли переместить вверх и не выйти за пределы игрового поля
            (index === (emptyIndex - 4) && row > 0) ||

            //вниз
            (index === (emptyIndex + 4) && row < 3) ||

            // можно ли переместить влево и не выйти за пределы поля справа

            (index === (emptyIndex - 1) && index % 4 !== 3) ||

            //  можно ли переместить вправо и плитка не находится в крайней левой колонке

            (index === (emptyIndex + 1) && index % 4 !== 0)
        )
    }
    //закончилась ли игра
    const isGameComplete = (currentTiles: number[]) => {

        for (let i = 0; i < currentTiles.length; i++) {
            if (currentTiles[i] !== i + 1) {
                return false; //если плитка находится не на своем месте
            }
        }
        return true
    }


    return (
        <div className="App">

            <h1>15 Puzzle </h1>
            <Board
            tiles={tiles}
            onTileClick={handleClick}
            />

            {/*onClick перемешение */}
            <button onClick={Shuffle} className={"primary"}> Shuffle </button>
        </div>
    );
}

export default App;
