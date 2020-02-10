
//var isMuliRejectionReason;
document.addEventListener('deviceready', onDeviceReadyEdit.bind(this), false);

function onDeviceReadyEdit() {
    document.addEventListener('resume', onResumeEdit.bind(this), false);
    // window.localStorage.removeItem("arrRegNo");
    $("#btnRemoveNonLoadPic1").hide();
    $("#btnRemoveNonLoadPic2").hide();
    $("#btnRemoveNonLoadPic3").hide();
    $("#btnRemoveNonLoadPic4").hide();
    $("#btnRemoveNonLoadPic5").hide();
    $("#btnRemoveNonLoadPic6").hide();

    // Get check for multi reection data
    var muliRejReason = window.localStorage.getItem('isMuliRejectionReason');
    var isMuliRejectionReason = JSON.parse(muliRejReason);

    fnFillNonLoadDetailToEdit();

    $(".ui-selectmenu-button").hide();

    // Check for Multi Rejection Selection


    if (isMuliRejectionReason) {
        $("#multiRejectedReasons").show();
        $("#rejectionReason").hide();

        //Design checkbox-dropdown list
        $('#multiRejectedReasons').multiselect({
            includeSelectAllOption: true
        });
    }
    else {
        $("#multiRejectedReasons").hide();
        $("#rejectionReason").show();
    }

    window.plugins.spinnerDialog.hide();
}

