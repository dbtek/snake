var snakeApp = angular.module('snake', ['gridServiceFactory']);


var snakeCtrl = function($scope, gridService){

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
  ];

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
      gridService.clean($scope.grid, this.body.pop());
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
      gridService.draw(val.head, val.size);
    });
  };

  $scope.$watch('snake', function() {
    console.log('snake changed');
    angular.forEach($scope.snake.body, function(val, key) {
      console.log('body:'+ JSON.stringify(val));
      gridService.draw(val, {width: 1, height: 1});
    });
  }, true);

  gridService.setCanvas('snakeGameCanvas').
              setGridSize(50,50);

  $scope.drawWalls();

};
