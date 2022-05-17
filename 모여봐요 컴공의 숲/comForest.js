// 내용 각자 추가 

/* 사용자 목숨 */ 
var life;

/* 컬러 선택 옵션 */
var colorPalette1=['#ffa2a2','#ffe990','#d0ee96','#9fecf1']; 
var colorPalette2=['#fdb122','#ff4989','#119afa','#00a46d']; 
var colorPalette3=['#383838','#ff6464','#2ed5ff','#ffffff'];
var colorPalette=[colorPalette1,colorPalette2,colorPalette3];
var userPalette=0; // default 0

/* canvas 관련 변수*/
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;

/* box 관련 변수*/
var BOX_ROW=8; // 임시 설정
var BOX_COL=5; // 임시 설정 
var BOX_WIDTH =CANVAS_WIDTH/BOX_ROW; // 임시 설정
var BOX_HEIGHT=(CANVAS_HEIGHT/4)/BOX_COL; // 임시 설정 
var boxes=[];

var MAX_SPECIAL_BOX=5; // 최대로 생성할 수 있는 특수 벽돌 개수 - 임의 설정 (3개에서 7개로)
var BOX_TYPE_NUM=4;
var FOR_B_MAX_RAND_REPEAT=9; // for 박스 최대 반복횟수 (2~10)
var RAND_B_MAX_RAND_REPEAT=5; // 와 rand 최대 반복횟수(1~5) 

/* box 내부 text 관련 변수 */
var FONT = '12px serif';
  
/* 공 관련 변수 */
var DIAMETER = 30; // 미정 -------------------------------------------------- !
var x=Math.floor(Math.random()*(CANVAS_WIDTH-DIAMETER));
var y=CANVAS_HEIGHT/3;
var dx = 2;
var dy = 2;
var ballImg = new Image();
ballImg.src = 'img/chrome.png';

/* 가짜공 관련 변수 */
var fake_x=Math.floor(Math.random()*(CANVAS_WIDTH-DIAMETER)); //가짜공 x,y
var fake_y = 0;
var fake_dx = 2;
var fake_dy = 2;

var f_x=Math.floor(Math.random()*(CANVAS_WIDTH-DIAMETER));
var f_y = 0;
var f_dx = -2;
var f_dy = 2;


/* 바 관련 변수 */
var barWidth = 100; // 단계마다 초기화 
var BAR_HEIGHT = 10; // 초기화 필요 ---------------------------------------- !
var barX = (CANVAS_WIDTH - barWidth)/2; // bar의 왼쪽 위 꼭짓점 x좌표 
var barY = CANVAS_HEIGHT-BAR_HEIGHT; // bar의 왼쪽 위 꼭짓점 y좌표
var relativeX;

/* 바 움직임 관련 이벤트리스너 */
document.addEventListener("mousemove",mouseMoveHandler,false);


/* 점수, 승리조건 관련 변수 */
var GOAL_SCORE =10;
var totalScore=0;
var isClear=false;// 추가 
//var isBox = false;

/* 레벨 관련 변수*/ 
//var curLevel=1;
var level = 0;
var levelArr = ["lv1","lv2","lv3"];

/* 시간 관련 변수 */
var setTime = 4000;
var timer;

var gameTimer;

/* 화면표시 관련 변수 */
var mainP = document.getElementById("mainP-hider");
var levP = document.getElementById("levP-hider");
var gameoverP = document.getElementById("gameOver-hider");
//var gameoverBackImg = document.getElementById("gameoverbox").style.backgroundImage;

/* 사운드 효과 관련 변수 */
var FX_pop = new Audio('audio/FX_pop.mp3');
FX_pop.volume = 0.75;

//아이템
var items = [];
var items_dY = 2;

//커피
var coffee;
var coffeeImg = new Image(); /* 이미지 객체 생성 */
coffeeImg.src = "img/item_coffee.png"; /* 이미지 파일 이름 설정 */
var coffeeSpawn;
var isCoffee = false;
var coffeeDuration = 4000; 
var coffeeUI = document.getElementById("coffeeUI");
var coffeeTime;
var coffeeTimeEnd;

//에너지드링크 아이템
var drink;
var drinkImg = new Image();
drinkImg.src= "img/item_drink.png";
var drinkSpawn;
var drinkDuration = 4000;
var drinkUI = document.getElementById("drinkUI");
var drinkTime;
var drinkTimeCng;
var drinkTimeEnd;

