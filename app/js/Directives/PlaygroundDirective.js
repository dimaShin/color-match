/**
 * Created by iashind on 19.12.14.
 */
define([], function(){

    function Playground(swipe){
        return {
            restrict: 'C',
            scope: {
                game: '='
            },
            link: function playgroundLink($scope, el){
                var startX, startY, touchHandler;
                $('html').on('keydown', function onKeyDown(e){
                    if(e.which < 37 || e.which > 40 || !$scope.game.size) return;
                    switch(e.which){
                        case 37: $scope.game.move('left');
                            break;//left
                        case 38: $scope.game.move('up');
                            break;//up
                        case 39: $scope.game.move('right');
                            break;//right
                        case 40: $scope.game.move('down');
                            break;//down
                    }
                });

                swipe.bind(el, {
                    start: function swipeStart(e){
                        startX = e.x;
                        startY = e.y;
                        //console.log('start');
                        touchHandler = function touchHandler(e){
                            //console.log('touchHandler');
                            var difX = startX - e.x,
                                difY = startY - e.y,
                                absX = Math.abs(difX),
                                absY = Math.abs(difY);
                            if(absX > 50 || absY > 50){
                                //console.log($scope.game.moving);
                                if(!$scope.game.size || $scope.game.moving) return;
                                //var difX = startX - e.x,
                                //    difY = startY - e.y;
                                //console.log('end touch', new Date().getTime());

                                if(absX > absY){
                                    difX > 0 ? $scope.game.move('left') : $scope.game.move('right');
                                }else{
                                    difY > 0 ? $scope.game.move('up') : $scope.game.move('down');
                                }
                                touchHandler = null;
                            }
                        }
                    },
                    move: function swipeMove(e){
                        if(touchHandler)touchHandler(e);
                    }
                })
                el.on('mousedown, touchstart', function preventDefault(e){
                    e.preventDefault();
                })
            }
        }
    }
    return Playground;
})