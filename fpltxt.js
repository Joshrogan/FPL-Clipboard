function copyTeam() {

console.log(teamID);
function printName(playerIds) {
    console.log("printName");
    console.log(playerIds);
    fetch('https://fantasy.premierleague.com/api/bootstrap-static/')
    .then(function(response) {
      console.log("print name below");
      return response.json();
    }).then(function(myJson) {
    
        var length = Object.keys(myJson.elements).length;
        console.log(length + "total players");
        playerNames = [];
        playerPosition = [];

        for(var i = 0; i < playerIds.length; i++) {
          playerElement = playerIds[i];
            for(var j = 0; j < length; j++) {
                if(myJson.elements[j].id == playerElement) {
                    //console.log(myJson.elements[j].web_name);
                    playerNames.push(myJson.elements[j].web_name);
                    playerPosition.push(myJson.elements[j].element_type);
                }
            }
        }
        
        const set1 = new Set();
        var playersFormat = []

        for(var i = 0; i < playerPosition.length; i++) {
            if(playerPosition[i] == 1) {
                if(set1.has(playerPosition[i])) {
                    playersFormat.push("\n\nBENCH: " + playerNames[i] + ", " +  playerNames[i+1] + ", " + playerNames[i+2] + ", " +  playerNames[i + 3])
                    break
                } else {
                    set1.add(playerPosition[i])
                    playersFormat.push("GK " + playerNames[i]);
                } 
            }
            if(playerPosition[i] == 2) {
                if(set1.has(playerPosition[i])) {
                    playersFormat.push(playerNames[i] + " ");
                } else {
                    playersFormat.push("\n\nDEF " + playerNames[i] + " ");
                    set1.add(playerPosition[i]);
                }
            }
            if(playerPosition[i] == 3) {
                if(set1.has(playerPosition[i])) {
                    playersFormat.push(playerNames[i] + " ");
                } else {
                    playersFormat.push("\n\nMID " + playerNames[i] + " ");
                    set1.add(playerPosition[i]);
                }
            }
            if(playerPosition[i] == 4) {
                if(set1.has(playerPosition[i])) {
                    playersFormat.push(playerNames[i] + " ");
                } else {
                    playersFormat.push("\n\nFWD " + playerNames[i] + " ");
                    set1.add(playerPosition[i]);
                }
            }
        }
        playersClip = playersFormat.join('');
        updateClipboard(playersClip)
    });}

function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(function() {
    /* clipboard successfully set */
      console.log("successful added to clipboard");
  }, function() {
    /* clipboard write failed */
      console.log("failed");
  });
}
fetch("https://fantasy.premierleague.com/api/my-team/" + teamID + "/")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    var length = Object.keys(myJson.picks).length
    console.log(length)
    console.log(myJson.picks[0].element);
    playerIds = [];
    for(var i = 0; i < length; i++) {
        //console.log(myJson.picks[i].element);
        playerIds.push(myJson.picks[i].element);
    }
    printName(playerIds);
  });
}


browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["*://*.premierleague.com/*"]}
);



function logURL(requestDetails) {
    if (requestDetails.url.startsWith("https://fantasy.premierleague.com/api/my-team/") ) {
        console.log("Loading: " + requestDetails.url);
        code = requestDetails.url.split('https://fantasy.premierleague.com/api/my-team/').pop()
        code = code.replace("/", "");
        codeInt = parseInt(code, 10);
        console.log(code);
        console.log(codeInt);
        teamID = codeInt;
    }
    browser.browserAction.onClicked.addListener(copyTeam);
}


