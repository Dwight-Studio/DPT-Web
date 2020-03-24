function fadeOut(element, time) {
  var style = element.style; // récupère le style de l'élement
  var i = 1; // Opacité de départ
  var inter = setInterval(function() {
    style.opacity = i;
    if(i <= 0) {
      clearInterval(inter);
    }
    i = i - 0.02;
  }, time);
}


function fadeIn(element, time) {
  var style = element.style; // récupère le style de l'élement
  var i = 0; // Opacité de départ
  var inter = setInterval(function() {
    style.opacity = i;
    if (i >= 1) {
      clearInterval(inter);
    }
    i = i + 0.02;
  }, time);
}
