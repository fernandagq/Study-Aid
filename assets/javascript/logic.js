$(document).ready(function() {





// LOGIC FOR PRACTICE.HTML
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