/**
 * Created by iashind on 16.12.14.
 */
define([], function(){

    function TileDirective(rules, utils){



        return {
            restrict: 'A',
            transclude: true,
            template: '<ng-transclude></ng-transclude>',
            scope: {
                tile: '=',
                tilesType: '='
            },
            compile: function(){

                function setFontSize(height, colorN){
                    console.log(colorN);
                    if(colorN < 3) return height * .9 + 'px';
                    if(colorN < 6) return height * .7 + 'px';
                    if(colorN < 9) return height * .4 + 'px';
                    if(colorN < 12) return height * .2 + 'px';
                }

                return {
                    pre: function preLink($scope, el, attr, ctrl){
                        console.log('tilesType: ', $scope);
                        if(!$scope.tile) return;
                        var index = (typeof $scope.tile === 'number') ? $scope.tile : $scope.tile.index,
                            x = utils.getPos(index).x,
                            y = utils.getPos(index).y;
                        el.addClass('x' + x).addClass('y' + y);
                        if($scope.tilesType === 'COLORS'){
                            el.css({
                                backgroundColor: rules.getColors()[$scope.tile.colorN]
                            });
                            $scope.tile.nextColor = $scope.tile.getNextColor();
                        }else{
                            console.log('fontSize: ', setFontSize(el.height(), $scope.tile.colorN));
                            el.html(Math.pow(2, $scope.tile.colorN + 1)).css('backgroundColor', '#ccc').css('fontSize', setFontSize(el.height(), $scope.tile.colorN));
                        }


                    },
                    post: function postLink($scope, el){
                        $scope.$watchCollection(
                            function fontSizeWatcher($scope){
                                return {
                                    height: el.height(),
                                    colorN: $scope.tile.colorN
                                }
                            },
                            function(newValue){
                                console.log('fontSize: ', setFontSize(el.height(), $scope.tile.colorN))
                                el.css('fontSize', setFontSize(newValue.height, newValue.colorN));
                            }
                        )
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
                                el.removeClass('x' + oldX).removeClass('y' + oldY)
                                    .addClass('x' + newX).addClass('y' + newY).addClass('moving');
                            }
                        )
                        $scope.$watch(
                            function colorWatcher($scope){
                                if($scope.tile){
                                    return $scope.tile.colorN;
                                }
                            },
                            function(newValue, oldValue){
                                if(newValue === undefined || newValue === oldValue) return;
                                if($scope.tilesType === 'COLORS'){
                                    el.css({
                                        backgroundColor: rules.getColors()[newValue]
                                    })
                                    $scope.tile.nextColor = $scope.tile.getNextColor();
                                }else{
                                    el.html(Math.pow(2, $scope.tile.colorN + 1));
                                }

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