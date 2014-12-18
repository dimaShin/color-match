/**
 * Created by iashind on 16.12.14.
 */
define([], function(){

    function GameService(swipe, TileEntityService){
        Game.prototype.generateTile = function(needApply){
            var tilePos = this.getTilePos();
            if(tilePos === false) return this.endGame();
            console.log('got tile: ', tilePos);
            this.placeTile(TileEntityService.getTile(tilePos));
            if(needApply) this.scope.$apply();
        }

        Game.prototype.placeTile = function(tile){
            this.tilesCollection.push(tile);
            this.busyCellsCount++;
        }

        Game.prototype.getTilePos = function(){
            if(this.busyCellsCount === this.cellCount) return false;
            do{
                var pos = Math.floor(Math.random() * 100);
            }while(pos >= this.cellCount || this.getTile(pos));
            console.log('got new index: ', pos);
            return pos;
        };

        Game.prototype.endGame = function(){
            console.log('game over');
        }


        Game.prototype.start = function(){
            this.score = 0;
            this.generateTile();
            this.bindEvents();
        }

        Game.prototype.bindEvents = function(){
            var game = this;
            $('html').on('keydown', function(e){
                if(e.which < 37 || e.which > 40) return;
                switch(e.which){
                    case 37: game.move('left');
                        break;//left
                    case 38: game.move('up');
                        break;//up
                    case 39: game.move('right');
                        break;//right
                    case 40: game.move('down');
                        break;//down
                }
            })
            var startX, startY;
            $('div.playground').on('touchstart', function(e){
                e.preventDefault();
            });
            swipe.bind($('div.playground'), {
                start: function(e){
                    console.log('starting swipe: ', e)
                    startX = e.x;
                    startY = e.y;
                },
                move: function(e){


                },
                end: function(e){
                    var difX = startX - e.x,
                        difY = startY - e.y;

                    if(Math.abs(difX) > Math.abs(difY)){
                        difX > 0 ? game.move('left') : game.move('right');
                    }else{
                        difY > 0 ? game.move('up') : game.move('down');
                    }
                },
                cancel: function(e){

                }
            })
        }

        Game.prototype.move = function(direction){
            var grid = [], length, i, j;
            for(i = 0, length = Math.sqrt(this.cellCount); i < length; i++){
                grid.push([]);
                switch(direction){
                    case 'left':
                        grid[i] = this.matrix[i].slice(0);
                        break;
                    case 'up':
                        for(j=0; j<this.size; j++){
                            grid[i].push(this.matrix[j][i])
                        }
                        break;
                    case 'right':
                        for(j=this.size-1; j>=0; j--){
                            grid[i].push(this.matrix[i][j])
                        }
                        break;
                    case 'down':
                        for(j=this.size-1; j>=0; j--){
                            grid[i].push(this.matrix[j][i]);
                        }
                        break;
                }
            }
            for(i = 0, length = grid.length; i < length; i++){
                this.analyzeLine(grid[i]);
            }
            for(i = 0; i < this.tilesCollection.length; i++){
                this.tilesCollection[i].alreadyGrows = false;
            }
            this.render();
            this.generateTile(1);
        }

        Game.prototype.analyzeLine = function(line){
            var tile, nextTile, i, j, isMoved;
            for(i = 0; i < line.length; i++){
                if(tile = this.getTile(line[i])){
                    for(j = i - 1; j >= 0; j--){
                        if(nextTile = this.getTile(line[j])){
                            if(nextTile.colorN === tile.colorN && !nextTile.alreadyGrows){
                                this.mergeTiles(nextTile, tile);
                                isMoved = true;
                                break;
                            }else{
                                tile.index = line[j + 1];
                                isMoved = true;
                                break;
                            }
                        }
                    }
                    if(!isMoved) tile.index = line[0];
                }
            }
        }

        Game.prototype.mergeTiles = function(baseTile, absorbedTile){
            baseTile.growsUp();
            this.score += baseTile.colorN;
            absorbedTile.index = baseTile.index;
            absorbedTile.absorbed = true;
        }

        Game.prototype.removeAbsorbed = function(){
            for(var i = this.tilesCollection.length - 1; i >= 0; i--){
                if(this.tilesCollection[i].absorbed){
                    this.tilesCollection.splice(i, 1);
                    delete this.busyCells[i];
                    this.busyCellsCount--;
                }
            }
            this.scope.$apply();
        }

        Game.prototype.getTile = function(index){
            for(var i = 0; i < this.tilesCollection.length; i++){
                if(this.tilesCollection[i].index === index) return this.tilesCollection[i];
            }
            return false;
        }

        Game.prototype.render = function(){
            this.scope.$apply();
            this.removeAbsorbed();
            console.log(this);
        }

        function Game(scope){
            this.tilesCollection = [];
            this.busyCellsCount = 0;
            this.busyCells = {};
            this.scope = scope;
            this.cellCount = scope.boardSize;
            this.size = Math.sqrt(scope.boardSize);
            this.matrix = [];
            for(var i = 0; i < this.size; i++){
                this.matrix.push(new Array());
                for(var j = 0; j < this.size; j++){
                    this.matrix[i][j] = i * this.size + j;
                }
            }
        }

        return {
            getGame: function(scope){
                return new Game(scope);
            }
        }
    }





    return GameService;
})