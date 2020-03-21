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
  fondu("fondu");
  setTimeout(tryConnection, 1010);
}

function tryConnection() {
  document.write("ACCESS : ")
  var data = readJSON("sessions.json");
  document.write(data["test"]);
}
