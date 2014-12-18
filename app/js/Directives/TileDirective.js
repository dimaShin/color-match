/**
 * Created by iashind on 16.12.14.
 */
define([], function(){

    function TileDirective(rules){

        function getPos(index){
            var y = index % rules.getSize(),
                x = (index - y) / rules.getSize();
            return {
                x: x,
                y: y
            };
        }

        return {
            restrict: 'C',
            transclude: true,
            template: '<ng-transclude></ng-transclude>',
            compile: function(){

                return {
                    pre: function preLink($scope, el, attr, ctrl){
                        if(!$scope.tile) return;
                        var index = $scope.tile.index,
                            x = getPos(index, el).x,
                            y = getPos(index, el).y;
                        el.addClass('x' + x).addClass('y' + y);
                        el.css({
                            backgroundColor: $scope.tile.color
                        });
                        $scope.tile.nextColor = $scope.tile.getNextColor();
                    },
                    post: function postLink($scope, el, attr, ctrl){
                        $scope.$watch(
                            function indexWatcher($scope){
                                if($scope.tile){
                                    return $scope.tile.index;
                                }
                            },
                            function(newValue, oldValue){
                                if(newValue === undefined || newValue === oldValue) return;
                                var oldX = getPos(oldValue).x,
                                    oldY = getPos(oldValue).y,
                                    newX = getPos(newValue).x,
                                    newY = getPos(newValue).y;
                                el.removeClass('x' + oldX).removeClass('y' + oldY)
                                    .addClass('x' + newX).addClass('y' + newY);
                            }
                        )
                        $scope.$watch(
                            function colorWatcher($scope){
                                if($scope.tile){
                                    return $scope.tile.color;
                                }
                            },
                            function(newValue, oldValue){
                                if(newValue === undefined || newValue === oldValue) return;
                                el.css({
                                    backgroundColor: newValue
                                })
                                $scope.tile.nextColor = $scope.tile.getNextColor();
                            }
                        )
                    }
                }
            }
        }
    }

    return TileDirective;
})