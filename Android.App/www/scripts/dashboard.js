// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.



document.addEventListener('deviceready', onDeviceReady.bind(this), false);

function onDeviceReady() {
//   window.localStorage.removeItem("notifiedFlowData")




    // Handle the Cordova pause and resume events
    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);

    try {
        var btSearch = document.getElementById("btnSearch");
        btSearch.addEventListener("click", onSearchClick, false);

        /// As per task# 8 
        /// Add a 'Refresh Flows' button to the Dashboard #8
        var btRefresh = document.getElementById("btnRefresh");
        btRefresh.addEventListener("click", onRefreshClick, false);
        /// End of task# 8


        /// As per task# 7 
        /// Remove 'Top 5 Recent Searches' from the dashboard screen #7
        document.getElementById("searchrow").style.display = "none";
        /// Another scenario
        /// If you want to enable search feature, then comment the "searchrow" line and uncomment next line "fnInitializePage"
        ///  fnInitializePage();
        /// End of task# 7

        fnSetUserDetails();
        fnBadgeCount();

    } catch (e) {
        alert(e);
    }


    //alert("dashboard JS ENDED ");
};
function fnSetUserDetails() {
    // User Login id

    var uDetails = window.localStorage.getItem('loadEntryUserDetails');
    var _encodedData = window.atob(uDetails);
    var userDetails = _encodedData.split('~');
    document.getElementById("lblFullName").textContent = userDetails[1].toString();
    document.getElementById("lblUser").textContent = userDetails[0].toString();

    // Last Sync Detail
    if (window.localStorage.hasOwnProperty("lastSyncedDate")) {
        var _lastsync = window.localStorage.getItem("lastSyncedDate");
        document.getElementById("lblLastSync").textContent = _lastsync.toString();
    }
    else {
        document.getElementById("lblLastSync").textContent="Never";
    }
}

function onRefreshClick() {
    window.plugins.spinnerDialog.show("Refresh", "Load Rejection Data...", true);

    if (window.localStorage.hasOwnProperty('loadEntryUserDetails')) {
        var uDetails = window.localStorage.getItem('loadEntryUserDetails');
        if (uDetails != null) {
            var _encodedData = window.atob(uDetails);
            var userDetails = _encodedData.split('~');
            var userEmailId = userDetails[0];
            syncDataFromCloudServer(userEmailId);
        }
        else {
            window.plugins.spinnerDialog.hide();
            alert("User Session Expired, Please log-in again!");
            window.location.href = "index.html";
        }
    }
}

function onSearchClick() {
    /// Task #9
    ///Review 'Search' field input validation #9
    var _searchItem = $("#txtSearch").val();
    if (_searchItem.length <= 0) {
        alert("Search Item can not be null.");
    }
    else if (_searchItem.length != 6) {
        alert("Sample Id length must be 6.");
    }
    else {
        fnSearchLoadRejectionSampleId(_searchItem);
    }
    /// Task #9 end
    
}

function fnSearchLoadRejectionSampleId(searchItem) {
    //debugger;
    window.plugins.spinnerDialog.show("Search Sample Id", "Loading...");
    var _dataFound = false;

    if (searchItem.length > 0) {
        _dataFound = checkAndGetInfoFromEdittedFlowData(searchItem);

        if (_dataFound == false) {
            _dataFound = checkAndGetInfoFromCloudData(searchItem);
        }
        window.plugins.spinnerDialog.hide();
    }

    if (_dataFound == true) {
        window.plugins.spinnerDialog.hide();
        window.location.href = "flowdetails.html";
    }
    else {
        alert("SampleId not found!");
    }
};

function checkAndGetInfoFromCloudData(searchItem) {
    var cData = window.localStorage.getItem('cloudLoadEntryData');
    var isDataFound = false;

    if (cData.length > 0) {
        var _flowData = {};
        var cloudData = JSON.parse(cData);
        $.each(cloudData, function (index, oFlow) {
            //   debugger;
            if (oFlow.sampleID == searchItem) {
                _flowData = oFlow;
                isDataFound = true;
                return false;
            }
        });

        if (isDataFound == true) {
            var _recentSearches = [];
            var _recentSearch = recentSearchItem;
            _recentSearch.sampleID = _flowData.sampleID;
            _recentSearch.haulier = _flowData.haulier;
            _recentSearch.deliverDate = _flowData.deliverDate;

            _recentSearches.push(_recentSearch);

            if (window.localStorage.hasOwnProperty('recentSearchLoadData')) {
                var searchData = window.localStorage.getItem('recentSearchLoadData');
                var recentSearchData = JSON.parse(searchData);

                var _index = 1;
                $.each(recentSearchData, function (index, sData) {
                    if (_index < 5) {
                        if (sData.flowId != _recentSearch.flowId) {
                            _recentSearches.push(sData);
                        }
                    }
                    else {
                        return false;
                    }
                });

            }

            _flowData.image1 = null;
            _flowData.image2 = null;
            _flowData.image3 = null;
            _flowData.image4 = null;
            _flowData.image5 = null;

            window.localStorage.setItem('recentSearchLoadData', JSON.stringify(_recentSearches));
            window.sessionStorage.setItem('LoadEntryDetail', JSON.stringify(_flowData));
        }
    }

    return isDataFound;
}

