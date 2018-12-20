
  /**
   * Sample JavaScript code for search.cse.siterestrict.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */
      var googlesearchapi = "key=AIzaSyAqX99HxyrNA1N863dK4Otpc4QGFYPSaCE";

  function loadClient() {
    gapi.client.setApiKey(googlesearchapi);
    return gapi.client.load("https://crossorigin.mehttps://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded before calling this method.
  function execute() {
    return gapi.client.search.cse.siterestrict.list({
      "q": "cheetah",
      "cx": "001117967465507105530:wwvqelhmlxk",
      "num": 10,
      "safe": "off"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client");

