var storageInfoG= [];
var wordG=[];
// var individualDefs=[];
// var word;
function displaySearchTerm(){

    
    var word= $("#term-input").val().trim();
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
    var term= response[i].shortdef[0]; //word definition
    
if (response[i].fl===("noun")){

    
    storageInfoG.push(term);
    wordG.push(word);
    // localStorage.clear();

    var termDiv = $("<div>");
    var p= $("<p>");
    p.text(word + ": " + term);

    termDiv.append(p);
    $("#definition").append(termDiv);


    var input = $("#term-input").val("");

//     for (var i=0; i<results.length; i++) {
    
//     individualDefs.push(word + ": " + term);

// }

};        





}
});

}
$(".save").on("click", function(event){

    localStorage.setItem(wordG , JSON.stringify([storageInfoG]));
    // localStorage.setItem("Terms: " , JSON.stringify(storageInfoG));
    
 }); //end of click listener
   

// here

$(".search").on("click", function(event){
   
    event.preventDefault();

    var word= $("#term-input").val().trim();

    displaySearchTerm();

});

// $(document).on("click", ".search", displaySearchTerm);