function checkAndGetInfoFromEdittedFlowData(searchItem) {
    var e_isDataFound = false;

    if (window.localStorage.hasOwnProperty('editedLoadEntryData')) {
        var eData = window.localStorage.getItem('editedLoadEntryData');
        if (eData != null) {
            var _flowData = {};
            var eFlowData = JSON.parse(eData);
            $.each(eFlowData, function (index, oFlow) {
                if (oFlow.sampleID == searchItem) {
                    _flowData = oFlow;
                    e_isDataFound = true;
                    return false;
                }
            });

            if (e_isDataFound == true) {
                var _recentSearches = [];
                var _recentSearch = recentSearchItem;

                _recentSearch.flowId = _flowData.sampleID;
                _recentSearch.haulier = _flowData.haulier;
                _recentSearch.deliverDate = _flowData.deliverDate;

                _recentSearches.push(_recentSearch);

                if (window.localStorage.hasOwnProperty('recentSearchLoadData')) {
                    var searchData = window.localStorage.getItem('recentSearchLoadData');
                    var recentSearchData = JSON.parse(searchData);

                    var _index = 1;
                    $.each(recentSearchData, function (index, sData) {
                        if (_index < 5) {
                            if (sData.flowId != _recentSearch.flowId) {
                                _recentSearches.push(sData);
                            }
                        }
                        else {
                            return false;
                        }
                    });

                }
                window.localStorage.setItem('recentSearchLoadData', JSON.stringify(_recentSearches));
                window.sessionStorage.setItem('LoadEntryDetail', JSON.stringify(_flowData));
            }
        }
    }
    else {
        e_isDataFound = false;
    }


    return e_isDataFound;
}

function fnInitializePage() {
    if (window.localStorage.hasOwnProperty('recentSearchLoadData')) {
        $("#searchItem_nothing").hide();

        var searchData = window.localStorage.getItem('recentSearchLoadData');
        var recentSearchData = JSON.parse(searchData);

        $.each(recentSearchData, function (index, sData) {
            var _eleName = "searchItem" + (index + 1);
            var _deliveryDate = new Date(sData.deliverDate);
            var _dDate = _deliveryDate.getDate() + "/" + (_deliveryDate.getMonth() + 1) + "/" + _deliveryDate.getFullYear();
            var _eleText = sData.flowId + ", " + sData.haulier + ", " + _dDate;

            document.getElementById(_eleName).text = _eleText;
            document.getElementById(_eleName).style.display = "block";
        });
    }

 
    $("#searchItem1").on('click', function () {
        window.plugins.spinnerDialog.show("searching", "loading");
        var _sItemData = this.text.split(',')[0];
        onRecentSearchClick(_sItemData);
    });
    $("#searchItem2").on('click', function () {
        window.plugins.spinnerDialog.show("searching", "loading");
        var _sItemData = this.text.split(',')[0];
        onRecentSearchClick(_sItemData);
    });
    $("#searchItem3").on('click', function () {
        window.plugins.spinnerDialog.show("searching", "loading");
        var _sItemData = this.text.split(',')[0];
        onRecentSearchClick(_sItemData);
    });
    $("#searchItem4").on('click', function () {
        window.plugins.spinnerDialog.show("searching", "loading");
        var _sItemData = this.text.split(',')[0];
        onRecentSearchClick(_sItemData);
    });
    $("#searchItem5").on('click', function () {
        window.plugins.spinnerDialog.show("searching", "loading");
        var _sItemData = this.text.split(',')[0];
        onRecentSearchClick(_sItemData);
    });
};

function fnBadgeCount() {
    if (window.localStorage.hasOwnProperty('editedLoadEntryData')) {
        var editedData = window.localStorage.getItem('editedLoadEntryData');
        var editedFloData = JSON.parse(editedData);
        $("#lblEditedBadge").text(editedFloData.length);
    }
    else {
        $("#lblEditedBadge").text("0");
    }

    if (window.localStorage.hasOwnProperty('notifiedLoadFlowData')) {
        var notifiedData = window.localStorage.getItem('notifiedLoadFlowData');
        var notifiedFloData = JSON.parse(notifiedData);
        $("#lblNotifiedBadge").text(notifiedFloData.length);
    }
    else {
        $("#lblNotifiedBadge").text("0");
    }

}

function onRecentSearchClick(flowId) {
    fnSearchLoadRejectionSampleId(flowId);
}

function onPause() {
    // TODO: This application has been suspended. Save application state here.
};

function onResume() {
    // TODO: This application has been reactivated. Restore application state here.
    ValidateLogin_token();
};

$(document).ready(function () {
    $("#dashboardAnchor").on("click", function (e) {
        window.location.href = "dashboard.html";
    });

    $("#editedAnchor").on("click", function (e) {
        window.location.href = "edittedflowlist.html";
    });

    $("#notifiedAnchor").on("click", function (e) {
        window.location.href = "notifiedflowlist.html";
    });
});