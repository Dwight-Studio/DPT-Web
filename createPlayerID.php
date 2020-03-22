<?php
  $file = fopen("sessions.json", "r") or die("Error: unable to open file");
  $sessions = json_decode(fread($file, filesize("sessions.json")), true);
  fclose($file);

  $session_id = $_GET["session"];
  $playerid = $_GET["playerid"];

  echo $session_id;
  echo $playerid;

  if($session_id == null || $playerid == null || !array_key_exists($session_id, $sessions)) {
   echo json_encode(false);
  }else{
   $sessions[$session_id][$playerid] = 0;
   echo json_encode(true);
  }

  $file = fopen("sessions.json", "w+") or die("Error: unable to open file");
  fwrite($file, json_encode($sessions, JSON_PRETTY_PRINT));
  fclose($file);
?>
