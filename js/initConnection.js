window.onload = eventsListeners;
var preventSpam = false;

function removeMessages() {
  // Supprimer les anciens messages qui étaient affichés (avec animation)
  Array.from(document.getElementsByClassName("message")).forEach(function(item) {
    var i = 1
    var f = function() {
      item.style.opacity = i;
      i = i - 0.02;
      if(i>=0) {
        setTimeout(f, 5);
      }
    };

    f(); // Lancement de l'animation
    item.parentNode.removeChild(item)
  });
}

function displayError() {
  removeMessages();
  // Afficher un message (un div avec du text)

  var messageContainer = document.getElementById("message-container");
  var messageDiv = document.createElement("div"); // Création de la div
  var text = document.createTextNode("Session inexistante ou expirée. Vérifiez le code ou réouvrez une session."); // Ajout du texte (objet enfant)

  messageDiv.appendChild(text);
  messageDiv.classList.add("message"); // Ajout de la classe pour le style CSS
  messageDiv.classList.add("error"); // Ajout de la classe pour le style CSS
  messageContainer.appendChild(messageDiv); // Ajour de l'élément à la page

  // Animation d'affichage
  var i = 0
  var f = function() {
    messageDiv.style.opacity = i;
    i = i + 0.02;
    if(i<1) {
      setTimeout(f, 5);
    }
  };

  f(); // Lancement de la boucle
  preventSpam = false;
}


function displayConnect() {
  // Afficher un message (un div avec du text)

  var messageContainer = document.getElementById("message-container");
  var messageDiv = document.createElement("div"); // Création de la div
  var text = document.createTextNode("Connexion en cours..."); // Ajout du texte (objet enfant)

  messageDiv.appendChild(text);
  messageDiv.classList.add("message"); // Ajout de la classe pour le style CSS
  messageDiv.classList.add("connect"); // Ajout de la classe pour le style CSS
  messageContainer.appendChild(messageDiv); // Ajour de l'élément à la page

  // Animation d'affichage
  var i = 0
  var f = function() {
    messageDiv.style.opacity = i;
    i = i + 0.02;
    if(i<1) {
      setTimeout(f, 5);
    }
  };

  f(); // Lancement de la boucle
}


function checkValidity() {
  displayConnect();
  // Vérification de la validité du formulaire

  var sessionInput = document.getElementById("sessionInput");
  var inputText = sessionInput.value; // Récupération du texte saisie
  var data = readJSON("sessions.json"); // Lecture des données enregistrées

  for(var key in data) {
    if (key.toLowerCase() == inputText.toLowerCase()) {
      return true; // Si on trouve une correspondance entre ce qui est saisie et ce qui est enregistré alors on arrète
    }
  }

  // Sinon on continue et on fait les annimations d'erreurs

  var inputStyle = document.getElementById("sessionInput").style;
  inputStyle.backgroundColor = "rgba(255, 0, 0, 0.3)";
  displayError()
  return false;
}


function submit(event) {
  event.preventDefault();
  if (preventSpam) {
    return;
  }

  preventSpam = true;

  removeMessages();

  // Si le formulaire est correcte, alors faire l'animation puis rediriger
  if (checkValidity()) {
    setTimeout(tryConnection,1600);
  }
}

function tryConnection() {
  // Formulaire correcte, alors faire l'animation puis rediriger
  var sessionInput = document.getElementById("sessionInput");
  var inputText = sessionInput.value;

  var ID = Math.random().toString(36).substr(2, 9); // Générer un code aléatoire (id de joueur)

  // Création et envois d'une requète vers un PHP pour enregister le joueur
  send("registerPlayerID.php?playerid="+ID+"&session="+inputText);
  //TODO: Verifier que le serveur renvois bien "true"

  fondu("fondu"); // Animation

  // Tout est ok, on peut rediriger le client après l'animation
  setTimeout(function() {
    window.location.assign("play.html?session="+inputText+"&playerid="+ID);
  }, 1600);
}


function eventsListeners() {
  // Ajout du listener pour l'évènement de soumission du formulaire
  document.querySelector("form").addEventListener("submit", submit);
}
