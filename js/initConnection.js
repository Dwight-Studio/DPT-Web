function readJSON(file) {
  var rawFile = new XMLHttpRequest();
  var allText = null;
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function (){
      if(rawFile.readyState === 4){
          if(rawFile.status === 200 || rawFile.status == 0){
              allText = rawFile.responseText;
          }
      }
  }
  rawFile.send(null);
  return JSON.parse(allText);
}

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

  fondu("fondu");
  setTimeout(tryConnection, 1010);
}

function tryConnection() {

}
