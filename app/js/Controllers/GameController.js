/**
 * Created by iashind on 16.12.14.
 */
define([''], function(){

    function GameController($scope, rules, swipe, GameEntityService, storage){
        $scope.sound = 'ON';
        $scope.numbers = 'ON';
        $scope.animation = storage.getAnimationState() || 'ON';
        $scope.game = {};
        $scope.recordScore = storage.getRecordScore() || 0;
        $scope.recordColor = storage.getRecordColor() || 1;
        $scope.colors = rules.getColors();
        var diffClasses = {
            4: 'hard',
            5: 'normal',
            6: 'easy'
        };
        $scope.$watch(
            function boardSizeWatcher($scope){
                return $scope.boardSize;
            },
            function(newValue){
                if(newValue === 16){
                    $scope.easy = $scope.normal = false;
                    $scope.hard = true;

                }else if(newValue === 25){
                    $scope.easy = $scope.hard = false;
                    $scope.normal = true;
                }else if(newValue === 36){
                    $scope.normal = $scope.hard = false;
                    $scope.easy = true;
                }
            }
        );
        $scope.boardSize = Math.pow(rules.getSize(), 2);
        $scope.bestScore = 0;
        $scope.addTile = function addTile(){
            $scope.game.generateTile();
        };
        $scope.startGame = function startGame(){
            $scope.boardSize = Math.pow(rules.getSize(), 2);
            $scope.game = GameEntityService.getGame($scope, swipe);
            $scope.game.start();
        };
        $scope.chooseDiff = function chooseDiff(){
            rules.setSize(rules.getSize() + 1);
            $scope.boardSize = Math.pow(rules.getSize(), 2);
        };

        $scope.setDifficulty = function setDifficulty(diff){
            switch(diff){
                case 'hard':
                    rules.setSize(4);
                    $scope.boardSize = 16;
                    break;
                case 'normal':
                    rules.setSize(5);
                    $scope.boardSize = 25;
                    break;
                case 'easy':
                    rules.setSize(6);
                    $scope.boardSize = 36;
                    break;
            }
        };

        $scope.$watch(
            function boardSizeWatcher($scope){
                return $scope.boardSize;
            },
            function boardSizeHandler(){
                $scope.difficulty = diffClasses[rules.getSize()];
                if($scope.difficulty === 'easy') $scope.numbers = 'OFF';
            }
        );
        $scope.getCellClasses = function getCellClasses(index){
            var y = index % rules.getSize(),
                x = (index - y) / rules.getSize();
            return 'x' + x + ' y' + y;
        };

        $scope.$watch(
            function scoreWatcher($scope){
                return $scope.game.score;
            },
            function scoreHandler(newValue){
                if(newValue > $scope.recordScore) {
                    $scope.recordScore = newValue;
                    storage.setRecordScore(newValue);
                }
            }
        );

        $scope.$watch(
            function maxColorWatcher($scope){
                return $scope.game.maxColorN;
            },
            function maxColorHandler(newValue){
                if(!newValue) newValue = 1;
                if(newValue > $scope.recordColor){
                    $scope.recordColor = newValue;
                    storage.setRecordColor(newValue);
                }
            }
        );

        $scope.endGame = function endGame(){
            $scope.game = {};
        };

        $scope.toggleOptions = function toggleOptions(){
            $scope.optionsVisibility = !$scope.optionsVisibility;
        };

        $scope.toggleSound = function toggleSound(){
            $scope.sound = ($scope.sound === 'ON') ? 'OFF' : 'ON';
        };
        $(window).on("resize",function onResize(event){
            $scope.albumPage = window.innerHeight < window.innerWidth;
            $scope.$apply();
        });
        $scope.$watchCollection(
            function pageWidthWatcher(){
                return {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            },
            function pageWidthHandler(newValue){
                $scope.albumPage = newValue.width > newValue.height;
            }
        );
        $scope.toggleNumbers = function toggleNumbers(){
            if($scope.difficulty === 'easy') {
                $scope.numbers = 'OFF';
            }else $scope.numbers = ($scope.numbers === 'ON') ? 'OFF' : 'ON';

        }
        $scope.toggleAnimation = function toggleAnimation(){
            $scope.animation = ($scope.animation=== 'ON') ? "OFF" : 'ON';
            storage.setAnimationState($scope.animation);
        }

    }

    return GameController;
})