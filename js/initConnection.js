window.onload = eventsListeners


function submit(event) {
  event.preventDefault()
  var sessionInput = document.getElementById("sessionInput");
  var inputText = sessionInput.value;
  var data = readJSON("sessions.json");

  var valid = false;

  for(var key in data) {
    if (key.toLowerCase() == inputText.toLowerCase()) {
      valid = true;
      break;
    }
  }

  if (!valid) {
    var inputStyle = sessionInput.style;
    inputStyle.border = "3px solid red";
    document.getElementById("sessionInput").setCustomValidity("Id de session invalide.")
    return;
  } else {
    document.getElementById("sessionInput").setCustomValidity("")
  }

  setTimeout(tryConnection,1600);
  fondu("fondu");
}


function tryConnection() {
  var sessionInput = document.getElementById("sessionInput");
  var inputText = sessionInput.value;
  var ID = Math.random().toString(36).substr(2, 9);
  send("createPlayerID.php?playerid="+ID+"?session="+inputText);
  window.location.assign("play.html?session="+inputText+"?playerid="+ID);
}


function eventsListeners() {
  document.querySelector("form").addEventListener("submit", submit);
}
