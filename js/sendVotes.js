window.onload = load;
var voteEvents = null;

const urlParams = new URLSearchParams(window.location.search); //Création de l'objet urlParams
const sessionid = urlParams.get("session"); //Récupération du paramètre session situé dans l'url
const playerid = urlParams.get("playerid"); //Récupération du paramètre playerid situé dans l'url

function load() {
  if (!window.mobileAndTabletcheck()) {
    document.getElementById("desktop").classList.add("desktop");
  }

  // Ajout du listener pour les votes
  voteEvents = new EventSource("voteStream.php?session=" + sessionid);
  voteEvents.addEventListener("startVote", startVote);
  voteEvents.addEventListener("timeOut", timeOut);
  voteEvents.addEventListener("keepAlive", keepAlive);

  var data = readJSON("sessions.json"); // Lecture des données enregistrées
  document.getElementById("buttonModif1").style.display = "none";
  document.getElementById("buttonModif2").style.display = "none";
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
  clearInterval(inter);
  document.getElementById("buttonModif1").style.display = "none";
  document.getElementById("buttonModif2").style.display = "none";
  fadeOut(document.getElementById("buttonModif1"), 10);
  fadeOut(document.getElementById("buttonModif2"), 10);
  removeMessage("timer");
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "1"); // Envoie d'une requête vers un PHP pour enregistrer le vote
  displayMessage("En attente d'un nouveau vote...");
}


function vote2() {
  clearInterval(inter);
  document.getElementById("buttonModif1").style.display = "none";
  document.getElementById("buttonModif2").style.display = "none";
  fadeOut(document.getElementById("buttonModif1"), 10);
  fadeOut(document.getElementById("buttonModif2"), 10);
  removeMessage("timer");
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "2"); // Envoie d'une requête vers un PHP pour enregistrer le vote
  displayMessage("En attente d'un nouveau vote...");
}

function startVote(event) {
  // Lorsque qu'un vote débute
  const data = JSON.parse(event.data);
  var endDate = new Date(data["endDate"])
  const modif1 = data["mod1"]
  const modif2 = data["mod2"]
  removeMessages();
  document.getElementById("buttonModif1").style.display = "block";
  document.getElementById("buttonModif2").style.display = "block";
  chooseImage(modif1, modif2);
  fadeIn(document.getElementById("buttonModif1"), 10);
  fadeIn(document.getElementById("buttonModif2"), 10);
  displayMessage("Temps restants : 00", "timer")
  inter = setInterval(function(){
    var actualDate = new Date().getTime();
    timer = document.getElementById('timer')
    var remainingTime = Math.round((endDate - actualDate)/1000)
    timer.innerHTML = "Temps restants : " + remainingTime + " secondes";
    if (parseInt(remainingTime) <= 0){
      clearInterval(inter);
      document.getElementById("buttonModif1").style.display = "none";
      document.getElementById("buttonModif2").style.display = "none";
      fadeOut(document.getElementById("buttonModif1"), 10);
      fadeOut(document.getElementById("buttonModif2"), 10);
      removeMessage("timer");
      displayMessage("En attente d'un nouveau vote...");
    }
  }, 1000);
}


function timeOut(event) {
  voteEvents.removeEventListener("timeOut", timeOut);
  // Lorsque le client est timeout
  removeMessages();
  displayError("L'hôte ne réponds pas, vous allez être redirigé vers la page de connexion...")
  setTimeout(function () {
    fadeOut(document.getElementById("fade"), 10); //Animation
    window.location.assign("/?session=" + sessionid); //Redirection vers l'acceuil
  }, 3000);
}

function isFileExist(name){
  var xmlReq = new XMLHttpRequest();
  xmlReq.open("GET", name, false);
  xmlReq.send();
  if(xmlReq.status == 404) {
    return false;
  } else {
    return true;
  }
}

function chooseImage(mod1, mod2) {
  document.getElementById("buttonModif1").style.background = "url(/img/effects/Ice.png)";
  if(isFileExist("/img/effects/" + mod1)) {

  }
  if(isFileExist("/img/effects" + mod2)) {
    document.getElementById("buttonModif2").style.backgroundImage = "url(/img/effects/" + mod2 + ".png)";
  }
}

function keepAlive(event) {
  //TODO: Ajout du keepAlive
}
