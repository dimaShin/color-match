/**
 * Created by iashind on 23.12.14.
 */
define([], function(){

    function ScoreFilter(){

        return function(input){
            var output = input, modulo;

            if(output.length > 4 && output.length < 7) {
                modulo = output % 1000;
                output = Math.floor(output / 1000);

                while(modulo.toString().length + output.toString().length > 3){
                    modulo = Math.floor(modulo / 10);
                    if(modulo < 1) {
                        modulo = 0;
                        break;
                    }
                }
                if(modulo) modulo = '.' + modulo;
                output = output + modulo + 'K';
            }
            if(output.length >= 7){
                modulo = output % 1000000;
                output = Math.floor(output / 1000000);

                while(modulo.toString().length + output.toString().length > 3){
                    modulo = Math.floor(modulo / 10);
                    if(modulo < 1) {
                        modulo = 0;
                        break;
                    }
                }
                if(modulo) modulo = '.' + modulo;
                output = output + modulo + 'M';
            }
            return output;
        }
    }

    return ScoreFilter;
})