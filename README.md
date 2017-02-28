#Functionality and MVP#

Write a one-sentence summary of the project and a list of the features that are absolutely necessary. Order these by importance and use the list to guide your development.

In this game, users will be able to:
- [ ] Start, pause, and quit the game
- [ ] Rotate, speed up the descent of Tetrimonos, and allow the Tetriminos to drop immediately

In addition, this project will include:
- [ ] Instructions on how to play the game, in a sidebar
- [ ] A production README


#Wireframes#
This app will consist of a single screen with game board, preview screen for the next piece, stats on the current game, instructions on which key presses lead to which actions, and nav links to my Github and LinkedIn. Game controls include the up arrow to rotate a piece 90 degrees clockwise, left and right arrows to move the piece of one tile left or right respectively, the down arrow to increase the speed of the piece's descent, and the space bar to instantly drop the piece.


![Wireframe](/wireframe.png)

#Architecture and Technologies#

This project will be implemented with the following technologies:
* Vanilla JavaScript and jQuery for starting the game, pausing the game, and quitting the game
* HTML5 Canvas for DOM manipulation and rendering, specifically drawing the game's grid and the moving pieces
* Webpack to bundle and serve up the various scripts.

There will be three scripts in addition to the webpack entry file in this project:
* game_view.js: this will have as properties ctx and the game, and will bind key handlers, start the game, and cause the game to progress through each step and be drawn at each requestAnimationFrame()

* game.js: this will have a board and will have game level as a property and the method step(), which will use condition logic. If no piece is falling, it will spawn a piece, which adds a piece to the board's array of pieces. If a piece is falling, it will move the piece down. If the piece can fall no further, it will check if the game is lost, and if not, it will check if any full rows can be cleared.

* board.js: The board will have as a property all pieces' speed of descent; it also has an array of all the pieces as a property. The board also has a method to check whether any rows are full. It also has a method to clear rows.

* piece.js: this file will have an overall Piece class, and multiple classes that inherit from Piece. Each of these pieces will have as a property a signifier to identify the shape of the piece. Pieces have the methods rotate() and fall(). They also have methods to move left and right. Each piece has an x, y coordinate signifying its position.

#Implementation Timeline#

**Day 1**: Set up Node modules, including getting Webpack up and running. Create webpack.config.js and package.json. Write a basic entry file and a skeleton of game_view.js, game.js, board.js, and piece.js. Learn enough Canvas to start rendering. Goals for the day:
* Get a green bundle with webpack
* Render the instructions pane with HTML & CSS, the game's empty board with Canvas, the preview pane with Canvas, and the game stats with HTML & CSS.

**Day 2**: Learn more Canvas. Implement functionality for checking whether it is possible for a piece to fall down further, or to move left or right. Implement the board's ability to clear rows and move the rows above that cleared row down. Implement the game's step() method, so that pieces fall down the grid and are shown. Make sure pieces are rendered properly. If you have time, implement key binders to move the pieces let and right.

**Day 3**: Implement wall kicks for pieces so that rotation can occur at edges. Install the rest of the controllers for the user to interact with the game, including rotation, the down arrow (to increase the speed of descent), and the space bar (to immediately drop the piece). Use jQuery to implement a user's ability to start, pause, and quit a game.

**Day 4**. Implement increases in descent speed from increasing levels. Style the game professionally.


#Bonus features#
- [ ] Spin pieces left
- [ ] Hold a piece
- [ ] Choose a level when starting the game
