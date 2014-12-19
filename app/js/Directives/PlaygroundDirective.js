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
            link: function($scope, el){
                console.log('playground directive: ', $scope);
                var startX, startY;
                $('html').on('keydown', function(e){
                    console.log('keypress');
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
                    start: function(e){
                        console.log('start swipe');
                        startX = e.x;
                        startY = e.y;
                    },
                    end: function(e){
                        if(!$scope.game.size) return;
                        var difX = startX - e.x,
                            difY = startY - e.y;

                        if(Math.abs(difX) > Math.abs(difY)){
                            difX > 0 ? $scope.game.move('left') : $scope.game.move('right');
                        }else{
                            difY > 0 ? $scope.game.move('up') : $scope.game.move('down');
                        }
                    }
                })
            }
        }
    }
    return Playground;
})