var app = {
    nonLoadCameraOptions: function nonLoadCameraOptions() {
        var nlCameraOptions = {
            quality: 60,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            //targetHeight: 350,
            //targetWidth: 350,
        };

        return nlCameraOptions;
    },
    nonLoadPhotoLibraryOptions: function nonLoadPhotoLibraryOptions() {
        var nlCameraOptions = {
            quality: 60,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,            
            encodingType: Camera.EncodingType.JPEG,
            //mediaType: Camera.MediaType.PICTURE,          
            //cameraDirection: Camera.Direction.BACK,
            //targetHeight: 350,
            //targetWidth: 350,
        };

        return nlCameraOptions;
    },
    takeNonLoadPhoto1: function takeNonLoadPhoto1(imgIndex) {
        var _nonLoadCameraOptions = app.nonLoadCameraOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess1, app.nonLoadCameraFailure1, _nonLoadCameraOptions);
    },
    selectNonLoadPhoto1: function selectNonLoadPhoto1(imgIndex) {
        var _nonLoadPhotoOptions = app.nonLoadPhotoLibraryOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess1, app.nonLoadCameraFailure1, _nonLoadPhotoOptions);
    },
    nonLoadCameraSuccess1: function nonLoadCameraSuccess1(imgURI) {
        $("#imgPic1").attr("src", imgURI);
        $("#lblPic1").append(imgURI);
        $("#hfPic1").val(imgURI);
        $("#btnRemoveNonLoadPic1").show();
    },
    nonLoadCameraFailure1: function nonLoadCameraFailure1(message) {
        alert('Failed because: ' + message);
    },

    takeNonLoadPhoto2: function takeNonLoadPhoto2(imgIndex) {
        var _nonLoadCameraOptions = app.nonLoadCameraOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess2, app.nonLoadCameraFailure2, _nonLoadCameraOptions);
    },
    selectNonLoadPhoto2: function selectNonLoadPhoto1(imgIndex) {
        var _nonLoadPhotoOptions = app.nonLoadPhotoLibraryOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess2, app.nonLoadCameraFailure2, _nonLoadPhotoOptions);
    },
    nonLoadCameraSuccess2: function nonLoadCameraSuccess2(imgURI) {
        $("#imgPic2").attr("src", imgURI);
        $("#lblPic2").append(imgURI);
        $("#hfPic2").val(imgURI);
        $("#btnRemoveNonLoadPic2").show();
    },
    nonLoadCameraFailure2: function nonLoadCameraFailure2(message) {
        alert('Failed because: ' + message);
    },

    takeNonLoadPhoto3: function takeNonLoadPhoto3(imgIndex) {
        var _nonLoadCameraOptions = app.nonLoadCameraOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess3, app.nonLoadCameraFailure3, _nonLoadCameraOptions);
    },
    selectNonLoadPhoto3: function selectNonLoadPhoto1(imgIndex) {
        var _nonLoadPhotoOptions = app.nonLoadPhotoLibraryOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess3, app.nonLoadCameraFailure3, _nonLoadPhotoOptions);
    },
    nonLoadCameraSuccess3: function nonLoadCameraSuccess3(imgURI) {
        $("#imgPic3").attr("src", imgURI);
        $("#lblPic3").append(imgURI);
        $("#hfPic3").val(imgURI);
        $("#btnRemoveNonLoadPic3").show();
    },
    nonLoadCameraFailure3: function nonLoadCameraFailure3(message) {
        alert('Failed because: ' + message);
    },

    takeNonLoadPhoto4: function takeNonLoadPhoto4(imgIndex) {
        var _nonLoadCameraOptions = app.nonLoadCameraOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess4, app.nonLoadCameraFailure4, _nonLoadCameraOptions);
    },
    selectNonLoadPhoto4: function selectNonLoadPhoto1(imgIndex) {
        var _nonLoadPhotoOptions = app.nonLoadPhotoLibraryOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess4, app.nonLoadCameraFailure4, _nonLoadPhotoOptions);
    },
    nonLoadCameraSuccess4: function nonLoadCameraSuccess4(imgURI) {
        $("#imgPic4").attr("src", imgURI);
        $("#lblPic4").append(imgURI);
        $("#hfPic4").val(imgURI);
        $("#btnRemoveNonLoadPic4").show();
    },
    nonLoadCameraFailure4: function nonLoadCameraFailure4(message) {
        alert('Failed because: ' + message);
    },

    takeNonLoadPhoto5: function takeNonLoadPhoto5(imgIndex) {
        var _nonLoadCameraOptions = app.nonLoadCameraOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess5, app.nonLoadCameraFailure5, _nonLoadCameraOptions);
    },
    selectNonLoadPhoto5: function selectNonLoadPhoto1(imgIndex) {
        var _nonLoadPhotoOptions = app.nonLoadPhotoLibraryOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess5, app.nonLoadCameraFailure5, _nonLoadPhotoOptions);
    },
    nonLoadCameraSuccess5: function nonLoadCameraSuccess5(imgURI) {
        $("#imgPic5").attr("src", imgURI);
        $("#lblPic5").append(imgURI);
        $("#hfPic5").val(imgURI);
        $("#btnRemoveNonLoadPic5").show();
    },
    nonLoadCameraFailure5: function nonLoadCameraFailure5(message) {
        alert('Failed because: ' + message);
    },

    takeNonLoadPhoto6: function takeNonLoadPhoto6(imgIndex) {
        var _nonLoadCameraOptions = app.nonLoadCameraOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess6, app.nonLoadCameraFailure6, _nonLoadCameraOptions);
    },
    selectNonLoadPhoto6: function selectNonLoadPhoto6(imgIndex) {
        var _nonLoadPhotoOptions = app.nonLoadPhotoLibraryOptions();
        navigator.camera.getPicture(app.nonLoadCameraSuccess6, app.nonLoadCameraFailure6, _nonLoadPhotoOptions);
    },
    nonLoadCameraSuccess6: function nonLoadCameraSuccess6(imgURI) {
        $("#imgPic6").attr("src", imgURI);
        $("#lblPic6").append(imgURI);
        $("#hfPic6").val(imgURI);
        $("#btnRemoveNonLoadPic6").show();
    },
    nonLoadCameraFailure6: function nonLoadCameraFailure6(message) {
        alert('Failed because: ' + message);
    },

    saveNonLoadData: function saveNonLoadData() {
        try {
            window.plugins.spinnerDialog.show("Saving Data", "Loading", true);

            var _id = 0;
            if ($("#hdNonLoadId").val().length > 0) {
                _id = parseInt($("#hdNonLoadId").val());
            }

            var _editedLoadData = [];
            var _isDataFound = false;
            var _existingEdittedRecord = {};

            if (window.localStorage.hasOwnProperty('nonLoadEntryData')) {
                var editedData = window.localStorage.getItem('nonLoadEntryData');
                var editedFloData = JSON.parse(editedData);

                $.each(editedFloData, function (index, eData) {
                    if (eData.id == _id) {
                        _existingEdittedRecord = eData;
                        _isDataFound = true;
                    }
                    else {
                        _editedLoadData.push(eData);
                    }
                });
            }

            if (_isDataFound == false) {

                _existingEdittedRecord = customLoadEntry;
                //var cData = window.localStorage.getItem('nonLoadEntryData');
                //var clodData = JSON.parse(cData);

                //$.each(clodData, function (index, cData) {
                //    if (cData.id == _id) {
                //        _existingEdittedRecord = cData;
                //        _isDataFound = true;
                //        return false;
                //    }
                //});
            }

            //deliverDate
            if (_existingEdittedRecord.id == 0) {
                _existingEdittedRecord.id = GetTempNonLoadId();
            }

            //_existingEdittedRecord.id = GetTempNonLoadId();

            _existingEdittedRecord.appSheetUser = GetUserName();
            _existingEdittedRecord.ltNumber = "Non-Load";
            _existingEdittedRecord.vrn = "";
            _existingEdittedRecord.haulier = "";
            _existingEdittedRecord.source = "";
           // _existingEdittedRecord.operator = $("#operatorName").val();
            _existingEdittedRecord.note = "";
            _existingEdittedRecord.rejComments = $("#comments").val();
            _existingEdittedRecord.image1 = $("#hfPic1").val();
            _existingEdittedRecord.image2 = $("#hfPic2").val();
            _existingEdittedRecord.image3 = $("#hfPic3").val();
            _existingEdittedRecord.image4 = $("#hfPic4").val();
            _existingEdittedRecord.image5 = $("#hfPic5").val();
            _existingEdittedRecord.image6 = $("#hfPic6").val();

            // Get Dropdown lists value
            fnGetDropdownValues(_existingEdittedRecord);

            _editedLoadData.push(_existingEdittedRecord);

            window.localStorage.setItem('nonLoadEntryData', JSON.stringify(_editedLoadData));

            window.sessionStorage.removeItem('NonLoadEntryDetail');
            window.plugins.spinnerDialog.hide();
            window.location.href = "nonloadentrylist.html";
            // }
        } catch (e) {
            window.plugins.spinnerDialog.hide();
            alert("Something went wrong.");
            alert("Error : " + e);
            alert("Please try again later!");
            window.location.href = "dashboard.html";
        }

    },
}

