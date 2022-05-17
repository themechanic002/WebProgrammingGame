// 기존에 있는 배열 및 변수 
var colorPalette1=['#ffa2a2','#ffe990','#d0ee96','#9fecf1']; 
var colorPalette2=['#fdb122','#ff4989','#119afa','#00a46d']; 
var colorPalette3=['#383838','#ff6464','#2ed5ff','#ffffff'];
var colorPalette=[colorPalette1,colorPalette2,colorPalette3];

var userPalette=0;
//  여기 아래부터 추가된 내용 -----------------------------------
var userBall=0;
var userSong=0;

// 이전에 클릭된 html 요소 
var pastColorBox;
var pastBall;
var pastSong;

// 공 이미지 소스 
var ballImgSrc=['img/chrome.png','img/firefox.png','img/edge.png'];
var songAudioSrc=[];

// option 팝업창 
var optionPageHider=document.getElementById("option-hider")
var optionPage =document.getElementById("option");


// 색상, 공, 노래 담겨있는 div
var optContentsBox = document.getElementsByClassName("opt-contents");

// X 버튼
var delBtn=document.getElementById("delOption");


var NUM_OF_OPTIONS = 3; // 옵션 개수
var NUM_OF_COLORBOX = 4; // 한 컬러 팔레트 당 컬러  바 개수 

// html에 태그 추가하는 함수  
function createColorBar(){
    var str=" ";
    
    for(var i=0;i<NUM_OF_OPTIONS;i++){
        str+=`<button class="colorBox" data-num="${i}" data-type="color">`
        for(var j=0;j<NUM_OF_COLORBOX;j++){
            str+=`<div class="colorBar" style="background-color: ${colorPalette[i][j]};" data-num="${i}" data-type="color" >  &nbsp </div>`
        }
        str+=`</button>`
    }
    optContentsBox[0].innerHTML=str;
}

function createBallBtn(){
    var str=" "; 

    for(var i=0;i<NUM_OF_OPTIONS;i++){
        str+=`
                <img class="ballImg" src="${ballImgSrc[i]}" data-num="${i}" data-type="ball" ></img>
            `
    }

    optContentsBox[1].innerHTML=str;

}

function createSongBtn(){
    var str=" "; 

    for(var i=0;i<NUM_OF_OPTIONS;i++){
        str+=`
        
            <button class="songBtn" data-num="${i}" data-type="song">SONG${i+1}</button>
        
        `
    }

    optContentsBox[2].innerHTML=str;

}

// 선택한 옵션에 따라 userPalette, userBall, userSong 값 변경 
function selectOption(event){
   
    var target=event.target;
    var dataset=target.dataset;
    var type=dataset.type;
    var num=dataset.num;
   
    // 빈 공간 클릭한 경우 
    if(isNaN(num)){
        return;
    }

    // 제대로 클릭한 경우
    if(type==='color'){ // color 부분 클릭

        pastColorBox.style.border='none';

        var colorBoxes=document.getElementsByClassName("colorBox");
        colorBoxes[num].style.border='3px solid red';
        colorBoxes[num].style.borderRadius="5px";
        userPalette=parseInt(num);
        pastColorBox=colorBoxes[num];
        
    }
    else if(type ==='ball'){ // ball 부분 클릭
        pastBall.style.border='none';    
        
        userBall=parseInt(num);
        target.style.border='3px solid red';
        target.style.borderRadius="5px";
        pastBall=target;
        ballImg.src = ballImgSrc[userBall];

    
    }
    else{ // 테두리 부분 클릭
        var audio=document.getElementById("bg-audio");
        pastSong.style.border='1px solid black';  
        // 오디오 element
        userSong=parseInt(num);

        // 오디오 src 변경 
        audio.src=`audio/music${userSong+1}.mp3`
        target.style.border='3px solid red';
        target.style.borderRadius="5px";
        pastSong=target;

        FX_pop.src = 'audio/FX_pop.mp3';
        
        // music아이콘 바꾸기 
        hideMuteIcon();
        showMusicPlayIcon();
        
    }

}


/*첫번째 옵션이 기본 선택된 모습 보이기*/
function checkDefaultOption(){
    var colorBox=document.getElementsByClassName("colorBox");
    var ballBox=document.getElementsByClassName("ballImg");
    var songBox=document.getElementsByClassName("songBtn");
    pastColorBox = colorBox[0];
    pastBall=  ballBox[0];
    pastSong=  songBox[0];

    pastColorBox.style.border='3px solid red';
    pastColorBox.style.borderRadius="5px"
    pastBall.style.border='3px solid red';
    pastBall.style.borderRadius="5px"
    pastSong.style.border='3px solid red';
    pastSong.style.borderRadius="5px"

    for(var i=1;i<NUM_OF_OPTIONS;i++){
        colorBox[i].style.border='none';
        colorBox[i].style.borderRadius="5px";
        ballBox[i].style.border='none';
        ballBox[i].style.borderRadius="5px";
        songBox[i].style.border='1px solid black';
        songBox[i].style.borderRadius="5px";
    }

}


/* x 버튼 누르면 팝업창 hide 하는 함수 */ 
function deleteOption(){
    optionPageHider.classList.add("hide");
}

/* 자동 재생*/  // - 얘는 main에 삽입해야함  
function autoPlay(){
    var audio=document.getElementById("bg-audio");
    audio.src=`audio/music${userSong+1}.mp3`
    

}

/*옵션 초기화 함수 - 옵션 선택 버튼 눌렀을 경우 실행 */
function optionLoad(){
    
    // html 요소 출력 
    createColorBar();
    createBallBtn();
    createSongBtn();
    
    autoPlay();
    checkDefaultOption();
    
    optionPage.addEventListener('click',selectOption);
    delBtn.addEventListener('click',deleteOption)

}

optionLoad();


