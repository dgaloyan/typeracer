import React from 'react'
import Timer from '../timer/Timer';
import './styles.scss'

const Board = () => {
    return (
        <div className={'board'}>
            Hello Board
            <Timer time={10}/>
        </div>
    )
}

export default Board