<?php
  $session_id = $_GET["session-id"];
  if($session_id == null){
    echo json_encode(null);
  }else{
    echo json_encode($session_id);
  }
?>