function GetTempNonLoadId() {
    var _id = 0;
    if (window.localStorage.hasOwnProperty('nonLoadEntryData')) {
        var nonLoadData = window.localStorage.getItem('nonLoadEntryData');
        var nonLoadEntries = JSON.parse(nonLoadData);
        var _length = Object.keys(nonLoadEntries).length;
        _id = _length + 1;
    }
    else {
        _id = 1;
    }

    return _id;
}

function GetUserName() {
    var uDetails = window.localStorage.getItem('loadEntryUserDetails');
    var _encodedData = window.atob(uDetails);
    var userDetails = _encodedData.split('~');

    return userDetails[0].toString();
}

function fnFillNonLoadDetailToEdit() {

    if (window.sessionStorage.hasOwnProperty('NonLoadEntryDetail')) {
        var fDetail = window.sessionStorage.getItem('NonLoadEntryDetail');

        if (fDetail.length > 0) {
            var _loadDetail = JSON.parse(fDetail);

            $("#hdNonLoadId").val(_loadDetail.id);
            $("#comments").val(_loadDetail.rejComments);

            $("#note").val(_loadDetail.note);

            fnManageNonLoadEntryPictures(_loadDetail);
            fnFillNonLoadRejectionReasonDataFromLoad(_loadDetail);
            fnFillNonLoadPlantOperatorDataFromLoad(_loadDetail)
        }
    }
    else {
        fnFillNonLoadRejectionReasonData();
        fnFillNonLoadPlantOperatorData();
    }

}

