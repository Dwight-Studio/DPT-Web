function send(url){
  var xmlReq = new XMLHttpRequest();
  xmlReq.open("GET", url, false);
  xmlReq.send();
}

function readJSON(file) {
  var rawFile = new XMLHttpRequest(); //Création de l'objet rawFile
  var allText = null; //Valeur de allText à null par défaut
  rawFile.open("GET", file, false); //Ouverture d'une requête
  rawFile.onreadystatechange = function (){
      if(rawFile.readyState === 4){ //4 quand ouverture totalement terminé
          if(rawFile.status === 200 || rawFile.status == 0){ //200 = code HTTP OK
              allText = rawFile.responseText; //Récupère la réponse qui à été envoyé
          } else {
            return null;
          }
      }
  }
  rawFile.send(); //Envoie de la requête
  return JSON.parse(allText); //Analyse du fichier JSON
}


function checkSession(session) {
  if (session == null) {
    return false;
  }
  var data = readJSON("sessions.json"); // Lecture des données enregistrées
  for(var key in data) {
    if (key.toLowerCase() == session.toLowerCase()) {
      return true; // Si on trouve une correspondance entre ce qui est saisie et ce qui est enregistré alors on arrète
    }
  }
  return false;
}

function checkPlayerID(session, playerid) {
  if (checkSession(session)) {
    if (playerid == null) {
      return false;
    }
    var data = readJSON("sessions.json"); // Lecture des données enregistrées
    for(var key in data[session]) {
      if (key.toLowerCase() == playerid.toLowerCase()) {
        return true; // Si on trouve une correspondance entre ce qui est saisie et ce qui est enregistré alors on arrète
      }
    }
    return false;
  } else {
    return false;
  }
}
