<?php
<<<<<<< HEAD
  ini_set("output_buffering", "off");
  header("Content-Type: text/event-stream\n\n");
=======
  header("Cache-Control: no-cache");
  header("Content-Type: text/event-stream");
>>>>>>> b575e111457ea0d9cb58b4462027bd688b3fe19f

  $sessionid = $_GET["session"];
  $previousPendingVotes = null;

  ob_implicit_flush(1);
  while (true) {
    $file = fopen("activeConnections.json", "r") or die("Error: unable to open file"); //Ouverture du fichier sessions.json en read only. Si problème erreur
    $activeConnections = json_decode(fread($file, filesize("activeConnections.json")), true); //Stockage du contenu dans la variable $sessions
    fclose($file); //Fermeture du fichier

    $file = fopen("pendingVotes.json", "r") or die("Error: unable to open file"); //Ouverture du fichier sessions.json en read only. Si problème erreur
    $pendingVotes = json_decode(fread($file, filesize("pendingVotes.json")), true); //Stockage du contenu dans la variable $sessions
    fclose($file); //Fermeture du fichier

    if (!array_key_exists($sessionid, $activeConnections)) {
      echo "event: timeOut\n";
      echo "data:";
      echo "\n\n";
    } elseif (($activeConnections[$sessionid] + 10) < time()) {
      echo "event: timeOut\n";
      echo "data:";
      echo "\n\n";
      include "close.php";
    } elseif ($pendingVotes != $previousPendingVotes) {
      if (array_key_exists($sessionid, $pendingVotes)) {
        echo "event: startVote\n";
        echo "data: {$pendingVotes[$sessionid]}";
        echo "\n\n";
      }
    }

    $previousPendingVotes = $pendingVotes;

    if (connection_aborted()) {
      break;
    }

    sleep(1);
  }
 ?>
