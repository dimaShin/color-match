/**
 * Created by iashind on 22.12.14.
 */
define([], function(){

    function StorageService(){

        function localStorage(){
            return !!window.localStorage;
        }

        return {
            getRecordColor: function(){
                if(localStorage()){
                    return window.localStorage.getItem('recordColor');
                }
            },
            setRecordColor: function(colorN){
                if(localStorage()){
                    window.localStorage['recordColor'] = colorN;
                }
            },
            getRecordScore: function(){
                if(localStorage()){
                    return window.localStorage.getItem('recordScore');
                }

            },
            setRecordScore: function(score){
                if(localStorage()){
                    window.localStorage['recordScore'] = score;
                }
            }
        }
    }

    return StorageService;
})