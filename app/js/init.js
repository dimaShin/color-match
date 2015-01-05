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
        socketIO: 'https://cdn.socket.io/socket.io-1.2.1',
        react: '_lib/react-with-addons',
        ngReact: '_lib/ngReact',
        jsx: '_lib/jsx',
        JSXTransformer: "_lib/JSXTransformer",
        text: '_lib/text'
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
        jsx: {
            //deps: ['JSXTransformer', 'text'],
        }

    },
    waitSeconds: 0
});

require(['app'], function(){
    require(['injector'], function(){
        console.log('init');
        angular.bootstrap(document.body, ['colorMatch']);
        $('div.while-loading').animate({opacity: 0, 'z-index': 0}, 100);
    });

});
