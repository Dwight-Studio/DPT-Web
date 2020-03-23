function fadeOut(element, time) {
  var style = element.style; // récupère le style de l'élement
  var i = 1; // Opacité de départ
  setInterval(function() {
    style.opacity = i;
    i = i - 0.02;
    if(i <= 0) {
      clearInterval();
    }
  }, time);
}


function fadeIn(element, time) {
  var style = element.style; // récupère le style de l'élement
  var i = 0; // Opacité de départ
  setInterval(function() {
    style.opacity = i;
    i = i + 0.02;
    if(i >= 1) {
      clearInterval();
    }
  }, time);
}
