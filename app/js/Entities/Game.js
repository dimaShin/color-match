/**
 * Created by iashind on 16.12.14.
 */
define(['socketIO'], function(io){
    function GameService(TileEntityService, SoundsService, utils, $timeout){
        var generatedTiles = 0;
            //socket = io.connect();

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
            if(this.busyCellsCount < this.cellCount) return true;
            for(i = 0, length = this.tilesCollection.length; i < length; i++){
                tile = this.tilesCollection[i];
                x = utils.getPos(tile.index).x;
                y = utils.getPos(tile.index).y;
                if(x > 0){
                    newIndex = utils.getIndex(x-1, y);
                    if(!this.getTile(newIndex) || this.getTile(newIndex).colorN === tile.colorN) return true;
                }
                if(x < this.size - 2){
                    newIndex = utils.getIndex(x+1, y);
                    if(!this.getTile(newIndex) || this.getTile(newIndex).colorN === tile.colorN) return true;
                }
                if(y > 0){
                    newIndex = utils.getIndex(x, y-1);
                    if(!this.getTile(newIndex) || this.getTile(newIndex).colorN === tile.colorN) return true;
                }
                if(y < this.size - 2){
                    newIndex = utils.getIndex(x, y+1);
                    if(!this.getTile(newIndex) || this.getTile(newIndex).colorN === tile.colorN) return true;
                }
            }
        }

        Game.prototype.placeTile = function(tile){
            this.tilesCollection.push(tile);
            this.setIndex(tile, tile.index);
            //this.busyCells[tile.index] = tile;
            this.busyCellsCount++;
        }

        Game.prototype.getTilePos = function(){
            var pos;
            if(this.busyCellsCount === this.cellCount) return false;
            do{
                pos = Math.floor(Math.random() * 100);
            }while(pos >= this.cellCount || this.getTile(pos));
            return pos;
        };

        Game.prototype.endGame = function(){
            if(this.scope.sound === 'ON') SoundsService.play('game-over.ogg');
            this.gameOver = true;
            this.scope.$apply();
        }


        Game.prototype.start = function(){
            this.score = 0;
            this.generateTile();
        }

        Game.prototype.move = function(direction){
            this.scope.debugging = [];
            var grid = [], length, i, j, game = this;
            for(i = 0, length = game.size; i < length; i++){
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
            //console.log('got grid: ', grid);
            //console.log('start analyzing: ', new Date().getTime());
            //this.scope.debugging.push('start analyzing: ' + new Date().getTime());
            for(i = 0, length = grid.length; i < length; i++){
                this.analyzeLine(grid[i]);
            }
            //console.log('end analyzing: ', new Date().getTime());
            for(i = 0; i < this.tilesCollection.length; i++){
                this.tilesCollection[i].alreadyGrows = false;
            }
            if(this.movedTiles || this.mergedTiles){
                this.render();
                game.generateTile(1);

            }else if(this.scope.sound === 'ON'){
                SoundsService.play('dry-shot.ogg');
            }
            //console.log('end move: ', this.tilesMap);
        }

        Game.prototype.analyzeLine = function(line){
            //console.log('start analyzing line: ', new Date().getTime());
            //socket.emit('start_a', new Date().getTime());
            //this.scope.debugging.push('start analyzing line: ' + new Date().getTime());
            var tile, nextTile, i, j, isMoved, indexBefore;
            for(i = 1; i < line.length; i++){
                //console.log('checking: ', line[i]);
                if(tile = this.getTile(line[i])){
                    //console.log('got tile');
                    tile.moving = false;
                    indexBefore = tile.index;
                    for(j = i - 1; j >= 0; j--){
                        if(nextTile = this.getTile(line[j])){
                            if(nextTile.colorN === tile.colorN && !nextTile.alreadyGrows && !nextTile.absorbed){
                                this.mergeTiles(nextTile, tile);
                                isMoved = true;
                                break;
                            }else{
                                this.setIndex(tile, line[j + 1], tile.index);
                                //tile.index = line[j + 1];
                                isMoved = true;
                                break;
                            }
                        }
                    }
                    if(!isMoved){
                        //tile.index = line[0];
                        this.setIndex(tile, line[0], tile.index)
                    }
                    if(indexBefore !== tile.index) {
                        this.movedTiles = true;
                        tile.moving = true;
                    }
                }
            }
            //socket.emit('end_a', new Date().getTime());
            //console.log('end analyzing line: ', new Date().getTime());
            //this.scope.debugging.push('end analyzing line: ' + new Date().getTime());
        }

        Game.prototype.mergeTiles = function(absorbedTile, baseTile){
            this.mergedTiles = true;
            baseTile.growsUp();
            if(baseTile.colorN > this.maxColorN) {
                this.maxColorN = baseTile.colorN;
            }
            this.score += baseTile.colorN * (10 - this.size);
            //baseTile.index = absorbedTile.index;
            this.setIndex(baseTile, absorbedTile.index, baseTile.index);
            absorbedTile.absorbed = true;
        }

        Game.prototype.removeAbsorbed = function(){
            for(var i = this.tilesCollection.length - 1; i >= 0; i--){
                if(this.tilesCollection[i].absorbed){
                    this.tilesCollection[i].moving = false;
                    //delete this.tilesMap[this.tilesCollection[i].index]
                    this.tilesCollection.splice(i, 1);
                    this.busyCellsCount--;
                }
            }
            //this.scope.$apply();
        }

        Game.prototype.getTile = function(index){
            //console.log('this.tilesMap);
            return this.tilesMap[index];
            //socket.emit('start_getTile', new Date().getTime());
            ////console.log('start getting tile: ', new Date().getTime());
            //for(var i = 0; i < this.tilesCollection.length; i++){
            //    if(this.tilesCollection[i].index === index) {
            //        socket.emit('got_tile', new Date().getTime());
            //        //console.log('got tile: ', new Date().getTime());
            //        return this.tilesCollection[i];
            //    }
            //}
            //socket.emit('no_tile', new Date().getTime());
            ////console.log('nothing here: ', new Date().getTime())
            //return false;
        }

        Game.prototype.onRender = function(renderHandler){
            this.render = renderHandler;
        }

        Game.prototype.render = function(){

            //socket.emit('start_r', new Date().getTime());
            var game = this;
            if(this.scope.sound === 'ON'){
                if(this.mergedTiles){
                    SoundsService.play('move.ogg');
                }else{
                    SoundsService.play('merge.ogg')
                }
            }
            //this.scope.debugging.push('start rendering: ' + new Date().getTime());
            //this.scope.consoleVisibility = true;
            //console.log(this.scope.debugging);
            //this.scope.$apply();
            game.removeAbsorbed();
        };

        Game.prototype.setIndex = function(tile, newIndex, oldIndex){
            //console.log('setting index: ', newIndex, oldIndex);
            if(newIndex === oldIndex) return;
            if(oldIndex !== 'undefined'){
                delete this.tilesMap[oldIndex];
                tile.oldIndex = oldIndex;
            }
            tile.index = newIndex;
            this.tilesMap[newIndex] = tile;
        }

        function Game(scope){
            this.tilesCollection = [];
            this.busyCellsCount = 0;
            this.tilesMap = {};
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

    return GameService;
})