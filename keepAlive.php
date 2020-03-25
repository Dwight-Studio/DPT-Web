<?php
  $file = fopen("activeConnections.json", "r") or die("Error: unable to open file"); //Ouverture du fichier sessions.json en read only. Si problème erreur
  $activeConnections = json_decode(fread($file, filesize("activeConnections.json")), true); //Stockage du contenu dans la variable $sessions
  fclose($file); //Fermeture du fichier

  $sessionid = $_GET["session"]; //Stockage du paramètre "session" de l'url dans $session_id

  if ($sessionid == null) {
   echo json_encode(null); //Envoie en json false sur la page quand problème
  } else {
   $activeConnections[$sessionid] = time(); //Enregistre la date actuelle
   echo json_encode(true); //Envoie en json $session_id sur la page
  }

  $file = fopen("activeConnections.json", "w+") or die("Error: unable to open file"); //Ouverture du fichier sessions.json an lecture/écriture. Si problème erreur
  fwrite($file, json_encode($activeConnections, JSON_PRETTY_PRINT)); //Ecriture des nouvelles infos dans sessions.json
  fclose($file); //Fermeture du fichier
?>
