function readJSON(file) {
  var rawFile = new XMLHttpRequest(); //Création de l'objet rawFile
  var allText = null; //Valeur de allText à null par défaut
  rawFile.open("GET", file, false); //Ouverture d'une requête
  rawFile.onreadystatechange = function (){
      if(rawFile.readyState === 4){ //4 quand ouverture totalement terminé
          if(rawFile.status === 200 || rawFile.status == 0){ //200 = code HTTP OK
              allText = rawFile.responseText; //Récupère la réponse qui à été envoyé
          }
      }
  }
  rawFile.send(null); //Envoie de la requête
  return JSON.parse(allText); //Analyse du fichier JSON
}
