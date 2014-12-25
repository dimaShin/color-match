/**
 * Created by iashind on 16.12.14.
 */
define(['socketIO'], function(io){

    function TileDirective(rules, utils){
        var socket = io.connect();


        return {
            restrict: 'A',
            transclude: true,
            template: '<ng-transclude></ng-transclude>',
            scope: {
                tile: '=',
                numbers: '='
            },
            compile: function(){

                function setFontSize(height, colorN){
                    if(colorN < 3) return height * .9 + 'px';
                    if(colorN < 6) return height * .7 + 'px';
                    if(colorN < 9) return height * .45 + 'px';
                    if(colorN < 12) return height * .25 + 'px';
                }

                return {
                    pre: function preLink($scope, el, attr, ctrl){
                        if(!$scope.tile) return;
                        var index = (typeof $scope.tile === 'number') ? $scope.tile : $scope.tile.index,
                            x = utils.getPos(index).x,
                            y = utils.getPos(index).y;
                        el.css({
                            backgroundColor: rules.getColors()[$scope.tile.colorN]
                        });

                        el.addClass('x' + x).addClass('y' + y);
                        if($scope.numbers === 'ON'){
                            el.html(Math.pow(2, $scope.tile.colorN + 1)).css('fontSize', setFontSize(el.height(), $scope.tile.colorN));
                        }else{
                            $scope.tile.nextColor = $scope.tile.getNextColor();
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
                                if($scope.numbers === 'ON') el.css('fontSize', setFontSize(newValue.height, newValue.colorN));
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
                                //console.log('starting animation', new Date().getTime());
                                socket.emit('animation', new Date().getTime());
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
                                el.css({
                                    backgroundColor: rules.getColors()[newValue]
                                })

                                if($scope.numbers === 'ON'){
                                    el.html(Math.pow(2, $scope.tile.colorN + 1));
                                }else{
                                    $scope.tile.nextColor = $scope.tile.getNextColor();
                                }
                            }
                        )
                        $scope.$watch(
                            function moveAbsorbed($scope){
                                if($scope.tile) return $scope.tile.absorbed;
                            },
                            function(newValue){
                                (newValue) ? el.addClass('absorbed') : el.removeClass('absorbed');
                            }

                        )
                    }
                }
            },
            controller: function($scope){
            }
        }
    }

    return TileDirective;
})