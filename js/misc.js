function send(url){
  var xmlReq = new XMLHttpRequest();
  xmlReq.open("GET", url, false);
  xmlReq.send();
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

function removeMessage(id) {
  // Supprimer les anciens messages qui étaient affichés (avec animation)
  item = document.getElementById(id);
  item.parentNode.removeChild(item)
}

function displayError(message, id) {
  // Afficher un message (un div avec du text)

  var messageContainer = document.getElementById("message-container");
  var messageDiv = document.createElement("div"); // Création de la div
  var text = document.createTextNode(message); // Ajout du texte (objet enfant)

  messageDiv.appendChild(text);
  messageDiv.classList.add("message"); // Ajout de la classe pour le style CSS
  messageDiv.classList.add("error"); // Ajout de la classe pour le style CSS
  if (id) {
    messageDiv.id = id;
  }
  messageContainer.appendChild(messageDiv); // Ajour de l'élément à la page

  fadeIn(messageDiv, 10);
}

function displayMessage(message, id) {
  // Afficher un message (un div avec du text)

  var messageContainer = document.getElementById("message-container");
  var messageDiv = document.createElement("div"); // Création de la div
  var text = document.createTextNode(message); // Ajout du texte (objet enfant)

  messageDiv.appendChild(text);
  messageDiv.classList.add("message"); // Ajout de la classe pour le style CSS
  messageDiv.classList.add("info"); // Ajout de la classe pour le style CSS
  if (id) {
    messageDiv.id = id;
  }
  messageContainer.appendChild(messageDiv); // Ajour de l'élément à la page

  fadeIn(messageDiv, 10);
}

window.mobileAndTabletcheck = function() {
  // Fonction trouvée sur internet :
  // Fonctionnement simple : longe liste de condition "ou" qui vérifie l'userAgent du navigateur pour savoir si c'est un mobile ou nom
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
