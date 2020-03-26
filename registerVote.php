<?php
  header("Content-type: application/json\n\n");

  $file = fopen("pendingVotes.json", "r") or die("Error: unable to open file"); //Ouverture du fichier sessions.json en read only. Si problème erreur
  $pendingVotes = json_decode(fread($file, filesize("pendingVotes.json")), true); //Stockage du contenu dans la variable $sessions
  fclose($file); //Fermeture du fichier

  $sessionid = $_GET["session"]; //Stockage du paramètre "session" de l'url dans $session_id
  $data = $_GET["data"];

  if ($sessionid == null || $data == null) {
   echo json_encode(null); //Envoie en json false sur la page quand problème
  } else {
   $pendingVotes[$sessionid] = $data; //Enregistre la date actuelle
   echo json_encode(true); //Envoie en json $session_id sur la page
  }

  $file = fopen("pendingVotes.json", "w+") or die("Error: unable to open file"); //Ouverture du fichier sessions.json an lecture/écriture. Si problème erreur
  fwrite($file, json_encode($pendingVotes, JSON_PRETTY_PRINT)); //Ecriture des nouvelles infos dans sessions.json
  fclose($file); //Fermeture du fichier
?>
