/// WORKAROUND {For "Resume" event firing twice}
var lastResume = null;
var MIN_RESUME_DIFF_MS = 4000;
// End {For "Resume" event firing twice}

var app_edittedFlowList = {
    init: function init() {
        document.getElementById("dvWarning").style.display = "none";

        app_edittedFlowList.countEdittedFlowData();
        app_edittedFlowList.countNotifiedFlowData();
        app_edittedFlowList.countNonLoadEntryData();

        document.addEventListener('resume', onResumeEdittedList.bind(this), false);
        document.addEventListener("offline", app_edittedFlowList.onOffline.bind(this), false);
        app_edittedFlowList.validateConnection();
    },
    onOffline: function onOffline() {
        var btNotify = document.querySelector("#btnNotify");
        var divWarning = document.getElementById("dvWarning");
        divWarning.style.display = "block";
        divWarning.classList.add("sticky");
        btNotify.style.display = "none";
        window.plugins.spinnerDialog.hide();
    },
    fillTable: function fillTable() {
        var html = ""; //" <tr> <td> <div class='switch switch-info switch-inline'> <input id='sw1' type='checkbox' checked> <label for='sw1'></label> </div> </td>  <td> <span class='rating block mn pull-left'> 444444 </span> </td>  <td> Sony Inc </td>  </tr>";

        if (window.localStorage.hasOwnProperty('editedLoadEntryData')) {
            var editedData = window.localStorage.getItem('editedLoadEntryData');
            var editedFloData = JSON.parse(editedData);

            $.each(editedFloData, function (index, eData) {
                var validate_flow = {};
                validate_flow.oLoadEntry = eData;
                validate_flow.isValidFlow = false;
                validate_flow.lblHtml = "";

                ValidateFlow(validate_flow);
                html = html + "<tr>";
                if (validate_flow.isValidFlow == true) {
                    html = html + "<td><div class='option-group field'><label class='option option-primary'><input type='checkbox' id='sw_" + eData.sampleID + "' name='sw_" + eData.sampleID + "' value='sw_" + eData.sampleID + "' class='cbx_dynamic'><span class='checkbox'></span></label></div></td>";
                }
                else {
                    html = html + "<td><div class='option-group field'><label class='option option-primary'><input type='checkbox' id='sw_" + eData.sampleID + "' name='sw_" + eData.sampleID + "' value='sw_" + eData.sampleID + "' class='cbx_dynamic' disabled><span class='checkbox'></span></label></div></td>";
                }

                //html = html + "<td><div class='switch switch-info switch-inline'> <input id='sw_" + eData.sampleID + "' type='checkbox' class='cbx_dynamic'> <label class='rOption' for='sw_" + eData.sampleID + "'></label> </div></td>";
                html = html + "<td><span class='rating block mn pull-left'> " + eData.sampleID + " </span></td>";
                html = html + "<td><span class='rating block mn pull-left'> " + eData.haulier + " </span></td>";
                html = html + "<td>" + validate_flow.lblHtml + "</td>";
                html = html + "<td class = 'tdView' id = 'cView_" + eData.sampleID + "'><i class='fa fa-eye'></i></td>";
                html = html + "</tr>";
            });
        }
        else {
            html = "<tr><td colspan='3'> No Data Found!</td></tr>";
            $(".footer").hide();
        }

        // for tresting
        // html = " <tr> <td><div class='option-group field'><label class='option option-primary'><input type='checkbox' id='sw_111' name='sw_111' value='sw_111'><span class='checkbox'></span></label></div></td>  <td> <span class='rating block mn pull-left'> 444444 </span> </td>  <td> Sony Inc </td> <td class = 'tdView'  ><i class='fa fa-eye'></i></td> </tr>";

        $("#tbl_edittedflow > tbody").append(html);
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
    countNonLoadEntryData: function countNonLoadEntryData() {
        if (window.localStorage.hasOwnProperty('nonLoadEntryData')) {
            let nonLoad = window.localStorage.getItem('nonLoadEntryData');
            let nonLoadData = JSON.parse(nonLoad);
            $("#lblNewBadge").text(nonLoadData.length);
        }
        else {
            $("#lblNewBadge").text("0");
        }
    },
    getFlowtoNotify: function getFlowtoNotify() {
        // debugger;

        window.plugins.spinnerDialog.show("Initializing", "Please wait", true);
        var _selectredFlowIds = [];
        var _checkboxes = document.getElementsByClassName('cbx_dynamic');
        for (var i = 0; i < _checkboxes.length; i++) {
            if (_checkboxes[i].type == 'checkbox' && _checkboxes[i].checked == true) {
                var _id = _checkboxes[i].id.split("_")[1];
                _selectredFlowIds.push(_id);
            }
        }
        if (_selectredFlowIds.length > 0) {
            window.plugins.spinnerDialog.show("Updating Data", "This will take a few moments - Please wait", true);
            app_edittedFlowList.InitializeFlowUpdate(_selectredFlowIds);
        }
        else {
            alert("Please select any record(s)!");
            window.plugins.spinnerDialog.hide();
        }

    },
    InitializeFlowUpdate: function InitializeFlowUpdate(arr_flowIds) {
        // debugger;
       // var _notifiedFlowData = [];
        //var _flowDetailsFromEdittedList = {};
        //var isDataPostedOnTheServer = true;

        var editedData = window.localStorage.getItem('editedLoadEntryData');
        var editedFloData = JSON.parse(editedData);
        var _selectedFlow = [];
        $.each(arr_flowIds, function (i, eFlowId) {
            $.each(editedFloData, function (index, eData) {
                if (eData.sampleID == eFlowId) {
                    _selectedFlow.push(eData);
                }
            });
        });


        app_edittedFlowList.updateFuelFlowToCloudServer(_selectedFlow, 0);
//        app_edittedFlowList.updateFuelFlowToCloudServer(_selectedFlow, 0, _notifiedFlowData);

        //if (window.localStorage.hasOwnProperty('notifiedFlowData')) {
        //    var notifiedData = window.localStorage.getItem('notifiedFlowData');
        //    var notifiedFloData = JSON.parse(notifiedData);

        //    // get edited flow data collection and find flow
        //    var editedData = window.localStorage.getItem('editedLoadEntryData');
        //    var editedFloData = JSON.parse(editedData);

        //    // get all selected flows and put them in the array


        //    // loop through notifiedFlowData and check weather existing records is in new array or not, if not exist then add them to array else do nothing and go to next record
        //    //if (isDataPostedOnTheServer == true) {
        //    //    $.each(notifiedFloData, function (_i, _existingNotifiedRecord) {
        //    //        var _isexistInNewCollection = false;
        //    //        $.each(_notifiedFlowData, function (i, nLoadEntry) {
        //    //            if (nLoadEntry.sampleID == _existingNotifiedRecord.sampleID) {
        //    //                _isexistInNewCollection = true;
        //    //                return false;
        //    //            }
        //    //        });

        //    //        if (_isexistInNewCollection == false) {
        //    //            _notifiedFlowData.push(_existingNotifiedRecord);
        //    //        }
        //    //    });
        //    //}
        //}
        //else {
        //    var editedData = window.localStorage.getItem('editedLoadEntryData');
        //    var editedFloData = JSON.parse(editedData);
        //    var _selectedFlow = [];
        //    $.each(arr_flowIds, function (i, eFlowId) {
        //        $.each(editedFloData, function (index, eData) {
        //            if (eData.sampleID == eFlowId) {
        //                _selectedFlow.push(eData);
        //            }
        //        });
        //  });


        //    app_edittedFlowList.updateFuelFlowToCloudServer(_selectedFlow, 0, _notifiedFlowData);

        //$.each(arr_flowIds, function (i, eFlowId) {
        //    if (isDataPostedOnTheServer == true) {
        //        $.each(editedFloData, function (index, eData) {
        //            if (eData.sampleID == eFlowId) {

        //            }
        //        });
        //    }
        //});
        // }


        //var millisecondsToWait_UpdateRecord = 45000;
        //setTimeout(function () {
        //    if (isDataPostedOnTheServer == true) {
        //        window.localStorage.setItem('notifiedFlowData', JSON.stringify(_notifiedFlowData));
        //        window.plugins.spinnerDialog.hide();
        //        alert("Synchronisation successful");
        //        window.location.href = "notifiedflowlist.html";
        //    }
        //    else {
        //        window.plugins.spinnerDialog.hide();
        //        alert("Synchronisation unsuccessful - Please try again");
        //        // alert("Please try again later!");
        //        window.location.href = "dashboard.html";
        //    }
        //}, millisecondsToWait_UpdateRecord);


    },
    manageNotifiedList: function manageNotifiedList(updatedNotifyList) {
        if (window.localStorage.hasOwnProperty('notifiedLoadFlowData')) {
            var arrNotifyList = [];
            var notifiedData = window.localStorage.getItem('notifiedLoadFlowData');
            var notifiedFloData = JSON.parse(notifiedData);

            ////  loop through notifiedFlowData and check weather existing records is in new array or not, if not exist then add them to array else do nothing and go to next record
            $.each(notifiedFloData, function (_i, _existingNotifiedRecord) {
                var _isexistInNewCollection = false;
                $.each(updatedNotifyList, function (i, _newNotifiedRecord) {
                    if (_newNotifiedRecord.sampleID == _existingNotifiedRecord.sampleID) {
                        arrNotifyList.push(_newNotifiedRecord);
                    }
                    else {
                        arrNotifyList.push(_existingNotifiedRecord);
                    }
                });
            });
            window.localStorage.setItem('notifiedLoadFlowData', JSON.stringify(arrNotifyList));
        }
        else {
            window.localStorage.setItem('notifiedLoadFlowData', JSON.stringify(updatedNotifyList));
        }
    },
    removeFlowFromEdittedList: function removeFlowFromEdittedList(e_flowId) {
        var editedData = window.localStorage.getItem('editedLoadEntryData');
        var editedFloData = JSON.parse(editedData);

        var updatedEditedFloData = [];
        //$.each(fArr, function (i, eFlowId) {
        $.each(editedFloData, function (index, eData) {
            if (eData.sampleID != e_flowId) {
                updatedEditedFloData.push(eData);
            }
        });
        //});

        if (updatedEditedFloData.length > 0) {
            window.localStorage.setItem('editedLoadEntryData', JSON.stringify(updatedEditedFloData));
        }
        else {
            window.localStorage.removeItem('editedLoadEntryData');
        }


    },
    viewFlowInfo: function viewFlowInfo(fFlowId) {
        var e_isDataFound = false;
        var _flowData = {};

        if (window.localStorage.hasOwnProperty('editedLoadEntryData')) {
            var eData = window.localStorage.getItem('editedLoadEntryData');
            if (eData != null) {
                var eFlowData = JSON.parse(eData);
                $.each(eFlowData, function (index, oLoadEntry) {
                    //   debugger;
                    if (oLoadEntry.sampleID == fFlowId) {
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
            window.sessionStorage.setItem('LoadEntryDetail', JSON.stringify(_flowData));
            window.plugins.spinnerDialog.hide();
            window.location.href = "flowdetails.html";
        }
        else {
            window.plugins.spinnerDialog.hide();
            alert("Something went wrong, Please try again later!");
        }

    },
    updateFuelFlowToCloudServer: function updateFuelFlowToCloudServer(arrSelectedItem, arrIndex) {

        var oLoadEntry = arrSelectedItem[arrIndex];
        var url = 'https://apitest.eco2cift.co.uk/api/Settings/UpdateLoadEntry';

        var serviceUrl = encodeURI(url);
        var nLoadEntry = customLoadEntry;
        nLoadEntry.sampleID = oLoadEntry.sampleID;
        nLoadEntry.appSheetUser = oLoadEntry.appSheetUser;
        nLoadEntry.ltNumber = oLoadEntry.ltNumber;
        nLoadEntry.note = oLoadEntry.note;        
        nLoadEntry.deliverDate = oLoadEntry.deliverDate;
        nLoadEntry.haulier = oLoadEntry.haulier;
        nLoadEntry.subHaulier = oLoadEntry.source;
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

        var base64Image1 = "";
        if (nLoadEntry.image1 != null && nLoadEntry.image1.length > 0) {
            app_edittedFlowList.getFileContentAsBase64(nLoadEntry.image1, function (base64Image1) {
                nLoadEntry.image1Base64String = base64Image1.toString().split(',')[1];
            });
        }

        if (nLoadEntry.image2 != null && nLoadEntry.image2.length > 0) {
            app_edittedFlowList.getFileContentAsBase64(nLoadEntry.image2, function (base64Image2) {
                nLoadEntry.image2Base64String = base64Image2.toString().split(',')[1];
            });
        }
        if (nLoadEntry.image3 != null && nLoadEntry.image3.length > 0) {
            app_edittedFlowList.getFileContentAsBase64(nLoadEntry.image3, function (base64Image3) {
                nLoadEntry.image3Base64String = base64Image3.toString().split(',')[1];
            });
        }
        if (nLoadEntry.image4 != null && nLoadEntry.image4.length > 0) {

            app_edittedFlowList.getFileContentAsBase64(nLoadEntry.image4, function (base64Image4) {
                nLoadEntry.image4Base64String = base64Image4.toString().split(',')[1];
            });
        }
        if (nLoadEntry.image5 != null && nLoadEntry.image5.length > 0) {

            app_edittedFlowList.getFileContentAsBase64(nLoadEntry.image5, function (base64Image5) {
                nLoadEntry.image5Base64String = base64Image5.toString().split(',')[1];
            });
        }

        if (nLoadEntry.image6 != null && nLoadEntry.image6.length > 0) {

            app_edittedFlowList.getFileContentAsBase64(nLoadEntry.image6, function (base64Image6) {
                nLoadEntry.image6Base64String = base64Image6.toString().split(',')[1];
            });
        }

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

                            app_edittedFlowList.validateSync(nLoadEntry.sampleID);
                            var _lastSynced = new Date().toLocaleString('en-GB');
                            nLoadEntry.dateTimeStamp = _lastSynced;
                            app_edittedFlowList.removeFlowFromEdittedList(nLoadEntry.sampleID);
                            //oNotifiedList.push(nLoadEntry);
                            window.localStorage.setItem('lastSyncedDate_LoadRejection', _lastSynced.toString());

                            // check ifis there any new record in the selected array then process it.
                            if (arrIndex < (arrSelectedItem.length - 1)) {
                                // Recursive functionality
                                var newIndex = arrIndex + 1;
                                app_edittedFlowList.updateFuelFlowToCloudServer(arrSelectedItem, newIndex)
                            }
                            else {
                                // It means all records are synced now
                               // app_edittedFlowList.manageNotifiedList(oNotifiedList);
                                window.plugins.spinnerDialog.hide();
                                alert("Synchronisation successful");                                
                                window.location.href = "notifiedflowlist.html";
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
                window.location.href = "edittedflowlist.html";
            }

        }, millisecondsToWait_UploadImage);
    },
    validateSync: function validateSync(flowId) {

        try {
            var url = "https://apitest.eco2cift.co.uk/api/Settings/ValidateFuelRejectionSync/" + flowId;
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
                        window.location.href = "edittedflowlist.html";
                    }
                }
            };
            xhttp.send();
        } catch (e) {
            alert("Synchronisation unsuccessful - Please try again");
            window.plugins.spinnerDialog.hide();
            window.location.href = "edittedflowlist.html";
        }

    },
    getFileContentAsBase64: function getFileContentAsBase64(path, callback) {
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
                app_edittedFlowList.onOffline();
            }
        }
    }
}

