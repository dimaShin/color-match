/**
 * Created by iashind on 16.12.14.
 */
define([''], function(){

    function GameController($scope, rules, swipe, GameEntityService){
        console.log('swipe: ', swipe);
        var diffClasses = {
            4: 'hard',
            5: 'normal',
            6: 'easy'
        }
        $scope.boardSize = Math.pow(rules.getSize(), 2);
        $scope.bestScore = 0;
        $scope.addTile = function(){
            $scope.game.generateTile();
        };
        $scope.startGame = function(){
            $scope.boardSize = Math.pow(rules.getSize(), 2);
            $scope.game = GameEntityService.getGame($scope, swipe);
            $scope.game.start();
        };
        $scope.chooseDiff = function(){
            rules.setSize(rules.getSize() + 1);
            $scope.boardSize = Math.pow(rules.getSize(), 2);
        }
        $scope.$watch(
            function boardSizeWatcher($scope){
                return $scope.boardSize;
            },
            function(){
                $scope.difficulty = diffClasses[rules.getSize()];
            }
        )
        $scope.getCellClasses = function(index){
            var y = index % rules.getSize(),
                x = (index - y) / rules.getSize();
            return {
                x: 'x' + x,
                y: 'y' + y
            };
        }
    }

    return GameController;
})