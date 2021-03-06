﻿/// WORKAROUND {For "Resume" event firing twice}
var lastResume = null;
var MIN_RESUME_DIFF_MS = 4000;
// End {For "Resume" event firing twice}

var app_nonLoadEntryList = {
    init: function init() {
        document.getElementById("dvWarning").style.display = "none";

        app_nonLoadEntryList.countEdittedEntryData();
        app_nonLoadEntryList.countNotifiedFlowData();
        app_nonLoadEntryList.countNonLoadEntryData();

        document.addEventListener('resume', onResumeEdittedList.bind(this), false);
        document.addEventListener("offline", app_nonLoadEntryList.onOffline.bind(this), false);
        app_nonLoadEntryList.validateConnection();
    },
    onOffline: function onOffline() {
        var btNotify = document.querySelector("#btnInsert");
        var divWarning = document.getElementById("dvWarning");
        divWarning.style.display = "block";
        divWarning.classList.add("sticky");
        btNotify.style.display = "none";
        window.plugins.spinnerDialog.hide();
    },
    fillTable: function fillTable() {
        var html = ""; //" <tr> <td> <div class='switch switch-info switch-inline'> <input id='sw1' type='checkbox' checked> <label for='sw1'></label> </div> </td>  <td> <span class='rating block mn pull-left'> 444444 </span> </td>  <td> Sony Inc </td>  </tr>";

        if (window.localStorage.hasOwnProperty('nonLoadEntryData')) {
            var nonLoadData = window.localStorage.getItem('nonLoadEntryData');
            var nonLoadEntries = JSON.parse(nonLoadData);

            $.each(nonLoadEntries, function (index, eData) {
                var validate_flow = {};
                validate_flow.oLoadEntry = eData;
                validate_flow.isValidFlow = false;
                validate_flow.lblHtml = "";

                ValidateFlow(validate_flow);
                html = html + "<tr>";                
                if (validate_flow.isValidFlow == true) {
                    html = html + "<td><div class='option-group field'><label class='option option-primary'><input type='checkbox' id='sw_" + eData.id + "' name='sw_" + index + "' value='sw_" + index + "' class='cbx_dynamic' data-isSync = 'Yes'><span class='checkbox'></span></label></div></td>";
                }
                else {
                    html = html + "<td><div class='option-group field'><label class='option option-primary'><input type='checkbox' id='sw_" + eData.id + "' name='sw_" + index + "' value='sw_" + index + "' class='cbx_dynamic' data-isSync = 'No'><span class='checkbox'></span></label></div></td>";
                }

                html = html + "<td><span class='rating block mn pull-left'> " + eData.id + " </span></td>";
                //html = html + "<td><div class='switch switch-info switch-inline'> <input id='sw_" + eData.sampleID + "' type='checkbox' class='cbx_dynamic'> <label class='rOption' for='sw_" + eData.sampleID + "'></label> </div></td>";
                html = html + "<td><span class='rating block mn pull-left'> " + eData.operator + " </span></td>";
                //html = html + "<td><span class='rating block mn pull-left'> " + eData.rejReasons + " </span></td>";
                html = html + "<td>" + validate_flow.lblHtml + "</td>";
                html = html + "<td class = 'tdView' id = 'cView_" + eData.id + "'><i class='fa fa-edit'></i></td>";
                html = html + "</tr>";
            });
        }
        else {
            html = "<tr><td colspan='5'> No Data Found!</td></tr>";
            $(".footer").hide();
        }

        // for tresting
        // html = " <tr> <td><div class='option-group field'><label class='option option-primary'><input type='checkbox' id='sw_111' name='sw_111' value='sw_111'><span class='checkbox'></span></label></div></td>  <td> <span class='rating block mn pull-left'> 444444 </span> </td>  <td> Sony Inc </td> <td class = 'tdView'  ><i class='fa fa-eye'></i></td> </tr>";

        $("#tbl_nonloadflow > tbody").append(html);
    },
    countEdittedEntryData: function countEdittedEntryData() {
        if (window.localStorage.hasOwnProperty('editedLoadEntryData')) {
            var nonLoadData = window.localStorage.getItem('editedLoadEntryData');
            var nonLoadEntries = JSON.parse(nonLoadData);
            $("#lblEditedBadge").text(nonLoadEntries.length);
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
    countNonLoadEntryData: function countNonLoadEntryData() {
        if (window.localStorage.hasOwnProperty('nonLoadEntryData')) {
            var nonLoad = window.localStorage.getItem('nonLoadEntryData');
            var nonLoadData = JSON.parse(nonLoad);
            $("#lblNewBadge").text(nonLoadData.length);
        }
        else {
            $("#lblNewBadge").text("0");
        }
    },
    InsertNonLoad: function InsertNonLoad() {
        // debugger;

        try {
            window.plugins.spinnerDialog.show("Initializing", "Please wait", true);
            var _selectredFlowIds = [];
            var _checkboxes = document.getElementsByClassName('cbx_dynamic');
            for (var i = 0; i < _checkboxes.length; i++) {
                if (_checkboxes[i].type == 'checkbox' && _checkboxes[i].checked == true) {
                    var _id = _checkboxes[i].id.split("_")[1];

                    var isSync = _checkboxes[i].getAttribute("data-isSync");
                    if (isSync == "No") {
                        _selectredFlowIds = [];
                        throw "Error: Record '" + _id + "' is incomplete. Can't sync data!";
                    }
                    else {
                        _selectredFlowIds.push(_id);
                    }
                }
            }
            if (_selectredFlowIds.length > 0) {
                window.plugins.spinnerDialog.show("Initializing  Non-Load Insert", "Please wait", true);
                app_nonLoadEntryList.InitializeNonFlowInsert(_selectredFlowIds);
            }
            else {
                throw "Please select any record(s)!";

            }
        } catch (e) {
            alert(e);
            window.plugins.spinnerDialog.hide();
        }


    },
    DeleteNonLoad: function DeleteNonLoad() {
        // debugger;

        //window.plugins.spinnerDialog.show("Initializing", "Please wait", true);
        var _selectredFlowIds = [];
        var _checkboxes = document.getElementsByClassName('cbx_dynamic');
        for (var i = 0; i < _checkboxes.length; i++) {
            if (_checkboxes[i].type == 'checkbox' && _checkboxes[i].checked == true) {
                var _id = _checkboxes[i].id.split("_")[1];
                _selectredFlowIds.push(_id);
            }
        }
        if (_selectredFlowIds.length > 0) {
            if (confirm("Are you sure you want to delete selected data?")) {
                window.plugins.spinnerDialog.show("Initializing  Non-Load Insert", "Please wait", true);
                app_nonLoadEntryList.InitializeNonFlowDelete(_selectredFlowIds);
                window.location.href = "nonloadentrylist.html";
            }
        }
        else {
            alert("Please select any record(s)!");
            window.plugins.spinnerDialog.hide();
        }

    },
    InitializeNonFlowInsert: function InitializeNonFlowInsert(arr_NonLoadIds) {
        // debugger;
        // var _notifiedFlowData = [];
        //var _flowDetailsFromEdittedList = {};
        //var isDataPostedOnTheServer = true;

        try {
            var nonLoadData = window.localStorage.getItem('nonLoadEntryData');
            var nonLoadEntries = JSON.parse(nonLoadData);
            var _selectedFlow = [];
            $.each(arr_NonLoadIds, function (i, e_id) {
                $.each(nonLoadEntries, function (index, eData) {
                    if (eData.id == e_id) {
                        _selectedFlow.push(eData);
                    }
                });
            });


            app_nonLoadEntryList.updateFuelFlowToCloudServer(_selectedFlow, 0);
        }
        catch (err) {
            alert("Error Occored!");
            alert(err);
            window.plugins.spinnerDialog.hide();
        }

    },

    InitializeNonFlowDelete: function InitializeNonFlowDelete(arr_NonLoadIds) {
        // debugger; 

        try {
            var nonLoadData = window.localStorage.getItem('nonLoadEntryData');
            var nonLoadEntries = JSON.parse(nonLoadData);

            $.each(arr_NonLoadIds, function (i, e_id) {
                app_nonLoadEntryList.removeFlowFromNonLoadData(e_id);
            });

        }
        catch (err) {
            alert("Error Occored!");
            alert(err);
            window.plugins.spinnerDialog.hide();
        }

    },

    removeFlowFromNonLoadData: function removeFlowFromNonLoadData(e_id) {
        var nonLoadData = window.localStorage.getItem('nonLoadEntryData');
        var nonLoadEntries = JSON.parse(nonLoadData);

        var updatednonLoadEntries = [];
        //$.each(fArr, function (i, eFlowId) {
        $.each(nonLoadEntries, function (index, eData) {
            if (eData.id != e_id) {
                updatednonLoadEntries.push(eData);
            }
        });
        //});

        if (updatednonLoadEntries.length > 0) {
            window.localStorage.setItem('nonLoadEntryData', JSON.stringify(updatednonLoadEntries));
        }
        else {
            window.localStorage.removeItem('nonLoadEntryData');
        }


    },
    eEditNonLoad: function eEditNonLoad(id) {
        var e_isDataFound = false;
        var _flowData = {};

        if (window.localStorage.hasOwnProperty('nonLoadEntryData')) {
            var eData = window.localStorage.getItem('nonLoadEntryData');
            if (eData != null) {
                var eFlowData = JSON.parse(eData);
                $.each(eFlowData, function (index, oLoadEntry) {
                    //   debugger;
                    if (oLoadEntry.id == id) {
                        _flowData = oLoadEntry;
                        e_isDataFound = true;
                        return false;
                    }
                });
            }
        }
        else {
            e_isDataFound = false;
        }

        if (e_isDataFound == true) {
            window.sessionStorage.setItem('NonLoadEntryDetail', JSON.stringify(_flowData));
            window.plugins.spinnerDialog.hide();
            window.location.href = "nonload.html";
        }
        else {
            window.plugins.spinnerDialog.hide();
            alert("Something went wrong, Please try again later!");
        }

    },
    updateFuelFlowToCloudServer: function updateFuelFlowToCloudServer(arrSelectedItem, arrIndex) {

        window.plugins.spinnerDialog.show("Updating Data", "This will take a few moments - Please wait", true);

        var oLoadEntry = arrSelectedItem[arrIndex];
        var url = 'https://api.eco2cift.co.uk/api/Settings/AddNonLoadEntry';

        var serviceUrl = encodeURI(url);
        var nLoadEntry = customLoadEntry;
        nLoadEntry.sampleID = oLoadEntry.sampleID;
        nLoadEntry.appSheetUser = oLoadEntry.appSheetUser;
        nLoadEntry.ltNumber = oLoadEntry.ltNumber;
        nLoadEntry.note = oLoadEntry.note;
        nLoadEntry.deliverDate = oLoadEntry.deliverDate;
        nLoadEntry.haulier = oLoadEntry.haulier;
        nLoadEntry.source = oLoadEntry.source;
        nLoadEntry.vrn = oLoadEntry.vrn;
        nLoadEntry.operator = oLoadEntry.operator;
        nLoadEntry.rejReasons = oLoadEntry.rejReasons;
        nLoadEntry.rejComments = oLoadEntry.rejComments;

        nLoadEntry.image1 = oLoadEntry.image1;
        nLoadEntry.image2 = oLoadEntry.image2;
        nLoadEntry.image3 = oLoadEntry.image3;
        nLoadEntry.image4 = oLoadEntry.image4;
        nLoadEntry.image5 = oLoadEntry.image5;
        nLoadEntry.image6 = oLoadEntry.image6;

        nLoadEntry.dateTimeStamp = oLoadEntry.dateTimeStamp;

        var nl_base64Image1 = "";
        if (nLoadEntry.image1 != null && nLoadEntry.image1.length > 0) {
            app_nonLoadEntryList.getFileContentAsbase64(nLoadEntry.image1, function (nl_base64Image1) {
                nLoadEntry.image1base64String = nl_base64Image1.toString().split(',')[1];
            });
        }

        if (nLoadEntry.image2 != null && nLoadEntry.image2.length > 0) {
            app_nonLoadEntryList.getFileContentAsbase64(nLoadEntry.image2, function (nl_base64Image2) {
                nLoadEntry.image2base64String = nl_base64Image2.toString().split(',')[1];
            });
        }
        if (nLoadEntry.image3 != null && nLoadEntry.image3.length > 0) {
            app_nonLoadEntryList.getFileContentAsbase64(nLoadEntry.image3, function (nl_base64Image3) {
                nLoadEntry.image3base64String = nl_base64Image3.toString().split(',')[1];
            });
        }
        if (nLoadEntry.image4 != null && nLoadEntry.image4.length > 0) {

            app_nonLoadEntryList.getFileContentAsbase64(nLoadEntry.image4, function (nl_base64Image4) {
                nLoadEntry.image4base64String = nl_base64Image4.toString().split(',')[1];
            });
        }
        if (nLoadEntry.image5 != null && nLoadEntry.image5.length > 0) {

            app_nonLoadEntryList.getFileContentAsbase64(nLoadEntry.image5, function (nl_base64Image5) {
                nLoadEntry.image5base64String = nl_base64Image5.toString().split(',')[1];
            });
        }

        if (nLoadEntry.image6 != null && nLoadEntry.image6.length > 0) {

            app_nonLoadEntryList.getFileContentAsbase64(nLoadEntry.image6, function (nl_base64Image6) {
                nLoadEntry.image6base64String = nl_base64Image6.toString().split(',')[1];
            });
        }

        // window.plugins.spinnerDialog.show("Checking Network Connection", "Plase wait", true);
        //validate Network Connection During Process
        validateNetworkConnectionDuringProcess();


        var millisecondsToWait_UploadImage = 6000;
        setTimeout(function () {
            try {
                // Sending and receiving data in JSON format using POST method
                var _token = window.localStorage.getItem('loadEntryUserDetails');
                var url = serviceUrl;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", "Bearer " + _token);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {

                            // app_nonLoadEntryList.validateSync(nLoadEntry.sampleID);
                            var _lastSynced = new Date().toLocaleString('en-GB');
                            nLoadEntry.dateTimeStamp = _lastSynced;
                            app_nonLoadEntryList.removeFlowFromNonLoadData(oLoadEntry.id);
                            //oNotifiedList.push(nLoadEntry);
                            // window.localStorage.setItem('lastSyncedDate_LoadRejection', _lastSynced.toString());

                            // check ifis there any new record in the selected array then process it.
                            if (arrIndex < (arrSelectedItem.length - 1)) {
                                // Recursive functionality
                                var newIndex = arrIndex + 1;
                                app_nonLoadEntryList.updateFuelFlowToCloudServer(arrSelectedItem, newIndex)
                            }
                            else {
                                // It means all records are synced now
                                // app_nonLoadEntryList.manageNotifiedList(oNotifiedList);
                                window.plugins.spinnerDialog.hide();
                                alert("Synchronisation successful");
                                window.location.href = "dashboard.html";
                            }
                        }
                        else if (xhr.status === 502) {
                            alert("Unable to reach the server. Check your Network connection or try again later!");
                            window.plugins.spinnerDialog.hide();
                            window.location.href = "dashboard.html";
                        }
                        else {
                            var eMessage = xhr.responseText;
                            if (eMessage.length > 0) {
                                alert("Some error occoured!");
                                alert(xhr.status);
                                alert(eMessage);
                            }

                            alert("Synchronisation unsuccessful - Please try again");
                            window.plugins.spinnerDialog.hide();
                            window.location.href = "dashboard.html";
                        }
                    }
                };
                var data = JSON.stringify(nLoadEntry);
                xhr.send(data);
            } catch (e) {
                alert("Synchronisation unsuccessful");
                alert("Error: " + e);
                window.plugins.spinnerDialog.hide();
                window.location.href = "nonloadentrylist.html";
            }

        }, millisecondsToWait_UploadImage);
    },
    validateSync: function validateSync(flowId) {

        try {
            var url = "https://api.eco2cift.co.uk/api/Settings/ValidateFuelRejectionSync/" + flowId;
            var serviceUrl = encodeURI(url);
            var _token = window.localStorage.getItem('loadEntryUserDetails');
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", serviceUrl, true);
            xhttp.setRequestHeader("Authorization", "Bearer " + _token);
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    var _result = xhttp.responseText;
                    if (_result === "false") {
                        alert("Synchronisation unsuccessful - Please try again");
                        window.plugins.spinnerDialog.hide();
                        window.location.href = "nonloadentrylist.html";
                    }
                }
            };
            xhttp.send();
        } catch (e) {
            alert("Synchronisation unsuccessful - Please try again");
            window.plugins.spinnerDialog.hide();
            window.location.href = "nonloadentrylist.html";
        }

    },
    getFileContentAsbase64: function getFileContentAsbase64(path, callback) {
        window.resolveLocalFileSystemURL(path, gotFile, fail);

        function fail(e) {
            alert('Cannot found requested file');
        }

        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var content = this.result;
                    callback(content);
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    },
    validateConnection: function validateConnection() {
        if (navigator.connection != null) {
            var networkState = navigator.connection.type;

            if (networkState == Connection.NONE) {
                app_nonLoadEntryList.onOffline();
            }
        }
    }
}

