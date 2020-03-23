window.onload = fading;
var urlParams = new URLSearchParams(window.location.search); //Création de l'objet urlParams
const sessionid = urlParams.get("session"); //Récupération du paramètre session situé dans l'url
const playerid = urlParams.get("playerid"); //Récupération du paramètre playerid situé dans l'url


function fading() {
  // Animation d'affichage
  var i = 0
  var f = function() {
    document.getElementById("fade").style.opacity = i;
    i = i + 0.02;
    if(i<1) {
      setTimeout(f, 10);
    }
  };

  f(); // Lancement de la boucle 
}


function vote1() {
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "1"); // Envoie d'une requête vers un PHP pour enregistrer le vote
}


function vote2() {
  send("sendVote.php?session=" + sessionid + "&playerid=" + playerid + "&vote=" + "2"); // Envoie d'une requête vers un PHP pour enregistrer le vote
}
