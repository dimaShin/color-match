/**
 * Created by iashind on 20.12.14.
 */
define([], function(){

    function Utils(rules){

        function getPos(index){
            var y = index % rules.getSize(),
                x = (index - y) / rules.getSize();
            return {
                x: x,
                y: y
            };
        }

        function getIndex(x, y){
            return x*rules.getSize()+y;
        }

        return {
            getPos: getPos,
            getIndex: getIndex
        }
    }

    return Utils;

})