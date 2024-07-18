// Create A New Pattern
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level=0;



function startOver(){
    level =0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    level++;

    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);



    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

}



$(".btn").click(function(event){

    var userChosenColour =  event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    
        $("#" + currentColour).addClass("pressed");
         setTimeout(function(){$("#" + currentColour).removeClass("pressed")}, 100);
    
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){nextSequence();},1000);
            userClickedPattern = [];
        }
    }
    else{
        playSound("wrong");
        
        $("body").addClass("game-over");
         setTimeout(function(){$("body").removeClass("game-over")}, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        
        startOver();
    }
}
