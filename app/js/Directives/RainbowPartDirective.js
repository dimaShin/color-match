/**
 * Created by iashind on 19.12.14.
 */
define([], function(){

    function RainbowPart(rules){

        return {
            restrict: 'C',
            scope: {
                colorN: '='
            },
            compile: function rainbowPartCompile(){
                var colors = rules.getColors();
                return {
                    pre: function preLinkRainbowPart($scope, el){
                        el.css({
                            width: 100 / (colors.length - 1) + '%',
                            backgroundImage: 'linear-gradient(to right,'+ colors[$scope.colorN] +','+ colors[$scope.colorN + 1] +')'
                        })
                    }
                }

            }
        }
    }

    return RainbowPart;

})