$(document).ready(function() {





// ********** LOGIC FOR PRONUNCIATION **********

// FOR EACH pronunciation available in the file

/*
Create an array for pronunciations
An array of response items
For each item in array of response items
Inspect the prs array
If there is a sound object,
then access that and push the mw and audio file to pronunciation array
*/


// Display the written pronunciation in the appropriate Div
// Add an icon of a speaker next to the written pronunciation

// WHEN the user clicks on the pronunciation
// The sound file is played

var pronArray = [];
var uniquePronArray = [];

function displayPronunciation(){
    var word= $("#term-input").val().trim();
    var key= "?key=1f40dde8-50d6-4eb6-9168-6f465c469eb9";
    var queryUrl= "http://www.dictionaryapi.com/api/v3/references/collegiate/json/";
    $.ajax({
        url: queryUrl + word + key,
        method:"GET"
    }).then(function(response) {
        console.log(response.length);
        // Populate the array
        for (var i=0; i<response.length; i++) {
            if (response[i].hwi.prs == undefined) {
            } else {
                var flValue = response[i].fl;
                var prsArray = response[i].hwi.prs;
                console.log(response.length); 
                for (var j=0; j<prsArray.length; j++) {
                    if (prsArray[j].sound == undefined) {
                    } else {
                        var writtenPron = prsArray[j].mw;
                        var audioPron = prsArray[j].sound.audio;
                        console.log(writtenPron);
                        console.log(audioPron);
                    }
            }
            console.log(prsArray);
            console.log(j);
            pronArray[j][0].push(flValue);
            pronArray[j][1].push(writtenPron);
            pronArray[j][2].push(audioPron);
            console.log(pronArray);
        };

        // Remove duplicates from the array
        // Need a function or something for this

        // Create the Divs
        // Source for play icon: https://iconmonstr.com/media-control-4-png/
        for (i=0; i < pronArray.length; i++) {
            var d = $("<div>");
            var p = $("<p>");
            var a = $("<a>");
            var i = $("<img src=\"./assets/images/play.png\" alt=\"Play\">");
            console.log(pronArray);
            var pos = pronArray[0];
            var pron = pronArray[1];
            var file = pronArray[2];
            console.log(pos, pron, file);
            a.append(i);
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
            p.append(a);
            d.append(p);
            $("#pronDiv").append(d);
            console.log(d);
        }



                    // var termDiv = $("<div>");
            // var term= response[i].shortdef[0];
            // var p= $("<p>");
            // p.text("defintion: "+ term);
            // termDiv.append(p);
            // $("#definition").append(termDiv);
        };

        
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