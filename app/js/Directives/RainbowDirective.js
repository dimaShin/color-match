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
            templateUrl: '/js/Directives/Templates/rainbow.html',
            link: function rainbowLink($scope){
            },
            controller: function rainbowController($scope){
                $scope.colors = rules.getColors();
            }
        }
    }

    return RainbowDirective;
})