function fnManageNonLoadEntryPictures(oLoad) {

    if (oLoad.image1 != null && oLoad.image1.length > 0) {
        $("#imgPic1").attr("src", oLoad.image1);
        $("#lblPic1").append(oLoad.image1);
        $("#hfPic1").val(oLoad.image1);
        $("#btnRemoveNonLoadPic1").show();
    }
    if (oLoad.image2 != null && oLoad.image2.length > 0) {
        $("#imgPic2").attr("src", oLoad.image2);
        $("#lblPic2").append(oLoad.image2);
        $("#hfPic2").val(oLoad.image2);
        $("#btnRemoveNonLoadPic2").show();
    }
    if (oLoad.image3 != null && oLoad.image3.length > 0) {
        $("#imgPic3").attr("src", oLoad.image3);
        $("#lblPic3").append(oLoad.image3);
        $("#hfPic3").val(oLoad.image3);
        $("#btnRemoveNonLoadPic3").show();
    }
    if (oLoad.image4 != null && oLoad.image4.length > 0) {
        $("#imgPic4").attr("src", oLoad.image4);
        $("#lblPic4").append(oLoad.image4);
        $("#hfPic4").val(oLoad.image4);
        $("#btnRemoveNonLoadPic4").show();
    }
    if (oLoad.image5 != null && oLoad.image5.length > 0) {
        $("#imgPic5").attr("src", oLoad.image5);
        $("#lblPic5").append(oLoad.image5);
        $("#hfPic5").val(oLoad.image5);
        $("#btnRemoveNonLoadPic5").show();
    }
    if (oLoad.image6 != null && oLoad.image6.length > 0) {
        $("#imgPic5").attr("src", oLoad.image6);
        $("#lblPic5").append(oLoad.image6);
        $("#hfPic5").val(oLoad.image6);
        $("#btnRemoveNonLoadPic5").show();
    }


}
function fnFillNonLoadRejectionReasonData() {
    var muliRejReason = window.localStorage.getItem('isMuliRejectionReason');
    var _isMuliRejectionReason = JSON.parse(muliRejReason);

    var _rejectionReasons = window.localStorage.getItem('loadRejectionReasonData');
    if (_rejectionReasons.length > 0) {
        var rejectionReasonData = JSON.parse(_rejectionReasons);
        var _rReasonOptions = "<option value='-1'>Select Reason</option>";
        $.each(rejectionReasonData, function (index, _rejectionReason) {

            /// For Editing we only check for "NonLoad" Fuel Group Reection Reasons as per the logged in user 
            if (_rejectionReason.fuelGroup == "NonLoad") {
                _rReasonOptions = _rReasonOptions + "<option value='" + _rejectionReason.listOrderID + "'>" + _rejectionReason.rejectReason + "</option>";
            }
            /// Task #11 end
        });

        if (_isMuliRejectionReason) {
            $("#lblRejectedReason").text("Rejected Reasons");
            var rejectReasonSelect = $("#multiRejectedReasons");
            rejectReasonSelect.append(_rReasonOptions);
            rejectReasonSelect.selectmenu();
            rejectReasonSelect.selectmenu('refresh', true);
        }
        else {
            $("#lblRejectedReason").text("Rejected Reason");
            var rejectReasonSelect = $("#rejectionReason");
            rejectReasonSelect.append(_rReasonOptions);
            rejectReasonSelect.selectmenu();
            rejectReasonSelect.selectmenu('refresh', true);
        }

    }
}

