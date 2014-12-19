/**
 * Created by iashind on 16.12.14.
 */
define([], function(){

    function rulesService(){
        var side = 5;
        var colors = [
            '#e9e162',
            '#EAA700',
            '#D85E2B',
            '#AB629A',
            '#E46077',
            '#FA97C6',
            '#E67D12',
            '#C13621',
            '#003F69',
            '#047ED1',
            '#02494F',
            '#34AC55',
            '#87E1DF',
            '#3C1690',
            '#f00',
            '#ff0'
        ];
        return {
            getSize: function(){
                return side;
            },
            setSize: function(newValue){
                if(newValue > 6) newValue = 4;
                side = newValue;
            },
            getColors: function(){
                return colors;
            }
        }
    }

    return rulesService;
})