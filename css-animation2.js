// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.

var CardGame = function(targetId)
{
  // variables privadas
  var cards = []
  var card_value = ["1C","2C","3C","4C","5C","6C","7C","8C","1H","2H","3H","4H","5H","6H","7H","8H"]; //nombres de las cartas en el arreglo

  var started = false;
  var matches_found = 0;
  var card1 = false, card2 = false;

  var hideCard = function(id) // voltear hacia abajo la carta
  {
    cards[id].firstChild.src = "./images/cards/back.jpg";
    with(cards[id].style) {
      WebkitTransform = MozTransform = OTransform = msTransform = "scale(1.0) rotate(360deg)";
    }
  };

  var moveToPack = function(id) // mover de vuelta al pack
  {
    hideCard(id);
    cards[id].matched = true;
    with(cards[id].style) {
      zIndex = "1000";
      top = "100px";
      left = "-140px";
      WebkitTransform = MozTransform = OTransform = msTransform = "rotate(0deg)";
      zIndex = "0";
    }
  };

  var moveToPlace = function(id) // repartir las cartas
  {
    cards[id].matched = false;
    with(cards[id].style) {
      zIndex = "1000";
      /*top = cards[id].fromtop + "px";  //cordenada horizontal que se incrementa cada 4 columnas para colocar progresivamente las cartas
      left = cards[id].fromleft + "px";*/ //cordadenas vertical que se incrementa cada 1 fila para colocar progresivamente las cartas
         top = "200px"; //cordenada vertical para la carta
      left = "200px";      //posicion horizontal para la carta
      WebkitTransform = MozTransform = OTransform = msTransform = "rotate(360deg)";
      zIndex = "0";
    }
  };

  var showCard = function(id) // turn card face up, check for match
  {
    if(id === card1) return;
    if(cards[id].matched) return;

    cards[id].firstChild.src = "./images/cards/" + card_value[id] + ".jpg";		//hace referencia a la localizacion de la imagen a mostrar 
    with(cards[id].style) {
      WebkitTransform = MozTransform = OTransform = msTransform = "scale(2.5) rotate(10deg)"; //tenia 185deg y se cambio a 0deg, scale hace zoom rotate rota la imagen
	mensaje(id);			//funcion para mostrar el mensaje del dia
    }


    if(card1 !== false) {
      card2 = id;
      if(parseInt(card_value[card1]) == parseInt(card_value[card2])) { // match found
        (function(card1, card2) {
          setTimeout(function() { moveToPack(card1); moveToPack(card2); }, 1000);
        })(card1, card2);
        if(++matches_found == 8) { // game over, reset
          matches_found = 0;
          started = false;
        }
      } else { // no match
        (function(card1, card2) {
          setTimeout(function() { hideCard(card1); hideCard(card2); }, 800);
        })(card1, card2);
      }
      card1 = card2 = false;
    } else { // first card turned over
      card1 = id;
    }
  };
	var mensaje = function(id){
		 var delay=2000;//1 seconds
    setTimeout(function(){
		alert ("mensaje del dia en funcion aparte");
    //your code to be executed after 1 seconds
    },delay); 

	};

  var cardClick = function(id)
  {
    if(started) {
      showCard(id);    //se llama a la funcion que muestra la carta
    } else {
      // shuffle and deal cards
      card_value.sort(function() { return Math.round(Math.random()) - 0.5; });
      for(i=0; i < 16; i++) {
        (function(idx) {
          setTimeout(function() { moveToPlace(idx); }, idx * 100);
        })(i);
      }
      started = true;
    }
  };

  // initialise

  var stage = document.getElementById(targetId);
  var felt = document.createElement("div");
  felt.id = "felt";
  stage.appendChild(felt);

  // template for card
  var card = document.createElement("div");
  card.innerHTML = "<img src=\"./images/cards/back.jpg\">";

  for(var i=0; i < 16; i++) {0
    var newCard = card.cloneNode(true);

    newCard.fromtop = 15 + 120 * Math.floor(i/4);
    newCard.fromleft = 70 + 100 * (i%4);
    (function(idx) {
      newCard.addEventListener("click", function() { cardClick(idx); }, false);
    })(i);

    felt.appendChild(newCard);
    cards.push(newCard);
  }

}