function fnFillNonLoadPlantOperatorData(oLoad) {
    var _plantOperator = window.localStorage.getItem('plantOperatorsData');
    if (_plantOperator.length > 0) {
        var plantOperatorData = JSON.parse(_plantOperator);
        var _plantOperatorOptions = "<option value='-1'>Select Plant Operator</option>";

        $.each(plantOperatorData, function (index, _pOperator) {
            _plantOperatorOptions = _plantOperatorOptions + "<option value='" + index + "'>" + _pOperator.operator + "</option>";
        });

        $('#operatorName').append(_plantOperatorOptions);
    }
}

function fnFillNonLoadRejectionReasonDataFromLoad(oLoad) {
    var muliRejReason = window.localStorage.getItem('isMuliRejectionReason');
    var _isMuliRejectionReason = JSON.parse(muliRejReason);

    var _rejectionReasons = window.localStorage.getItem('loadRejectionReasonData');
    if (_rejectionReasons.length > 0) {
        var rejectionReasonData = JSON.parse(_rejectionReasons);
        
        var _rReasonOptions = "<option value='-1'>Select Reason</option>";
        $.each(rejectionReasonData, function (index, _rejectionReason) {

            /// For Editing we only check for "NonLoad" Fuel Group Reection Reasons as per the logged in user 
            if (_rejectionReason.fuelGroup == "NonLoad") {
                if (oLoad.rejReasons != null) {
                    var _existingRejectReasons = oLoad.rejReasons.split(",");
                    var _isRejectReasonMatched = false;
                    $.each(_existingRejectReasons, function (ind, _eRejectReason) {
                        if (_eRejectReason.replace(/\s/g, '') == _rejectionReason.rejectReason.replace(/\s/g, '')) {
                            _isRejectReasonMatched = true;
                            /// Task #22
                            ///A manual moisture is required only if a rejection reason contains the words 'Moisture - High'                            
                            //var _rejReason = _eRejectReason.replace(/\s/g, '');
                            //if (_rejReason.indexOf('-') > -1) {
                            //    var fEle = _rejReason.split('-')[0];
                            //    if (fEle == "Moisture") {
                            //        $('.rowMoisture').show();
                            //    }
                            //}
                            /// Task #22 end
                            return false;
                        }
                    });
                    if (_isRejectReasonMatched == true) {
                        _rReasonOptions = _rReasonOptions + "<option value='" + _rejectionReason.listOrderID + "' selected>" + _rejectionReason.rejectReason + "</option>";
                    }
                    else {
                        _rReasonOptions = _rReasonOptions + "<option value='" + _rejectionReason.listOrderID + "'>" + _rejectionReason.rejectReason + "</option>";
                    }
                }
                else {
                    _rReasonOptions = _rReasonOptions + "<option value='" + _rejectionReason.listOrderID + "'>" + _rejectionReason.rejectReason + "</option>";
                }
            }
            /// Task #11 end
        });

        if (_isMuliRejectionReason) {
            var rejectReasonSelect = $("#multiRejectedReasons");
            rejectReasonSelect.append(_rReasonOptions);
            rejectReasonSelect.selectmenu();
            rejectReasonSelect.selectmenu('refresh', true);
        }
        else {
            var rejectReasonSelect = $("#rejectionReason");
            rejectReasonSelect.append(_rReasonOptions);
            rejectReasonSelect.selectmenu();
            rejectReasonSelect.selectmenu('refresh', true);
        }

    }
}

function fnFillNonLoadPlantOperatorDataFromLoad(oLoad) {
    var _plantOperator = window.localStorage.getItem('plantOperatorsData');
    if (_plantOperator.length > 0) {
        var plantOperatorData = JSON.parse(_plantOperator);
        var _plantOperatorOptions = "<option value='-1'>Select Plant Operator</option>";

        $.each(plantOperatorData, function (index, _pOperator) {
            if (oLoad.operator != null) {
                if (oLoad.operator == _pOperator.operator) {
                    _plantOperatorOptions = _plantOperatorOptions + "<option value='" + index + "' selected>" + _pOperator.operator + "</option>";
                }
                else {
                    _plantOperatorOptions = _plantOperatorOptions + "<option value='" + index + "'>" + _pOperator.operator + "</option>";
                }
            }
            else {
                _plantOperatorOptions = _plantOperatorOptions + "<option value='" + index + "'>" + _pOperator.operator + "</option>";

            }

        });

        $('#operatorName').append(_plantOperatorOptions);
    }
}

