var stats = (function() {
  events.on("dataChanged", renderStats);

  function renderStats(e){
    console.log("statsrender: " + e)
    // document.querySelector("#scoreboard").innerHTML = e;
  }
})()
