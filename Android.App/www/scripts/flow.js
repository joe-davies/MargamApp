$(document).ready(function () {
    // do document ready stuff

    $(".ui-loader-default").hide();

}).on('deviceready', function () {
    // do deviceready stuff, put all calls to plugins in here
    document.addEventListener('resume', onResumeFlow.bind(this), false);

    var fDetail = window.sessionStorage.getItem('LoadEntryDetail');
    var btnEdit = document.querySelector("#btnEdit");

    if (fDetail.length > 0) {
        var flow_Detail = JSON.parse(fDetail);
        fnFillFlowDetail(flow_Detail);
        var _isInNotifiedList = isInNotifiedList(flow_Detail.sampleID);

        if (_isInNotifiedList == true) {
            var divWarning = document.getElementById("dvWarning");
            divWarning.style.display = "block";
            divWarning.classList.add("sticky");
            btnEdit.style.display = "none";
        }
        else {
            document.getElementById("dvWarning").style.display = "none";
            btnEdit.addEventListener("click", fnEditFlow, false);
        }
    }
});

function fnFillFlowDetail(_flowDetail) {

    var _deliveryDate = new Date(_flowDetail.deliverDate);
    $("#lblSampleId").text(_flowDetail.sampleID);

    $("#lblDeliveryDate").text(_deliveryDate.getDate() + "/" + (_deliveryDate.getMonth() + 1) + "/" + _deliveryDate.getFullYear());
    $("#lblHaulier").text(_flowDetail.haulier);
    $("#lblLtNumber").text(_flowDetail.ltNumber);
    $("#lblRegNo").text(_flowDetail.vrn);
    $("#lblOperatorName").text(_flowDetail.operator);
    $("#lblNote").text(_flowDetail.fuelType);
    $("#lblSource").text(_flowDetail.baleSize);     
    $("#lblRejectionReasons").text(_flowDetail.rejReasons);
    $("#lblComments").text(_flowDetail.rejComments);
}

function isInNotifiedList(_flowId) {
    var returnval = false;

    if (window.localStorage.hasOwnProperty('notifiedLoadFlowData')) {
        var notifiedData = window.localStorage.getItem('notifiedLoadFlowData');
        var notifiedFloData = JSON.parse(notifiedData);
        $.each(notifiedFloData, function (i, ele) {
            if (ele.sampleID === _flowId) {
                returnval = true;
                return false;
            }
        });
    }
    else {
        returnval = false;
    }

    return returnval;
}

function fnEditFlow() {
    window.plugins.spinnerDialog.show("Flow Edit", "Loading...", true);
    window.location.href = "flowedit.html";
}

function onResumeFlow() {
    // TODO: This application has been reactivated. Restore application state here.
    ValidateLogin_token();
};