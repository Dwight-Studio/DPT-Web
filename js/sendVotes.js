var urlParams = new URLSearchParams(window.location.search);
const sessionid = urlParams.get("session");
const playerid = urlParams.get("playerid");

function vote1() {
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "1"); // Envoie d'une requête vers un PHP pour enregistrer le vote
}

function vote2() {
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "2"); // Envoie d'une requête vers un PHP pour enregistrer le vote
}
