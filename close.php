<?php
  $file = fopen("sessions.json", "r") or die("Error: unable to open file");
  $sessions = json_decode(fread($file, filesize("sessions.json")), true);
  fclose($file);

  $file = fopen("activeConnections.json", "r") or die("Error: unable to open file");
  $activeConnections = json_decode(fread($file, filesize("activeConnections.json")), true);
  fclose($file);

  $file = fopen("pendingVotes.json", "r") or die("Error: unable to open file");
  $pendingVotes = json_decode(fread($file, filesize("pendingVotes.json")), true);
  fclose($file);

  $sessionid = $_GET["session"];

  if ($sessionid == null) {
   echo json_encode(null);
  } else {
   unset($sessions[$sessionid]);
   unset($activeConnections[$sessionid]);
   unset($pendingVotes[$sessionid]);
   echo json_encode(true);
  }

  $file = fopen("sessions.json", "w+") or die("Error: unable to open file");
  fwrite($file, json_encode($sessions, JSON_PRETTY_PRINT));
  fclose($file);

  $file = fopen("activeConnections.json", "w+") or die("Error: unable to open file");
  fwrite($file, json_encode($activeConnections, JSON_PRETTY_PRINT));
  fclose($file);

  $file = fopen("pendingVotes.json", "w+") or die("Error: unable to open file");
  fwrite($file, json_encode($pendingVotes, JSON_PRETTY_PRINT));
  fclose($file);
?>
