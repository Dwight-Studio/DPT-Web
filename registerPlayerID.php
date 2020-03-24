<?php
  $file = fopen("sessions.json", "r") or die("Error: unable to open file"); //Ouverture du fichier sessions.json en read only. Si problème erreur
  $sessions = json_decode(fread($file, filesize("sessions.json")), true); //Stockage du contenu dans la variable $sessions
  fclose($file); //Fermeture du fichier

  $session_id = $_GET["session"]; //Stockage du paramètre "session" de l'url dans $session_id
  $playerid = $_GET["playerid"]; //Stockage du paramètre "playerid" de l'url dans $playerid

  if($session_id == null || $playerid == null || !array_key_exists($session_id, $sessions)) {
   echo json_encode(false); //Envoie en json false sur la page quand problème
  }else{
   $sessions[$session_id][$playerid] = "0"; //Ajout du $playerid dans le fichier sessions.json avec sa valeur par défaut
   echo json_encode(true); //Envoie en json true sur la page quand fonctionne
  }

  $file = fopen("sessions.json", "w+") or die("Error: unable to open file"); //Ouverture du fichier sessions.json an lecture/écriture. Si problème erreur
  fwrite($file, json_encode($sessions, JSON_PRETTY_PRINT)); //Ecriture des nouvelles infos dans sessions.json
  fclose($file); //Fermeture du fichier
?>
