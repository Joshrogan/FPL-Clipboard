function copyTeam() {

    fetch("https://fantasy.premierleague.com/api/my-team/" + teamID + "/")
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        var length = Object.keys(myJson.picks).length
        playerIds = [];
        for(var i = 0; i < length; i++) {
            playerIds.push(myJson.picks[i].element);
        }
        printName(playerIds);
    });

    function printName(playerIds) {
        fetch('https://fantasy.premierleague.com/api/bootstrap-static/')
        .then(function(response) {
            return response.json();
        }).then(function(myJson) {
    
        var length = Object.keys(myJson.elements).length;
        playerNames = [];
        playerPosition = [];

        for(var i = 0; i < playerIds.length; i++) {
          playerElement = playerIds[i];
            for(var j = 0; j < length; j++) {
                if(myJson.elements[j].id == playerElement) {
                    playerNames.push(myJson.elements[j].web_name);
                    playerPosition.push(myJson.elements[j].element_type);
                }
            }
        }
        
        const positionFormat= new Set();
        var playersFormat = []

        for(var i = 0; i < playerPosition.length; i++) {
            if(playerPosition[i] == 1) {
                if(positionFormat.has(playerPosition[i])) {
                    playersFormat.push("\n\nBENCH: " + playerNames[i] + " " +  playerNames[i+1] + " " + playerNames[i+2] + " " +  playerNames[i + 3])
                    break
                } else {
                    positionFormat.add(playerPosition[i])
                    playersFormat.push("GK: " + playerNames[i]);
                } 
            }
            if(playerPosition[i] == 2) {
                if(positionFormat.has(playerPosition[i])) {
                    playersFormat.push(playerNames[i] + " ");
                } else {
                    playersFormat.push("\n\nDEF: " + playerNames[i] + " ");
                    positionFormat.add(playerPosition[i]);
                }
            }
            if(playerPosition[i] == 3) {
                if(positionFormat.has(playerPosition[i])) {
                    playersFormat.push(playerNames[i] + " ");
                } else {
                    playersFormat.push("\n\nMID: " + playerNames[i] + " ");
                    positionFormat.add(playerPosition[i]);
                }
            }
            if(playerPosition[i] == 4) {
                if(positionFormat.has(playerPosition[i])) {
                    playersFormat.push(playerNames[i] + " ");
                } else {
                    playersFormat.push("\n\nFWD: " + playerNames[i] + " ");
                    positionFormat.add(playerPosition[i]);
                }
            }
        }
        playersClip = playersFormat.join('');
        updateClipboard(playersClip)
    });}

    function updateClipboard(newClip) {
        navigator.clipboard.writeText(newClip).then(function() {
        console.log("successfully added ID: " + teamID);
    }, function() {
        /* clipboard write failed */
        console.log("failed to add teamID to clipboard");
        });
    } 
}

//starts here listening for you to navigate to fpl site
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
        teamID = codeInt;
    }
    //copys team when icon clicked
    browser.browserAction.onClicked.addListener(copyTeam);
}
