/**
 * Created by iashind on 16.12.14.
 */
define(['app', 'Directives/TileDirective', 'Directives/RainbowDirective'], function(app, TileDirective, RainbowDirective){
    console.log('directives: ', app);
    app.directive('tile', TileDirective)
        .directive('rainbow', RainbowDirective);

});