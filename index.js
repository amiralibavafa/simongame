var wrong = new Audio('sounds/wrong.mp3');
var started = false;
var level = 0

var colorArray = ['red', 'blue', 'yellow', 'green'];

var gameSequence = [];
var userSequence = [];

$('body').keypress(function(e) { 
    gameSequence = [];
    userSequence = [];
    $('body').css('background-color', '#00224D');
    if (e.key){}
    started = true;
    $('h2').hide();
    console.log('pressed');
    nextSequence();

});

function nextSequence(){
    if (started){
        level++;
        $('h1').text('level : '+level);
        index = Math.floor((Math.random()*4));
        console.log(index);
        var randomColor = colorArray[index];
        gameSequence.push(randomColor);
        console.log(index);
        buttonAnimate(randomColor);
        playSound(randomColor);
    }
}

$('button').click(function () { 
    var theColor = $(this).attr("class");
    playSound(theColor);
    buttonAnimate(theColor);
    userSequence.push(theColor);
    console.log(userSequence);
    checkAnswer(userSequence.length);   
});

function checkAnswer(len){
    var is_passed = true;
    for (var i = 0; i < len; i++){
        if (userSequence[i] != gameSequence[i]){
            is_passed = false;
            break;
        }

    }

    if (is_passed && len == level){
        userSequence = [];
        setTimeout(function(){nextSequence();}, 1100);
    }

    if (!is_passed) {gameOver();}
    
}

function playSound(color){
    var soundName = 'sounds/'+color+'.mp3';
    var thesound = new Audio(soundName);
    thesound.play();
}

function buttonAnimate(color){
    $('button.'+color).css('opacity', '0.5');

    setTimeout(function(){
        $('button.'+color).css('opacity', '1');
    }, 200);
}

function gameOver(){
    $('body').css('background-color', '#E72929');
    setTimeout(function(){
        $('body').css('background-color', '#00224D');
    },500);
    $('h1').text('Game Over');
    $('h2').show();
    $('h2').text('Press Any Key To Play Again');
    wrong.play();
    gameSequence = [];
    userSequence = [];
    level = 0;
    started = false;
}