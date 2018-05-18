var stats = (function() {
  events.on("dataChanged", renderStats);

  function renderStats(e){
    console.log("statsrender: " + e)
    console.log("Adding comment for github test")
    // document.querySelector("#scoreboard").innerHTML = e;
  }
})()
