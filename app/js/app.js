/**
 * Created by iashind on 15.12.14.
 */
define(['ngAnimate', 'swipe', 'ngReact'], function(){
    console.log('react: ', angular.module('react'));
    var app = angular.module('colorMatch', ['ngAnimate', 'swipe', 'ngTouch', 'react']);
    app.filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    });
    console.log('app', app);
    return app;
})