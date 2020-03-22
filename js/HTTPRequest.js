function send(url){
  var xmlReq = new XMLHttpRequest();
  xmlReq.open("GET", url, true);
  xmlReq.send();
}
