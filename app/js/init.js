/**
 * Created by iashind on 15.12.14.
 */
requirejs.config({
    paths: {
        bootstrap: '_lib/bootstrap',
        underscore: '_lib/underscore.min',
        jquery: '_lib/jquery',
        angular: '_lib/angular.min',
        ngAnimate: '_lib/angular-animate',
        ngTouch: '_lib/angular-touch',
        swipe: '_lib/angular-swipe.min'
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