/* error 아이템 관련 변수 */
var error;
var error_dy = 5;
var errorImg = new Image(); /* 에러 아이템 이미지 */
//errorImg.addEventListener("load",item_error,false);
errorImg.src= "img/item_error.png";
var errorSpawn;
var isError = false;
var errorDuration = 4000;
var errorUI = document.getElementById("errorUI");
var errorTime;
var errorTimeEnd;

//아이템 정보 생성
function createItems() {
    items[0] = {name: "coffee", x: Math.floor(Math.random()*(CANVAS_WIDTH-32)), y: 0}; //20 : 아이템 가로 크기
    items[1] = {name: "drink", x: Math.floor(Math.random()*(CANVAS_WIDTH-32)), y: 0};
    items[2] = {name: "error", x: Math.floor(Math.random()*(CANVAS_WIDTH-32)), y: 0};
}


//커피
function drawCoffee() {
    context.drawImage(coffeeImg, coffee.x, coffee.y);
    calcCoffeeY ();
    //맵에 남는 잔상은 맵 전체 그리고 지우는 함수에서 해결 
}
function calcCoffeeY () {
    coffee.y = coffee.y + items_dY;
    
    //bar랑 피격판정, 효과 발동
    if ((coffee.y+32) > barY && (coffee.x > barX)&&(coffee.x < barX + barWidth) ){
        coffeeSpawn = false;
        isCoffee = true; // 공-바닥 피격판정 판정시 isCoffee = true 조건 추가
        coffeeUI.classList.remove("hide");
        coffeeTimeEnd = setTimeout(function () {
            isCoffee = false; 
            coffeeUI.classList.add("hide");
        }, coffeeDuration); //지속시간 후 효과 종료
    }

    if (coffee.y > CANVAS_HEIGHT) {
        coffeeSpawn = false;
    }
}
function setcoffee() {
    coffee = items[0];
    drawCoffee();

    coffeeSpawn = true;
}


//드링크
var a = 2;//속도 증감 계수
function ballspeedUp(){
    dx *= a;
    dy *= a;
}
function ballspeedDown(){
    dx /= a*a;
    dy /= a*a;
}
function ballspeedReset(){
    dx *= a;
    dy *= a;
}
function drawDrink() {
    context.drawImage(drinkImg, drink.x, drink.y);
    calcDrinkY ();
    //맵에 남는 잔상은 맵 전체 그리고 지우는 함수에서 해결 
}
function calcDrinkY () {
    drink.y = drink.y + items_dY;
    
    //bar랑 피격판정, 효과 발동
    if ((drink.y+32) > barY && (drink.x > barX)&&(drink.x < barX + barWidth) ){
        drinkSpawn = false;
        drinkUI.classList.remove("hide");
        ballspeedUp();
        drinkTimeCng = setTimeout(ballspeedDown, drinkDuration);
        drinkTimeEnd = setTimeout(function(){
            ballspeedReset();
            drinkUI.classList.add("hide");
        }, drinkDuration*1.25);
    }

    if (drink.y > CANVAS_HEIGHT) {
        drinkSpawn = false;
    }
}
function setdrink() {
    drink = items[1];
    drawDrink();

    drinkSpawn = true;
}


//에러아이템
function drawError() {
    context.drawImage(errorImg, error.x, error.y);
    calcErrorY ();
    //맵에 남는 잔상은 맵 전체 그리고 지우는 함수에서 해결 
}
function calcErrorY () {
    error.y = error.y + error_dy;
    
    //bar랑 피격판정, 효과 발동
    if ((error.y+32) > barY && (error.x > barX)&&(error.x < barX + barWidth) ){
        errorSpawn = false;
        isError = true;
        errorUI.classList.remove("hide");
        errorTimeEnd = setTimeout(function () {
            isError = false;
            errorUI.classList.add("hide");
        }, errorDuration); //지속시간 후 효과 종료
    }

    if (error.y > CANVAS_HEIGHT) {
        errorSpawn = false;
    }
}
function seterror() {
    error = items[2];
    drawError();

    errorSpawn = true;
}

/* 벽돌 배열 생성 함수 - 초기화 함수 */ 
function createNormalBox(){
    
    for(i=0;i<BOX_ROW;i++){
        boxes[i] = [];
        for(j=0;j<BOX_COL;j++){
            boxes[i][j]={
                x:0,
                y:0,
                count:1,
                type:0,
                score: 1,
            }
            boxes[i][j].x=i*BOX_WIDTH;
            boxes[i][j].y=j*BOX_HEIGHT;
        }
    }
}


