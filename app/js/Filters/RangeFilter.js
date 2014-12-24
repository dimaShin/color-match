/**
 * Created by iashind on 23.12.14.
 */
define([], function(){

    function RangeFilter(){

        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    }

    return RangeFilter;
})