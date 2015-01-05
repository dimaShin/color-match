/**
 * Created by iashind on 24.12.14.
 */
define([], function() {

    function ColoredDirective(rules) {

        return{
            restrict: 'A',
            scope: {

            },
            compile:  function coloredDirectiveCompile(){

                return{
                    pre: function prelinkColored($scope, el){
                        var colors = rules.getColors(),
                            div = document.createElement('div'),
                            span = document.createElement('span'),
                            text = el.html().trim(), color;
                        for(var i in text){
                            color = colors[i] ? colors[i] : colors[i % colors.length];
                            $(span.cloneNode())
                                .css('color', color)
                                .html(text[i])
                                .appendTo(div);
                        }
                        el.html(div);
                    }
                }
            }
        }

    }

    return ColoredDirective;
})