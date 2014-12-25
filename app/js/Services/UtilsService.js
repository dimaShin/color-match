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

        function getCssFromIndex(index){
            var pos = getPos(index);
            return {
                left: getCSS(pos.y),
                top: getCSS(pos.x)
            }
        }

        function getCSS(x){
            var side = rules.getSide();
            return (x*side) + (x + 1) + '%';
        }
        function getIndex(x, y){
            return x*rules.getSize()+y;
        }

        return {
            getPos: getPos,
            getIndex: getIndex,
            getCssFromIndex: getCssFromIndex
        }
    }

    return Utils;

})