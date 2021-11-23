var simonArr =[];
var playerArr = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).on("keypress", function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence(); 
        started = true;
    }         
});


$(".btn").on("click", function() {
    
    var userChosenColor = $(this).attr("id");
    playerArr.push(userChosenColor);
    playSound(userChosenColor);

    animatePress(userChosenColor);
    checkAnswer(playerArr.length-1);
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }


function checkAnswer(currentLevel) {
    if (simonArr[currentLevel] === playerArr[currentLevel]) {
        if(simonArr.length === playerArr.length) {
            setTimeout(function () {
               nextSequence();
            }, 1500);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)

        startOver();
    }
}


function nextSequence(){
    var randomNumber, chosenColor;
    playerArr = [] ;
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    chosenColor = buttonColors[randomNumber];
    simonArr.push(chosenColor);

    $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chosenColor);
  }
  
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
  function startOver() {
    level = 0;
    simonArr = [];
    started = false;
  }
  