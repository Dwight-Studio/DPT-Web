window.onload = load;;

const urlParams = new URLSearchParams(window.location.search); //Création de l'objet urlParams
const sessionid = urlParams.get("session"); //Récupération du paramètre session situé dans l'url
const playerid = urlParams.get("playerid"); //Récupération du paramètre playerid situé dans l'url

function load() {
  var data = readJSON("sessions.json"); // Lecture des données enregistrées
  document.getElementById("buttonModif1").disabled = true;
  document.getElementById("buttonModif2").disabled = true;
  document.getElementById("buttons").style.opacity = 0;
  document.getElementById("timeDiv").style.opacity = 0;
  displayMessage("En attente d'un nouveau vote...");
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
  document.getElementById("buttonModif1").disabled = true;
  document.getElementById("buttonModif2").disabled = true;
  fadeOut(document.getElementById("buttons"), 10);
  fadeOut(document.getElementById("timeDiv"), 10);
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "1"); // Envoie d'une requête vers un PHP pour enregistrer le vote
  displayMessage("En attente d'un nouveau vote...");
}


function vote2() {
  document.getElementById("buttonModif1").disabled = true;
  document.getElementById("buttonModif2").disabled = true;
  fadeOut(document.getElementById("buttons"), 10);
  fadeOut(document.getElementById("timeDiv"), 10);
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "2"); // Envoie d'une requête vers un PHP pour enregistrer le vote
  displayMessage("En attente d'un nouveau vote...");
}

function startVote(/*event*/endDate) {
  // Lorsque qu'un vote débute
  //const data = JSON.parse(event.data);
  //const endDate = new Date(data["endDate"])
  //const mod1 = data["mod1"]
  //const mod2 = data["mod2"]
  var timer = document.getElementById("time");
  removeMessages();
  fadeIn(document.getElementById("buttons"), 10);
  fadeIn(document.getElementById("timeDiv"), 10);
  document.getElementById("buttonModif1").disabled = false;
  document.getElementById("buttonModif2").disabled = false;
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

// Ajout du listener pour les votes
var voteEvents = new EventSource("voteStream.php?session=" + sessionid);
voteEvents.addEventListener("startVote", startVote);
voteEvents.addEventListener("timeOut", timeOut);
voteEvents.addEventListener("disconnect", disconnect);
voteEvents.addEventListener("keepAlive", keepAlive);