$(document).on("pagebeforeshow", function () {
    app_edittedFlowList.fillTable();
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

    $('#btnNotify').on("click", function () {
        app_edittedFlowList.getFlowtoNotify()
    });

    $("#tbl_edittedflow").on("click", ".tdView", function () {
        window.plugins.spinnerDialog.show("View Flow", "Getting Info...", true);
        var _flowId = this.id.split("_")[1];
        app_edittedFlowList.viewFlowInfo(_flowId);
    });
});

function ValidateFlow(ovFlow) {
    ovFlow.isValidFlow = true;
    ovFlow.lblHtml = "<span class='label label-success mr5 mb10 ib lh15'>Complete</span>";

    if (ovFlow.isValidFlow === true) {
        if (ovFlow.oLoadEntry.vrn.length <= 0) {
            ovFlow.isValidFlow = false;
            ovFlow.lblHtml = "<span class='label label-danger mr5 mb10 ib lh15'>*Reg No</span>";
        }
    }
    if (ovFlow.isValidFlow === true) {
        if (ovFlow.oLoadEntry.operator.length <= 0) {
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
            app_edittedFlowList.validateConnection();
        }
    }
    else {
        lastTime = new Date();
        ValidateLogin_token();
        app_edittedFlowList.validateConnection();
    }
};

function validateNetworkConnectionDuringProcess() {

    if (navigator.connection != null) {
        var networkState = navigator.connection.type;

        if (networkState == Connection.NONE) {
            alert("Network Connection Lost!");
            window.plugins.spinnerDialog.hide();
            window.location.href = "edittedflowlist.html";
        }
    }
}

document.addEventListener('deviceready', app_edittedFlowList.init.bind(this), false);