function drawBall(){
    context.drawImage(ballImg,x,y,DIAMETER ,DIAMETER);
    //공 선택하는 부분 없어서 일단 크롬만 나머지는 img 만 바꾸면됨.
    x += dx;
    y += dy;
}
function drawfakeball(){
    context.drawImage(ballImg,fake_x,fake_y,DIAMETER ,DIAMETER);
    fake_x += fake_dx;
    fake_y += fake_dy;
    if(fake_x <= 0 || fake_x+DIAMETER >= CANVAS_WIDTH)
        fake_dx= -fake_dx;
    if(fake_y <= 0 || fake_y+DIAMETER >= CANVAS_HEIGHT)
        fake_dy= -fake_dy;
}
function drawfball(){
      context.drawImage(ballImg,f_x,f_y,DIAMETER ,DIAMETER);
    
    f_x += f_dx;
    f_y += f_dy;
   
    if(f_x <= 0 || f_x+DIAMETER >= CANVAS_WIDTH)
        f_dx= -f_dx;
    if(f_y <= 0 || fake_y+DIAMETER >= CANVAS_HEIGHT)
        f_dy= -f_dy;
}


/* 바 그리는 함수 */
function drawBar(){
    context.beginPath();
    context.rect(barX, CANVAS_HEIGHT-BAR_HEIGHT, barWidth, BAR_HEIGHT);
    context.fillStyle = "green";
    context.fill();
    context.closePath();
}

/* 움직임 그리는 함수 */
function draw(){
    context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    drawBall();
    drawBar();
    drawBoxNText();
    if (coffeeSpawn){
        drawCoffee();
    }
    if (drinkSpawn){
        drawDrink();
    }
    if (errorSpawn){
        drawError();
    }
    if (level == 2){
        drawfakeball();
    }
    if (level == 3){
        drawfakeball();
        drawfball();
    }


    //---------------------충돌함수 추가
    collideWall();
    collideBar();
    collideFloor();
    crushBox();
   
    showLevel();
    levelUp();

}

// var barX = (CANVAS_WIDTH - barWidth)/2;
/* 마우스 컨트롤 함수 */
function mouseMoveHandler(e){
    relativeX = e.clientX - canvas.getBoundingClientRect().left;
    if(relativeX > 0 && relativeX < CANVAS_WIDTH){
        barX = relativeX - barWidth/2;
    }
}

/* 특수 벽돌 속성부여 함수 - 초기화 함수 */
function createSpecialBox(){
    var numOfSpecialBox=Math.floor(Math.random()*MAX_SPECIAL_BOX)+3; // 특수 벽돌 개수 설정 


    for(i=0;i<numOfSpecialBox;i++){
        
        var randTypeNum=Math.floor(Math.random()*3)+1;
        var randRow=Math.floor(Math.random()*BOX_ROW);
        var randCol=Math.floor(Math.random()*BOX_COL);

        setBoxProperty(randTypeNum,randRow,randCol);
    }
    

}

/* 박스 타입별 count, scroe 속성 변경 함수 - 초기화 함수 */
function setBoxProperty(randTypeNum,randRow,randCol){
    // prinf 벽돌
    if(randTypeNum==1){
        boxes[randRow][randCol].type=1;
        boxes[randRow][randCol].score=2;
    }
    // for문 벽돌
    else if(randTypeNum==2){
        var randRepeat=Math.floor(Math.random()*FOR_B_MAX_RAND_REPEAT )+2; // 적어도 반복횟수 2회부터 
        boxes[randRow][randCol].type=2;
        boxes[randRow][randCol].score=randRepeat;
        boxes[randRow][randCol].count=randRepeat;

    }
    //  rand 벽돌
    else if(randTypeNum==3){
        var randRepeat=Math.floor(Math.random()*RAND_B_MAX_RAND_REPEAT)+1;
        boxes[randRow][randCol].type=3;
        boxes[randRow][randCol].score=randRepeat;
        boxes[randRow][randCol].count=randRepeat;
    }
    else{

    };

}

/* 박스와 텍스트 그리는 함수 */
function drawBoxNText(){
    for(i=0;i<BOX_ROW;i++){
        for(j=0;j<BOX_COL;j++){
            drawBox(i,j);
            drawText(i,j);
        }
    }
}

/* 박스 그리는 함수 */
function drawBox(i,j){
    var X=boxes[i][j].x;
    var Y=boxes[i][j].y;
    var type = boxes[i][j].type;
    var isExist = (boxes[i][j].count>0);
    var color;

    if(isExist){
        switch(type){
            case 0:
                color = colorPalette[userPalette][0]; // 사용자 선택 팔레트에 맞게 변경 
                break;
            case 1:
                color=colorPalette[userPalette][1]; // 사용자 선택 팔color=colorPalette[userPalette][0];
                break;
            case 2:
                color=colorPalette[userPalette][2]; // 사용자 선택 팔레트에 맞게 변경 
                break;
            case 3:
                color=colorPalette[userPalette][3]; // 사용자 선택 팔레트에 맞게 변경 
                break;
        }
        context.fillStyle = color ;
        context.fillRect(X, Y, BOX_WIDTH-1, BOX_HEIGHT-1);
    }

}

