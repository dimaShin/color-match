/**
 * Created by iashind on 22.12.14.
 */
define([], function(){

    function StorageService(){

        function hasLocalStorage(){
            return !!window.localStorage;
        }

        return {
            getRecordColor: function(){
                if(hasLocalStorage()){
                    return window.localStorage.getItem('recordColor');
                }
            },
            setRecordColor: function(colorN){
                if(hasLocalStorage()){
                    window.localStorage['recordColor'] = colorN;
                }
            },
            getRecordScore: function(){
                if(hasLocalStorage()){
                    return window.localStorage.getItem('recordScore');
                }

            },
            setRecordScore: function(score){
                if(hasLocalStorage()){
                    window.localStorage['recordScore'] = score;
                }
            },
            getDefaultDifficulty: function(){
                if(hasLocalStorage()){
                    return window.localStorage['difficulty'];
                }
            },
            setDefaultDifficulty: function(diff){
                if(hasLocalStorage()){
                    window.localStorage['difficulty'] = diff;
                }
            }
        }
    }

    return StorageService;
})