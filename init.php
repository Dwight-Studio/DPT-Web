<?php
  $fp = fopen("ip_addr.json", "w") or die("Unable to open file!");
  $session_id = $_GET["session-id"];
  if($session_id == null){
    echo json_encode(null);
  }else{
    fwrite($fp, json_encode($session_id));
    fclose($fp);
    echo json_encode($session_id);
  }
?>