/* 박스 내부에 글씨 쓰기 */
function drawText(i,j){

    var X=boxes[i][j].x;
    var Y=boxes[i][j].y;
    var type = boxes[i][j].type;
    var count= boxes[i][j].count;
    var isExist = (boxes[i][j].count>0);
    var text;

    if(isExist){
        switch(type){
            case 0:
                text='';
                break;
            case 1:
                text='print()';
                break;
            case 2:
                text=`for(${count})`;
                break;
            case 3:
                text='rand()';
                break;
        }
        // 글씨 쓰기
        context.fillStyle = '#2f3640';
        context.textAlign='center';
        context.textBaseline='middle';
        context.font=FONT;
        context.fillText(text, X + BOX_WIDTH/2, Y + BOX_HEIGHT/2);
    }

}


function endLevel(){
    document.getElementById("gametime").innerHTML = "시간 종료";
    clearInterval(timer);
    clearInterval(gameTimer);
    clearTimeout(coffeeTime);
    clearTimeout(drinkTime);
    clearTimeout(errorTime);
    clearTimeout(coffeeTimeEnd);
    clearTimeout(drinkTimeCng);
    clearTimeout(drinkTimeEnd);
    clearTimeout(errorTimeEnd);
    stain1.classList.add("hide");
    stain2.classList.add("hide");
    context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

/* 벽 충돌 */
function collideWall(){
    if( x <= 0 || x+DIAMETER >= CANVAS_WIDTH)
        dx=-dx;
    if(y <= 0)
        dy=-dy;
}

/* 바 충돌 */
function collideBar(){
    if(x + DIAMETER >= barX && x <= barX + barWidth && y + DIAMETER >= barY+1)
        dy=-dy;
}

/* 바닥 충돌 */
function collideFloor(){
    if(y+DIAMETER >= CANVAS_HEIGHT) {
        if (isCoffee){
            dy = -dy;
        } else {
            life=false;
            endLevel();
            GameOver();
        }
    }
        // 또는 clearinterval 및 처리 함수 ----------------------------------------------------- ! 
}

/* 벽돌 충돌 */
function crushBox(){
    for(i= 0; i < BOX_ROW ;i++) {
        for(j= 0; j<BOX_COL; j++) {
            if(boxes[i][j].count > 0) {

                var boxX = boxes[i][j].x;
                var boxY = boxes[i][j].y;
                // 벽돌 충돌 감지 
                if(x+DIAMETER >= boxX && x <= boxX + BOX_WIDTH && y+DIAMETER >= boxY && y <= boxY + BOX_HEIGHT ){
                    y +=2;
                    dy = -dy;
                    if(!isError) { //에러아이템 발동 여부
                        boxes[i][j].count--;
                        FX_pop.play();
                    }
                        
                    // box요소의 count 0 인 경우 점수 얻기
                    if(boxes[i][j].count==0){
                        getScore(i,j);
                        showScore();
                    }

                    // printf벽돌 출력
                    if(boxes[i][j].type===1 && boxes[i][j].count===0){
                        printPrint();
                        boxes[i][j].count--;
                    }
                }
            }
        }
    }

}

/* 점수 얻는 함수 */ 
function getScore(i,j){
    totalScore+=boxes[i][j].score;
}

/* 점수 출력하는 함수*/
function showScore(){
    var htmlScore=document.getElementById("score");
    htmlScore.innerHTML=`${totalScore}/${GOAL_SCORE}`
    
}

/* print 벽돌 깬 경우에 실행되는 함수*/ 
function printPrint(){
    var printBoxText= document.getElementById("printBoxText");
    printBoxText.classList.remove("hide");
    setTimeout(removePrint,3000);
}

/* level 보여주는 함수 */
function showLevel(){
    var curlevel =document.getElementById("level");
    curlevel.innerHTML=`Level ${level}`;
}

/* 출력된 print감추는 함수 */
function removePrint(){
    var printBoxText= document.getElementById("printBoxText");
    printBoxText.classList.add("hide");
}

function PlayGame(){
    context.clearRect(0,0,600,350);
    levP.classList.add("hide");
    mainP.classList.remove("hide");
    document.getElementById("cimg").src = cimgstr;

    x=Math.floor(Math.random()*(CANVAS_WIDTH-DIAMETER));
    y=CANVAS_HEIGHT/3;
    dx = 2;
    dy = 2;
    life = true;
    //isBox = false;
    totalScore = 0;
    setTime=4000;//추추추가

    isCoffee = false; 
    coffeeUI.classList.add("hide");
    coffeeSpawn = false;
    drinkUI.classList.add("hide");
    drinkSpawn = false;
    isError = false;
    errorUI.classList.add("hide");
    errorSpawn = false;

    // 초기화 함수에서 이렇게 호출해야함. 
    createNormalBox();
    createSpecialBox();
    createItems();
    drawBoxNText();
    showScore();

    gameTimer = setInterval(draw,10);
 
    coffeeTime = setTimeout(setcoffee, setTime/5);
    drinkTime = setTimeout(setdrink, setTime/2);
    errorTime = setTimeout(seterror, setTime*4/5);
}

function GameOver() {
    var bgstr = "url('bgImg/" + level + "_ch" + ch_num + ".jpg')";
    document.getElementById("gameoverbox").style.backgroundImage = bgstr;
    mainP.classList.add("hide");
    gameoverP.classList.remove("hide");
}

function ClearLevel(){
    showClearPage();
    setTimeout(hideClearPage,3000);    
}

function showClearPage(){
    var mainPhider=document.getElementById("mainP-hider");
    var clearPage = document.getElementById("gameClean-hider");
    
    mainPhider.classList.add("hide");
    clearPage.classList.remove("hide");
}

function hideClearPage(){
    var mainPhider=document.getElementById("mainP-hider");
    var clearPage = document.getElementById("gameClean-hider");
    
    clearPage.classList.add("hide");
    mainPhider.classList.remove("hide");

}


/*게임 통과하면 통과 화면 출력후 다음단계 실행*/
function levelUp(){ // 시간 제한 끝났을 때 목표 점수 도달 여부 판정 후 레벨업
    if(totalScore >= GOAL_SCORE ){
        context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT); 
        if(level === 1){
            endLevel();
            ClearLevel();
            level2();
            setTimeout(PlayGame,3000);
            setTimeout(checkTime,3000);
        }
        else if(level === 2){
            endLevel();
            ClearLevel();
            level3();
            setTimeout(PlayGame,3000);
            setTimeout(checkTime,3000);
        }
        else{
            endLevel();
            endGame(); 
        }
    }
}

