var snakeApp = angular.module('snake', []);


var snakeCtrl = function($scope, squareDrawer){

  $scope.grid = {
    rows: 50,
    cols: 50
  }

  $scope.walls = [
    {
      head: {row: 1, col: 1},
      size: {width: 1, height: 50}
    },
    {
      head: {row: 1, col: 50},
      size: {width: 1, height: 50}
    },
    {
      head: {row: 50, col: 1},
      size: {width: 50, height: 1}
    },
    {
      head: {row: 1, col: 1},
      size: {width: 50, height: 1}
    }
  ]

  $scope.snake = {
    direction: 'right',
    body: [
      {row:4,col:6},
      {row:5,col:6},
      {row:6,col:6},
      {row:6,col:7},
      {row:6,col:8},
      {row:6,col:9},
      {row:6,col:10}
    ],

    move: function(){
      console.log(this.body);
      squareDrawer.clean($scope.grid, this.body.pop());
      console.log(this.body);

      if(this.direction == 'right'){
        this.body.splice(0,0,{row: this.body[0].row, col: this.body[0].col+1});
      }
      else if(this.direction == 'left'){
        this.body.splice(0,0,{row: this.body[0].row, col: this.body[0].col-1});
      }
        else if(this.direction == 'up'){
          this.body.splice(0,0,{row: this.body[0].row-1, col: this.body[0].col});
        }
          else if(this.direction == 'down'){
            this.body.splice(0,0,{row: this.body[0].row+1, col: this.body[0].col});
          }
    }
  };


  $scope.drawWalls = function(){
    angular.forEach($scope.walls, function(val, key) {
      console.log('wall:'+ JSON.stringify(val));
      squareDrawer.draw($scope.grid, val.head, val.size);
    });
  };

  $scope.$watch('snake', function() {
    console.log('snake changed');
    angular.forEach($scope.snake.body, function(val, key) {
      console.log('body:'+ JSON.stringify(val));
      squareDrawer.draw($scope.grid, val, {width: 1, height: 1});
    });
  }, true);

  $scope.drawWalls();

};



snakeApp.factory('squareDrawer', function() {

  var squareDrawer = {
    /**
         * draw the square on the canvas
         */
      draw: function(grid, head, size) {

        var canvas = document.getElementById("snakeGameCanvas");

        boxWidth = canvas.width / grid.cols;
        boxHeight = canvas.height / grid.rows;


        if (canvas.getContext) {
          console.log("drawing");
          var ctx = canvas.getContext("2d");
          //clear the canvas

          ctx.clearRect((head.col - 1) * boxWidth, (head.row - 1) * boxHeight, size.width * boxWidth, size.height * boxHeight);
          ctx.fillRect((head.col - 1) * boxWidth, (head.row - 1) * boxHeight, size.width * boxWidth, size.height * boxHeight);
        }
      },

      clean: function(grid, box){
        var canvas = document.getElementById("snakeGameCanvas");

        boxWidth = canvas.width / grid.cols;
        boxHeight = canvas.height / grid.rows;


        if (canvas.getContext) {
          var ctx = canvas.getContext("2d");
          ctx.clearRect((box.col - 1) * boxWidth, (box.row - 1) * boxHeight, 1 * boxWidth, 1 * boxHeight);
          console.log('box cleaned');
        }
      }
    };


  return squareDrawer;
});
