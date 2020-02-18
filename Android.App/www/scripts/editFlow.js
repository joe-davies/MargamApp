
//var isMuliRejectionReason;
document.addEventListener('deviceready', onDeviceReadyEdit.bind(this), false);

function onDeviceReadyEdit() {
    document.addEventListener('resume', onResumeEdit.bind(this), false);
    // window.localStorage.removeItem("arrRegNo");
    $("#btnRemovePic1").hide();
    $("#btnRemovePic2").hide();
    $("#btnRemovePic3").hide();
    $("#btnRemovePic4").hide();
    $("#btnRemovePic5").hide();
    $("#btnRemovePic6").hide();

    // Get check for multi reection data
    var muliRejReason = window.localStorage.getItem('isMuliRejectionReason');
    var isMuliRejectionReason = JSON.parse(muliRejReason);
    
    fnFillLoadDetailToEdit();
      
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
    cameraOptions: function cameraOptions() {
        var cOptions = {
            quality: 60,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            //targetHeight: 350,
            //targetWidth: 350,
        };

         return cOptions;
    },
    photoLibraryOptions: function photoLibraryOptions() {
        var cOptions = {
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

         return cOptions;
    },
    takephoto1: function takephoto1(imgIndex) {
        var _cameraOptions = app.cameraOptions();
        navigator.camera.getPicture(app.onCameraSuccess1, app.onCameraFailure1, _cameraOptions);
    },
    selectphoto1: function selectphoto1(imgIndex) {
        var _photoOptions = app.photoLibraryOptions();
        navigator.camera.getPicture(app.onCameraSuccess1, app.onCameraFailure1, _photoOptions);
    },
    onCameraSuccess1: function onCameraSuccess1(imgURI) {
        $("#imgPic1").attr("src", imgURI);
        $("#lblPic1").append(imgURI);
        $("#hfPic1").val(imgURI);
        $("#btnRemovePic1").show();
    },
    onCameraFailure1: function onCameraFailure1(message) {
        alert('Failed because: ' + message);
    },

    takephoto2: function takephoto2(imgIndex) {
        var _cameraOptions = app.cameraOptions();
        navigator.camera.getPicture(app.onCameraSuccess2, app.onCameraFailure2, _cameraOptions);
    },
    selectphoto2: function selectphoto1(imgIndex) {
        var _photoOptions = app.photoLibraryOptions();
        navigator.camera.getPicture(app.onCameraSuccess2, app.onCameraFailure2, _photoOptions);
    },
    onCameraSuccess2: function onCameraSuccess2(imgURI) {
        $("#imgPic2").attr("src", imgURI);
        $("#lblPic2").append(imgURI);
        $("#hfPic2").val(imgURI);
        $("#btnRemovePic2").show();
    },
    onCameraFailure2: function onCameraFailure2(message) {
        alert('Failed because: ' + message);
    },

    takephoto3: function takephoto3(imgIndex) {
        var _cameraOptions = app.cameraOptions();
        navigator.camera.getPicture(app.onCameraSuccess3, app.onCameraFailure3, _cameraOptions);
    },
    selectphoto3: function selectphoto1(imgIndex) {
        var _photoOptions = app.photoLibraryOptions();
        navigator.camera.getPicture(app.onCameraSuccess3, app.onCameraFailure3, _photoOptions);
    },
    onCameraSuccess3: function onCameraSuccess3(imgURI) {
        $("#imgPic3").attr("src", imgURI);
        $("#lblPic3").append(imgURI);
        $("#hfPic3").val(imgURI);
        $("#btnRemovePic3").show();
    },
    onCameraFailure3: function onCameraFailure3(message) {
        alert('Failed because: ' + message);
    },

    takephoto4: function takephoto4(imgIndex) {
        var _cameraOptions = app.cameraOptions();
        navigator.camera.getPicture(app.onCameraSuccess4, app.onCameraFailure4, _cameraOptions);
    },
    selectphoto4: function selectphoto1(imgIndex) {
        var _photoOptions = app.photoLibraryOptions();
        navigator.camera.getPicture(app.onCameraSuccess4, app.onCameraFailure4, _photoOptions);
    },
    onCameraSuccess4: function onCameraSuccess4(imgURI) {
        $("#imgPic4").attr("src", imgURI);
        $("#lblPic4").append(imgURI);
        $("#hfPic4").val(imgURI);
        $("#btnRemovePic4").show();
    },
    onCameraFailure4: function onCameraFailure4(message) {
        alert('Failed because: ' + message);
    },

    takephoto5: function takephoto5(imgIndex) {
        var _cameraOptions = app.cameraOptions();
        navigator.camera.getPicture(app.onCameraSuccess5, app.onCameraFailure5, _cameraOptions);
    },
    selectphoto5: function selectphoto1(imgIndex) {
        var _photoOptions = app.photoLibraryOptions();
        navigator.camera.getPicture(app.onCameraSuccess5, app.onCameraFailure5, _photoOptions);
    },
    onCameraSuccess5: function onCameraSuccess5(imgURI) {
        $("#imgPic5").attr("src", imgURI);
        $("#lblPic5").append(imgURI);
        $("#hfPic5").val(imgURI);
        $("#btnRemovePic5").show();
    },
    onCameraFailure5: function onCameraFailure5(message) {
        alert('Failed because: ' + message);
    },

    takephoto6: function takephoto6(imgIndex) {
        var _cameraOptions = app.cameraOptions();
        navigator.camera.getPicture(app.onCameraSuccess6, app.onCameraFailure6, _cameraOptions);
    },
    selectphoto6: function selectphoto6(imgIndex) {
        var _photoOptions = app.photoLibraryOptions();
        navigator.camera.getPicture(app.onCameraSuccess6, app.onCameraFailure6, _photoOptions);
    },
    onCameraSuccess6: function onCameraSuccess6(imgURI) {
        $("#imgPic6").attr("src", imgURI);
        $("#lblPic6").append(imgURI);
        $("#hfPic6").val(imgURI);
        $("#btnRemovePic6").show();
    },
    onCameraFailure6: function onCameraFailure6(message) {
        alert('Failed because: ' + message);
    },

    saveData: function saveData() {
        try {
            window.plugins.spinnerDialog.show("Saving Data", "Loading", true);
            var _sampleId = parseInt($("#lblSampleId").text());
            var _editedLoadData = [];
            var _isDataFound = false;
            var _existingEdittedRecord = {};

            if (window.localStorage.hasOwnProperty('editedLoadEntryData')) {
                var editedData = window.localStorage.getItem('editedLoadEntryData');
                var editedFloData = JSON.parse(editedData);

                $.each(editedFloData, function (index, eData) {
                    if (eData.sampleID == _sampleId) {
                        _existingEdittedRecord = eData;
                        _isDataFound = true;
                    }
                    else {
                        _editedLoadData.push(eData);
                    }
                });
            }

            if (_isDataFound == false) {

                var cData = window.localStorage.getItem('cloudLoadEntryData');
                var clodData = JSON.parse(cData);

                $.each(clodData, function (index, cData) {
                    if (cData.sampleID == _sampleId) {
                        _existingEdittedRecord = cData;
                        _isDataFound = true;
                        return false;
                    }
                });
            } 

            _existingEdittedRecord.ltNumber = $("#ltNumber").val();
            _existingEdittedRecord.vrn = $("#regNo").val();
            //_existingEdittedRecord.subHaulier = $("#subHaulier").val();
           // _existingEdittedRecord.operator = $("#operatorName").val();
            //_existingEdittedRecord.note = $("#note").val();

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

            window.localStorage.setItem('editedLoadEntryData', JSON.stringify(_editedLoadData));
            window.sessionStorage.removeItem('LoadEntryDetail');
            window.plugins.spinnerDialog.hide();
            window.location.href = "dashboard.html";
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

function fnFillLoadDetailToEdit() {
    var fDetail = window.sessionStorage.getItem('LoadEntryDetail');

    if (fDetail.length > 0) {
        var _loadDetail = JSON.parse(fDetail);

        var _deliveryDate = new Date(_loadDetail.deliverDate);
        $("#lblSampleId").text(_loadDetail.sampleID);

        $("#plannedDeliveryDate").val(_deliveryDate.getDate() + "/" + (_deliveryDate.getMonth() + 1) + "/" + _deliveryDate.getFullYear());
        $("#haulier").val(_loadDetail.haulier);
        //$("#subHaulier").val(_loadDetail.subHaulier);
        $("#regNo").val(_loadDetail.vrn);
        $("#comments").val(_loadDetail.rejComments);
        $("#ltNumber").val(_loadDetail.ltNumber);
        $("#note").val(_loadDetail.note);
               
        fnManageLoadEntryPictures(_loadDetail);
        fnFillRejectionReasonData(_loadDetail);        
        fnFillPlantOperatorData(_loadDetail)
    }
}

function fnManageLoadEntryPictures(oLoad) {

    if (oLoad.image1 != null && oLoad.image1.length > 0) {
        $("#imgPic1").attr("src", oLoad.image1);
        $("#lblPic1").append(oLoad.image1);
        $("#hfPic1").val(oLoad.image1);
        $("#btnRemovePic1").show();
    }
    if (oLoad.image2 != null && oLoad.image2.length > 0) {
        $("#imgPic2").attr("src", oLoad.image2);
        $("#lblPic2").append(oLoad.image2);
        $("#hfPic2").val(oLoad.image2);
        $("#btnRemovePic2").show();
    }
    if (oLoad.image3 != null && oLoad.image3.length > 0) {
        $("#imgPic3").attr("src", oLoad.image3);
        $("#lblPic3").append(oLoad.image3);
        $("#hfPic3").val(oLoad.image3);
        $("#btnRemovePic3").show();
    }
    if (oLoad.image4 != null && oLoad.image4.length > 0) {
        $("#imgPic4").attr("src", oLoad.image4);
        $("#lblPic4").append(oLoad.image4);
        $("#hfPic4").val(oLoad.image4);
        $("#btnRemovePic4").show();
    }
    if (oLoad.image5 != null && oLoad.image5.length > 0) {
        $("#imgPic5").attr("src", oLoad.image5);
        $("#lblPic5").append(oLoad.image5);
        $("#hfPic5").val(oLoad.image5);
        $("#btnRemovePic5").show();
    }


}

function fnFillPlantOperators(oLoad) {
    var _plantOperators = window.localStorage.getItem('plantOperatorsData');
    if (_plantOperators.length > 0) {
        var plantOperatorData = JSON.parse(_plantOperators);
        var _pOperatorOptions = "";
        $.each(plantOperatorData, function (index, _plantOperator) {

            if (oLoad.operator == _plantOperator.operator) {
                _pOperatorOptions = _pOperatorOptions + "<option value='" + _plantOperator.id + "' selected>" + _plantOperator.operator + "</option>";
            }
            else {
                _pOperatorOptions = _pOperatorOptions + "<option value='" + _plantOperator.id + "' >" + _plantOperator.operator + "</option>";
            }
        });

        var plantOperatorSelect = $("#operatorName");
        plantOperatorSelect.append(_pOperatorOptions);
        plantOperatorSelect.selectmenu();
        plantOperatorSelect.selectmenu('refresh', true);

    }
}

function fnFillRejectionReasonData(oLoad) {
    var muliRejReason = window.localStorage.getItem('isMuliRejectionReason');
    var _isMuliRejectionReason = JSON.parse(muliRejReason);

    var _rejectionReasons = window.localStorage.getItem('loadRejectionReasonData');
    if (_rejectionReasons.length > 0) {
        var rejectionReasonData = JSON.parse(_rejectionReasons);
        var _rReasonOptions = "";
        if (!_isMuliRejectionReason) {
            _rReasonOptions = "<option value='-1'>Select Reason</option>"
        }

        $.each(rejectionReasonData, function (index, _rejectionReason) {

            /// For Editing we only check for "Load" Fuel Group Reection Reasons as per the logged in user 
            if (_rejectionReason.fuelGroup == "Load") {
                if (oLoad.rejReasons != null) {
                    var _existingRejectReasons = oLoad.rejReasons.split(",");
                    var _isRejectReasonMatched = false;
                    $.each(_existingRejectReasons, function (ind, _eRejectReason) {
                        if (_eRejectReason.replace(/\s/g, '') == _rejectionReason.rejectReason.replace(/\s/g, '')) {
                            _isRejectReasonMatched = true;
                             
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



function fnFillPlantOperatorData(oLoad) {
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
        if (_plantOperatorIndex == -1) {
            oLoad.rejReasons = null;
        }
        else {
            oLoad.rejReasons = $('#rejectionReason option:selected').text();
        }
    }



}

//function GetBaleLocations() {
//    var _selectedBaleLocations = "";
//    $('.tdBale').each(function (ind, ele) {
//        var _eleHidden = $(ele).find('input[type=hidden]');
//        if (_eleHidden.val() == "1") {
//            //            var _id = ele.id.replace('_', ' ');
//            var _id = ele.id;
//            if (_selectedBaleLocations.length > 0) {
//                _selectedBaleLocations = _selectedBaleLocations + ", " + _id;
//            }
//            else {
//                _selectedBaleLocations = _id;
//            }
//        };

//    });

//    if (_selectedBaleLocations.length < 0) {
//        _selectedBaleLocations = null;
//    }
//    return _selectedBaleLocations;
//}

function onResumeEdit() {
    // TODO: This application has been reactivated. Restore application state here.
    //  ValidateLogin_token();
};

$(document).ready(function () {

    // app.init(); 

    $('.multiselect-container').on('click', 'li', function () {
        alert("hi");
    });

    $("#btnRemovePic1").on("click", function () {
        $("#imgPic1").attr("src", "");
        $("#lblPic1").html("");
        $("#hfPic1").val("");
        $("#btnRemovePic1").hide();
    });

    $("#btnRemovePic2").on("click", function () {
        $("#imgPic2").attr("src", "");
        $("#lblPic2").html("");
        $("#hfPic2").val("");
        $("#btnRemovePic2").hide();
    });

    $("#btnRemovePic3").on("click", function () {
        $("#imgPic3").attr("src", "");
        $("#lblPic3").html("");
        $("#hfPic3").val("");
        $("#btnRemovePic3").hide();
    });

    $("#btnRemovePic4").on("click", function () {
        $("#imgPic4").attr("src", "");
        $("#lblPic4").html("");
        $("#hfPic4").val("");
        $("#btnRemovePic4").hide();
    });

    $("#btnRemovePic5").on("click", function () {
        $("#imgPic5").attr("src", "");
        $("#lblPic5").html("");
        $("#hfPic5").val("");
        $("#btnRemovePic5").hide();
    });

    //$("#ddlRegNo").on("change", function () {
    //    var _index = $('option:selected', this).val();
    //    var _value = $('option:selected', this).text();
    //    if (_index == -1) {
    //        $("#regNo").val("");
    //    }
    //    else {
    //        $("#regNo").val(_value);
    //    }

    //});

    //$("#ddlOperatorName").on("change", function () {
    //    var _index = $('option:selected', this).val();
    //    var _value = $('option:selected', this).text();
    //    if (_index == -1) {
    //        $("#operatorName").val("");
    //    }
    //    else {
    //        $("#operatorName").val(_value);
    //    }
    //});

    $("#btnSave").on("click", function () {
        app.saveData()
    });

    $("#btnPic1").on("click", function () {
        app.takephoto1();
    });

    $("#btnPic2").on("click", function () {
        app.takephoto2();
    });

    $("#btnPic3").on("click", function () {
        app.takephoto3();
    });

    $("#btnPic4").on("click", function () {
        app.takephoto4();
    });

    $("#btnPic5").on("click", function () {
        app.takephoto5();
    });
    $("#btnPic6").on("click", function () {
        app.takephoto6();
    });

    $("#btnSelectPic1").on("click", function () {
        app.selectphoto1();
    });
    $("#btnSelectPic2").on("click", function () {
        app.selectphoto2();
    });
    $("#btnSelectPic3").on("click", function () {
        app.selectphoto3();
    });
    $("#btnSelectPic4").on("click", function () {
        app.selectphoto4();
    });
    $("#btnSelectPic5").on("click", function () {
        app.selectphoto5();
    });

    /// Task #18
    ///Force Registration number to Upper Case #18
    $('#regNo').on('keyup', function () {
        var $this = $(this), value = $this.val();
        $this.val(value.toUpperCase());
    });
    /// Task #18 end

     
});

