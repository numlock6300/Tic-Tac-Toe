const Board = (() => {
    let _boardCellsValue = ["", "", "", 
                            "", "", "", 
                            "", "", ""];
    
    const _boardCells = Array.from(document.querySelectorAll(".cell"));

    const getBoardCellsValue = () => {return _boardCellsValue};
    
    const setBoardCellValue = () => {
        console.log(winCheck.getWin());
        _boardCells.forEach((cell) => {
            cell.addEventListener("click", (e) => {
                if(cell.innerHTML !== "" ){return}
                if(!winCheck.getWin()){
                    // console.log(e.target.getAttribute("cell_id"));
                    _boardCellsValue[e.target.getAttribute("cell_id")] = Game.getActivePlayer().getMark();
                    Board.render();
                    winCheck.checkWin();
                    // console.log(winCheck.getWin());
                    // console.log(winCheck.getWinner());
                    Game.changeActivePlayer();
                }
                else {
                    console.log("Game over")
                }
            })
        });              
    }

    const getBoardCells = () => {return _boardCells};

    const render = () => {
        _boardCells.forEach((cell) => {
            // console.dir(cell)
            cell.innerHTML = _boardCellsValue[cell.getAttribute("cell_id")];
        });
        
    };
    return {render, setBoardCellValue, getBoardCells, getBoardCellsValue};

})();

const Player = (playerName, mark) => {
    const getName = () => playerName;
    const getMark = () => mark;

    return {getName, getMark};
};

const winCheck = (() => {
    let _win = false;
    let _winner = "";
    const getWin = () => {return _win};
    const getWinner = () => {return _winner};
    const _setWin = (cell1,cell2,cell3) => {
        _win = true;
        _winner = Game.getActivePlayer().getName();
        cell1.classList.add("win");
        cell2.classList.add("win");
        cell3.classList.add("win");
        Board.getBoardCells().forEach((cell) => {cell.classList.add("inactive")});
        
    };

    const _checkDraw = () => {
        return Board.getBoardCellsValue().includes("");
    } 

    const _setDraw = () => {
        console.log("draw");
            Board.getBoardCells().forEach((cell) => {cell.classList.add("inactive draw")});
    }
    const checkWin = () => {

        // Horizontal check

        if((Board.getBoardCellsValue()[0] !== "") && (Board.getBoardCellsValue()[0] === Board.getBoardCellsValue()[1] && 
           Board.getBoardCellsValue()[1] === Board.getBoardCellsValue()[2])) {
            _setWin(Board.getBoardCells()[0], Board.getBoardCells()[1], Board.getBoardCells()[2]);
        }
        else if((Board.getBoardCellsValue()[3] !== "") && (Board.getBoardCellsValue()[3] === Board.getBoardCellsValue()[4] && 
                 Board.getBoardCellsValue()[4] === Board.getBoardCellsValue()[5])) {
                 _setWin(Board.getBoardCells()[3], Board.getBoardCells()[4], Board.getBoardCells()[5]);
        }
        else if((Board.getBoardCellsValue()[6] !== "") && (Board.getBoardCellsValue()[6] === Board.getBoardCellsValue()[7] && 
                 Board.getBoardCellsValue()[7] === Board.getBoardCellsValue()[8])) {
                 _setWin(Board.getBoardCells()[6], Board.getBoardCells()[7], Board.getBoardCells()[8]);
        }

        // Diagonal check

        else if((Board.getBoardCellsValue()[0] !== "") && (Board.getBoardCellsValue()[0] === Board.getBoardCellsValue()[4] && 
                 Board.getBoardCellsValue()[4] === Board.getBoardCellsValue()[8])) {
                 _setWin(Board.getBoardCells()[0], Board.getBoardCells()[4], Board.getBoardCells()[8]);
        }
        else if((Board.getBoardCellsValue()[2] !== "") && (Board.getBoardCellsValue()[2] === Board.getBoardCellsValue()[4] && 
                 Board.getBoardCellsValue()[4] === Board.getBoardCellsValue()[6])) {
                 _setWin(Board.getBoardCells()[2], Board.getBoardCells()[4], Board.getBoardCells()[6]);
        }

        // Vertical Check

        else if((Board.getBoardCellsValue()[0] !== "") && (Board.getBoardCellsValue()[0] === Board.getBoardCellsValue()[3] && 
                 Board.getBoardCellsValue()[3] === Board.getBoardCellsValue()[6])) {
                 _setWin(Board.getBoardCells()[0], Board.getBoardCells()[3], Board.getBoardCells()[6]);
        }
        else if((Board.getBoardCellsValue()[1] !== "") && (Board.getBoardCellsValue()[1] === Board.getBoardCellsValue()[4] && 
                 Board.getBoardCellsValue()[4] === Board.getBoardCellsValue()[7])) {
                 _setWin(Board.getBoardCells()[1], Board.getBoardCells()[4], Board.getBoardCells()[7]);
        }
        else if((Board.getBoardCellsValue()[2] !== "") && (Board.getBoardCellsValue()[2] === Board.getBoardCellsValue()[5] && 
                 Board.getBoardCellsValue()[5] === Board.getBoardCellsValue()[8])) {
                 _setWin(Board.getBoardCells()[2], Board.getBoardCells()[5], Board.getBoardCells()[8]);
        }
        
        // Check draw
        else if(!_checkDraw()){
            console.log("draw");
            Board.getBoardCells().forEach((cell) => {cell.classList.add("inactive", "draw")});
        }

        
    }

    return {getWin, checkWin, getWinner};
})();

const Game = (()=> {
    let _firstPlayerName = document.querySelector("#first_player");
    let _secondPlayerName = document.querySelector("#second_player");
    const _PlayerName = () => {
         const _first = Player(_firstPlayerName.value, "X");
         const _second = Player(_secondPlayerName.value, "O");

         _firstPlayerName.classList.add("inactive-input");
         _secondPlayerName.classList.add("inactive-input");

        return {_first, _second};
        
    }

    let _activePlayer = _PlayerName()._first;
    console.log(_activePlayer);

    const getActivePlayer = () => {return _activePlayer};
    const changeActivePlayer = () => {
        console.log(_activePlayer.getName());
        if(_activePlayer.getName() === _PlayerName()._first.getName()){
            _activePlayer = _PlayerName()._second;
        }else{
            _activePlayer = _PlayerName()._first;
        }
    
    };
    const start = () => {
        _PlayerName();
        Board.setBoardCellValue();
        Board.render();
    }
    _firstPlayerName.classList.remove("inactive-input");
    _secondPlayerName.classList.remove("inactive-input");
    return {start, changeActivePlayer, getActivePlayer};
})();

document.querySelector(".start").addEventListener("click", () => {Game.start()});
// Game.start();
