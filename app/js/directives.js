/**
 * Created by iashind on 16.12.14.
 */
define(['app',
    'Directives/TileDirective',
    'Directives/RainbowDirective',
    'Directives/ColorPointerDirective',
    'Directives/RainbowPartDirective',
    'Directives/PlaygroundDirective',
    'Directives/ColoredDirective',
    'Directives/ngReactRepeatDirective'],
    function(app, TileDirective, RainbowDirective, ColorPointerDirective, RainbowPartDirective, PlaygroundDirective, ColoredDirective, RepeatDirective){
        console.log('directives');
    app//.directive('tile', TileDirective)
        //.directive('rainbow', RainbowDirective)
        .directive('colorPointer', ColorPointerDirective)
        .directive('rainbowPart', RainbowPartDirective)
        .directive('playground', PlaygroundDirective)
        .directive('colored', ColoredDirective)
        .directive('reactRepeat', ['reactDirective', RepeatDirective]);

});