var app_notifiedFlowList = {
    init: function init() {
      //  app_notifiedFlowList.manageNotifieList();
        window.plugins.spinnerDialog.show("Notification List", "Loading", true);
        syncNotifications();
        app_notifiedFlowList.fillTable();
        app_notifiedFlowList.countEdittedFlowData();
        app_notifiedFlowList.countnotifiedFlowData();

        document.addEventListener('resume', onResumeNotifiedList.bind(this), false);
        window.plugins.spinnerDialog.hide();
    },
    fillTable: function fillTable() {
        var html = ""; //" <tr> <td> <div class='switch switch-info switch-inline'> <input id='sw1' type='checkbox' checked> <label for='sw1'></label> </div> </td>  <td> <span class='rating block mn pull-left'> 444444 </span> </td>  <td> Sony Inc </td>  </tr>";

        if (window.localStorage.hasOwnProperty('notifiedLoadFlowData')) {
            var notifiedData = window.localStorage.getItem('notifiedLoadFlowData');
            var notifiedFloData = JSON.parse(notifiedData);

           // var _sortedData = notifiedFloData.sort(comp);

            $.each(notifiedFloData, function (index, eData) {
                html = html + "<tr>";
                //html = html + "<td><div class='switch switch-info switch-inline'> <input id='sw_" + eData.sampleID + "' type='checkbox' class='cbx_dynamic'> <label class='rOption' for='sw_" + eData.sampleID + "'></label> </div></td>";
                html = html + "<td><span class='rating block mn pull-left'> " + eData.sampleID + " </span></td>";
                html = html + "<td><span class='rating block mn pull-left'> " + eData.haulier + " </span></td>";
                html = html + "<td><span class='rating block mn pull-left'> " + eData.dateTimeStamp + " </span></td>";
                html = html + "</tr>";
            });
        }
        else {
            html = "<tr><td colspan='3'> No Data Found!</td></tr>";
            $(".footer").hide();
        }

        $("#tbl_notifiedflow > tbody").append(html);
    },
    countEdittedFlowData: function countEdittedFlowData() {
        if (window.localStorage.hasOwnProperty('editedLoadEntryData')) {
            var editedData = window.localStorage.getItem('editedLoadEntryData');
            var editedFloData = JSON.parse(editedData);
            $("#lblEditedBadge").text(editedFloData.length);
        }
        else {
            $("#lblEditedBadge").text("0");
        }
    },
    countNotifiedFlowData: function countNotifiedFlowData() {
        if (window.localStorage.hasOwnProperty('notifiedLoadFlowData')) {
            var notifiedData = window.localStorage.getItem('notifiedLoadFlowData');
            var notifiedFloData = JSON.parse(notifiedData);
            $("#lblNotifiedBadge").text(notifiedFloData.length);
        }
        else {
            $("#lblNotifiedBadge").text("0");
        }
    },
    manageNotifieList: function manageNotifieList() {
        if (window.localStorage.hasOwnProperty('notifiedLoadFlowData')) {
            var filteredNotifiedList = [];
            var notifiedData = window.localStorage.getItem('notifiedLoadFlowData');
            var notifiedFloData = JSON.parse(notifiedData);
            $.each(notifiedFloData, function (index, eData) {
                var _syncDate = eData.dateTimeStamp.split(',')[0];
                var syncMonth = _syncDate.split('/')[1];
                var _syncMonthNum = parseInt(syncMonth);

                var currMonth = new Date();
                currMonth = currMonth.getMonth() + 1;

                if (currMonth == 1) {
                    if (_syncMonthNum == 12 || _syncMonthNum == 12) {
                        filteredNotifiedList.push(eData);
                    }
                }
                else {
                    if (_syncMonthNum == currMonth || _syncMonthNum == (currMonth - 1)) {
                        filteredNotifiedList.push(eData);
                    }
                }
            });

            window.localStorage.setItem('notifiedLoadFlowData', JSON.stringify(filteredNotifiedList));
        }
    } ,
   
}

function comp(a, b) {    
    var _dateObject1 = a.dateTimeStamp.split(',');
    var _dateString1 = _dateObject1[0].split('/');
    var _timeString1 = _dateObject1[1].split(':');
    var _d1 = new Date(_dateString1[2], _dateString1[1], _dateString1[0], _timeString1[0], _timeString1[1], _timeString1[2]);

    var _dateObject2 = b.dateTimeStamp.split(',');
    var _dateString2 = _dateObject2[0].split('/');
    var _timeString2 = _dateObject2[1].split(':');
    var _d2 = new Date(_dateString2[2], _dateString2[1], _dateString2[0], _timeString2[0], _timeString2[1], _timeString2[2]);

    
    return _d2.getTime() - _d1.getTime();
}

$(document).ready(function () {

    $('#btnRefreshNotification').on("click", function () {
        window.plugins.spinnerDialog.show("Notification List", "Loading", true);
        syncNotifications();
        window.plugins.spinnerDialog.hide();
    });

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
function onResumeNotifiedList() {
    // TODO: This application has been reactivated. Restore application state here.
    ValidateLogin_token();
};
document.addEventListener('deviceready', app_notifiedFlowList.init);