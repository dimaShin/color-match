/**
 * Created by iashind on 16.12.14.
 */
define(['app', 'Controllers/GameController'], function(app, GameController){
    console.log('app: ', app);
    app.controller('gameController', GameController);

})