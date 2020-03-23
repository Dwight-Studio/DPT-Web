<?php
  $file = fopen("sessions.json", "r") or die("Error: unable to open file"); //Ouverture du fichier sessions.json en read only. Si problème erreur
  $sessions = json_decode(fread($file, filesize("sessions.json")), true); //Stockage du contenu dans la variable $sessions
  fclose($file); //Fermeture du fichier

  $session_id = $_GET["session"]; //Stockage du paramètre "session" de l'url dans $session_id

  if($session_id == null){
   echo json_encode(null); //Envoie en json false sur la page quand problème
  }else{
   $sessions[$session_id] = array();
   echo json_encode($session_id); //Envoie en json $session_id sur la page
  }

  $file = fopen("sessions.json", "w+") or die("Error: unable to open file"); //Ouverture du fichier sessions.json an lecture/écriture. Si problème erreur
  fwrite($file, json_encode($sessions, JSON_PRETTY_PRINT)); //Ecriture des nouvelles infos dans sessions.json
  fclose($file); //Fermeture du fichier
?>
