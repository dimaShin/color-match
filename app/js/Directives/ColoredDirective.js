/**
 * Created by iashind on 24.12.14.
 */
define([], function() {

    function ColoredDirective(rules) {

        return{
            restrict: 'A',
            scope: {

            },
            compile: function(){

                return{
                    pre: function($scope, el){
                        var colors = rules.getColors(),
                            text = el.html().trim(),//replace(/\s/g, ''),
                            newHTML = $('<div></div>'), span, color;
                        console.log(text);
                        for(var i in text){
                            color = colors[i] ? colors[i] : colors[i % colors.length];
                            span = $('<span></span>')
                                .css('color', color)
                                .html(text[i])
                                .appendTo(newHTML);
                        }
                        el.html(newHTML);
                    }
                }
            }
        }

    }

    return ColoredDirective;
})