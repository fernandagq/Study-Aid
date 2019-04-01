var word;
 // Rafael: populate counter
var scapeCounter = localStorage.length;
$("#stackCounter").html(scapeCounter);


//creating function to make API call and populate results
function displaySearchTerm(){
//retrieving input value from search bar
    word= $("#term-input").val().trim();
    console.log(word);
//establishing url for api call
    var key= "?key=1f40dde8-50d6-4eb6-9168-6f465c469eb9";
    var queryUrl= "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";

//emptying definition container 
    $("#definition").empty();

//making the API call using ajax to communicate with server
$.ajax({
    url: queryUrl + word + key,
    method:"GET"
}).then(function(response){
    console.log(response);
//mapping into the response array to extract first three definiitons 
    var term = response[0].shortdef[0]; 
    var termTwo = response[0].shortdef[1];
    var termThree = response[0].shortdef[2];
//execute code even if response is undefined, will generate error otherwise.
if (response[i] == undefined) {
    var termDiv = $("<div>");
    var p= $("<p>");
    p.text(term);  
    var pTwo= $("<p>")
    pTwo.text(termTwo);
    var pThree= $("<p>");
    pThree.text(termThree);
    var pFour=$("<p>");
    pFour=$("<p>");
    termDiv.append(p, pTwo, pThree, pFour);
    $("#definition").append(termDiv);


    var input = $("#term-input").val("");
//execute function even if definitions do not have idioms. 
} else if (response[i].fl!=("idiom")){
   

    var termDiv = $("<div>");
    var p= $("<p>");
    p.text(term);  
    var pTwo= $("<p>")
    pTwo.text(termTwo);
    var pThree= $("<p>");
    pThree.text(termThree);
    var pFour=$("<p>");
    pFour=$("<p>");
    termDiv.append(p, pTwo, pThree, pFour);
    $("#definition").append(termDiv);


    var input = $("#term-input").val("");


};

});

}

//creating function to store data on click of save button 

$(".save").on("click", function(event){
    
    var ownDef= $("#ownDefinition").val().trim();
    for (var i=0; i<ownDef.length; i++){

    var newDef=[];
    newDef.push(ownDef);
    localStorage.setItem(word, ownDef);
    $("#ownDefinition").val(""); // Added by Rafael to clear out textarea box after Save is clicked
    scapeCounter = localStorage.length;
    console.log(scapeCounter);
    $("#stackCounter").html(scapeCounter);
    $("#stackCounter").addClass(uk-animation-shake);
    }
 }); //end of click listener


$(".search").on("click", function(event){
   
    event.preventDefault();

    var word= $("#term-input").val().trim();

    displaySearchTerm();

});

