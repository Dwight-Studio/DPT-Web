window.onload = eventsListeners


function checkValidity() {
  var sessionInput = document.getElementById("sessionInput");
  var inputText = sessionInput.value;
  var data = readJSON("sessions.json");

  for(var key in data) {
    if (key.toLowerCase() == inputText.toLowerCase()) {
      return true;
    }
  }

  var sessionInput = document.getElementById("sessionInput");
  var inputStyle = sessionInput.style;
  inputStyle.border = "3px solid red";
  var errorMessage = document.getElementById("error-message");
  var messageStyle = errorMessage.style
  messageStyle.backgroundColor = "red";
  messageStyle.visibility = "visible";
  return false;
}


function submit(event) {
  event.preventDefault();
  if (checkValidity()) {
    setTimeout(tryConnection,1600);
    fondu("fondu");
  }
}


function tryConnection() {
  var sessionInput = document.getElementById("sessionInput");
  var inputText = sessionInput.value;
  var ID = Math.random().toString(36).substr(2, 9);
  var xmlReq = new XMLHttpRequest();
  xmlReq.open("GET", "createPlayerID.php?playerid="+ID+"&session="+inputText, true);
  xmlReq.send();
  window.location.assign("play.html?session="+inputText+"&playerid="+ID);
}


function eventsListeners() {
  document.querySelector("form").addEventListener("submit", submit);
}
