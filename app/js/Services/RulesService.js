/**
 * Created by iashind on 16.12.14.
 */
define([], function(){

    function rulesService(storage){
        var side = storage.getDefaultDifficulty() || 5;
        var colors = [
            '#de1515',
            '#de5c15',
            '#de9515',
            '#ded215',
            '#acde15',
            '#4ede15',
            '#15dec9',
            '#157dde',
            '#1e15de',
            '#b115de',
            '#de1590',
            '#d4908d',
            '#a9d48d',
            '#8dd4d3',
            '#938dd4',
            '#d48dbf',
            //'#004444',
            //'#066500'
            ],
            tileSizes = [14,18,23];
        return {
            getTileSize: function(){
                switch(+side){
                    case 4: return tileSizes[2];
                    case 5: return tileSizes[1];
                    case 6: return tileSizes[0];
                    default : return 'def';
                }
            },
            getSize: function(){
                return side;
            },
            setSize: function(newValue){
                if(newValue > 6) newValue = 4;
                side = newValue;
                storage.setDefaultDifficulty(newValue);
            },
            getColors: function(){
                return colors;
            },
            getSide: function(){
                switch(side){
                    case 4: return 20.5;
                    case 5: return 16;
                    case 6: return 13;
                }
            }
        }
    }

    return rulesService;
})