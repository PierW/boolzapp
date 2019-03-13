$(document).ready(init);

function pushMessage(bool, text) {
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
  if (bool) {
    newMessage.classList.add("message", "sent");
  } else {
    newMessage.classList.add("message", "recived");
  }

  //INSERISCO TESTO NEGLI ELEMENTI
  $(newPar).text(text);             //Nota che non abbiamo scritto: newPar.text(text); perchè .text è Jquery newPar no!
  $(newSmall).text("18:30");

  //CONCATENO I SINGOLI ELEMENTI STILE LEGO, DALL'INTERNO ALL'ESTERNO.
  newMessage.append(newPar, newSmall);
  newRow.append(newMessage);

  //PUSHO TUTTO NELL'HTML SENZA CANCELLARE IL CONTENUTO ESISTENTE.
  var main = $("main");
  main.append(newRow);

  // LANCIO RISPOSTA AUTOMATICA
  if (bool) {                     //SOLO SE VERO. QUESTO MI PERMETTE DI NON AVERE UN CICLO INFINITO E DI RICEVERE SOLO UNA RISPOSTA PER MESSAGGIO
    setTimeout(function() {
      bot(!bool, text);          //RENDO IL BOOL DI INGRESSO VERO ---> FALSO
    }, 1000);
  }
}

function messageInputEvent(e) { //PARAMETRO ECCEZIONALE DI INGRESSO --> e = evento. Ma potevamo mettere qualsiasi cosa.

  // var myMessage = $("#mymessage");  //IN QUESTO CASO AL POSTO DI USARE UN SELETTORE DIRETTO GIà UTILIZZATO ANCHE IN INIT IN BASSO, POSSIAMO FARE: (VEDI RIGA IN BASSO)
  var myMessage = $(this);
  var keyPressed = e.which;  //INIZIALIZZO PULSANTE PREMUTO
  if (keyPressed == 13) {
    pushMessage(true, myMessage.val());
    myMessage.val("");
  }
}

function search() {

  var me = $(this);
  var content = me.val().toLowerCase();

  var allContainer = $("#contatti > .myfriend"); //Prendo tutti i container PRIMA DEL FOR

  for (var i = 0; i < allContainer.length; i++) {

    var singleContainer = allContainer.eq(i);
    var nameFriend= singleContainer.find("h3").text().toLowerCase(); //Prendo il container poi con find() cerco verso l'interno.

    if (!nameFriend.includes(content)) { //Se falsa ---> (Non includono)
      singleContainer.addClass("finded");  //Nascondi tutto il container
    }
    else if (singleContainer.hasClass("finded")){     //Altrimenti se c'è già la classe cancellala. (Sostituire con "friend" per nascondere solo il nome)
      // friend.removeClass("finded");       // friend.removeAttr("class"); Sarebbe più corretto dato che non ho altre classi nell'h3 rimane solo l'attributo "class" (controlla sorgente)
      singleContainer.removeClass("finded");
    }
  }
}

function bot(bool, text) {

  switch (!bool) {
    case text.includes("ciao"):
      text = "Ciao Prof, come stai?";
      break;
    case text.includes("stai"):
      text = "Bene grazie e tu?";
      break;
    case text.includes("bene"):
      text = "Bene grazie! :P";
      break;
    default:
      text = "non capisco, puoi ripetere perpiacere?";
  }

  pushMessage(bool, text);
}


function init() {

  var myMessage = $("#mymessage");  //INPUT
  myMessage.keyup(messageInputEvent); //FUNZIONE PER TRIGHERARE EVENTO PULSANTE PREMUTO

  var searchinput = $("#search > input"); //INPUT RICERCA
  searchinput.keyup(search);
}
