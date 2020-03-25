<?php
  header("Content-type: application/json\n\n");
  $file = fopen("sessions.json", "r") or die("Error: unable to open file"); //Ouverture du fichier sessions.json en read only. Si problème erreur
  $sessions = json_decode(fread($file, filesize("sessions.json")), true); //Stockage du contenu dans la variable $sessions
  fclose($file); //Fermeture du fichier

  $sessionid = $_GET["session"]; //Stockage du paramètre "session" de l'url dans $session_id
  $playerid = $_GET["playerid"]; //Stockage du paramètre "playerid" de l'url dans $playerid

  if($sessionid == null || $playerid == null || !array_key_exists($sessionid, $sessions)) {
   $valid = false;
  } else {
   $sessions[$sessionid][$playerid] = "0"; //Ajout du $playerid dans le fichier sessions.json avec sa valeur par défaut
   $valid = true; // Si tout va bien, on met sur true
  }

  $file = fopen("sessions.json", "w+") or die("Error: unable to open file"); //Ouverture du fichier sessions.json an lecture/écriture. Si problème erreur
  fwrite($file, json_encode($sessions, JSON_PRETTY_PRINT)); //Ecriture des nouvelles infos dans sessions.json
  fclose($file); //Fermeture du fichier

  sleep (1);

  if ($valid) {
    header("Location: /play.html?session={$sessionid}&playerid={$playerid}", true, 302);
    exit();
  } else {
    header("Location: /?session={$sessionid}&error=true", true, 302);
    exit();
  }
?>
