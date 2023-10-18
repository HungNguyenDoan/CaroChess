import Square from "./Square";
import React from 'react';
function Game(props){
    
    const renderSquare = (i) => {
        return (
          <Square
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
          />
        );
    };

    const itemElements = [];
    const itemElements1 = [];
    const itemElements2 = [];
    const itemElements3 = [];
    const itemElements4 = [];
    const itemElements5 = [];
    const itemElements6 = [];
    const itemElements7 = [];
    const itemElements8 = [];
    const itemElements9 = [];
    const itemElements10 = [];
    const itemElements11 = [];
    const itemElements12 = [];
    const itemElements13 = [];
    const itemElements14 = [];
    const itemElements15 = [];
    const itemElements16 = [];
    const itemElements17 = [];
    const itemElements18 = [];
    const itemElements19 = [];
    for (let i = 0; i < 20; i++) {
        itemElements.push(renderSquare(i));
        itemElements1.push(renderSquare(i+20));
        itemElements2.push(renderSquare(i+40));
        itemElements3.push(renderSquare(i+60));
        itemElements4.push(renderSquare(i+80));
        itemElements5.push(renderSquare(i+100));
        itemElements6.push(renderSquare(i+120));
        itemElements7.push(renderSquare(i+140));
        itemElements8.push(renderSquare(i+160));
        itemElements9.push(renderSquare(i+180));
        itemElements10.push(renderSquare(i+200));
        itemElements11.push(renderSquare(i+220));
        itemElements12.push(renderSquare(i+240));
        itemElements13.push(renderSquare(i+260));
        itemElements14.push(renderSquare(i+280));
        itemElements15.push(renderSquare(i+300));
        itemElements16.push(renderSquare(i+320));
        itemElements17.push(renderSquare(i+340));
        itemElements18.push(renderSquare(i+360));
        itemElements19.push(renderSquare(i+380));

    }
    return (
        <div className="board">
            <div className="board1">
                <div>GameId:</div>
                <div className="board-row">
                    {itemElements}
                </div>
                <div className="board-row">
                    {itemElements1}
                </div>
                <div className="board-row">
                    {itemElements2}
                </div>
                <div className="board-row">
                    {itemElements3}
                </div>
                <div className="board-row">
                    {itemElements4}
                </div>
                <div className="board-row">
                    {itemElements5}
                </div>
                <div className="board-row">
                    {itemElements6}
                </div>
                <div className="board-row">
                    {itemElements7}
                </div>
                <div className="board-row">
                    {itemElements8}
                </div>
                <div className="board-row">
                    {itemElements9}
                </div>
                <div className="board-row">
                    {itemElements10}
                </div>
                <div className="board-row">
                    {itemElements11}
                </div>
                <div className="board-row">
                    {itemElements12}
                </div>
                <div className="board-row">
                    {itemElements13}
                </div>
                <div className="board-row">
                    {itemElements14}
                </div>
                <div className="board-row">
                    {itemElements15}
                </div>
                <div className="board-row">
                    {itemElements16}
                </div>
                <div className="board-row">
                    {itemElements17}
                </div>
                <div className="board-row">
                    {itemElements18}
                </div>
                <div className="board-row">
                    {itemElements19}
                </div>
            </div>        
        </div>
        
    );
}
export default Game