/**
 * Created by iashind on 19.12.14.
 */
define([], function(){

    function SoundService(){
        return {
            play: function(){
                if(arguments.length)
                    new Sound().play(arguments[0], arguments);
            }
        }
    }






    function Sound () {
        this.q = [];
    }

    Sound.prototype.play = function (path, queue) {
        var audio;

        if (path && queue)
            this.q.push(new Audio('sounds/'+path));
        else if (path && queue === false) {
            audio = new Audio('sounds/' + path);
            audio.volume = 0.2;
            return audio.play();
        }

        this.q[0].volume = 0.2;
        this.q[0].addEventListener("ended", this.soundPlayedHandler());
        this.q[0].play();
    };

    Sound.prototype.soundPlayedHandler = function () {
        var self = this;

        return function () {
            self.q.shift();

            if (self.q.length)
                self.play();
        }
    };

    return SoundService;
})