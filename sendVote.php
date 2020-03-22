<?php
  $file = fopen("sessions.json", "r") or die("Error: unable to open file");
  $sessions = json_decode(fread($file, filesize("sessions.json")), true);
  fclose($file);

  $session_id = $_GET["session"];
  $playerid = $_GET["playerid"];
  $vote = $_GET["vote"];

  echo $session_id;

  if($session_id == null || $playerid == null || !($vote == 1 || $vote == 2) || !array_key_exists($session_id, $sessions) || !array_key_exists($playerid, $sessions[$session_id])) {
   echo json_encode(false);
  } else {
   $sessions[$session_id][$playerid] = $vote;
   echo json_encode(true);
  }

  $file = fopen("sessions.json", "w+") or die("Error: unable to open file");
  fwrite($file, json_encode($sessions, JSON_PRETTY_PRINT));
  fclose($file);
?>