$(document).on("pagebeforeshow", function () {
    app_nonLoadEntryList.fillTable();
});
$(document).ready(function () {
    $("#dashboardAnchor").on("click", function (e) {
        window.location.href = "dashboard.html";
    });

    $("#newAnchor").on("click", function (e) {
        window.location.href = "nonloadentrylist.html";
    });

    $("#editedAnchor").on("click", function (e) {
        window.location.href = "edittedflowlist.html";
    });

    $("#notifiedAnchor").on("click", function (e) {
        window.location.href = "notifiedflowlist.html";
    });

    $('#btnInsert').on("click", function () {
        app_nonLoadEntryList.InsertNonLoad();
    });

    $('#btnDelete').on("click", function () {
        app_nonLoadEntryList.DeleteNonLoad();
    });

    $("#tbl_nonloadflow").on("click", ".tdView", function () {
        window.plugins.spinnerDialog.show("Non-Load Data", "Getting Info...", true);
        var _id = this.id.split("_")[1];
        app_nonLoadEntryList.eEditNonLoad(_id);
    });
});

function ValidateFlow(ovFlow) {
    ovFlow.isValidFlow = true;
    ovFlow.lblHtml = "<span class='label label-success mr5 mb10 ib lh15'>Complete</span>";

    //if (ovFlow.isValidFlow === true) {
    //    if (ovFlow.oLoadEntry.vrn.length <= 0) {
    //        ovFlow.isValidFlow = false;
    //        ovFlow.lblHtml = "<span class='label label-danger mr5 mb10 ib lh15'>*Reg No</span>";
    //    }
    //}
    if (ovFlow.isValidFlow === true) {
        if (ovFlow.oLoadEntry.operator == null) {
            ovFlow.isValidFlow = false;
            ovFlow.lblHtml = "<span class='label label-danger mr5 mb10 ib lh15'>*Operator Name</span>";
        }
    }
    if (ovFlow.isValidFlow === true) {
        if (ovFlow.oLoadEntry.rejReasons == null || ovFlow.oLoadEntry.rejReasons.length <= 0) {
            ovFlow.isValidFlow = false;
            ovFlow.lblHtml = "<span class='label label-danger mr5 mb10 ib lh15'>*Rejection Reason</span>";
        }
    }
    //if (ovFlow.isValidFlow === true) {
    //    if (ovFlow.oLoadEntry.fuelGroup == "Bale" && ovFlow.oLoadEntry.rejBaleLocations.length <= 0) {
    //        ovFlow.isValidFlow = false;
    //        ovFlow.lblHtml = "<span class='label label-danger mr5 mb10 ib lh15'>*Bale Location</span>";
    //    }
    //}
    //if (ovFlow.isValidFlow === true) {
    //    if (ovFlow.oLoadEntry.rejected == null) {
    //        ovFlow.isValidFlow = false;
    //        ovFlow.lblHtml = "<span class='label label-danger mr5 mb10 ib lh15'>*Rejected</span>";
    //    }
    //    else if (ovFlow.oLoadEntry.rejected <= 0 || ovFlow.oLoadEntry.rejected > 60) {
    //        ovFlow.isValidFlow = false;
    //        ovFlow.lblHtml = "<span class='label label-danger mr5 mb10 ib lh15'>Invalid *Rejected</span>";
    //    }
    //}
    //if (ovFlow.isValidFlow === true) {
    //    if (ovFlow.oLoadEntry.accepted == null) {
    //        ovFlow.isValidFlow = false;
    //        ovFlow.lblHtml = "<span class='label label-danger mr5 mb10 ib lh15'>*Accepted</span>";
    //    }
    //    else if (ovFlow.oLoadEntry.accepted < 0 || ovFlow.oLoadEntry.rejected > 60) {
    //        ovFlow.isValidFlow = false;
    //        ovFlow.lblHtml = "<span class='label label-danger mr5 mb10 ib lh15'>Invalid *Accepted</span>";
    //    }
    //}
    //if (ovFlow.isValidFlow === true) {
    //    if (ovFlow.oLoadEntry.rejReasons.indexOf(',') > -1) {
    //        var rejReasons = ovFlow.oLoadEntry.rejReasons.split(",");
    //        $.each(rejReasons, function (ind, _eRejectReason) {
    //            var _rejReason = _eRejectReason.replace(/\s/g, '');
    //            if (_rejReason.indexOf('-') > -1) {
    //                var fEle = _rejReason.split('-')[0];
    //                if (fEle == "Moisture") {
    //                    if (ovFlow.oLoadEntry.moisture.length <= 0) {
    //                        ovFlow.isValidFlow = false;
    //                        ovFlow.lblHtml = "<span class='label label-danger mr5 mb10 ib lh15'>*Moisture Required</span>";
    //                    }
    //                    return false;
    //                }
    //            }
    //        });
    //    }
    //    else {
    //        var _rejReason = ovFlow.oLoadEntry.rejReasons.replace(/\s/g, '');
    //        if (_rejReason.indexOf('-') > -1) {
    //            var fEle = _rejReason.split('-')[0];
    //            if (fEle == "Moisture") {
    //                if (ovFlow.oLoadEntry.moisture.length <= 0) {
    //                    ovFlow.isValidFlow = false;
    //                    ovFlow.lblHtml = "<span class='label label-danger mr5 mb10 ib lh15'>*Moisture Required</span>";
    //                }
    //            }
    //        }
    //    }
    //}
};

function onResumeEdittedList() {
    // TODO: This application has been reactivated. Restore application state here.
    if (lastResume != null) {
        var _currDate = new Date();
        if ((_currDate.getTime() - lastResume.getTime()) > MIN_RESUME_DIFF_MS) {
            lastTime = new Date();
            ValidateLogin_token();
            app_nonLoadEntryList.validateConnection();
        }
    }
    else {
        lastTime = new Date();
        ValidateLogin_token();
        app_nonLoadEntryList.validateConnection();
    }
};

function validateNetworkConnectionDuringProcess() {

    if (navigator.connection != null) {
        var networkState = navigator.connection.type;

        if (networkState == Connection.NONE) {
            alert("Network Connection Lost!");
            window.plugins.spinnerDialog.hide();
            window.location.href = "nonloadentrylist.html";
        }
    }
}

document.addEventListener('deviceready', app_nonLoadEntryList.init.bind(this), false);