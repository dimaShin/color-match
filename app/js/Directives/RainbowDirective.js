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
            link: function($scope){
                console.log('rainbow: ',$scope);
            },
            controller: function($scope){
                $scope.colors = rules.getColors();
            }
        }
    }

    return RainbowDirective;
})