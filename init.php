<?php
  $file = fopen("sessions.json", "r") or die("Error: unable to open file");
  $sessions = json_decode(fread($file, filesize("sessions.json")), true);
  fclose($file);

  $session_id = $_GET["session-id"];

  if($session_id == null){
   echo json_encode(null);
  }else{
   $sessions[$session_id] = array();
   echo json_encode($session_id);
  }

  $file = fopen("sessions.json", "w+") or die("Error: unable to open file");
  fwrite($file, json_encode($sessions, JSON_PRETTY_PRINT));
  fclose($file);
?>
