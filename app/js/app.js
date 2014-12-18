/**
 * Created by iashind on 15.12.14.
 */
define(['ngAnimate', 'swipe'], function(){
    var app = angular.module('colorMatch', ['ngAnimate', 'swipe', 'ngTouch']);
    app.filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    });
    return app;
})