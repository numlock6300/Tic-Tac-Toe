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

    const resetBoard = () => {
        _boardCellsValue = ["", "", "", 
                            "", "", "", 
                            "", "", ""];
        render();
    
    };
    
    return {render, setBoardCellValue, getBoardCells, getBoardCellsValue, resetBoard};

})();

const GameEnd = (() => {
    const _resultWindow = document.createElement("div");
    const _body = document.querySelector("body");
    _resultWindow.classList.add("result", "hidden");
    _body.appendChild(_resultWindow);

    const _resultMessageContainer = document.createElement("div");
    _resultMessageContainer.classList.add("result-message");
    _resultMessageContainer.innerHTML = `The winner is _winner.Congratulations!`;
    _resultWindow.appendChild(_resultMessageContainer);

    const _resultButton = document.createElement("button");
    _resultButton.innerHTML = "Ok";
    _resultButton.classList.add("result-button");
    _resultWindow.appendChild(_resultButton);

    _resultButton.addEventListener("click", () => {_resultWindow.classList.add("hidden")});

    const WinMessage = (winner)=> {
        _resultMessageContainer.innerHTML = `The winner is ${winner}. Congratulations!`;
        _resultWindow.classList.remove("hidden");
    };

    const DrawMessage = () => {
        _resultMessageContainer.innerHTML = `It's a draw.`;
        _resultWindow.classList.remove("hidden");
    }
    return {WinMessage, DrawMessage};
})()

const Player = (playerName, mark) => {
    const getName = () => playerName;
    const getMark = () => mark;

    return {getName, getMark};
};

const winCheck = (() => {
    const _changePlayerButton = document.querySelector(".change-container");
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
        GameEnd.WinMessage(_winner);
        _changePlayerButton.classList.remove("hidden");
        console.log(`The winner is ${_winner}. Congratulations!`)
        
    };

    const _checkDraw = () => {
        return Board.getBoardCellsValue().includes("");
    } ;

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
            console.log("It's a draw.");
            Board.getBoardCells().forEach((cell) => {cell.classList.add("inactive", "draw")});
            _changePlayerButton.classList.remove("hidden");
            GameEnd.DrawMessage();
        }

        
    };

    const restart = () => {
        _win = false;
        _winner = "";
        _changePlayerButton.classList.add("hidden");
    }

    return {getWin, checkWin, getWinner, restart};
})();

const Game = (()=> {
    let _firstPlayerName = document.querySelector("#first_player");
    let _secondPlayerName = document.querySelector("#second_player");
    const _changePlayerButton = document.querySelector(".change-player");
    const _PlayerName = () => {
         const _first = Player(_firstPlayerName.value, "X");
         const _second = Player(_secondPlayerName.value, "O");

         _firstPlayerName.classList.add("inactive-input");
         _secondPlayerName.classList.add("inactive-input");

        return {_first, _second};
        
    }

    let _activePlayer = _PlayerName()._first;

    const getActivePlayer = () => {return _activePlayer};
    const changeActivePlayer = () => {
        console.log(_activePlayer.getName());
        if(_activePlayer.getMark() === _PlayerName()._first.getMark()){
            _activePlayer = _PlayerName()._second;
        }else{
            _activePlayer = _PlayerName()._first;
        }
    
    };

    const restart = () => {
        console.log("restart");
        Board.getBoardCells().forEach((cell) => {cell.classList.remove("inactive", "win", "draw")});
        _activePlayer = _PlayerName()._first;
        Board.resetBoard();
        winCheck.restart();
    }

    const start = () => {
        if(winCheck.getWin()){
            _firstPlayerName.classList.add("inactive-input");
            _secondPlayerName.classList.add("inactive-input");
            _PlayerName();
            restart();
        }
        else {
            _PlayerName();
            Board.setBoardCellValue();
            document.querySelector(".restart-container").classList.remove("hidden");
            Board.render();
        }
        
    };

    const changePlayers = () => {
        _firstPlayerName.classList.remove("inactive-input");
        _secondPlayerName.classList.remove("inactive-input");
    }
    _firstPlayerName.classList.remove("inactive-input");
    _secondPlayerName.classList.remove("inactive-input");
    return {start, restart, changeActivePlayer, getActivePlayer, changePlayers};
})();

document.querySelector(".start").addEventListener("click", () => {Game.start()});
document.querySelector(".restart").addEventListener("click", () => {Game.restart()});
document.querySelector(".change-player").addEventListener("click", () => {Game.changePlayers()});
// Game.start();
