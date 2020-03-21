function fondu(nomDiv)
{
  var div = document.getElementById(nomDiv).style;// récupère div
  var i = 1;// initialise i
  var f = function()// attribut à f une fonction anonyme
  {
    div.opacity = i;// attribut à l'opacité du div la valeur d'i
    i = i-0.02;// l'incrémente

    if(i>=0)// si c'est toujours pas égal à 1
    {
      setTimeout(f,20);// attend 20 ms, et relance la fonction
    }
  };
  f();// l'appel une première fois pour lancer la boucle();
}
