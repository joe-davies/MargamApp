var recentSearchItem = {
    flowId: 0,
    haulier: "",
    deliverDate: "",
    datasource: ""
};

var customLoadEntry = {

    id: null,
    sampleID: null,
    appSheetUser: "",
    ltNumber: "",
    note: "",
    deliverDate: "",
    haulier: "",
    subHaulier: "",
    vrn: "",
    operator: "",
    rejReasons: "",
    rejComments: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",    
    dateTimeStamp: "",
    emailSent: "",
    image1Base64String: "",
    image2Base64String: "",
    image3Base64String: "",
    image4Base64String: "",
    image5Base64String: "",
    image6Base64String: "",
}

function ValidateLogin_token() {
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

        if (currentDate.getDate() != _loginDate.getDate()){
            alert("User session expired. Please login again!");
            window.plugins.spinnerDialog.hide();
            window.location.href = "index.html";
        }
        else {
            window.location.href = "dashboard.html";
        }
    }
}