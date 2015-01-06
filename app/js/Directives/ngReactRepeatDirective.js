/**
 * Created by iashind on 05.01.15.
 */

define([ 'jsx!JSX/Repeater'], function(Repeater){
    function RepeatDirective(ReactDirective){
        return ReactDirective(Repeater, undefined, {
            controller: function($scope, utils, rules){
                $scope.utils = utils;
                $scope.rules = rules;
            }
        })
    }

    return RepeatDirective


})