function restart(){ // 실패한 레벨에서 재시작
    endLevel();
    gameoverP.classList.add("hide");
    if(level == 1){
        level1();
    }
    if(level == 2){
        level2();
    }
    if(level == 3){
        level3();
    }
    PlayGame();
    checkTime();
}

function menuBtnListener(){
    endLevel();
    showLevelPage();
    hideBtnPage();
    document.getElementById("gameEnd-hider").classList.add("hide");
}

function hideBtnPage(){
   var btnPageContainer = document.getElementById("gameOver-hider");
   btnPageContainer.classList.add("hide");
}

function restartBtnListener(){
   hideBtnPage();
   restart();
}

function level1(){
    barWidth = 100;
    level = 1;
    canvas.style.backgroundImage="url(bgImg/morning.jpg)"
}

function level2(){
    barWidth = 70;
    level = 2;
    canvas.style.backgroundImage="url(bgImg/afternoon.jpeg)"

    showstain1();
    drawfakeball();
}

function level3(){
    barWidth = 50;
    level = 3;
    canvas.style.backgroundImage="url(bgImg/night.jpg)"

    showstain1();
    showstain2();
    drawfakeball();
    drawfball();
}

function checkTime(){
    timer = setInterval(function(){
        var timeText=document.getElementById("gametime");
        timeText.innerHTML = Math.floor(setTime/100) + "초";
        setTime -= 0.5;
        if(setTime/100<6){
            timeText.style.color="red";
            timeText.style.fontSize="18px";
            
        }else{
            timeText.style.color="black";
            timeText.style.fontSize="normal";
        }

        if(setTime/100 < 0){
            endLevel();
            GameOver();
        }
    });
}

/* 커피자국 */
var stain1 = document.getElementById("coffeestain1");
var stain2 = document.getElementById("coffeestain2");
function showstain1(){
    stain1.classList.remove("hide");

}
function showstain2(){
    stain2.classList.remove("hide");

}

function endGame(){
    var gamePage = document.getElementById("mainP-hider");
    gamePage.classList.add("hide");
    var endingPage = document.getElementById("gameEnd-hider");
    endingPage.classList.remove("hide");
}


function goToStart(){
    window.location.reload();
   
}