/**
 * Created by iashind on 16.12.14.
 */
define(['easelJs'], function(){


    function GameController($scope, rules, GameEntityService, storage, renderer){

        function initializeScope($scope){
            $scope.sound        = true;
            $scope.numbers      = 'ON';
            $scope.animation    = storage.getAnimationState() === undefined ? true : !!storage.getAnimationState(); //value in older versions wasn't boolean
            $scope.game         = {};
            $scope.recordScore  = storage.getRecordScore() || 0;
            $scope.recordColor  = storage.getRecordColor() || 1;
            $scope.colors       = rules.getColors();
            $scope.boardSize    = Math.pow(rules.getSize(), 2);
            $scope.bestScore    = 0;
            $scope.setDifficulty(storage.getDefaultDifficulty() || 5);
            renderer.setDelay($scope.animation);
        }

        $scope.startGame = function startGame(){
            //$scope.boardSize = Math.pow(rules.getSize(), 2);
            $scope.game = GameEntityService.getGame($scope, renderer);
            $scope.game.start();
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
            $scope.difficulty = rules.getDiffName();
            if($scope.difficulty === 'easy') $scope.numbers = 'OFF';
            console.log(1);
        };

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
        $scope.endGame = function endGame(){
            $scope.game = {};
            renderer.clearCanvas();
        };

        $scope.toggleOptions = function toggleOptions(){
            $scope.optionsVisibility = !$scope.optionsVisibility;
        };

        $scope.toggleSound = function toggleSound(){
            $scope.sound = !$scope.sound;
            if($scope.game.size) $scope.game.playSound = $scope.sound;
        };
        $(window).on("resize",function onResize(){
            $scope.albumPage = window.innerHeight < window.innerWidth;
            $scope.$apply();
        });

        $scope.toggleNumbers = function toggleNumbers(){
            if($scope.difficulty === 'easy') {
                $scope.numbers = 'OFF';
            }else $scope.numbers = ($scope.numbers === 'ON') ? 'OFF' : 'ON';

        }
        $scope.toggleAnimation = function toggleAnimation(){
            $scope.animation = !$scope.animation;
            storage.setAnimationState($scope.animation);
            renderer.setDelay($scope.animation);
        }

        initializeScope($scope);


    }

    return GameController;
})