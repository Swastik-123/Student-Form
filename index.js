

var jpdpBaseUrl = "http://api.login2explore.com:5577"
var jpdpIRL = "/api/irl";
var jpdpIML = "/api/iml";
var connToken = "90931699|-31949325538891395|90961159";
var StudentDbName= "STUDENT-TABLE";
var StudentRelationName = "SCHOOL-DB";

$('#stuRoll').focus();

function savaData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ''){
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,StudentDbName,StudentRelationName);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdpBaseUrl,jpdpIML);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $('#stuRoll').focus();
}



function changeData(){
    $('#change').prop("disabled",true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg,StudentDbName,StudentRelationName,localStorage.getItem('recno'));
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdpBaseUrl,jpdpIML);
    jQuery.ajaxSetup({ async: true });
    console.log(resJsonObj);
    resetForm();
    $('#stuRoll').focus();
}



function validateData(){
    var stuRoll,stuName,stuClass,stuDate,stuAdd,stuEnrol;
    stuRoll = $('#stuRoll').val();
    stuName = $('#stuName').val();
    stuClass = $('#stuClass').val();
    stuDate = $('#stuDate').val();
    stuAdd = $('#stuAdd').val();
    stuEnrol = $('#stuEnrol').val();

    if(stuRoll === ''){
        alert("Student Roll-NO is not There!")
        $('#stuRoll').focus();
        return '';
    }
    if(stuName === ''){
        alert("Student name is not There!")
        $('#stuName').focus();
        return '';
    }
    if(stuClass === ''){
        alert("Student class is not There!")
        $('#stuClass').focus();
        return '';
    }
    if(stuDate === ''){
        alert("Student date of birth is not There!")
        $('#stuDate').focus();
        return '';
    }
    if(stuAdd === ''){
        alert("Student address  is not There!")
        $('#stuAdd').focus();
        return '';
    }
    if(stuEnrol === ''){
        alert("Student enrollment no is not There!")
        $('#stuEnrol').focus();
        return '';
    }
    var jsonStrObj = {
        roll:stuRoll,
        name:stuName,
        class:stuClass,
        birth:stuDate,
        address:stuAdd,
        enroll:stuEnrol
    };
    return JSON.stringify(jsonStrObj);

}


function resetForm(){
    $('#stuRoll').val('');
    $('#stuName').val('');
    $('#stuClass').val('');
    $('#stuDate').val('');
    $('#stuAdd').val('');
    $('#stuEnrol').val('');

    $('#stuRoll').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#change').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#stuRoll').focus();
    
}

function getEmp(){
    var StudentRollJsonObj = getStudentRollAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, StudentDbName, StudentRelationName, StudentRollJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdpBaseUrl,jpdpIRL);
    jQuery.ajaxSetup({ async: true });
    if(resJsonObj.status === 400){
        $('#save').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#stuName').focus();
    }else if(resJsonObj.status === 200){
        $('#stuRoll').prop('disabled',true);
        fillData(resJsonObj);

        $('#change').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#stuName').focus();
    }
}

function fillData(jsonObj){
    saveRecNo(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#stuName').val(record.name);
    $('#stuClass').val(record.class);
    $('#stuDate').val(record.birth);
    $('#stuAdd').val(record.address);
    $('#stuEnrol').val(record.enroll);
}

function saveRecNo(jsonObj){
    var lvdata = JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvdata.rec_no);
}

function getStudentRollAsJsonObj(){
    var stuRoll = $('#stuRoll').val();
    var jsonStr = {
        roll:stuRoll
    };
    return JSON.stringify(jsonStr);
}