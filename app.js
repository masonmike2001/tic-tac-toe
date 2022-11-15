const gameBoard = (() => {
    const createArray = () =>
        {
            return [null, null, null, null, null, null, null, null, null];
        };
    const clearArray = (array) =>  
    {
        for (i = 0; i < 9; i++)
        {
            array[i] = null;
        }
    };
    const checkArray = (array, player) => {
        //check horiz
        for (i = 0; i < 9; i + 3)
        {
            if (array[i] === player.symbol, array[i + 1] === player.symbol , array[i + 2] === player.symbol)
            {
                displayController.displayGameEnd(player);
            }
        }
        //check vert
        for (i = 0; i < 3; i++)
        {
            if (array[i] === player.symbol, array[i + 3] === player.symbol , array[i + 6] === player.symbol)
            {
                displayController.displayGameEnd(player);
            }
        }
        //check diag
            if (array[0] === player.symbol, array[4] === player.symbol , array[8] === player.symbol)
            {
                displayController.displayGameEnd(player);
            }
            else if (array[2] === player.symbol, array[4] === player.symbol , array[6] === player.symbol)
            {
                displayController.displayGameEnd(player);
            }
        };
    return {
        createArray,
        clearArray,
        checkArray
    };
})();

const displayController = (() => {
    const setUpGame = (e) => {
        player1 = player('Player1', 'x', 'player'); //Player
        displayController.createDisplay(boardArray);
        if (e.target.textContent === 'Vs. Player')
        {
            player2 = player('Player2', 'o', 'player'); //AI or 2nd player
        }
        else
        {
            player2 = player('Player2', 'o', 'ai'); //AI or 2nd player
        }
        
    };
    
    const createDisplay = (array) => {
        //creates the display by referring to the array
        const grid = document.querySelector('#tic-tac-toe');

        for(i = 0; i < 9; i++) 
        {
            gridSymbol = document.querySelectorAll(".grid-box")[i];
            let gridBox = document.createElement('div');
            if (array[i] === 'o')
            {
                gridSymbol[i].textContent = 'o';
                gridSymbol[i] = document.createElement('h1');
                gridBox.appendChild(gridSymbol);
                gridBox.className = "grid-symbol";
            }
            else if (array[i] === 'x')
            {
                gridSymbol[i].textContent = 'o';
                gridSymbol[i] = document.createElement('h1');
                gridBox.appendChild(gridSymbol);
                gridBox.className = "grid-symbol";
            }
            gridBox.id = i;
            grid.appendChild(gridBox);
            gridBox.className = "grid-box";
        }
        let gridBoxes = grid.querySelectorAll(".grid-box");
        displayController.createTurnGetter(gridBoxes, array);
    };
    const reloadGameboard = (array) => {
        displayController.clearDisplay(array);
        displayController.createDisplay(array);


        
    };
    const clearDisplay = () => {
        for (j = 0; j < 9; j++)
        {
            document.querySelector('#tic-tac-toe').removeChild(document.getElementById(j));

        }
    };
    const createTurnGetter = (gridBoxes, array) => {
    for (i = 0; i < 9; i++)
    {
        gridBoxes[i].addEventListener(
            'click',
            function(e){
                let index = (e.target.id);
                if (currentPlayer % 2 != 0 && boardArray[index] === null)
                {
                    player1.markTile(boardArray, index);
                }
                else if (currentPlayer % 2 === 0 && boardArray[index] === null)
                {
                    if (player2.type === 'ai')
                    {

                        //ai function goes here, pick a tile that will be winning, and integrate same function as player
                        //index = ?
                    }
                    player2.markTile(boardArray, index);
                }
            });
    }
    };
    return {
        setUpGame,
        createDisplay,
        reloadGameboard,
        clearDisplay,
        createTurnGetter
    };
})();

/*
Factories:
Player, name. Functions are markTile, 
*/

const player = (name, symbol, type) => {
    const markTile = (array, index) => {

        if (symbol === 'x' )
        {
            array[index] = 'x';
            currentPlayer++;
        }
        else {
            array[index] = 'o'
            currentPlayer++;
        }
        displayController.reloadGameboard(array);
    }
    return {name, symbol, type, markTile};
};

let player1, player2;
let currentPlayer = 1;
let boardArray = gameBoard.createArray();

const buttons = document.querySelectorAll('button');
buttons[0].addEventListener('click', displayController.setUpGame);
buttons[1].addEventListener('click', displayController.setUpGame);
buttons[2].addEventListener('click', displayController.restartGame);
