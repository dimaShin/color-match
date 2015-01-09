/**
 * Created by iashind on 15.12.14.
 */
requirejs.config({
    paths: {
        bootstrap: '_lib/bootstrap.min',
        underscore: '_lib/underscore.min',
        jquery: '_lib/jquery.min',
        angular: '_lib/angular.min',
        ngAnimate: '_lib/angular-animate.min',
        ngTouch: '_lib/angular-touch.min',
        swipe: '_lib/angular-swipe.min',
        react: '_lib/react-with-addons.min',
        ngReact: '_lib/ngReact',
        jsx: '_lib/jsx',
        JSXTransformer: "_lib/JSXTransformer",
        text: '_lib/text',
        easelJs: 'https://code.createjs.com/easeljs-0.8.0.min',
        tweenJs: 'https://code.createjs.com/tweenjs-0.6.0.min'
    },
    jsx: {
        fileExtension: '.jsx'
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
        },
        ngReact: {
            deps: ['react', 'angular']
        },
        react: {
            deps: ['JSXTransformer', 'underscore']
        },
        easelJs: {
            deps: ['tweenJs'],
            exports: 'createjs'
        }
    },
    waitSeconds: 0
});

require(['app'], function(){
    require(['services', 'controllers', 'filters', 'directives'], function(){
        angular.bootstrap(document.body, ['colorMatch']);
        $('div.while-loading').animate({opacity: 0, 'z-index': 0}, 100);
    });
});
