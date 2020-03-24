window.onload = load;

var nbTry = 0;
var urlParams = new URLSearchParams(window.location.search); //Création de l'objet urlParams
const sessionid = urlParams.get("session"); //Récupération du paramètre session situé dans l'url
const playerid = urlParams.get("playerid"); //Récupération du paramètre playerid situé dans l'url

function load() {
  var data = readJSON("sessions.json"); // Lecture des données enregistrées
  if (!checkPlayerID(sessionid, playerid)) {
    if (sessionid != null) {
      window.location.assign("/?session=" + sessionid); //Redirection vers
    } else {
      window.location.assign("/?session=");
    }
    return;
  }

  fadeIn(document.getElementById("fade"), 10);
  return;
}

function vote1() {
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "1"); // Envoie d'une requête vers un PHP pour enregistrer le vote
}


function vote2() {
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "2"); // Envoie d'une requête vers un PHP pour enregistrer le vote
}
