 // empty array to store the sequence
 var gamePattern = [];

 // empty array for user click input
 var userClickedPattern = [];

 // array of colours
 var buttonColours = ["red", "blue", "green", "yellow"];

 var started = false;

 var level = 0;

 console.log("Started: " + started);

 $(document).keydown(function() {
   if (!started) {

     console.log("Started: " + started);
     $("#level-title").text("level " + level);

     nextSequence();

     started = true;
     console.log("Started: " + started);
   }
 });

 // function to initiate the sequence
 function nextSequence() {

   // empty array for user click input
   userClickedPattern = [];

   // level variable incremented after the function is called
   level++;

   // it will change title according to the current level
   $("#level-title").text("level " + level);

   // generate random number 0 - 4
   var randomNumber = Math.floor(Math.random() * 4);
   // assign number to index array of colours
   var randomChosenColour = buttonColours[randomNumber];
   // push random colour to empty array
   gamePattern.push(randomChosenColour);

   // JQuery to assign id in html element the same as random colour and animate it to flash alike
   $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
   // playSound function is called
   playSound(randomChosenColour);

   // console.log("gamePattern: " + gamePattern);

 }

 // target class btn to have a function after get clicked
 $(".btn").click(function() {
   // targeting the attribute "id" from class btn
   var userChosenColour = $(this).attr("id");
   // console.log(userChosenColour);
   // playSound function is called
   playSound(userChosenColour);
   // push the colour to empty array
   userClickedPattern.push(userChosenColour);
   // console.log("userPattern: " + userClickedPattern);
   checkAnswer(userClickedPattern.length - 1);
   // after class btn clicked, function animatePress will give animated scene according to the current color
   animatePress(userChosenColour);
 })

 // make a function play sound to prevent repetitive code
 function playSound(name) {
   // make audio variable from object Audio(url)
   var audio = new Audio("sounds/" + name + ".mp3");
   // play the assigned audio
   audio.play();
 }

 // make a function to animate the button clicked by user
 function animatePress(currentColour) {
   // manipulate DOM by adding class to the current id
   $("#" + currentColour).addClass("pressed");
   // make another timeout function to remove the added class
   setTimeout(function() {
     $("#" + currentColour).removeClass("pressed");
   }, 100); // this means 100 miliseconds or 0.1 second
 }

 // this function is made to check the answer
 function checkAnswer(currentLevel){
   // if statement to see if the array of game and user are the same
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
     console.log("game pattern: " + gamePattern);
     console.log("user pattern: " + userClickedPattern);
     console.log("success");
     // if statement to see if the length of the array are the same
     if (userClickedPattern.length === gamePattern.length){
       setTimeout(function(){ // then call a function after a number of miliseconds
         nextSequence();
       }, 1000); // 1000 miliseconds
     }
   } else {
     console.log("wrong");
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");
     }, 200);
     $("#level-title").text("Game Over, Press Any Key to Restart");
     startOver();
   }

   function startOver(){
     level = 0;
     gamePattern = [];
     started = false;
   }
 }
