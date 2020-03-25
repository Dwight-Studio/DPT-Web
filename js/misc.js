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

function removeMessages() {
  // Supprimer les anciens messages qui étaient affichés (avec animation)
  Array.from(document.getElementsByClassName("message")).forEach(function(item) {
    fadeOut(item, 10);
    item.parentNode.removeChild(item);
  });
}

function displayError(message) {
  // Afficher un message (un div avec du text)

  var messageContainer = document.getElementById("message-container");
  var messageDiv = document.createElement("div"); // Création de la div
  var text = document.createTextNode(message); // Ajout du texte (objet enfant)

  messageDiv.appendChild(text);
  messageDiv.classList.add("message"); // Ajout de la classe pour le style CSS
  messageDiv.classList.add("error"); // Ajout de la classe pour le style CSS
  messageContainer.appendChild(messageDiv); // Ajour de l'élément à la page

  fadeIn(messageDiv, 10);
  preventSpam = false;
  var inputText = document.getElementById("sessionInput").disabled = false;
}

function displayMessage(message) {
  // Afficher un message (un div avec du text)

  var messageContainer = document.getElementById("message-container");
  var messageDiv = document.createElement("div"); // Création de la div
  var text = document.createTextNode(message); // Ajout du texte (objet enfant)

  messageDiv.appendChild(text);
  messageDiv.classList.add("message"); // Ajout de la classe pour le style CSS
  messageDiv.classList.add("info"); // Ajout de la classe pour le style CSS
  messageContainer.appendChild(messageDiv); // Ajour de l'élément à la page

  fadeIn(messageDiv, 10);
}
