/**
 * Created by iashind on 24.12.14.
 */
define([], function() {

    function ColoredDirective(rules, storage) {

        return{
            restrict: 'A',
            scope: {

            },
            compile:  function coloredDirectiveCompile(){

                return{
                    pre: function prelinkColored($scope, el){
                        var colors = rules.getColors(),
                            maxColor = +storage.getRecordColor() || 1,
                            div = document.createElement('div'),
                            span = document.createElement('span'), spanClone,
                            text = el.html().trim(), color,
                            colorN = 0;
                        for(var i in text){
                            spanClone = $(span.cloneNode()).html(text[i]);
                            if(text[i] !== ' '){
                                color = colors[colorN++];
                                if(colorN > maxColor) colorN = 0;
                                spanClone.css('color', color);
                            }
                            spanClone.appendTo(div);
                        }
                        el.html(div);
                    }
                }
            }
        }

    }

    return ColoredDirective;
})