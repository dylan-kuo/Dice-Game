// JS Exam (Tzupin Kuo)  12/6/2016

var btnRoll, btnPlay, bankerMsg, bankerPoint = 0;
var frequency = [0, 0, 0, 0, 0, 0, 0];
var imgName = ["die1.png", "die2.png", "die3.png", "die4.png", "die5.png", "die6.png"];
var image = ["die1", "die2", "die3", "die4", "die5", "die6", "die7", "die8"];   

function start() {	
    btnPlay = document.getElementById("btnPlay");
    btnPlay.addEventListener("click", play, false);
    btnRoll = document.getElementById("btnRoll");
    btnRoll.addEventListener("click", playerRoll, false);
    btnRoll.disabled = true;
	bankerMsg = document.getElementById("bankerMsg");
	getPlayerName();
}

function getPoint() {	
	
    for (var i = 1; i < 7; i++) {
		if (frequency[i] == 4) // ** Four of a kind **   (e.g., 1111 > return 1*2 )
			return 12;			
		else if (frequency[i] == 3) { // e.g., 1113 > return 1+3
			for (var k = 1; k < 7; k++) {
				if (frequency[k] == 1)
					return i + k;
			}
		}
		
		else if (frequency[i] == 2) { // ** one pair + 2 different or Two pairs **   (e.g., 1123 or 1122)
			var point = 0;
			for (var x = 1; x < 7; x++) {
				if (frequency[x] == 1) {  // (e.g., 1123 > return 2+3)
					point += x;
				}				
				else if (x != i && frequency[x] == 2) { // (e.g., 1122 > return 2*2)				
					if (x > i)
						point =  x * 2;
					else 
						point =  i * 2;
				}					
			}
			//if (point == 3)  // ** This will return 1 (instead of 3) to indicate an automatical loss (1 pair + 1 and 2 = 3 point) **
			//	return 1;
			return point;
		}			
	}
	for (var i = 1; i < 7; i++) { //  ** Four different ** (e.g., 1234 > return 0)
		if (frequency[i] < 2)
			return 0;
	}
	
	
}

function roll(n1, n2) {
    var point;
    for (var i = 1; i <= 6; i++)
        frequency[i] = 0;
    for (var i = n1; i < n2; i++) {
        face = Math.floor(1 + Math.random() * 6);
        document.images[image[i]].src = imgName[face - 1];
        frequency[face]++;
    }
    point = getPoint();
	//alert(point);
	//    document.getElementById("result").innerHTML = "point = " + point;
	return point;
}

function play() {	
    for (var i = 4; i < 8; i++) {                             // Initially, make player's dice to blank
        document.images[image[i]].src = "blank.png";
    }   		
	/* // This is same as the following statement.
	bankerPoint = roll(0, 4);
	while(bankerPoint == 0)   
	{
		bankerPoint = roll(0, 4);
	} */
    while ((bankerPoint = roll(0, 4)) == 0);	
	
    if (bankerPoint == 12) { // Automatically win (banker)
        bankerMsg.setAttribute("value", "Automatic Win");
        btnRoll.setAttribute("value", "Sorry...");
        btnPlay.setAttribute("value", "Play Again");
    }
    else if (bankerPoint == 3) { // Autimatically lose (banker)
        bankerMsg.setAttribute("value", "Well.  I lose.");
        btnRoll.setAttribute("value", "You win, Congratulation!");
        btnPlay.setAttribute("value", "Play Again");
    }
    else {
        bankerMsg.setAttribute("value", ("point:" + bankerPoint));
        btnRoll.setAttribute("value", "Please Roll");
        btnPlay.setAttribute("value", "Playing...");
        btnPlay.disabled = true;
        btnRoll.disabled = false;
    }	 
}

function playerRoll() {
	var playerPoint = 0;
	playerPoint = roll(4,8);
	
	if (playerPoint == 0) {
	    btnPlay.setAttribute("value", "No Point");
		btnRoll.setAttribute("value", "Roll Again");		
	}
	else {
	    btnPlay.disabled = false;
	    btnPlay.setAttribute("value", "Play Again.");
		btnRoll.disabled = true;		
		
		if (bankerPoint == playerPoint)
		    btnRoll.setAttribute("value", "Push");
		else if (bankerPoint > playerPoint)
		    btnRoll.setAttribute("value", ("I got " + playerPoint + " You Win!"));
		else
		    btnRoll.setAttribute("value", ("I got " + playerPoint + ": You Lose!"));
	}
	//testFrequency();  // test test test 
}

function getPlayerName() {
    var person = prompt("Your name please", "Challenger");
    
    if (person != null) {
        document.getElementById("playerName").innerHTML =
        "You (" + person + ")<br> The Player";
    }	
	else if (person == null || person == "") {
		document.getElementById("playerName").innerHTML =
        "You (anonymous)<br> The Player";
	}	
}

function testFrequency() {
	alert("1: " + frequency[1] + "\n" + "2: " + frequency[2] + "\n" + "3: " + 
		          frequency[3] + "\n" + "4: " + frequency[4] + "\n" + "5: " + 
				  frequency[5] + "\n" + "6: " + frequency[6]);
}

window.addEventListener("load", start, false);

