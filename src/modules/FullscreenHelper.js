export default {
    isFullscreen: function() {
        if (document.fullscreenElement !== undefined) return document.fullscreenElement !== null;
        if (document.webkitFullscreenElement !== undefined) return document.webkitFullscreenElement !== null;
        if (document.mozFullscreenElement !== undefined) return document.mozFullscreenElement !== null;
    },
    doFullscreen: function() {
        if (this.isFullscreen()) {
            this.exitFullscreen();
            return;
        }

        if (document.body.parentElement.requestFullScreen) document.body.parentElement.requestFullScreen();
        else if (document.body.parentElement.webkitRequestFullScreen) document.body.parentElement.webkitRequestFullScreen();
        else if (document.body.parentElement.mozRequestFullScreen) document.body.parentElement.mozRequestFullScreen();
    },
    exitFullscreen: function() {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    }
};