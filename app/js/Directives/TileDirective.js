/**
 * Created by iashind on 16.12.14.
 */
define([], function(){

    function TileDirective(rules, utils){



        return {
            restrict: 'C',
            transclude: true,
            template: '<ng-transclude></ng-transclude>',
            //scope: {
            //    tile: '='
            //},
            compile: function(){

                return {
                    pre: function preLink($scope, el, attr, ctrl){
                        if(!$scope.tile) return;
                        var index = $scope.tile.index,
                            x = utils.getPos(index).x,
                            y = utils.getPos(index).y;
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

                                var oldX = utils.getPos(oldValue).x,
                                    oldY = utils.getPos(oldValue).y,
                                    newX = utils.getPos(newValue).x,
                                    newY = utils.getPos(newValue).y;
                                //    side = rules.getSide(),
                                //    left = (newY * side) + (2*newY - 1),
                                //    top = (newX * side) + (2*newX - 1);
                                //console.log('newY: ', newY);
                                //console.log('newX: ', newX);
                                //console.log('side: ', side);
                                //console.log('left: ', left);
                                //console.log('top: ', top);
                                //el.animate({
                                //    left: left + 'vw',
                                //    top: top + 'vw'
                                //});
                                el.removeClass('x' + oldX).removeClass('y' + oldY)
                                    .addClass('x' + newX).addClass('y' + newY).addClass('moving');
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
                        $scope.$watch(
                            function moveAbsorbed($scope){
                                if($scope.tile) return $scope.tile.absorbed;
                            },
                            function(newValue){
                                //console.log($scope.$parent.tile.absorbed);
                                (newValue) ? el.addClass('absorbed') : el.removeClass('absorbed');
                            }

                        )
                    }
                }
            },
            controller: function($scope){
                //console.log('tile directive: ', $scope);
            }
        }
    }

    return TileDirective;
})