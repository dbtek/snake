var gridService = angular.module('gridServiceFactory', []);

gridService.factory('gridService', function() {
  return {
    canvas: '',

    grid: {
      rows: 50,
      cols: 50
    },

    setGridSize: function(rows, cols) {
      this.grid.rows = rows;
      this.grid.cols = cols;
      return this;
    },

    setCanvas: function(canvasId) {
      this.canvas = document.getElementById(canvasId);
      return this;
    },

    draw: function(head, size) {
      boxWidth = this.canvas.width / this.grid.cols;
      boxHeight = this.canvas.height / this.grid.rows;

      if (this.canvas.getContext) {
        console.log("drawing");
        var ctx = this.canvas.getContext("2d");
        //clear the canvas

        ctx.clearRect((head.col - 1) * boxWidth, (head.row - 1) * boxHeight, size.width * boxWidth, size.height * boxHeight);
        ctx.fillRect((head.col - 1) * boxWidth, (head.row - 1) * boxHeight, size.width * boxWidth, size.height * boxHeight);
      }

      return this;
    },

    clean: function(grid, box) {
      boxWidth = this.canvas.width / this.grid.cols;
      boxHeight = this.canvas.height / this.grid.rows;

      if (this.canvas.getContext) {
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect((box.col - 1) * boxWidth, (box.row - 1) * boxHeight, 1 * boxWidth, 1 * boxHeight);
        console.log('box cleaned');
      }

      return this;
    }
  };
});
