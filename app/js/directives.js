/**
 * Created by iashind on 16.12.14.
 */
define(['app',
    'Directives/ColorPointerDirective',
    'Directives/RainbowPartDirective',
    'Directives/PlaygroundDirective',
    'Directives/ColoredDirective',
    'Directives/ngReactRepeatDirective'],
    function(app, ColorPointerDirective, RainbowPartDirective, PlaygroundDirective, ColoredDirective, RepeatDirective){
    app.directive('colorPointer', ColorPointerDirective)
        .directive('rainbowPart', RainbowPartDirective)
        .directive('playground', PlaygroundDirective)
        .directive('colored', ColoredDirective)
        .directive('reactRepeat', ['reactDirective', RepeatDirective])
        .directive('tilesBox', function(){
            return {
                restrict: 'A',
                scope:{},
                link: function($scope, el, attr){
                    el.width(596).height(596);
                }
            }
        });

});