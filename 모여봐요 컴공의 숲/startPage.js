var audio=document.getElementById("bg-audio");

function startBtnListener(){
  
    playSong();
    hideStartPage();
    showChPage();
    checkDefaultCh();
    showMusicPlayIcon();

}

function hideStartPage(){
    var startPageContainer=document.getElementById("startPageContainer");
    startPageContainer.classList.add("hide");
}

function showChPage(){
    var chPageContainer= document.getElementById("chcontainer");
    chPageContainer.classList.remove("hide");
}

function checkDefaultCh(){
    var defaultCh = document.getElementById("char1");
    defaultCh.style.border="3px solid red";
    defaultCh.style.borderRadius="10px";
}

function playSong(){
    audio.src=`audio/music1.mp3`
    audio.volume = 0.5;
}

function playMusic(target){
    var audioPlay=document.getElementsByClassName("audio")[1];
    audio.play();
    
    target.classList.add("hide");
    audioPlay.classList.remove("hide");

    FX_pop.src = 'audio/FX_pop.mp3';
}

function stopMusic(target){
    var audioMute=document.getElementsByClassName("audio")[0];
    audio.pause();
    target.classList.add("hide");
    audioMute.classList.remove("hide");

    FX_pop.src = '';
}

function showMusicPlayIcon(){
    var audioPlay=document.getElementsByClassName("audio")[1];
    audioPlay.classList.remove("hide");
}

function hideMuteIcon(){
    var audioMute=document.getElementsByClassName("audio")[0];
    audioMute.classList.add("hide");
}

audio.addEventListener('ended', function() { 
    this.currentTime = 0;
    this.play();
}, false);