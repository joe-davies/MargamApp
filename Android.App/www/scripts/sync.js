function syncDataFromCloudServer() {   
    var _token = window.localStorage.getItem('loadEntryUserDetails');
    var _encodedData = window.atob(_token);
    var emailId = _encodedData.split('~')[0];

    //alert("syncDataFromCloudServer");

    fnManageLocalStorageKeys();

    var url = 'https://apitest.eco2cift.co.uk/api/Settings/GetLoadRejectionDataByUserId?UserId=' + emailId;
    var serviceUrl = encodeURI(url);
    var isDataSynced = false;

    $.ajax({
        url: serviceUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + _token);
        },
        success: function (data) {
            storeData(data); 
            isDataSynced = true;
        },
        error: function (jqXHR, exception) {
            alert("syncDataFromCloudServer");
            alert("emailId");
            alert(jqXHR.statusText);
            alert(jqXHR.responseText);
            alert(_token);
            isDataSynced = false;
        },
        complete: function () {
            if (isDataSynced == true) {
                window.plugins.spinnerDialog.hide();
                window.location.href = "dashboard.html";
            }
            else {
                window.plugins.spinnerDialog.hide();
                alert("Something went wrong.");
                alert("Please restart the app and try again later!");
            }
            
        },
    });
}

function fnManageLocalStorageKeys() {
    if (window.localStorage.hasOwnProperty('loadRejectionReasonData')) {
        window.localStorage.removeItem('loadRejectionReasonData');
    }
    //if (window.localStorage.hasOwnProperty('baleLocationsData')) {
    //    window.localStorage.removeItem('baleLocationsData');
    //}
    //if (window.localStorage.hasOwnProperty('subHaulierData')) {
    //    window.localStorage.removeItem('subHaulierData');
    //}
    if (window.localStorage.hasOwnProperty('plantOperatorsData')) {
        window.localStorage.removeItem('plantOperatorsData');
    }
    if (window.localStorage.hasOwnProperty('cloudLoadEntryData')) {
        window.localStorage.removeItem('cloudLoadEntryData');
    }   
    if (window.localStorage.hasOwnProperty('notifiedLoadFlowData')) {
        window.localStorage.removeItem('notifiedLoadFlowData');
    }
    if (window.localStorage.hasOwnProperty('isMuliRejectionReason')) {
        window.localStorage.removeItem('isMuliRejectionReason');
    }
    
}



function storeData(data) {
        //storeSubHaulierData(data.subHauliers);
        storeloadRejectionReasonData(data.loadRejectionReasons);
       // storeBaleLocationsData(data.baleLocations);
        storePlantOperator(data.plantOperators);
        storeNotificationrData(data.loadRejNotifications);
        storeMuliRejReason(data.isUserSelectMultipleReasons);

        var cloudData = JSON.stringify(data.loadRejections);
        window.localStorage.setItem('cloudLoadEntryData', cloudData);
  
}

function storeMuliRejReason(data) {
   // debugger;
    if (data != null) {
        //var muliRejReason = JSON.stringify(data);
        window.localStorage.setItem('isMuliRejectionReason', data);
    }
}

function storeNotificationrData(data) {
    if (data.length > 0) {
        var notificationData = JSON.stringify(data);
        window.localStorage.setItem('notifiedLoadFlowData', notificationData);
    }
}

//function storeSubHaulierData(data) {
//    if (data.length > 0) {
//        var subHaulierData = JSON.stringify(data);
//        window.localStorage.setItem('subHaulierData', subHaulierData);
//    }
//}

function storePlantOperator(data) {
    if (data.length > 0) {
        var plantOperators = JSON.stringify(data);
        window.localStorage.setItem('plantOperatorsData', plantOperators);
    }
}

function storeloadRejectionReasonData(data) {
    if (data.length > 0) {
        var loadRejectionReasonData = JSON.stringify(data);
        window.localStorage.setItem('loadRejectionReasonData', loadRejectionReasonData);
    }
}

//function storeBaleLocationsData(data) {
//    if (data.length > 0) {
//        var baleLocationsData = JSON.stringify(data);
//        window.localStorage.setItem('baleLocationsData', baleLocationsData);
//    }
//}

function getCurrentDate() {
    var _date = new Date($.now());
    var _dval = _date.getDate() + "-" + (_date.getMonth() + 1) + "-" + _date.getFullYear();
    return _dval;
}

function syncNotifications() {
 
    var _token = window.localStorage.getItem('loadEntryUserDetails');
    var _encodedData = window.atob(_token);
    var userId = _encodedData.split('~')[0];
    
    var url = 'https://apitest.eco2cift.co.uk/api/Settings/GetLoadRejectArchive/' + userId;
    var serviceUrl = encodeURI(url);
    var isDataSynced = false;

    $.ajax({
        url: serviceUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + _token);
        },
        success: function (data) {
            storeNotificationrData(data);                         
        },
        error: function (jqXHR, exception) {
            alert("Notification Sync Unsuccessfull");
            isDataSynced = false;
        },
        complete: function () {            
     //       window.location.href = "notifiedflowlist.html";
        },
    });
}