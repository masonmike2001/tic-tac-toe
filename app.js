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
        displayController.reloadDisplay();
        if (e.target.textContent === 'Vs. Player')
        {
            player2 = player('Player2', 'o', 'player'); //AI or 2nd player
        }
        else
        {
            player2 = player('Player2', 'o', 'ai'); //AI or 2nd player
        }
        
    };
    
    const reloadDisplay = () => {
        //reloads the display by referring to the array. 
        const grid = document.querySelector('#tic-tac-toe');
        let gridSymbol, gridBoxes;
        if (boardIsSetUp === false)
        //adds the boxes
        {
            let gridBox;
            for (i = 0; i < 9; i++)
            {
                gridBox = document.createElement('div');
                gridBox.id = i;
                grid.appendChild(gridBox);
                gridBox.className = "grid-box";
            }
            boardIsSetUp = true;
            gridBoxes = grid.querySelectorAll(".grid-box");
            displayController.createTurnGetter(gridBoxes);
        }
        
        else
        //updates the boxes with text
        {
            for(i = 0; i < 9; i++) 
            {
                gridBoxes = grid.querySelectorAll(".grid-box");
                if (boardArray[i] === 'o')
                {
                    if (gridBoxes[i].querySelector('h1') === null)
                    {
                        gridSymbol = document.createElement('h1');
                        gridBoxes[i].appendChild(gridSymbol);
                        gridSymbol.className = "grid-symbol";
                    }
                    else{
                        gridSymbol = gridBoxes[i].querySelector('h1');
                    }

                    gridSymbol.textContent = 'o';
                }
                else if (boardArray[i] === 'x')
                {
                    if (gridBoxes[i].querySelector('h1') === null)
                    {
                        gridSymbol = document.createElement('h1');
                        gridBoxes[i].appendChild(gridSymbol);
                        gridSymbol.className = "grid-symbol";
                    }
                    else{
                        gridSymbol = gridBoxes[i].querySelector('h1');
                    }
                    gridSymbol.textContent = 'x';

                }
            }
        }
    
    };
    const createTurnGetter = (gridBoxes) => {
    for (i = 0; i < 9; i++)
    {
        gridBoxes[i].addEventListener(
            'click',
            function(e){
                let index = (e.target.id);
                if (currentPlayer % 2 != 0 && boardArray[index] === null)
                {
                    player1.markTile(index);
                }
                else if (currentPlayer % 2 === 0 && boardArray[index] === null)
                {
                    if (player2.type === 'ai')
                    {

                        //ai function goes here, pick a tile that will be winning, and integrate same function as player
                        //index = ?
                    }
                    player2.markTile(index);
                }
            });
    }
    };
    return {
        setUpGame,
        reloadDisplay,
        createTurnGetter
    };
})();

/*
Factories:
Player, name. Functions are markTile, 
*/

const player = (name, symbol, type) => {
    const markTile = (index) => {

        if (symbol === 'x' )
        {
            boardArray[index] = 'x';
            currentPlayer++;
        }
        else {
            boardArray[index] = 'o'
            currentPlayer++;
        }
        displayController.reloadDisplay();
    }
    return {name, symbol, type, markTile};
};

let player1, player2;
let currentPlayer = 1;
let boardArray = gameBoard.createArray();
let boardIsSetUp = false;

const buttons = document.querySelectorAll('button');
buttons[0].addEventListener('click', displayController.setUpGame);
buttons[1].addEventListener('click', displayController.setUpGame);

//add differences between buttons, by editing player2 value
buttons[2].addEventListener('click', displayController.restartGame);
