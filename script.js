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
  var main = $("main.activechat");
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

  var message = text.toLowerCase(); // Trasformo tutto in minuscolo (NO-CASE SENSITIVE)

  switch (!bool) {
    case message.includes("ciao"):
      message = "Ciao Prof, come stai?";
      break;
    case message.includes("tu"):
      message = "Bene grazie!";
      break;
    case message.includes("stai"):
      message = "Mai stato meglio";
      break;
    case message.includes("bene"):
      message = "Grende, mi fa piacere :P";
      break;
    default:
      message = "non capisco, puoi ripetere perpiacere?";
  }

  pushMessage(bool, message);
}

function changeChat(me, contacts) {

  // var contacts = $("#contatti > .myfriend"); //RIPRENDO LA LISTA ------>  Non li ho ripresi perchè li ho nell'init avendo la funzione anonima
      contacts.removeClass("active");           //CANCELLO A TUTTI LA CLASSE ACTIVE (SENZA FARE UN CICLO INUTILE)

  // var me = $(this);                          //PRENDO L'ELEMENTO CLICCATO ----> Non li ho ripresi perchè li ho nell'init avendo la funzione anonima
      me.addClass("active");                    //AGGIUNGO CLASSE (SFONDO)
  var meIndex = me.index();                     //RICAVO L'INDICE

  var boxchat = $("main");                      //PRENDO TUTTI I BOXCHAT (STESSO NUMERO DEI CONTATTI IN LISTA)
      boxchat.removeClass("activechat");        //RIMUOVO A TUTTI LA CLASSE (LI NASCONDO TUTTI)
  var boxChatSelected = boxchat.eq(meIndex);    //PRENDO QUELLO CON INDICE ASSOCIATO
      boxChatSelected.addClass("activechat");   //AGGIUNGO LA CLASSE E LO RENDO VISIBILE

  var idChat = $(".idchat strong");             //PRENDO IL TAG CHE CONTIENE IL VECCHIO NOME
  var newID = me.find("h3").text();             //PRENDO IL NUOVO NOME
      idChat.text(newID);                       //LO PUSHO
}

function deleteMessage() {

  var me = $(this);
  var row = me.parent();                        //PRENDO LA RIGA INTERA, ALTRIMENTI RIMARREBBE VUOTA.
      row.remove();
}


function init() {

  var myMessage = $("#mymessage");               //INPUT
  myMessage.keyup(messageInputEvent);            //FUNZIONE PER TRIGHERARE EVENTO PULSANTE PREMUTO

  var searchinput = $("#search > input");        //INPUT RICERCA
  searchinput.keyup(search);

  var contactsList = $("#contatti > .myfriend");    //Prendo tutta la lista dei contatti
  contactsList.click(function() {                   // In questo caso al posto si fare  contactsList.click(changeChat) senza nessun parametro in INGRESSO
    var me = $(this);                               // Ho usato una funzione anonima per passargli due parametri:
    changeChat(me, contactsList)                    // 1) Il me, scelta obbligata metterlo qui e non nella funzione sopra.
  });                                               // 2) La var contactslist così non la devo richiamare nella funzione sopra (Infatti ora è commentata)

  $(document).on("dblclick", ".message.sent", deleteMessage); //ELIMINO RIGA MESSAGGI INVIATI SOLO AL DOPPIO CLICK
}                                                            //// NOTE: Facendo in questo modo ricarico il DOM html anche per i nuovi elmenti inseriti dopo. Altrimenti caricherebbe solo quelli iniziali nativi html.
