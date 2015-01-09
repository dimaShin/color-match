/**
 * Created by iashind on 16.12.14.
 */
define([], function(){

    function TileService(rules){

        function Tile(index, count){
            this.index = index;
            this.count = count;
            this.colorN = (Math.floor((Math.random() * 10)) % 2 === 0) ? 0 : 1;
            this.color = rules.getColors()[this.colorN];
        }

        Tile.prototype.growsUp = function(){
            if(rules.getColors().length - this.colorN > 1){
                this.color = rules.getColors()[++this.colorN];
            }else{
            }
            this.alreadyGrows = true;
        };

        Tile.prototype.getNextColor = function(){
            return rules.getColors()[this.colorN + 1];
        };

        return {
            getTile: function (index, count) {
                return new Tile(index, count)
            }
        }
    }



    return TileService;
})