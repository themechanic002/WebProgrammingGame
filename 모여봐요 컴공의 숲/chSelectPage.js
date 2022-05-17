// 캐릭터 넘버 변수 (여기서부터!) 


var ch1 = document.getElementById("char1");
var ch2 = document.getElementById("char2");
var ch3 = document.getElementById("char3");
var cimgstr = "img/charimg1.png" //UI에 생성되는 이미지 
var ch_num = 1;

function changenum1(){
    
    ch1.style.border = "3px solid red";
    ch1.style.borderRadius = "10px";
    ch2.style.border = "none";
    ch3.style.border = "none";
    cimgstr="img/charimg1.png";
    ch_num = 1;
}

function changenum2(){
    ch1.style.border = "none";
    ch2.style.border = "3px solid red";
    ch2.style.borderRadius = "10px";
    ch3.style.border = "none";

    cimgstr="img/charimg2.png";
    ch_num = 2;
}

function changenum3(){
    ch1.style.border = "none";
    ch2.style.border = "none";
    ch3.style.border = "3px solid red";
    ch3.style.borderRadius = "10px";

    cimgstr="img/charimg3.png";
    ch_num = 3;
}
//다음화면 버튼 클릭했을때 화면 바꾸는 함수
function clickNextBtn(){
    hideChPage();
    showLevelPage();
}

function hideChPage(){
    var chContainer=document.getElementById("chcontainer");
    chContainer.classList.add("hide");
}

function showLevelPage(){
    levP.classList.remove("hide");
}