$(document).ready(init);

function pushMessage(text) {
  //CREO SINGOLI ELEMENTI PER NUOVO MESSAGGIO
  var newRow = document.createElement("div");
  var newMessage = document.createElement("div");
  var newPar = document.createElement("p");
  var newSmall = document.createElement("small");

  //IN JQUERY (INSERISCO CLASSI)
  // $(newRow).addClass("row");
  // $(newMessage).addClass("message sent");

  //IN JAVASCRIPT (INSERISCO CLASSI)
  newRow.classList.add("row");
  newMessage.classList.add("message", "sent");

  //INSERISCO TESTO NEGLI ELEMENTI
  $(newPar).text(text);             //Nota che non abbiamo scritto: newPar.text(text); perchè .text è Jquery newPar no!
  $(newSmall).text("18:30");

  //CONCATENO I SINGOLI ELEMENTI STILE LEGO, DALL'INTERNO ALL'ESTERNO.
  newMessage.append(newPar, newSmall);
  newRow.append(newMessage);

  //PUSHO TUTTO NELL'HTML SENZA CANCELLARE IL CONTENUTO ESISTENTE.
  var main = $("main");
  main.append(newRow);
}



function messageInputEvent(e) { //PARAMETRO ECCEZIONALE DI INGRESSO --> e = evento. Ma potevamo mettere qualsiasi cosa.

  var myMessage = $("#mymessage");
  var keyPressed = e.which;  //INIZIALIZZO PULSANTE PREMUTO
  if (keyPressed == 13) {
    pushMessage(myMessage.val());
    myMessage.val("");
  }
}


function init() {

  var myMessage = $("#mymessage");  //INPUT
  myMessage.keyup(messageInputEvent); //FUNZIONE PER TRIGHERARE EVENTO PULSANTE PREMUTO
}
