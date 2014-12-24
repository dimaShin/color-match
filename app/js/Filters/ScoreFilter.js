/**
 * Created by iashind on 23.12.14.
 */
define([], function(){

    function ScoreFilter(){

        return function(input){
            var output = input, modulo;
            console.log('score filter: ', output.length);

            if(output.length > 4 && output.length < 7) {
                modulo = output % 1000;
                output = Math.floor(output / 1000);

                while(modulo.toString().length + output.toString().length > 3){
                    modulo = Math.floor(modulo / 10);
                    if(modulo < 1) {
                        modulo = 0;
                        break;
                    }
                    console.log(modulo);
                }
                if(modulo) modulo = '.' + modulo;
                console.log(modulo, output);
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
                    console.log(modulo);
                }
                if(modulo) modulo = '.' + modulo;
                console.log(modulo, output);
                output = output + modulo + 'M';
            }
            return output;
        }
    }

    return ScoreFilter;
})