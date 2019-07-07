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

        for(var i = 0; i < playerPosition.length; i++) {
            if(playerPosition[i] == 1) {
                if(set1.has(playerPosition[i])) {
                    console.log("BENCH: " + playerNames[i] + ", " +  playerNames[i+1] + ", " + playerNames[i+2] + ", " +  playerNames[i + 3])
                    break
                } else {
                    set1.add(playerPosition[i])
                    console.log("GK " + playerNames[i]);
                } 
            }
            if(playerPosition[i] == 2) {
                if(set1.has(playerPosition[i])) {
                    console.log("DEF " + playerNames[i]);
                } else {
                    console.log("----");
                    console.log("DEF " + playerNames[i]);
                    set1.add(playerPosition[i]);
                }
            }
            if(playerPosition[i] == 3) {
                if(set1.has(playerPosition[i])) {
                    console.log("MID " + playerNames[i]);
                } else {
                    console.log("----"); 
                    console.log("MID " + playerNames[i]);
                    set1.add(playerPosition[i]);
                }
            }
            if(playerPosition[i] == 4) {
                if(set1.has(playerPosition[i])) {
                    console.log("FWD " + playerNames[i]);
                } else {
                    console.log("----");
                    console.log("FWD " + playerNames[i]);
                    set1.add(playerPosition[i]);
                }
            }
        }
    });}

fetch('https://fantasy.premierleague.com/api/my-team/232297/')
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

