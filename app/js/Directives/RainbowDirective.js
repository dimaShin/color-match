/**
 * Created by iashind on 18.12.14.
 */
define([], function(){

    function RainbowDirective(rules){

        return{
            restrict: 'C',
            scope: {
                game: '='
            },
            controller: function rainbowController($scope){
                $scope.colors = rules.getColors();
            }
        }
    }

    return RainbowDirective;
})