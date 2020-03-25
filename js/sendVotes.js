window.onload = load;;

const urlParams = new URLSearchParams(window.location.search); //Création de l'objet urlParams
const sessionid = urlParams.get("session"); //Récupération du paramètre session situé dans l'url
const playerid = urlParams.get("playerid"); //Récupération du paramètre playerid situé dans l'url
var button1 = document.getElementById("buttonModif1");
var button2 = document.getElementById("buttonModif2");


function load() {
  var data = readJSON("sessions.json"); // Lecture des données enregistrées
  if (!checkPlayerID(sessionid, playerid)) {
    if (sessionid != null) {
      window.location.assign("/?session=" + sessionid); //Redirection vers l'acceuil si erreur
    } else {
      window.location.assign("/?session=");
    }
    return;
  }

  fadeIn(document.getElementById("fade"), 10);
}


function vote1() {
  button1.disabled = true;
  button2.disabled = true;
  fadeOut(document.getElementById("buttons"), 10);
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "1"); // Envoie d'une requête vers un PHP pour enregistrer le vote
}


function vote2() {
  button1.disabled = true;
  button2.disabled = true;
  fadeOut(document.getElementById("buttons"), 10);
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "2"); // Envoie d'une requête vers un PHP pour enregistrer le vote
}


function startVote(event) {
  // Lorsque qu'un vote débute
  const data = JSON.parse(event.data);
  const endDate = new Date(data["endDate"])
  const mod1 = data["mod1"]
  const mod2 = data["mod2"]
  var timer = document.getElementById("time");
  setInterval(function(){
    var actualDate = new Date().getTime();
    timer.innerHTML = Math.round((endDate - actualDate)/1000);
  }, 1000);
}


function disconnect(event) {
  // Lorsque la session est terminée
  removeMessages();
  displayError("La session est terminée, vous allez être redirigé vers la page de connexion...")
  setTimeout(function () {
    fadeOut(document.getElementById("fade"), 10); //Animation
    window.location.assign("/?session=" + sessionid); //Redirection vers l'acceuil
  }, 3000);
}


function timeOut(event) {
  // Lorsque le client est timeout
  removeMessages();
  displayError("L'hôte ne réponds plus, vous allez être redirigé vers la page de connexion...")
  setTimeout(function () {
    fadeOut(document.getElementById("fade"), 10); //Animation
    window.location.assign("/?session=" + sessionid); //Redirection vers l'acceuil
  }, 3000);
}


function keepAlive(event) {
  //TODO: Ajout du keepAlive
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


function removeMessages() {
  // Supprimer les anciens messages qui étaient affichés (avec animation)
  Array.from(document.getElementsByClassName("message")).forEach(function(item) {
    fadeOut(item, 10);
    item.parentNode.removeChild(item);
  });
}

// Ajout du listener pour les votes
var voteEvents = new EventSource("voteStream.php?session=" + sessionid);
voteEvents.addEventListener("startVote", startVote);
voteEvents.addEventListener("timeOut", timeOut);
voteEvents.addEventListener("disconnect", disconnect);
voteEvents.addEventListener("keepAlive", keepAlive);
