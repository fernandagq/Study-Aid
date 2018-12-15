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
    $("#wordDefDiv").show();
});

// WHEN user clicks on Beginning button
$(this).on("click", "#btnBegin", function() {
    outerIndex = 0;
    $("#wordDiv").text(wordArray[outerIndex][wordIndex]);
    $("#wordDefDiv").text(wordArray[outerIndex][defIndex]).hide();
});

function endStack() {
    var endOfStack = "You've reached the end of the stack. Either click <b>Beginning</b> to practice the remaining words, or click <b>Start Over</b> to practice all words over again."
    $("#wordDiv").html(endOfStack);
    $("#wordDefDiv").hide();
};

// WHEN user clicks on Next button
function nextWord() {
    outerIndex++;
    if (outerIndex < wordArray.length) { 
        $("#wordDiv").text(wordArray[outerIndex][wordIndex]);
        $("#wordDefDiv").text(wordArray[outerIndex][defIndex]).hide();
    } else if (outerIndex + 1 >= wordArray.length) {
        outerIndex--;
        endStack();
    };
}

$(this).on("click", "#btnNext", function() {
    nextWord();
});

// WHEN user clicks on GotIt button
// Need to fix issue with counter continuing whenever user clicks button
$(this).on("click", "#btnGotIt", function() {
    wordArray.splice(outerIndex, 1);
    $("#wordCountDiv").text(wordArray.length);
    wordLearned++;
    $("#wordLearnedDiv").text(wordLearned);
    nextWord();
});

// WHEN user clicks on KeepPracticing button
$(this).on("click", "#btnKeep", function() {
    nextWord();
});

// WHEN user clicks on StartOver button
$(this).on("click", "#btnStartOver", function() {
    loadPractice();
});

loadPractice();

}); // End of $(document).ready function