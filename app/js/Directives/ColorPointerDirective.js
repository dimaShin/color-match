/**
 * Created by iashind on 19.12.14.
 */
define([], function(){

    function ColorPointer(rules){

        return{
            restrict: 'C',
            scope: {
                maxColorN: '=',
                top: '='
            },
            link: function($scope, el){
                var vwPerColor = 90 / (rules.getColors().length - 1);
                $scope.$watch(
                    function maxColorWatcher($scope){
                        return $scope.maxColorN;
                    },
                    function(newValue){
                        if(!newValue) newValue = 0;
                        el.css({
                            left: newValue * vwPerColor + 'vw',
                            top: $scope.top
                        })
                    }
                )
            }
        }
    }

    return ColorPointer;

})