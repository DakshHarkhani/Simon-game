var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Detect when a key is pressed to start the game
$(document).keypress(function() {
  if (!started) {
    startGame();
  }
});

// Detect when a button is clicked by the user
$(".btn").click(function() {
  var buttonColours = ["red", "blue", "green", "yellow"];

  var gamePattern = [];
  var userClickedPattern = [];
  
  var started = false;
  var level = 0;
  
  $(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  
  $(".btn").click(function() {
  
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  });
  
  function checkAnswer(currentLevel) {
  
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
  }
  
  
  function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }
  
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  
  console.log("Button clicked:", $(this).attr("id"));  
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Function to check if the user's answer is correct
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Check if the user has finished the current sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // If the user clicks the wrong button, end the game
    gameOver();
  }
}

// Generate the next sequence and update the game state
function nextSequence() {
  userClickedPattern = []; // Reset user's pattern for the next level
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Enhance visibility of the button click in the sequence
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
    .css("transform", "scale(1.2)") // Scale up for emphasis
    .css("box-shadow", "0 0 20px white"); // Add shadow

  setTimeout(function() {
    $("#" + randomChosenColour).css("transform", "scale(1)").css("box-shadow", "none");
  }, 200);

  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

  // Add additional visual feedback during user clicks
  $("#" + currentColor)
    .css("transform", "scale(1.2)")
    .css("box-shadow", "0 0 20px white");

  setTimeout(function() {
    $("#" + currentColor).css("transform", "scale(1)").css("box-shadow", "none");
  }, 200);
}

// Function to handle game over
function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game over, Press Any Key to Restart");
  
  // Restart the game after game over
  startOver();
}

// Function to start the game
function startGame() {
  level = 0;
  gamePattern = [];
  started = true;
  $("#level-title").text("Level " + level);
  nextSequence();
}

// Function to reset the game state
function startOver() {
  started = false;
}
