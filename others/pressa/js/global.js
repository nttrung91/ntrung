/*
 * TTS (Text to Speed)
 */
//
 var srcHead = "http://api.voicerss.org/?key=85aac3664d624c01b126fe459af95291&src=",
     srcTail = "&hl=en-gb",
     sourceHead = '<source src="',
     sourceTail = ' ">',

     /* Set of buttons */
     $goBtn = $("#go"),
     $clearBtn = $("#clear"),
     $pronounBtn = $('.btnPronoun'),
     $verbBtn = $(".btnVerb"),
     $nounBtn = $(".word"),
     $collectionBtn = $(".btnCollection"),
     $backBtn = $(".btnBack"),

     /* Collection of nouns */
     $collections = $(".collections"),
     $collection = $(".collection"),

     /* Noun Module*/
     $nouns = $('.nouns'),
     $noun = $('.noun'),

     /* Result Field */
     $result = $(".result"),

    /* Check if already speak */
     $checkIfSpeak = false,

     timeOut;



/* Add keywords to result field when press on verb or noun button */
$verbBtn.click(function() {
  clearTimeout(timeOut);
  addKeywordToResult($(this));
  delayMessage();
});

$nounBtn.click(function() {
  clearTimeout(timeOut);
  addKeywordToResult($(this));
  delayMessage();
});

$pronounBtn.click(function() {
  clearTimeout(timeOut);
  addKeywordToResult($(this));
  delayMessage();
});



/* Go Button, when press -> make sound */
$goBtn.click(function() {
  var $resultText = $result.text();

  if(!$resultText.trim()){
    makeSound("press+on+a+word");
  }else{
    makeSound($resultText);

    // Check if speak
    $checkIfSpeak = true;
  }
});



$clearBtn.click(function() {
  // Clear the result box
  $result.empty();
});


/* Show/Hide Collections */
$collectionBtn.click(function() {
  var $this = $(this);

  collection = $this.data("collection");
  $noun = $('.noun[data-noun=' + collection + ']');
  $nouns = $('.nouns');


  console.log(collection);

  $collections.addClass('is--inActive');

  $noun.addClass('is--active');
  $nouns.addClass('is--active');

  $backBtn.addClass('is--active');

});


$backBtn.click(function() {
  $collections.removeClass('is--inActive');

  $noun.removeClass('is--active');
  $nouns.removeClass('is--active');

  $backBtn.removeClass('is--active');

});


function makeSound(keyword){
  var $sound = $("#sound"),
      src = "",
      $keyword = keyword,
      audio = "";

  // Clear all previous sounds
  $sound.empty();

  // Build up the API Link
  src = srcHead + $keyword + srcTail;

  // Create audio object
  audio = sourceHead + src + sourceTail;

  // Append the object to the DOM
  $sound.append(audio);

  // Make it play sound
  $('#sound')[0].play();

}


/* Add keywords to result */
function addKeywordToResult(element, e){
  var $element = element,
      currentResult = "";

  /* Check if the word is already spoken */
  if($checkIfSpeak){

    // Clear the result box
    $result.empty();

    $checkIfSpeak = false;
  }

  // Store the current text in the result
  $currentResult = $result.text();


  // Store the word
  keywords = $element.data("tts");

  $currentResult = $currentResult + keywords + " ";

  $currentResult = $currentResult.replace("+"," ");

  $currentResult = $currentResult.replace($currentResult[0],$currentResult[0].toUpperCase());

  $result.text($currentResult);

  makeSound(keywords);

}


function delayMessage(){
  timeOut = setTimeout(function(){
                 makeSound("Press on a word");
               },10000);
}







