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
            compile: function tileDirectiveCompile(){
                console.log('tileDirective!');
                var numbersCache = {},
                    positionsCache = {
                        x: {},
                        y: {}
                    },
                    tileSize = rules.getTileSize();

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
                        if(!positionsCache.x[x]){
                            positionsCache.x[x] = tileSize*x + (x*2)+1 + '%';
                        }
                        if(!positionsCache.y[y]){
                            positionsCache.y[y] = tileSize*y + (y*2)+1 + '%';
                        }
                        el.css({
                            backgroundColor: rules.getColors()[$scope.tile.colorN],
                            left: positionsCache.y[y],
                            top: positionsCache.x[x]
                        })
                        //el.addClass('x' + x).addClass('y' + y);
                        if($scope.numbers === 'ON'){
                            if(!numbersCache[$scope.tile.colorN + 1]) numbersCache[$scope.tile.colorN + 1] = Math.pow(2, $scope.tile.colorN + 1);
                            el.html(numbersCache[$scope.tile.colorN + 1]).css('fontSize', setFontSize(el.height(), $scope.tile.colorN));
                        }else{
                            $scope.tile.nextColor = $scope.tile.getNextColor();
                        }
                    },
                    post: function postLink($scope, el){
                        $scope.$watch(
                            function moveAbsorbed($scope){
                                if($scope.tile) return $scope.tile.absorbed;
                            },
                            function absorbedHandler(newValue){
                                (newValue) ? el.addClass('absorbed') : el.removeClass('absorbed');
                            }
                        )
                        $scope.$watchCollection(
                            function fontSizeWatcher($scope){
                                return {
                                    height: el.height(),
                                    colorN: $scope.tile.colorN
                                }
                            },
                            function fontHandler(newValue){
                                if($scope.numbers === 'ON') el.css('fontSize', setFontSize(newValue.height, newValue.colorN));
                            }
                        )
                        $scope.$watch(
                            function colorWatcher($scope){
                                if($scope.tile){
                                    return $scope.tile.colorN;
                                }
                            },
                            function colorHandler(newValue, oldValue){
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
                            function indexWatcher($scope){
                                if($scope.tile){
                                    return $scope.tile.index;
                                }
                            },
                            function indexHandler(newValue, oldValue){

                                if(newValue === undefined || newValue === oldValue) return;
                                socket.emit('newIndex', [newValue, oldValue]);
                                var oldX = utils.getPos(oldValue).x,
                                    oldY = utils.getPos(oldValue).y,
                                    newX = utils.getPos(newValue).x,
                                    newY = utils.getPos(newValue).y;
                                if(!positionsCache.x[newX]){
                                    positionsCache.x[newX] = tileSize*newX + (newX*2)+1 + '%';
                                }
                                if(!positionsCache.y[newY]){
                                    positionsCache.y[newY] = tileSize*newY + (newY*2)+1 + '%';
                                }
                                el.css({
                                    left: positionsCache.y[newY],
                                    top: positionsCache.x[newX]
                                })
                                //console.log('starting animation', new Date().getTime());
                                //socket.emit('animation', new Date().getTime());
                                //el[0].classList.remove('x' + oldX, 'y' + oldY);
                                //el[0].classList.add('x' + newX, 'y' + newY, 'moving');
                                //el.removeClass('x' + oldX).removeClass('y' + oldY)
                                //    .addClass('x' + newX).addClass('y' + newY).addClass('moving');
                            }
                        )


                    }
                }
            }
        }
    }

    return TileDirective;
})