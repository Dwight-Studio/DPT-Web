function send(url){
  xmlReq = new XMLHttpRequest();

  xmlReq.open("GET", url, true);
  xmlReq.send();
}
