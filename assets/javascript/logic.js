$(document).ready(function() {





// ********** LOGIC FOR PRONUNCIATION **********
var myArray = [];
var uniqueArray = [];
var flValue = "";
var writtenPron = "";
var audioPron = "";

function displayPronunciation() {
    // Grab the term from the input form
    var word= $("#term-input").val().trim();
    var key= "?key=1f40dde8-50d6-4eb6-9168-6f465c469eb9";
    var queryUrl= "http://www.dictionaryapi.com/api/v3/references/collegiate/json/";
    // Send query to Ajax
    $.ajax({
        url: queryUrl + word + key,
        method:"GET"
    }).then(function(response) {
        console.log(response.length);
        // Populate the array
        // For each item in the response array
        for (var i=0; i<response.length; i++) {
            // Skip if the item doesn't have a prs parameter
            if (response[i].hwi.prs == undefined) {
            // If it has a prs parameter, then get the pos (fl) and prs
            } else {
                var flValue = response[i].fl;
                var prsArray = response[i].hwi.prs;
                console.log(response.length); 
                console.log(flValue);
                // For each item in the prs array
                for (var j=0; j<prsArray.length; j++) {
                    // Skip if the prs doesn't have a sound parameter with it
                    console.log(prsArray.length);
                    var wordArray = [];
                    if (prsArray[j].sound == undefined) {
                    } else if ($.inArray(prsArray[j].sound.audio, myArray) !== -1) {
                        console.log(prsArray[j].sound.audio);
                        console.log(myArray);
                    } else {
                        // If it has a sound parameter, grab the written pronunciation and audio file name, and along with flValue, send to myArray
                        var writtenPron = prsArray[j].mw;
                        var audioPron = prsArray[j].sound.audio;
                        console.log(flValue);
                        console.log(writtenPron);
                        console.log(audioPron);
                        console.log(j);
                        console.log(myArray);
                        // Push the fl (pos), mw (written pronunciation) and audio (sound file name) into an array
                        wordArray.push(flValue, writtenPron, audioPron);
                        myArray.push(wordArray);
                    }; // End of nested if statement
                }; // End of nested for statement
            }; // End of first if statement
            console.log(myArray.length);
        }; // End of for response.length statement

        // Remove duplicates from the array
        // Need a function or something for this

        // Create the Divs
        // Source for play icon: https://iconmonstr.com/media-control-4-png/
        for (var i=0; i < myArray.length; i++) {
            var d = $("<div>");
            var p = $("<p>");
            var a = $("<a>");
            // var img = $("<img src=\"./assets/images/play.png\" alt=\"Play\">");
            console.log(myArray[i]);
            var pos = myArray[i][0];
            var pron = myArray[i][1];
            var file = myArray[i][2];
            console.log(pos, pron, file);
            // a.append(img);
            // Create audio file link
            var uniChar = file.slice(0,1);
            var biChar = file.slice(0,2);
            var triChar = file.slice(0,3);
            var subDir = "";
            console.log(uniChar);
            if (triChar == "bix") {
                subDir = "bix";
            } else if (biChar == "gg") {
                subDir = "gg";
            } else if (alphabetic(uniChar) == true) {
                subDir = uniChar;
            } else {
                subDir = "number";
            }
            // Function to check letters
            function alphabetic(inputtxt) {
                var letters = /^[a-zA-Z]+$/;
                if ((inputtxt.match(letters))) {
                    return true;
                } else {
                    return false; 
                }
            }
            var url = "https://media.merriam-webster.com/soundc11/" + subDir + "/" + file + ".wav";
            console.log(url);
            a.attr("href", url);
            p.html(pron);
            p.append(a);
            d.append(p);
            $("#pronDiv").append(d);
            $("#audioDiv").append("<audio id=\"embed_player\" src=" + url + " autostart=\"false\" controls=\"true\"></audio>");
            console.log(d);
        } // End of for myArray.length statement        
    }); // End of Ajax function
} // End of displayPronunciation function

$(".search").on("click", function(event){
    event.preventDefault();
    var word= $("#term-input").val().trim();
    displayPronunciation();

}); // End of search button click function


// ********** LOGIC FOR PRACTICE.HTML **********
var wordArray = [
    ["apple", "red shiny thing"],
    ["banana", "yellow matte thing"],
    ["yogurt", "berry gooey thing"],
    ["soda", "sticky drink thing"],
    ["taco", "foldable edible thing"],
    ["chai", "spicy beverage"],
    ];
var wordLearned = 0;
var outerIndex = 0;
var wordIndex = 0;
var defIndex = 1;
var stackEnded = false;

function popArray() {
    wordArray = [
        ["apple", "red shiny thing"],
        ["banana", "yellow matte thing"],
        ["yogurt", "berry gooey thing"],
        ["soda", "sticky drink thing"],
        ["taco", "foldable edible thing"],
        ["chai", "spicy beverage"],
        ];
}

function loadPractice() {
    // Load an array with words and definitions from local storage
    // ******* NEED LOCAL STORAGE FOR THIS PART *******

    wordLearned = 0;
    outerIndex = 0;
    popArray();
    stackEnded = false;

    function shuffleArray(array) {
        for (let i = wordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }
    }
    shuffleArray();

    $("#wordDiv").text(wordArray[outerIndex][wordIndex]);
    $("#wordDefDiv").text(wordArray[outerIndex][defIndex]).hide();
    $("#wordCountDiv").text(wordArray.length);
    $("#wordLearnedDiv").text(wordLearned)

}; // End of loadPractice function

// WHEN user clicks on the word
$(this).on("click", "#wordDiv", function() {
    if (stackEnded == false) {
        $("#wordDefDiv").show();
    }
});

// WHEN user clicks on Beginning button
$(this).on("click", "#btnBegin", function() {
    if (wordArray.length == 0) {
        endStack();
    } else if (wordArray.length > 0) {
        outerIndex = 0;
        stackEnded = false;
        $("#wordDiv").text(wordArray[outerIndex][wordIndex]);
        $("#wordDefDiv").text(wordArray[outerIndex][defIndex]).hide();
    }
});

function endStack() {
    var endOfStack = "You've reached the end of the stack. Click <b>Beginning</b> to practice any remaining words, or click <b>Start Over</b> to practice all words over again."
    $("#wordDiv").html(endOfStack);
    $("#wordDefDiv").hide();
    stackEnded = true;
};

// WHEN user clicks on Next button
function nextWord() {
    if (outerIndex > wordArray.length) {
        endStack();
    } else if (outerIndex == wordArray.length) {
        endStack();
    } else if (outerIndex < wordArray.length) {
        outerIndex++;
        if (outerIndex == wordArray.length) {
            endStack();
        } else if (outerIndex < wordArray.length) {
            $("#wordDiv").text(wordArray[outerIndex][wordIndex]);
            $("#wordDefDiv").text(wordArray[outerIndex][defIndex]).hide();
        }
    }
}

$(this).on("click", "#btnNext", function() {
    if (outerIndex <= wordArray.length - 1) {
        nextWord();
    }
});

// WHEN user clicks on GotIt button
$(this).on("click", "#btnGotIt", function() {
    if (wordArray.length == 0) {
        endStack();
    } else if (wordArray.length > 0) {
        wordArray.splice(outerIndex, 1);
        $("#wordCountDiv").text(wordArray.length);
        wordLearned++;
        $("#wordLearnedDiv").text(wordLearned);
        outerIndex--;
        nextWord();
    }
});

// WHEN user clicks on KeepPracticing button
$(this).on("click", "#btnKeep", function() {
    if (outerIndex < wordArray.length) {
        nextWord();
    }
});

// WHEN user clicks on StartOver button
$(this).on("click", "#btnStartOver", function() {
    loadPractice();
});

loadPractice();

}); // End of $(document).ready function