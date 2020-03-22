function triggerFondu() {
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
    return;
  }

  setTimeout(tryConnection,1600);
  fondu("fondu");
}

function tryConnection() {
  document.write("CONNECTED TO THE BEAUTIFUL SERVER AND YOUR SESSION");
}
