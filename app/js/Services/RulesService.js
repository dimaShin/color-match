/**
 * Created by iashind on 16.12.14.
 */
define([], function(){

    function rulesService(){
        var side = 5;
        var colors = ['#f00', '#f80', '#ff0', '#8f0', '#0f0', '#0f8', '#0ff', '#08f', '#00f', '#80f', '#f0f'];
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