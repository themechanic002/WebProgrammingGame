// 캐릭터 넘버 변수 (여기서부터!) 


var ch1 = document.getElementById("char1");
var ch2 = document.getElementById("char2");
var ch3 = document.getElementById("char3");
var cimg = document.getElementById("char"); //UI에 생성되는 이미지 
function changenum1(){
    
    cimg.src="charimg1.png";
    ch1.style.border = "2px solid red";
    ch2.style.border = "none";
    ch3.style.border = "none";

    
}
function changenum2(){
    ch1.style.border = "none";
    ch2.style.border = "2px solid red";
    ch3.style.border = "none";

    cimg.src="charimg2.png";

    }
function changenum3(){
    ch1.style.border = "none";
    ch2.style.border = "none";
    ch3.style.border = "2px solid red";

    cimg.src="charimg3.png";
    
}
//다음화면 버튼 클릭했을때 화면 바꾸는 함수
function nextslide(){
    clear();
    //다음화면 호출하는 함수 여기에

}
function clear(){
    clearRect(0,0,1000,530);
}
