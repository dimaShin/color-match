/**
 * Created by iashind on 16.12.14.
 */
define([], function(){

    function TileService(rules){
        function Tile(index){
            this.index = index;
            this.colorN = (Math.floor((Math.random() * 10)) % 2 === 0) ? 0 : 1;
            this.color = rules.getColors()[this.colorN];
        }

        Tile.prototype.growsUp = function(){
            this.color = rules.getColors()[++this.colorN]
            this.alreadyGrows = true;
        }

        Tile.prototype.getNextColor = function(){
            return rules.getColors()[this.colorN + 1];
        }

        return {
            getTile: function (index) {
                return new Tile(index)
            }
        }
    }



    return TileService;
})