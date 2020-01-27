// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var storage = window.localStorage;

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

  

    function onDeviceReady() {

        //// testing
       // storage.removeItem("userDetails"); 



        // Handle the Cordova pause and resume events
        window.plugins.spinnerDialog.show("Initializing", "Please wait !", true);

        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        var btnLoin = document.querySelector("btnLogin");
        btnLogin.addEventListener("click", fnLoginUser, false); 
        Validatetoken_Login();
        window.plugins.spinnerDialog.hide();

        //only once
//         storage.removeItem('recentSearchLoadData');
    };

  

    //function ValidateLogin() {
    //    //debugger;
    //    var uDetails = storage.getItem('userDetails');
    //    if (uDetails != null) {            
    //        var userDetails = uDetails.split(',');
    //        var _currentDate = getCurrentDate();
    //        if (_currentDate === userDetails[2]) {                
    //            window.location.href = "dashboard.html";
    //        }
    //        window.plugins.spinnerDialog.hide();
    //    }
    //}

    function fnLoginUser(e) {
        window.plugins.spinnerDialog.show("Validate User", "Loading...", true);

        var userId = $("#txtUserName").val();
        var password = $("#txtPassword").val();
       // var _userName = "";
        var _token = "";

        if (userId.length > 0 && password.length > 0) {
            var uri = 'https://apitest.eco2cift.co.uk/api/Users/ValidateAndGetName?EmailId=' + userId + '&Password=' + password;
            var serviceUrl = encodeURI(uri);

            $.ajax({
                type: 'GET',
                url: serviceUrl,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + "something");
                },
                success: function (data) {
                   // _userName = data;
                    _token = data;
                },
                error: function (xhr) { // if error occured
                    alert("Authorization Error: Login failed");
                    //alert(xhr.statusText);
                    //alert(xhr.responseText);
                },
                complete: function () {
                    if (_token.length > 0) {
                       // onLoginSuccess(userId, _userName);
                        onLoginSuccess2(_token);
                    }
                    else {
                        window.plugins.spinnerDialog.hide();
                    }
                    
                }
            });
          
        }
    }

    function onLoginSuccess2(token) {
        storage.setItem('loadEntryUserDetails', token);
        window.plugins.spinnerDialog.show("Syncing", "Load Rejection Data...", true);
        syncDataFromCloudServer();
    }
    function onLoginSuccess(userEmailId, userName) {
        var userDetails = [];
        userDetails.push(userEmailId);
        userDetails.push(userName.toString());
        userDetails.push(getCurrentDate());
        if (storage.hasOwnProperty('loadEntryUserDetails')) {
            storage.removeItem('loadEntryUserDetails');
        }
        storage.setItem('loadEntryUserDetails', userDetails);  

        window.plugins.spinnerDialog.show("Syncing", "Load Rejection Data...", true);
        syncDataFromCloudServer(userEmailId);
    }
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        ValidateLogin_token();
        // TODO: This application has been reactivated. Restore application state here.
    };

    function Validatetoken_Login() {
        var uDetails = window.localStorage.getItem('loadEntryUserDetails');
        if (uDetails != null) {
            var one_day = 1000 * 60 * 60 * 24;
            var _encodedData = window.atob(uDetails);
            var userDetails = _encodedData.split('~');
            var loginDateString = userDetails[2].split(' ')[0];
            var arr_loginDate = loginDateString.split('/');
            var _loginDate = new Date(arr_loginDate[2], arr_loginDate[1], arr_loginDate[0]);
            var currentDate = new Date();

            //var _dateDifference = (currentDate - _loginDate) / one_day;
            //if (_dateDifference > 1) {

            if (currentDate.getDate() == _loginDate.getDate()) {                
                window.location.href = "dashboard.html";
            }
        }
    }
} )();