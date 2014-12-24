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
            compile: function(){
                var colors = rules.getColors();

                return {
                    pre: function preLink($scope, el){
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