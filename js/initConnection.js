window.onload = load;
var preventSpam = false;

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


function displayConnect() {
  // Afficher un message (un div avec du text)

  var messageContainer = document.getElementById("message-container");
  var messageDiv = document.createElement("div"); // Création de la div
  var text = document.createTextNode("Connexion en cours..."); // Ajout du texte (objet enfant)

  messageDiv.appendChild(text);
  messageDiv.classList.add("message"); // Ajout de la classe pour le style CSS
  messageDiv.classList.add("info"); // Ajout de la classe pour le style CSS
  messageContainer.appendChild(messageDiv); // Ajour de l'élément à la page

  fadeIn(messageDiv, 10);
}

function checkValidity() {
  // Vérification de la validité du formulaire

  var sessionInput = document.getElementById("sessionInput");
  var inputText = sessionInput.value; // Récupération du texte saisie

  if (!checkSession(inputText)) {
    // Si erreur on fait les annimations d'erreurs
    var inputStyle = document.getElementById("sessionInput").style;
    inputStyle.backgroundColor = "rgba(255, 0, 0, 0.3)";
    removeMessages();
    displayError("Session inexistante ou expirée. Vérifiez le code ou ouvrez une nouvelle session.");
    return false;
    }
    return true;
}

function submit(event) {
  event.preventDefault();
  var inputText = document.getElementById("sessionInput").disabled = true;
  if (preventSpam) {
    return;
  }

  preventSpam = true;

  removeMessages();
  displayConnect();

  // Si le formulaire est correcte, alors faire l'animation puis rediriger
  if (checkValidity()) {
    var inputText = document.getElementById("sessionInput").value;
    tryConnection(inputText);
  }
}

function tryConnection(sessionid) {
  // Formulaire correcte, alors faire l'animation puis rediriger

  var ID = Math.random().toString(36).substr(2, 9); // Générer un code aléatoire (id de joueur)

  // Création et envois d'une requète vers un PHP pour enregister le joueur

  //TODO: Verifier que le serveur renvoit bien "true"
  fadeOut(document.getElementById("fade"), 10); // Animation
  // Tout est ok, on peut rediriger le client après l'animation
  setTimeout(function() {
    window.location.assign("registerPlayerID.php?playerid="+ID+"&session="+sessionid);
  }, 500);
}

function load() {
  var urlParams = new URLSearchParams(window.location.search); //Création de l'objet urlParams
  var sessionid = urlParams.get("session"); //Récupération du paramètre session situé dans l'url
  var error = urlParams.get("error"); //Récupération du paramètre error situé dans l'url

  if (sessionid != null) {
    if (error != "true") {
      displayConnect();
      var inputText = document.getElementById("sessionInput").disabled = true;
      document.getElementById("sessionInput").value = sessionid;
      if (checkSession(sessionid)) {
        tryConnection(sessionid);
      } else {
        displayError("Session inexistante ou expirée. Vérifiez le code ou ouvrez une nouvelle session.");
      }
    } else if (error == "true") {
      document.getElementById("sessionInput").value = sessionid;
      displayError("Erreur serveur, veuillez réessayer ultérieurement.");
    }
  }

  // Ajout du listener pour l'évènement de soumission du formulaire
  document.querySelector("form").addEventListener("submit", submit);
}
