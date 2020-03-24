<?php
  $file = fopen("sessions.json", "r") or die("Error: unable to open file");
  $sessions = json_decode(fread($file, filesize("sessions.json")), true);
  fclose($file);

  $file2 = fopen("activeConnections.json", "r") or die("Error: unable to open file");
  $activeConnections = json_decode(fread($file2, filesize("activeConnections.json")), true);
  fclose($file2);

  $session_id = $_GET["session-id"];

  if($session_id == null){
   echo json_encode(null);
  }else{
   $sessions[$session_id] = array();
   $activeConnections[$sessionid] = time(); //Enregistre la date actuelle
   echo json_encode($session_id);
  }

  $file = fopen("sessions.json", "w+") or die("Error: unable to open file");
  fwrite($file, json_encode($sessions, JSON_PRETTY_PRINT));
  fclose($file);

  $file2 = fopen("activeConnections.json", "w+") or die("Error: unable to open file");
  fwrite($file2, json_encode($activeConnections, JSON_PRETTY_PRINT));
  fclose($file2);
?>
