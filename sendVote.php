<?php
  header("Content-type: application/json\n\n");
  $file = fopen("sessions.json", "r") or die("Error: unable to open file"); //Ouverture du fichier sessions.json en read only. Si problème erreur
  $sessions = json_decode(fread($file, filesize("sessions.json")), true); //Stockage du contenu dans la variable $sessions
  fclose($file); //Fermeture du fichier

  $sessionid = $_GET["session"]; //Stockage du paramètre "session" de l'url dans $session_id
  $playerid = $_GET["playerid"]; //Stockage du paramètre "playerid" de l'url dans $playerid
  $vote = $_GET["vote"]; //Stockage du paramètre "vote" de l'url dans $vote

  if($sessionid == null || $playerid == null || !($vote == "1" || $vote == "2") || !array_key_exists($sessionid, $sessions) || !array_key_exists($playerid, $sessions[$sessionid])) {
   echo json_encode(false); //Affiche false sur la page quand problème
  } else {
   $sessions[$sessionid][$playerid] = $vote; //Modification de la valeur de $playerid (1 ou 2)
   echo json_encode(true); //Affiche true sur la page quand fonctionne
  }

  $file = fopen("sessions.json", "w+") or die("Error: unable to open file"); //Ouverture du fichier sessions.json an lecture/écriture. Si problème erreur
  fwrite($file, json_encode($sessions, JSON_PRETTY_PRINT)); //Ecriture des nouvelles infos dans sessions.json
  fclose($file); //Fermeture du fichier
?>
