/**
 * Created by iashind on 19.12.14.
 */
define([], function(){

    function ColorPointer(rules){

        return{
            restrict: 'C',
            scope: {
                maxColorN: '='
            },
            link: function linkColorPointer($scope, el, attr){
                var vwPerColor = 100 / (rules.getColors().length - 1);
                $scope.$watch(
                    function maxColorWatcher($scope){
                        return $scope.maxColorN;
                    },
                    function maxColHandler(newValue){
                        if(!newValue) newValue = 0;
                        el.css({
                            left: newValue * vwPerColor + '%',
                            top: attr.top + 'px'
                        })
                    }
                )
            }
        }
    }

    return ColorPointer;

})