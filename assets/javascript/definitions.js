

var word;
var scapeCounter = localStorage.length; // Rafael: populate counter
$("#stackCounter").html(scapeCounter);

function displaySearchTerm(){

    
    word= $("#term-input").val().trim();
    console.log(word);
    var key= "?key=1f40dde8-50d6-4eb6-9168-6f465c469eb9";
    
    var queryUrl= "http://www.dictionaryapi.com/api/v3/references/collegiate/json/";
$("#definition").empty();

$.ajax({
    url: queryUrl + word + key,
    method:"GET"
}).then(function(response){
    var results= response;
for (var i=0; i<results.length; i++) {
    console.log(response[i]);
    var term= response[i].shortdef; //word definition
    
    
if (response[i].fl!=("idiom")){
    for (var i=0; i<response.length; i++){
    }
    // localStorage.clear();

    var termDiv = $("<div>");
    var p= $("<p>");
    p.text(term);  //Rafael: trying this without word

    termDiv.append(p);
    $("#definition").append(termDiv);


    var input = $("#term-input").val("");


};        

}
});

}

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
    // localStorage.setItem("Terms: " , JSON.stringify(storageInfoG));
    }
 }); //end of click listener


$(".search").on("click", function(event){
   
    event.preventDefault();

    var word= $("#term-input").val().trim();

    displaySearchTerm();

});

// $(document).on("click", ".search", displaySearchTerm);