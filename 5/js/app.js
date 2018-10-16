/*
    beginTime to hold the current time when the game start
    endTime to hold the current time when the game start
    cards for container of cards
    hold for the className of each card "fontAwesome"
    arr for temporary store card during click
    firstCard to store the first card when click on it
    move to keep track of clicking the cards
    starCount to store number of clicking when reach it change the star
    end to keep track of number of cards that match when it happen it calls the function to end 
    actualCard get the html element that contains fontawesome cards shape
    star contains the star element
*/
// calculate the intial time
let beginTime = performance.now(), 
    endTime,current;
let cards = document.getElementsByClassName('card');
let hold = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
let arr = [];
let firstCard, move = 0,
    starCount = 0,
    end = 0;
let actualCard = document.querySelectorAll(".card i");
let star = document.querySelectorAll(".stars li i");
let myTimer = document.getElementById("mytimer");


// wait until All elements loaded and then remove it

    
  
    

document.addEventListener("DOMContentLoaded", function () {
    add();
   setInterval(SetTimer,500);
    document.querySelector(".moves").textContent = "0 moves";
    setTimeout(function () {

        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove("open", "show", "match");


        }
       

    }, 4000);
    


});

// when click on restart game it restart 

document.querySelector(".restart").addEventListener("click", function () {
    location.reload();
});

//this function shuffle all elements and open the cards

function add() {
    hold = shuffle(hold);
    for (let i = 0; i < hold.length; i++) {

        actualCard[i].className = hold[i];
    }
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add("open", "show", "match");


    }

}
function SetTimer(){
    myTimer.style.cssText="margin-left :5%";
    let endTime =performance.now(); 
    current=((endTime - beginTime) / 1000).toFixed(0)-4;  //4 seconds until it loads
    if(current<0){
        myTimer.textContent="0 seconds";
    }
    if(current>0){
        myTimer.textContent=current+" seconds";
    }
        
   
    
   
}

// before game starts moves is 0

document.querySelector(".moves").textContent = 0;
//starting loop throw all elemtns and add click event listener to all cards
for (let i = 0; i < actualCard.length; i++) {
       
    cards[i].addEventListener("click", function () {
        //make sure the card you clicked on is not the same and the length of temporary arrary is zero
        if (arr.length === 0 && !cards[i].classList.contains("match")) {
            arr[0] = actualCard[i].className; //store the class name of the element that clicked
            firstCard = cards[i]; //store the card that containsthat element
            cards[i].classList.add("open", "show"); //make the card open
            //increase the variable that keep tracking of our stars
            end++; //increase the caraible that keep tracking of end of the game
            //when clicking the second card it appear and make sure he doesn't click on it twice
        } else if (arr.length === 1 && firstCard != cards[i] && !cards[i].classList.contains("match")) {
            arr[1] = actualCard[i].className;
            cards[i].classList.add("open", "show");
            move++;


            //if the cards match
            if (arr[0].toString() === arr[1].toString()) {

                cards[i].classList.add("match", "rubberBand"); //rubberBand is to make rubberBand animation
                firstCard.classList.add("match", "rubberBand");

                arr = [];
                end++;


            } //if the cards does not match
            else {

                cards[i].classList.add("show", "shake"); //shake to make shake animation
                firstCard.classList.add("shake");
                cards[i].style.backgroundColor = "#f00";
                firstCard.style.backgroundColor = "#f00";
                setTimeout(function () {
                    cards[i].classList.remove("open", "show", "shake");
                    firstCard.classList.remove("open", "show", "shake");
                    cards[i].style.backgroundColor = "";
                    firstCard.style.backgroundColor = "";
                }, 300);
                end--;

                arr = [];
            }
        }
        //set the new clicks
        document.querySelector(".moves").textContent = move+" moves";
        //cahnge the star depending on number of move or clicking
        if (move >= 10 && move<=18) {
            star[2].className = "";
            starCount = 2;
        }
        else if (move >= 19) {
            star[1].className = "";
            starCount = 1;
        }
        //when the game is done call the done method
        if (end === 16) {
            endTime = performance.now(); // game is end so calculate the time now
            done();
        }

    });
}
//done our game
function done() {

    document.querySelector(".container").style.display = "none";
    let div = document.createElement("DIV");
    document.body.appendChild(div);
    div.setAttribute("class", "fa fa-check");
    div.style.cssText = "    color: rgb(157, 255, 0); font-size: 4em;margin-left: 10%; padding: 8px; background-color: #9dff006b;border-radius: 10%;";

    let win = document.createElement("H1");
    let text = document.createTextNode("Congratulation! You Won!");
    win.appendChild(text);
    document.body.appendChild(win);

    let p = document.createElement("P");
    //telling the player the time and number of stars and moves
    let txt = document.createTextNode("with " + move + " moves " + starCount + " stars and " + current + "seconds");
    p.appendChild(txt);
    document.body.appendChild(p);
    p.style.cssText = "padding: 8px; margin-left: 4%; color: #0000005c;";


    let btn = document.createElement("BUTTON");
    let t = document.createTextNode("Play Again!");
    btn.appendChild(t);
    document.body.appendChild(btn);
    document.body.style.cssText = "margin: 19% 35%;"
    btn.style.cssText = "text-align: center;margin-left: 10%;border: none;background-color: #917;border-radius: 4%;padding: 10px 8px;cursor: pointer; color: #fff;";


    btn.addEventListener("click", function () {

        location.reload();

    });
}





// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}