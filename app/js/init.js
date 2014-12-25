/**
 * Created by iashind on 15.12.14.
 */
requirejs.config({
    paths: {
        bootstrap: '_lib/bootstrap',
        underscore: '_lib/underscore.min',
        jquery: '_lib/jquery',
        angular: '_lib/angular.min',
        ngAnimate: '_lib/angular-animate.min',
        ngTouch: '_lib/angular-touch.min',
        swipe: '_lib/angular-swipe.min',
        socketIO: 'https://cdn.socket.io/socket.io-1.2.1'
    },
    shim: {
        bootstrap: {
            deps: ['jquery', 'underscore']
        },
        'underscore': {
            exports: '_'
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        ngAnimate: {
            deps: ['angular']
        },
        swipe: {
            deps: ['angular', 'ngTouch']
        },
        ngTouch: {
            deps: ['angular']
        }
    },
    waitSeconds: 0
});

require(['injector'], function(){
    angular.bootstrap(document.body, ['colorMatch']);
    $('div.while-loading').animate({opacity: 0, 'z-index': 0}, 100);
});
