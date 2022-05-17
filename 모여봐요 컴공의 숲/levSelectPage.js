var level = 0;

function checkLevel(target){
    
    endLevel();
    var checkedLevel=parseInt(target.dataset.lev);
    
    if(checkedLevel === 1){
        level1();
    }
    else if(checkedLevel === 2){
        level2();
    }
    else{
        level3();
    }
    PlayGame();
    checkTime();

}

function goBack(){
    hideLevelPage();
    showChPage();
}

function hideLevelPage(){
    var levelPage=document.getElementById("levP-hider");
    levelPage.classList.add("hide");
}

function showOptionPage(target){
    optionPageHider.classList.remove("hide");
}
