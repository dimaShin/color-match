/**
 * Created by iashind on 16.12.14.
 */
define([''], function(){

    function GameController($scope, rules, swipe, GameEntityService){

        $scope.game = {};
        $scope.recordScore = getRecordScore();
        $scope.recordColor = getRecordColor();
        $scope.colors = rules.getColors();
        console.log('recordColor: ', $scope.recordColor);
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
        $scope.$watch(
            function scoreWatcher($scope){
                return $scope.game.score;
            },
            function(newValue){
                if(newValue > $scope.recordScore) $scope.recordScore = newValue;
            }
        );

        $scope.$watch(
            function maxColorWatcher($scope){
                return $scope.game.maxColorN;
            },
            function(newValue){
                if(!newValue) newValue = 1;
                if(newValue > $scope.recordColor){
                    $scope.recordColor = newValue;
                    if(window.localStorage){
                        window.localStorage.recordColor = newValue;
                    }
                }
            }
        )


    }
    function getRecordScore(){
        return 123;
    }

    function getRecordColor(){
        if(window.localStorage && window.localStorage.recordColor){
            return window.localStorage.recordColor;
        }else{
            return 1;
        }
    }
    return GameController;
})