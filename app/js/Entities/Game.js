/**
 * Created by iashind on 16.12.14.
 */
define([], function(){
    function GameService(swipe, TileEntityService, SoundsService, utils, $timeout){
        var generatedTiles = 0;

        Game.prototype.generateTile = function(needApply){
            this.movedTiles = false;
            this.mergedTiles = false;
            var tilePos = this.getTilePos();
            if(tilePos === false) return this.endGame();
            this.placeTile(TileEntityService.getTile(tilePos, ++generatedTiles));
            if(needApply) this.scope.$apply();
            if(!this.hasPossibleMoves()){
                return this.endGame();
            }
        }

        Game.prototype.hasPossibleMoves = function(){
            var tile, i, length, x, y, newIndex;
            console.log(this);
            if(this.busyCellsCount < this.cellCount) return true;
            for(i = 0, length = this.tilesCollection.length; i < length; i++){
                tile = this.tilesCollection[i];
                x = utils.getPos(tile.index).x;
                y = utils.getPos(tile.index).y;
                console.log('checking: ', tile.index,x,y);
                if(x > 0){
                    newIndex = utils.getIndex(x-1, y);
                    console.log('x > 0', newIndex);
                    if(!this.getTile(newIndex) || this.getTile(newIndex).colorN === tile.colorN) return true;
                }
                if(x < this.size - 2){
                    newIndex = utils.getIndex(x+1, y);
                    console.log('x < size', newIndex);
                    if(!this.getTile(newIndex) || this.getTile(newIndex).colorN === tile.colorN) return true;
                }
                if(y > 0){
                    newIndex = utils.getIndex(x, y-1);
                    console.log('y > 0', newIndex);
                    if(!this.getTile(newIndex) || this.getTile(newIndex).colorN === tile.colorN) return true;
                }
                if(y < this.size - 2){
                    newIndex = utils.getIndex(x, y+1);
                    console.log('y < size', newIndex);
                    if(!this.getTile(newIndex) || this.getTile(newIndex).colorN === tile.colorN) return true;
                }
            }
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
            return pos;
        };

        Game.prototype.endGame = function(){
            if(this.scope.sound === 'ON') SoundsService.play('game-over.ogg');
            this.gameOver = true;
            console.log('game over', this);
            this.scope.$apply();
        }


        Game.prototype.start = function(){
            this.score = 0;
            this.generateTile();
            //this.bindEvents();
        }

        //Game.prototype.bindEvents = function(){
        //
        //    var game = this, startX, startY;
        //    $('html').off('keydown').on('keydown', function(e){
        //        if(e.which < 37 || e.which > 40) return;
        //        switch(e.which){
        //            case 37: game.move('left');
        //                break;//left
        //            case 38: game.move('up');
        //                break;//up
        //            case 39: game.move('right');
        //                break;//right
        //            case 40: game.move('down');
        //                break;//down
        //        }
        //    })
        //    swipe.bind($('div.playground'), {
        //        start: function(e){
        //            startX = e.x;
        //            startY = e.y;
        //        },
        //        end: function(e){
        //            var difX = startX - e.x,
        //                difY = startY - e.y;
        //
        //            if(Math.abs(difX) > Math.abs(difY)){
        //                difX > 0 ? game.move('left') : game.move('right');
        //            }else{
        //                difY > 0 ? game.move('up') : game.move('down');
        //            }
        //        }
        //    })
        //}

        Game.prototype.move = function(direction){
            var grid = [], length, i, j, game = this;
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
            if(this.movedTiles || this.mergedTiles){
                if(this.scope.sound === 'ON'){
                    if(this.mergedTiles){
                        SoundsService.play('move.ogg');
                    }else{
                        SoundsService.play('merge.ogg')
                    }
                }

                this.render();
                $timeout(function(){
                    game.generateTile(1);
                }, 20);

            }else if(this.scope.sound === 'ON'){
                SoundsService.play('dry-shot.ogg');
            }

        }

        Game.prototype.analyzeLine = function(line){
            //this.endGame();
            var tile, nextTile, i, j, isMoved, indexBefore;
            for(i = 0; i < line.length; i++){
                if(tile = this.getTile(line[i])){
                    tile.moving = false;
                    indexBefore = tile.index;
                    for(j = i - 1; j >= 0; j--){
                        if(nextTile = this.getTile(line[j])){
                            if(nextTile.colorN === tile.colorN && !nextTile.alreadyGrows && !nextTile.absorbed){
                                console.log('merge tiles: ', nextTile, tile);
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
                    if(!isMoved){
                        tile.index = line[0];
                    }
                    if(indexBefore !== tile.index) {
                        this.movedTiles = true;
                        tile.moving = true;
                    }
                }
            }
        }

        Game.prototype.mergeTiles = function(absorbedTile, baseTile){
            this.mergedTiles = true;
            baseTile.growsUp();
            if(baseTile.colorN > this.maxColorN) {
                this.maxColorN = baseTile.colorN;
            }
            this.score += baseTile.colorN * (10 - this.size);
            baseTile.index = absorbedTile.index;
            absorbedTile.absorbed = true;
        }

        Game.prototype.removeAbsorbed = function(){
            for(var i = this.tilesCollection.length - 1; i >= 0; i--){
                if(this.tilesCollection[i].absorbed){
                    this.tilesCollection[i].moving = false;
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
            var game = this;
            this.scope.$apply();
            game.removeAbsorbed();
        };

        function Game(scope){
            this.tilesCollection = [];
            this.busyCellsCount = 0;
            this.busyCells = {};
            this.scope = scope;
            this.cellCount = scope.boardSize;
            this.size = Math.sqrt(scope.boardSize);
            this.matrix = [];
            this.maxColorN = 0;
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

    function getRecordScore(){
        return 123;
    }



    return GameService;
})