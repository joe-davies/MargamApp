// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var storage = window.localStorage;

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), true);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        debugger;
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        var btnPic_1 = document.querySelector("#btnPic1");
        btnPic_1.addEventListener("click", fnGetCamera, false);
    };

    function fnGetCamera(e) {
        debugger;
        e.preventDefault();
        if (!navigator.camera) {
            alert("Camera API not supported", "Error");
            return;
        }
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
            encodingType: 0     // 0=JPG 1=PNG
        };

        navigator.camera.getPicture(
            function (imgData) {
                debugger;
                var abc = imgData;
            },
            function () {
                alert('Error taking picture', 'Error');
            },
            options);

        return false;
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();