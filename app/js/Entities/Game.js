/**
 * Created by iashind on 16.12.14.
 */
define([], function(){
    function GameService(TileEntityService, SoundsService, utils, $timeout){
        var generatedTiles = 0;

        Game.prototype.generateTile = function(needApply){
            var tileIndex = this.getTileIndex(),
                tilesCount = this.tilesCollection.length, i;
            //if(tileIndex === false) return this.endGame();
            for(i = 0; i < tilesCount; i++){
                this.tilesCollection[i].alreadyGrows = false;
            }
            this.movedTiles = false;
            this.mergedTiles = false;
            this.placeTile(TileEntityService.getTile(tileIndex, ++generatedTiles));
            if(needApply) this.scope.$apply();
            if(!this.hasPossibleMoves()){
                return this.endGame();
            }
        }

        Game.prototype.hasPossibleMoves = function(){
            var tile, i, x, y, newIndex,
                tilesCount = this.tilesCollection.length;
            if(tilesCount < this.cellCount) return true;
            for(i = 0; i < tilesCount; i++){
                tile = this.tilesCollection[i];
                x = utils.getPos(tile.index).x;
                y = utils.getPos(tile.index).y;
                if(x > 0){
                    newIndex = utils.getIndex(x-1, y);
                    if(this.getTile(newIndex).colorN === tile.colorN) return true;
                }
                if(x < this.size - 2){
                    newIndex = utils.getIndex(x+1, y);
                    if(this.getTile(newIndex).colorN === tile.colorN) return true;
                }
                if(y > 0){
                    newIndex = utils.getIndex(x, y-1);
                    if(this.getTile(newIndex).colorN === tile.colorN) return true;
                }
                if(y < this.size - 2){
                    newIndex = utils.getIndex(x, y+1);
                    if(this.getTile(newIndex).colorN === tile.colorN) return true;
                }
            }
            return false;
        };

        Game.prototype.placeTile = function(tile){
            this.tilesCollection.push(tile);
            this.setIndex(tile, tile.index);
            //this.busyCells[tile.index] = tile;
            //this.busyCellsCount++;
        }

        Game.prototype.getTileIndex = function(){
            var index;
            if(this.tilesCollection.length === this.cellCount) return false;
            do{
                index = Math.floor(Math.random() * 100);
            }while(index >= this.cellCount || this.getTile(index));
            return index;
        };

        Game.prototype.endGame = function(){
            if(this.scope.sound === 'ON') SoundsService.play('game-over.ogg');
            this.gameOver = true;
            //this.scope.$apply();
        }


        Game.prototype.start = function(){
            this.score = 0;
            this.generateTile();
        }

        Game.prototype.move = function(direction){
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
            for(i = 0, length = grid.length; i < length; i++){
                this.analyzeLine(grid[i]);
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
            var tile, nextTile, i, j, isMoved, indexBefore;
            for(i = 1; i < line.length; i++){
                if(tile = this.getTile(line[i])){
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
                                isMoved = true;
                                break;
                            }
                        }
                    }
                    if(!isMoved){
                        this.setIndex(tile, line[0], tile.index)
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
            this.setIndex(baseTile, absorbedTile.index, baseTile.index);
            absorbedTile.absorbed = true;
        }

        Game.prototype.removeAbsorbed = function(){
            for(var i = this.tilesCollection.length - 1; i >= 0; i--){
                if(this.tilesCollection[i].absorbed){
                    this.tilesCollection[i].moving = false;
                    this.tilesCollection.splice(i, 1);
                    this.busyCellsCount--;
                }
            }
        }

        Game.prototype.getTile = function(index){
            return this.tilesMap[index];
        }

        Game.prototype.render = function(){
            var game = this;
            if(this.scope.sound === 'ON'){
                if(this.mergedTiles){
                    SoundsService.play('move.wav');
                }else{
                    SoundsService.play('merge.wav')
                }
            }
            game.removeAbsorbed();
        };

        Game.prototype.setIndex = function(tile, newIndex, oldIndex){
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