function fnGetDropdownValues(oLoad) {

    var muliRejReason = window.localStorage.getItem('isMuliRejectionReason');
    var _isMuliRejectionReason = JSON.parse(muliRejReason);

    var _plantOperatorIndex = $('#operatorName option:selected').val();
    if (_plantOperatorIndex == -1) {
        oLoad.operator = null;
    }
    else {
        oLoad.operator = $('#operatorName option:selected').text();
    }

    // Get Rejected Reason
    if (_isMuliRejectionReason) {
        oLoad.rejReasons = $("#multiRejectedReasons").parent().find(":button").prop('title');

        if (oLoad.rejReasons === "None selected") {
            oLoad.rejReasons = null;
        }
    }
    else {
        var _rejReasonIndex = $('#rejectionReason option:selected').val();
        if (_rejReasonIndex == -1) {
            oLoad.rejReasons = null;
        }
        else {
            oLoad.rejReasons = $('#rejectionReason option:selected').text();
        }
    }



}



function onResumeEdit() {
    // TODO: This application has been reactivated. Restore application state here.
    //  ValidateLogin_token();
};

$(document).ready(function () {

    // app.init(); 

    $('.multiselect-container').on('click', 'li', function () {
        alert("hi");
    });

    $("#btnRemoveNonLoadPic1").on("click", function () {
        $("#imgPic1").attr("src", "");
        $("#lblPic1").html("");
        $("#hfPic1").val("");
        $("#btnRemoveNonLoadPic1").hide();
    });

    $("#btnRemoveNonLoadPic2").on("click", function () {
        $("#imgPic2").attr("src", "");
        $("#lblPic2").html("");
        $("#hfPic2").val("");
        $("#btnRemoveNonLoadPic2").hide();
    });

    $("#btnRemoveNonLoadPic3").on("click", function () {
        $("#imgPic3").attr("src", "");
        $("#lblPic3").html("");
        $("#hfPic3").val("");
        $("#btnRemoveNonLoadPic3").hide();
    });

    $("#btnRemoveNonLoadPic4").on("click", function () {
        $("#imgPic4").attr("src", "");
        $("#lblPic4").html("");
        $("#hfPic4").val("");
        $("#btnRemoveNonLoadPic4").hide();
    });

    $("#btnRemoveNonLoadPic5").on("click", function () {
        $("#imgPic5").attr("src", "");
        $("#lblPic5").html("");
        $("#hfPic5").val("");
        $("#btnRemoveNonLoadPic5").hide();
    });

    $("#btnNonLoadSave").on("click", function () {
        app.saveNonLoadData()
    });

    $("#btnPic1").on("click", function () {
        app.takeNonLoadPhoto1();
    });

    $("#btnPic2").on("click", function () {
        app.takeNonLoadPhoto2();
    });

    $("#btnPic3").on("click", function () {
        app.takeNonLoadPhoto3();
    });

    $("#btnPic4").on("click", function () {
        app.takeNonLoadPhoto4();
    });

    $("#btnPic5").on("click", function () {
        app.takeNonLoadPhoto5();
    });
    $("#btnPic6").on("click", function () {
        app.takeNonLoadPhoto6();
    });

    $("#btnSelectPic1").on("click", function () {
        app.selectNonLoadPhoto1();
    });
    $("#btnSelectPic2").on("click", function () {
        app.selectNonLoadPhoto2();
    });
    $("#btnSelectPic3").on("click", function () {
        app.selectNonLoadPhoto3();
    });
    $("#btnSelectPic4").on("click", function () {
        app.selectNonLoadPhoto4();
    });
    $("#btnSelectPic5").on("click", function () {
        app.selectNonLoadPhoto5();
    });

});

