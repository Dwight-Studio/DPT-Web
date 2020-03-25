<?php
  header("Content-Type: text/event-stream\n\n");

  $sessionid = $_GET["session"];

  if  {

  } else {

  }

  while (true) {
    $file = fopen("activeConnections.json", "r") or die("Error: unable to open file"); //Ouverture du fichier sessions.json en read only. Si problème erreur
    $activeConnections = json_decode(fread($file, filesize("activeConnections.json")), true); //Stockage du contenu dans la variable $sessions
    fclose($file); //Fermeture du fichier

    if ($activeConnections[$sessionid] == null || $sessionid == null) {
      echo "event: timeOut\n";
      echo "data:";
      echo "\n\n";
    } elseif ($activeConnections[$sessionid] > (time() + 10)) {
      echo "event: timeOut\n";
      echo "data:";
      echo "\n\n";
    } elseif ($pendingVotes != $pendingVotes)
    sleep(1);
  }
 ?>
