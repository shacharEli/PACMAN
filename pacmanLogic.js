
var canvas;
var context;
var shape=new Object();
shape.i=-1;
shape.j=-1;
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var welcomeDiv;
var registerDiv;
var loginDiv;
var gameCanvasDiv;
var aboutus
var divElements = ["welcome","logIn","register","gameCanvas","about","setupDiv","instructions"];
var currentdiv;
var users=[];
var defaultUser=new Object();;
defaultUser.key="a";
defaultUser.value="a";
users.push(defaultUser);
var pacman_direction = "right";
var pacmanFrameNum=0;
var pacmanPos = new Object();
var pacmanAnimation;
var enemyFrameNum=1;
var enemy1 = new Image();
var enemy2 = new Image();
var enemy3 = new Image();
var enemy1Pos=new Object();
var enemy2Pos=new Object();
var enemy3Pos=new Object();
var normalMonsterImage1, normalMonsterImage2,normalMonsterImage3,normalMonsterImage4,normalMonsterImage5,normalMonsterImage6
    ,normalMonsterImage7,normalMonsterImage8,normalMonsterImage9,normalMonsterImage10,normalMonsterImage11,normalMonsterImage12
    ,normalMonsterImage13, normalMonsterImage14,normalMonsterImage15,normalMonsterImage16,normalMonsterImage17,normalMonsterImage18
    ,normalMonsterImage19,normalMonsterImage20,normalMonsterImage21,normalMonsterImage22,normalMonsterImage23,normalMonsterImage24;
var crazyMonsterImage1, crazyMonsterImage2,crazyMonsterImage3,crazyMonsterImage4,crazyMonsterImage5,crazyMonsterImage6
    ,crazyMonsterImage7,crazyMonsterImage8,crazyMonsterImage9,crazyMonsterImage10,crazyMonsterImage11,crazyMonsterImage12;
var monsterImage1, monsterImage2,monsterImage3,monsterImage4,monsterImage5,monsterImage6
    ,monsterImage7,monsterImage8,monsterImage9,monsterImage10,monsterImage11,monsterImage12;
var snitchImage1,snitchImage2,snitchImage3,snitchImage4,snitchImage5,snitchImage6,snitchImage7,snitchImage8,snitchImage9,snitchImage10,snitchImage11,snitchImage12,snitchImage13,snitchImage14,snitchImage15,snitchImage16;
var cookie1Image,cookie2Image,cookie3Image;
var enemy1Frames = [];
var enemy2Frames = [];
var enemy3Frames = [];
var bonusCreatureFrames=[];
var enemyLongFrameNum=1;
var time_left;
var originTimeLeft=60;
var gameManager;
var contextManager;
var livesLeft=3;
var bonusTime=0;
var bonusCreaturePos=new Object();
var bonusCreatureFrameNum=1;
var bonusCreatureInterval;
var enemyInterval;
var frameInterval;
var powerupInterval;
var enemies_remain;
var BoardSizeX=10;
var BoardSizeY=10;
var audio;
var wallsBig=[  "0000000000",
                "0111001110",
                "0100000010",
                "0101001010",
                "0000111000",
                "0000101000",
                "0101001010",
                "0100000010",
                "0111001110",
                "0000000000"];
var wallsmedium=["0000000000",
                  "0000000000",
                  "0011100110",
                    "0010000010",
                    "0010000010",
                    "0010000010",
                    "0000000000",
                    "0011111100",
                    "0010000100",
                    "0000000000",];
wallsSmall=["0000000000",
            "0000000000",
            "0001010000",
            "0010000010",
            "0000000000",
            "0010000010",
            "0000000000",
            "0010010010",
            "0000000000",
            "0000000000"];
var cookies_remain;

$(document).ready(function () {
    canvas= document.getElementById('canvas');
	gameManager = document.getElementById('GameManager');
    for (var i = 0; i < divElements.length; i++) {
        if (divElements[i] == "welcome") {
            document.getElementById(divElements[i]).style.display = "block";

        }
        else
            document.getElementById(divElements[i]).style.display = "none";
    }
    currentdiv="welcome";


/////// Registration Section
		
        $.validator.addMethod("notNumbers", function (value, element, regexpr) {
            var numbr = /\d/;
            return !numbr.test(value);
        });

        $.validator.addMethod("passwordValid", function (value, element, regexpr) {
            var numbr = /\d/;
            var letter = /[a-zA-Z]/
            return numbr.test(value) && letter.test(value);
        }, "Password should contains numbers and letters.");

        $( function () {
            $('#suform').validate({
                onkeyup:false,
                onclick:true,
                onfocusout:false,
                rules: {
                    username: "required",
                    firstname: {
                        required: true,
                        notNumbers: true,
                    },
                    lastname: {
                        required: true,
                        notNumbers: true,
                    },
                    password: {
                        required: true,
                        passwordValid: true,
                        minlength: 8
                    },
                    password_confirm: {

                        required: true,
                        minlength: 8,
                        equalTo: "password",
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                },
                messages: {
                    username: "please enter user name",
                    firstname: {
                        required: "please enter first name",
                        notNumbers: "the first name must not include numbers",
                    },
                    lastname: {
                        required: "please enter last name",
                        notNumbers: "the last name must not include numbers",
                    },
                    password: {
                        required: "please enter password",
                        minlength: "the password must be at leat 8 characters",
                    },
                    password_confirm: {

                        required: "please confirm your password",
                        minlength: "you typed the wrong password",
                        equalTo: "you typed the wrong password",
                    },
                    email: {
                        required: "please enter an email",
                        email: "please insert valid email",
                    },
                }


            });

        });
        
    $('#signupsubmit').click(function () {

		if($('#suform').valid())
		{
        var newUser=new Object();
		newUser.key=$('#username').val();
		newUser.value=$('#password').val();
		users.push(newUser);
        showPage("logIn");
		}
    });
    
//////Validate SetUp form
    $.validator.addMethod("validBallsAmount", function (value, element, regexpr) {
		return ($.isNumeric(value) && value>49 && value< 91) ;
    }, " please enter balls amount witch is between 50 to 90");

    $.validator.addMethod("validGameDur", function (value, element, regexpr) {
        return ($.isNumeric(value) && value>59) ;
    },"please enter game duration that is longer that 60 s");

    $.validator.addMethod("monsterAmountValid", function (value, element, regexpr) {
        return ($.isNumeric(value) && value>0 && value<4) ;
    },"please enter number between 1 to 3");

    $( function () {
        $('#setupForm').validate({
            rules: {
                ballsnumberTxtBox: {
                    required: true,
                    validBallsAmount: true,
                },
                timeTxtBox: {
                    required: true,
                    validGameDur: true,
                },
                monsterAmountTxt: {
                    monsterAmountValid: true,
                   required: true,
                },

            },
            messages: {
                ballsnumberTxtBox: {
                    required: "please enter food amaount",
                    validBallsAmount: "please enter food amount between 50 to 90",
                },
                timeTxtBox: {
                    required: "please enter time duration for the game",
                    validGameDur: "please enter time that is longer than 60 sec",
                },
                monsterAmountTxt: {
                    required: "lpease enter monsters amount you want to play with ",
                    monsterAmountValid: "please enter number between 1 to 3",
                },
            }


        });

    });
    $("#setupsubmit").click(function(){
		if($('#setupForm').valid())
		{
            $( function() {
                $( "#instructions" ).dialog({
                    width:"50%",
                });
            } );

		}
    });
    $("#instructionsCloseBtn").click(function(){
        $("#instructions").dialog('close');
        StartGame();
    })
    });

function showPage(id)
{
	if(id=="about")
	{
		$( function() {
    $( "#about" ).dialog();
  } );
	}
	else
	{
 $(document.getElementById(currentdiv)).fadeOut();
    $(document.getElementById(id)).fadeIn();
    currentdiv=id;	
	}
}

function logIn()
{

    var usernameToCheck=document.getElementById("logusername").value;
    var pwdToCheck=document.getElementById("logpassword").value;
    var registeruser=false;
	var currUser;
    for(var user in users){
		if(registeruser==false){
			if(users[user].key == usernameToCheck) {
				currUser=user;
				registeruser=true;
			}
		}

    }
    if(registeruser){
        if(users[currUser].value==pwdToCheck){
            showPage("setupDiv");

        }
        else{
            alert("wrong password!");
        }
    }
    else
        alert("wrong username!");

}



////////////////////////GAME

function StartGame()
{
    audio= new Audio("song.mp3");
	clockImage = new Image();
    clockImage.src = "images/clock.png";
    cookie1Image = new Image();
    cookie1Image.src = "images/cookie.png";
	cookie2Image = new Image();
    cookie2Image.src = "images/cookie2.png";
	cookie3Image = new Image();
    cookie3Image.src = "images/cookie3.png";
    heartImage = new Image();
    heartImage.src = "images/heart.png";

    crazyMonsterImage1 = new Image();
    crazyMonsterImage1.src = "images/monsters/crazyMonster1.png";
    crazyMonsterImage2 = new Image();
    crazyMonsterImage2.src = "images/monsters/crazyMonster2.png";
    crazyMonsterImage3 = new Image();
    crazyMonsterImage3.src = "images/monsters/crazyMonster3.png";
    crazyMonsterImage4 = new Image();
    crazyMonsterImage4.src = "images/monsters/crazyMonster4.png";
    crazyMonsterImage5 = new Image();
    crazyMonsterImage5.src = "images/monsters/crazyMonster5.png";
    crazyMonsterImage6 = new Image();
    crazyMonsterImage6.src = "images/monsters/crazyMonster6.png";
    crazyMonsterImage7 = new Image();
    crazyMonsterImage7.src = "images/monsters/crazyMonster7.png";
    crazyMonsterImage8 = new Image();
    crazyMonsterImage8.src = "images/monsters/crazyMonster8.png";
    crazyMonsterImage9 = new Image();
    crazyMonsterImage9.src = "images/monsters/crazyMonster9.png";
    crazyMonsterImage10 = new Image();
    crazyMonsterImage10.src = "images/monsters/crazyMonster10.png";
    crazyMonsterImage11 = new Image();
    crazyMonsterImage11.src = "images/monsters/crazyMonster11.png";
    crazyMonsterImage12 = new Image();
    crazyMonsterImage12.src = "images/monsters/crazyMonster12.png";
	enemy1Frames.push(crazyMonsterImage1);
	enemy1Frames.push(crazyMonsterImage2);
	enemy1Frames.push(crazyMonsterImage3);
	enemy1Frames.push(crazyMonsterImage4);
	enemy1Frames.push(crazyMonsterImage5);
	enemy1Frames.push(crazyMonsterImage6);
	enemy1Frames.push(crazyMonsterImage7);
	enemy1Frames.push(crazyMonsterImage8);
	enemy1Frames.push(crazyMonsterImage9);
	enemy1Frames.push(crazyMonsterImage10);
	enemy1Frames.push(crazyMonsterImage11);
	enemy1Frames.push(crazyMonsterImage12);
	
    normalMonsterImage1 = new Image();
    normalMonsterImage1.src = "images/monsters/normalMonster1.png";
    normalMonsterImage2 = new Image();
    normalMonsterImage2.src = "images/monsters/normalMonster2.png";
    normalMonsterImage3 = new Image();
    normalMonsterImage3.src = "images/monsters/normalMonster3.png";
    normalMonsterImage4 = new Image();
    normalMonsterImage4.src = "images/monsters/normalMonster4.png";
    normalMonsterImage5 = new Image();
    normalMonsterImage5.src = "images/monsters/normalMonster5.png";
    normalMonsterImage6 = new Image();
    normalMonsterImage6.src = "images/monsters/normalMonster6.png";
    normalMonsterImage7 = new Image();
    normalMonsterImage7.src = "images/monsters/normalMonster7.png";
    normalMonsterImage8 = new Image();
    normalMonsterImage8.src = "images/monsters/normalMonster8.png";
    normalMonsterImage9 = new Image();
    normalMonsterImage9.src = "images/monsters/normalMonster9.png";
    normalMonsterImage10 = new Image();
    normalMonsterImage10.src = "images/monsters/normalMonster10.png";
    normalMonsterImage11 = new Image();
    normalMonsterImage11.src = "images/monsters/normalMonster11.png";
    normalMonsterImage12 = new Image();
    normalMonsterImage12.src = "images/monsters/normalMonster12.png";
    normalMonsterImage13 = new Image();
    normalMonsterImage13.src = "images/monsters/normalMonster13.png";
    normalMonsterImage14 = new Image();
    normalMonsterImage14.src = "images/monsters/normalMonster14.png";
    normalMonsterImage15 = new Image();
    normalMonsterImage15.src = "images/monsters/normalMonster15.png";
    normalMonsterImage16 = new Image();
    normalMonsterImage16.src = "images/monsters/normalMonster16.png";
    normalMonsterImage17 = new Image();
    normalMonsterImage17.src = "images/monsters/normalMonster17.png";
    normalMonsterImage18 = new Image();
    normalMonsterImage18.src = "images/monsters/normalMonster18.png";
    normalMonsterImage19 = new Image();
    normalMonsterImage19.src = "images/monsters/normalMonster19.png";
    normalMonsterImage20 = new Image();
    normalMonsterImage20.src = "images/monsters/normalMonster20.png";
    normalMonsterImage21 = new Image();
    normalMonsterImage21.src = "images/monsters/normalMonster21.png";
    normalMonsterImage22 = new Image();
    normalMonsterImage22.src = "images/monsters/normalMonster22.png";
    normalMonsterImage23 = new Image();
    normalMonsterImage23.src = "images/monsters/normalMonster23.png";
    normalMonsterImage24 = new Image();
    normalMonsterImage24.src = "images/monsters/normalMonster24.png";
	enemy2Frames.push(normalMonsterImage1);
	enemy2Frames.push(normalMonsterImage2);
	enemy2Frames.push(normalMonsterImage3);
	enemy2Frames.push(normalMonsterImage4);
	enemy2Frames.push(normalMonsterImage5);
	enemy2Frames.push(normalMonsterImage6);
	enemy2Frames.push(normalMonsterImage7);
	enemy2Frames.push(normalMonsterImage8);
	enemy2Frames.push(normalMonsterImage9);
	enemy2Frames.push(normalMonsterImage10);
	enemy2Frames.push(normalMonsterImage11);
	enemy2Frames.push(normalMonsterImage12);
	enemy2Frames.push(normalMonsterImage13);
	enemy2Frames.push(normalMonsterImage14);
	enemy2Frames.push(normalMonsterImage15);
	enemy2Frames.push(normalMonsterImage16);
	enemy2Frames.push(normalMonsterImage17);
	enemy2Frames.push(normalMonsterImage18);
	enemy2Frames.push(normalMonsterImage19);
	enemy2Frames.push(normalMonsterImage20);
	enemy2Frames.push(normalMonsterImage21);
	enemy2Frames.push(normalMonsterImage22);
	enemy2Frames.push(normalMonsterImage23);
	enemy2Frames.push(normalMonsterImage24);
	
	
    monsterImage1 = new Image();
    monsterImage1.src = "images/monsters/monster1.png";
    monsterImage2 = new Image();
    monsterImage2.src = "images/monsters/monster2.png";
    monsterImage3 = new Image();
    monsterImage3.src = "images/monsters/monster3.png";
    monsterImage4 = new Image();
    monsterImage4.src = "images/monsters/monster4.png";
    monsterImage5 = new Image();
    monsterImage5.src = "images/monsters/monster5.png";
    monsterImage6 = new Image();
    monsterImage6.src = "images/monsters/monster6.png";
    monsterImage7 = new Image();
    monsterImage7.src = "images/monsters/monster7.png";
    monsterImage8 = new Image();
    monsterImage8.src = "images/monsters/monster8.png";
    monsterImage9 = new Image();
    monsterImage9.src = "images/monsters/monster9.png";
    monsterImage10 = new Image();
    monsterImage10.src = "images/monsters/monster10.png";
    monsterImage11 = new Image();
    monsterImage11.src = "images/monsters/monster11.png";
    monsterImage12 = new Image();
    monsterImage12.src = "images/monsters/monster12.png";
	enemy3Frames.push(monsterImage1);
	enemy3Frames.push(monsterImage2);
	enemy3Frames.push(monsterImage3);
	enemy3Frames.push(monsterImage4);
	enemy3Frames.push(monsterImage5);
	enemy3Frames.push(monsterImage6);
	enemy3Frames.push(monsterImage7);
	enemy3Frames.push(monsterImage8);
	enemy3Frames.push(monsterImage9);
	enemy3Frames.push(monsterImage10);
	enemy3Frames.push(monsterImage11);
	enemy3Frames.push(monsterImage12);
	
	snitchImage1 = new Image();
    snitchImage1.src = "images/monsters/snitch1.png";
    snitchImage2 = new Image();
    snitchImage2.src = "images/monsters/snitch2.png";
    snitchImage3 = new Image();
    snitchImage3.src = "images/monsters/snitch3.png";
    snitchImage4 = new Image();
    snitchImage4.src = "images/monsters/snitch4.png";
	snitchImage5 = new Image();
    snitchImage5.src = "images/monsters/snitch5.png";
    snitchImage6 = new Image();
    snitchImage6.src = "images/monsters/snitch6.png";
    snitchImage7 = new Image();
    snitchImage7.src = "images/monsters/snitch7.png";
    snitchImage8 = new Image();
    snitchImage8.src = "images/monsters/snitch8.png";
	snitchImage9 = new Image();
    snitchImage9.src = "images/monsters/snitch9.png";
    snitchImage10 = new Image();
    snitchImage10.src = "images/monsters/snitch10.png";
    snitchImage11 = new Image();
    snitchImage11.src = "images/monsters/snitch11.png";
    snitchImage12 = new Image();
    snitchImage12.src = "images/monsters/snitch12.png";
	snitchImage13 = new Image();
    snitchImage13.src = "images/monsters/snitch13.png";
    snitchImage14 = new Image();
    snitchImage14.src = "images/monsters/snitch14.png";
    snitchImage15 = new Image();
    snitchImage15.src = "images/monsters/snitch15.png";
    snitchImage16 = new Image();
    snitchImage16.src = "images/monsters/snitch16.png";
    
	bonusCreatureFrames.push(snitchImage1);
	bonusCreatureFrames.push(snitchImage2);
	bonusCreatureFrames.push(snitchImage3);
	bonusCreatureFrames.push(snitchImage4);
	bonusCreatureFrames.push(snitchImage5);
	bonusCreatureFrames.push(snitchImage6);
	bonusCreatureFrames.push(snitchImage7);
	bonusCreatureFrames.push(snitchImage8);
	bonusCreatureFrames.push(snitchImage9);
	bonusCreatureFrames.push(snitchImage10);
	bonusCreatureFrames.push(snitchImage11);
	bonusCreatureFrames.push(snitchImage12);
	bonusCreatureFrames.push(snitchImage13);
	bonusCreatureFrames.push(snitchImage14);
	bonusCreatureFrames.push(snitchImage15);
	bonusCreatureFrames.push(snitchImage16);
	
	context = canvas.getContext("2d");
	contextManager = gameManager.getContext("2d");
    showPage("gameCanvas");
	
	Start();
}



function Start() {
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();
    board = new Array();
    score = 0;
    pac_color = "blue";
    var cnt = 96;
    var foodAmount = $("#ballsnumberTxtBox").val();
    cookies_remain=foodAmount;
    var food_remain = $("#ballsnumberTxtBox").val();
    var pacman_remain = 1;
    enemies_remain = $("#monsterAmountTxt").val();
    originTimeLeft = $("#timeTxtBox").val();
    enemy1Pos.i = -1;
    enemy1Pos.j = -1;
    enemy2Pos.i = -1;
    enemy2Pos.j = -1;
    enemy3Pos.i = -1;
    enemy3Pos.j = -1;
    bonusCreaturePos.i = 0;
    bonusCreaturePos.j = -1;
    start_time = new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
    }
    for (var i = 0; i < 10; i++) {
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 10; j++) {
            if ((i == 0 && j == 0) && (i == 9 && j == 0) && (i == 0 && j == 9) && (i == 9 && j == 9)) {

            }
            else {
                if (foodAmount < 70) {
                    if (wallsBig[i][j] == 1) {
                        board[i][j] = 4;
                    }
                }
                else if (foodAmount < 80) {
                    if (wallsmedium[i][j] == 1) {
                        board[i][j] = 4;
                    }
                }
                else if (foodAmount <= 90) {
                    if (wallsSmall[i][j] == 1) {
                        board[i][j] = 4;
                    }
                }
                if (board[i][j] != 4) {
                    var randomNum = Math.random();
                    if (randomNum <= 1.0 * food_remain / cnt) {
                        var secondRand = Math.random();
                        if (secondRand < 0.6) {
                            board[i][j] = 1;
                        }
                        else if (secondRand < 0.9) {
                            board[i][j] = 7;
                        }
                        else {
                            board[i][j] = 8;
                        }
                        food_remain--;
                    } else if ((randomNum < 1.0 * (pacman_remain + food_remain) / cnt) && !(i == 0 && j == 0) && !(i == 9 && j == 0) && !(i == 0 && j == 9) && !(i == 9 && j == 9)) {
                        shape.i = i;
                        shape.j = j;
                        pacman_remain--;
                        board[i][j] = 2;
                    } else {
                        board[i][j] = 0;

                    }

                }
                cnt--;
            }
        }

    }
    while (shape.i == -1 || shape.j == -1) {
        for (var i = 2; i < 8; i++) {
            for (var j = 2; j < 8; j++) {
                if (board[i][j] == 0 && !(i == 0 && j == 0) && !(i == 9 && j == 0) && !(i == 0 && j == 9) && !(i == 9 && j == 9) && pacman_remain > 0) {

                    shape.i = i;
                    shape.j = j;
                    board[i][j] = 2;
                    pacman_remain--;
                }
            }
        }
        if (pacman_remain > 0) {
            shape.i = 5;
            shape.j = 5;
            board[shape.i][shape.j] = 2;
            pacman_remain--;
        }
    }
    startCreatures();

    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 1;
    food_remain--;

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
}


function startCreatures()
{
	clearInterval(interval);
	clearInterval(enemyInterval);
	clearInterval(frameInterval);
	clearInterval(powerupInterval);
	clearInterval(bonusCreatureInterval);
		if(enemies_remain>=1)
					{
						if(enemy1Pos.OnFood>0)
						{
							board[enemy1Pos.i][enemy1Pos.j]=enemy1Pos.OnFood;
						}
                        else if(enemy1Pos.i!=-1)
                        {
                            board[enemy1Pos.i][enemy1Pos.j]=0;
                        }
						enemy1Pos.i=9;
						enemy1Pos.j=9;
                        if(board[enemy1Pos.i][enemy1Pos.j]!=0) {
                            enemy1Pos.OnFood = board[enemy1Pos.i][enemy1Pos.j];
                        }
                        else
                        {
                            enemy1Pos.OnFood=-1;
                        }
                        board[enemy1Pos.i][enemy1Pos.j]=3;
					}
					if(enemies_remain>=2){
						if(enemy2Pos.OnFood>0)
						{
							board[enemy2Pos.i][enemy2Pos.j]=enemy2Pos.OnFood;
						}
                        else if(enemy2Pos.i!=-1)
                        {
                            board[enemy2Pos.i][enemy2Pos.j]=0;
                        }
						enemy2Pos.i=9;
						enemy2Pos.j=0;
						if(board[enemy2Pos.i][enemy2Pos.j]!=0) {
                            enemy2Pos.OnFood = board[enemy2Pos.i][enemy2Pos.j];
                        }
                        else
                        {
                            enemy2Pos.OnFood=-1;
                        }
						board[enemy2Pos.i][enemy2Pos.j]=5;
					}
					if(enemies_remain==3){
						if(enemy3Pos.OnFood>0)
						{
							board[enemy3Pos.i][enemy3Pos.j]=enemy3Pos.OnFood;
						}
						else if(enemy3Pos.i!=-1)
                        {
                            board[enemy3Pos.i][enemy3Pos.j]=0;
                        }
						enemy3Pos.i=0;
						enemy3Pos.j=0;
                        if(board[enemy3Pos.i][enemy3Pos.j]!=0) {
                            enemy3Pos.OnFood = board[enemy3Pos.i][enemy3Pos.j];
                        }
                        else
                        {
                            enemy3Pos.OnFood=-1;
                        }
                        board[enemy3Pos.i][enemy3Pos.j]=6;
					}
					if(bonusCreaturePos.i!=-1)
					{
                        if(bonusCreaturePos.OnFood>0)
                        {
                            board[bonusCreaturePos.i][bonusCreaturePos.j]=bonusCreaturePos.OnFood;
                        }
                        else
                        {
                            board[bonusCreaturePos.i][bonusCreaturePos.j]=0;
                        }
						bonusCreaturePos.i=0;
						bonusCreaturePos.j=9;
                        if(board[bonusCreaturePos.i][bonusCreaturePos.j]!=0) {
                            bonusCreaturePos.OnFood = board[bonusCreaturePos.i][bonusCreaturePos.j];
                        }
                        else
                        {
                            bonusCreaturePos.OnFood=-1;
                        }
						board[bonusCreaturePos.i][bonusCreaturePos.j]=11;
						bonusCreatureInterval=setInterval(moveBonusCreature,120);
					}
	interval=setInterval(UpdatePosition, 80);
	enemyInterval=setInterval(moveEnemy,700);
	frameInterval=setInterval(function(){
		pacmanFrameNum++;
		enemyFrameNum++;
		enemyLongFrameNum++;
		if(pacmanFrameNum>10){
			pacmanFrameNum=0;
		}
		if(enemyFrameNum>12){
			enemyFrameNum=1;
		}
		if(enemyLongFrameNum>24){
			enemyLongFrameNum=1;
		}
	},125);
	powerupInterval=setInterval(addPowerup,10000);
}
function findRandomEmptyCell(board){
    var i = Math.floor((Math.random() * 9) + 1);
    var j = Math.floor((Math.random() * 9) + 1);
    while(board[i][j]!=0)
    {
        i = Math.floor((Math.random() * 9) + 1);
        j = Math.floor((Math.random() * 9) + 1);
    }
    return [i,j];
}

function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) {
        return 2;
    }
    if (keysDown[37]) {
        return 3;
    }
    if (keysDown[39]) {
        return 4;
    }
}

function Draw() {
    canvas.width=canvas.width; //clean board
    contextManager.clearRect(0, 0, gameManager.width, gameManager.height); //clean
    lblScore.value = score;
    lblTime.value = time_left;
	for(var i=0;i<livesLeft;i++)
	{
		contextManager.drawImage(heartImage,i*30+15,15,30,30);
	}
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == 2) {
				pacmanPos.i=center.x;
				pacmanPos.j=center.y ;
				drawPacmanAnimation(pacmanPos.i,pacmanPos.j);
				
            }
			else if (board[i][j] == 1)
			{//smallCookie 
                context.drawImage(cookie1Image,center.x-30,center.y-30,60,60);
			}
			else if(board[i][j]==3) //enemy1
			{
				drawEnemyAnimation(center.x,center.y,1);
			}
			else if(board[i][j]==5) //enemy2
			{
				drawEnemyAnimation(center.x,center.y,2);
			}
			else if(board[i][j]==6) //enemy3
			{
				drawEnemyAnimation(center.x,center.y,3);
			}
			else if(board[i][j]==7) //mediumCookie
			{
				context.drawImage(cookie2Image,center.x-30,center.y-30,60,60);
			}
			else if(board[i][j]==8) //bigCookie
			{
				context.drawImage(cookie3Image,center.x-30,center.y-30,60,60);
			}
			else if(board[i][j]==9) //clock powerup
			{
				context.drawImage(clockImage,center.x-30,center.y-30,60,60);
			}
			else if(board[i][j]==10) //heart powerup
			{
				context.drawImage(heartImage,center.x-30,center.y-30,60,60);
			}
			else if(board[i][j]==11) //points powerup
			{
				drawBonusCreature(center.x,center.y);
			}
            else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x-30, center.y-30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }

}
function drawPacmanAnimation(x,y)
{
	var opening;
	
	if(pacmanFrameNum>5)
	{
		opening=1;
	}
	else
	{
		opening=-1;
	}
	context.beginPath();
	if(pacman_direction=="right")
	{
		context.arc(x, y, 30, (0.15-(0.15*((pacmanFrameNum-5)/5)*opening)) * Math.PI, (1.85+(0.15*((pacmanFrameNum-5)/5)*opening)) * Math.PI); // half circle
    }
	else if(pacman_direction=="down")
	{
		context.arc(x, y, 30, (0.65-(0.149*((pacmanFrameNum-5)/5)*opening)) * Math.PI, (0.35+(0.149*((pacmanFrameNum-5)/5)*opening)) * Math.PI); // half circle
	}
	else if(pacman_direction=="left")
	{
		context.arc(x, y, 30, (1.15-(0.149*((pacmanFrameNum-5)/5)*opening)) * Math.PI, (0.85+(0.149*((pacmanFrameNum-5)/5)*opening)) * Math.PI); // half circle
	}
	else
	{
		context.arc(x, y, 30, (1.65-(0.149*((pacmanFrameNum-5)/5)*opening)) * Math.PI, (1.35+(0.149*((pacmanFrameNum-5)/5)*opening)) * Math.PI); // half circle
	}
	context.lineTo(x, y);
    context.fillStyle = pac_color; //color
    context.fill();
    context.beginPath();
	if(pacman_direction=="right")
	{
		context.arc(x - 15, y - 15, 10, 0, 2 * Math.PI); // circle
		context.arc(x - 5, y - 20, 10, 0, 2 * Math.PI); // circle
		context.fillStyle = "white"; //color
		context.fill();
		context.beginPath();
		context.arc(x - 14, y - 14, 5, 0, 2 * Math.PI); // circle
		context.arc(x - 5, y - 20, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}
	else if(pacman_direction=="down")
	{
		context.arc(x - 15, y - 15, 10, 0, 2 * Math.PI); // circle
		context.arc(x - 20, y - 5, 10, 0, 2 * Math.PI); // circle
		context.fillStyle = "white"; //color
		context.fill();
		context.beginPath();
		context.arc(x - 14, y - 14, 5, 0, 2 * Math.PI); // circle
		context.arc(x - 20, y - 5, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}
	else if(pacman_direction=="left")
	{
		context.arc(x + 15, y - 15, 10, 0, 2 * Math.PI); // circle
		context.arc(x + 5, y - 20, 10, 0, 2 * Math.PI); // circle
		context.fillStyle = "white"; //color
		context.fill();
		context.beginPath();
		context.arc(x + 14, y - 14, 5, 0, 2 * Math.PI); // circle
		context.arc(x + 5, y - 20, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}
	else
	{
		context.arc(x - 15, y + 15, 10, 0, 2 * Math.PI); // circle
		context.arc(x - 20, y + 5, 10, 0, 2 * Math.PI); // circle
		context.fillStyle = "white"; //color
		context.fill();
		context.beginPath();
		context.arc(x - 14, y + 14, 5, 0, 2 * Math.PI); // circle
		context.arc(x - 20, y + 5, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}
    
}
function drawEnemyAnimation(x,y,enemyNum)
{
	if(enemyNum==1){
		context.drawImage(enemy1Frames[enemyFrameNum-1],x-30,y-30,60,60);
	}
	else if(enemyNum==2){
		context.drawImage(enemy2Frames[enemyLongFrameNum-1],x-30,y-30,60,60);
	}
	else{
		context.drawImage(enemy3Frames[enemyFrameNum-1],x-30,y-30,60,60);
	}
	
	
}
function drawBonusCreature(x,y){
	context.drawImage(bonusCreatureFrames[bonusCreatureFrameNum-1],x-30,y-30,60,60);
}
function moveBonusCreature(){
	if(board[bonusCreaturePos.i][bonusCreaturePos.j]!=11)
	{
		bonusCreaturePos.i=-1;
		clearInterval(bonusCreatureInterval);
	}
	if(bonusCreaturePos.i!=-1)
	{
		if(bonusCreaturePos.OnFood>0)
		{
			board[bonusCreaturePos.i][bonusCreaturePos.j]=bonusCreaturePos.OnFood;
		}
		else
		{
			board[bonusCreaturePos.i][bonusCreaturePos.j]=0;
		}
		var randomDirection = Math.random()*4;
		if(randomDirection<1){//up
			if(bonusCreaturePos.j>0 && board[bonusCreaturePos.i][bonusCreaturePos.j-1]!=4 && board[bonusCreaturePos.i][bonusCreaturePos.j-1]!=6 && board[bonusCreaturePos.i][bonusCreaturePos.j-1]!=5 && board[bonusCreaturePos.i][bonusCreaturePos.j-1]!=2 && board[bonusCreaturePos.i][bonusCreaturePos.j-1]!=3)
        {
			bonusCreaturePos.j--;
        }
		}
		else if(randomDirection<2){//down
			if(bonusCreaturePos.j<9 && board[bonusCreaturePos.i][bonusCreaturePos.j+1]!=4 && board[bonusCreaturePos.i][bonusCreaturePos.j+1]!=6 && board[bonusCreaturePos.i][bonusCreaturePos.j+1]!=5 && board[bonusCreaturePos.i][bonusCreaturePos.j+1]!=2 && board[bonusCreaturePos.i][bonusCreaturePos.j+1]!=3)
        {
            bonusCreaturePos.j++;
        }
		}
		else if(randomDirection<3){//left
			if(bonusCreaturePos.i>0 && board[bonusCreaturePos.i-1][bonusCreaturePos.j]!=4 && board[bonusCreaturePos.i-1][bonusCreaturePos.j]!=6 && board[bonusCreaturePos.i-1][bonusCreaturePos.j]!=5 && board[bonusCreaturePos.i-1][bonusCreaturePos.j]!=2 && board[bonusCreaturePos.i-1][bonusCreaturePos.j]!=3)
        {
            bonusCreaturePos.i--;
			
        }
		}
		else//right
		{
			if(bonusCreaturePos.i<9 && board[bonusCreaturePos.i+1][bonusCreaturePos.j]!=4 && board[bonusCreaturePos.i+1][bonusCreaturePos.j]!=6 && board[bonusCreaturePos.i+1][bonusCreaturePos.j]!=5 && board[bonusCreaturePos.i+1][bonusCreaturePos.j]!=2 && board[bonusCreaturePos.i+1][bonusCreaturePos.j]!=3 )
        {
            bonusCreaturePos.i++;
			
        }
		}
		if(board[bonusCreaturePos.i][bonusCreaturePos.j]==1)
		{
			bonusCreaturePos.OnFood=1;
			board[bonusCreaturePos.i][bonusCreaturePos.j]=11;
		}
		else if(board[bonusCreaturePos.i][bonusCreaturePos.j]==7)
		{
			bonusCreaturePos.OnFood=7;
			board[bonusCreaturePos.i][bonusCreaturePos.j]=11;
		}
		else if(board[bonusCreaturePos.i][bonusCreaturePos.j]==8)
		{
			bonusCreaturePos.OnFood=8;
			board[bonusCreaturePos.i][bonusCreaturePos.j]=11;
		}
		else
		{
			bonusCreaturePos.OnFood=0;
			board[bonusCreaturePos.i][bonusCreaturePos.j]=11;
		}
		
	}
}
function moveEnemy()
{
	if(enemy1Pos.i!=-1)
	{
		if(enemy1Pos.OnFood>0)
		{
			board[enemy1Pos.i][enemy1Pos.j]=enemy1Pos.OnFood;
		}
		else
		{
			board[enemy1Pos.i][enemy1Pos.j]=0;
		}
        var possibleDirections =[];
        possibleDirections=PossibleMoves(enemy1Pos.i,enemy1Pos.j);
        var newPosEnemy1=new Object();
        newPosEnemy1=BestMove(enemy1Pos.i,enemy1Pos.j,shape.i,shape.j,enemy1Pos,possibleDirections);
        //alert(newPosEnemy1.i+" " +newPosEnemy1.j);
        enemy1Pos.i=newPosEnemy1.i;
        enemy1Pos.j=newPosEnemy1.j;

			if(enemy1Pos.j>=0 && enemy1Pos.j<10 && enemy1Pos.i<10 && enemy1Pos.i>=0 && board[enemy1Pos.i][enemy1Pos.j]!=4 && board[enemy1Pos.i][enemy1Pos.j]!=6 && board[enemy1Pos.i][enemy1Pos.j]!=5&& board[enemy1Pos.i][enemy1Pos.j]!=11)
			{
                if (board[enemy1Pos.i][enemy1Pos.j] == 1) {
                    enemy1Pos.OnFood = 1;
                    board[enemy1Pos.i][enemy1Pos.j] = 3;
                }
                else if (board[enemy1Pos.i][enemy1Pos.j] == 2)
                {
                    livesLeft--;
                    if (livesLeft <= 0)
                    {
                        alert("You Lost!!");
                        audio.pause();
                        clearInterval(interval);
                        clearInterval(enemyInterval);
                        clearInterval(frameInterval);
                        clearInterval(powerupInterval);
                        clearInterval(bonusCreatureInterval);
                    }
                    else {
                        alert("you lost one life, press ok to continue");
                        var pacman_remain_new = 1;
                        board[enemy1Pos.i][enemy1Pos.j] = 0;
                        for (var i = 2; i < 8; i++) {
                            for (var j = 2; j < 8; j++) {
                                if (board[i][j] == 0 && !(i==0 && j==0)&&!(i==9 && j==0)&&!(i==0 && j==9)&&!(i==9 && j==9) && pacman_remain_new == 1) {

                                    shape.i = i;
                                    shape.j = j;
                                    board[i][j] = 2;
                                    pacman_remain_new--;
                                }
                            }
                        }
                        if(pacman_remain_new>0)
                        {
                            shape.i=5;
                            shape.j=5;
                            board[shape.i][shape.j]=2;
                            pacman_remain_new--;
                        }
                        startCreatures();
                    }

                }
                else if (board[enemy1Pos.i][enemy1Pos.j] == 7) {
                    enemy1Pos.OnFood = 7;
                    board[enemy1Pos.i][enemy1Pos.j] = 3;
                }
                else if (board[enemy1Pos.i][enemy1Pos.j] == 8) {
                    enemy1Pos.OnFood = 8;
                    board[enemy1Pos.i][enemy1Pos.j] = 3;
                }
                else {
                    enemy1Pos.OnFood = 0;
                    board[enemy1Pos.i][enemy1Pos.j] = 3;
                }
            }
	}
	if(enemy2Pos.i!=-1) {
        if (enemy2Pos.OnFood > 0) {
            board[enemy2Pos.i][enemy2Pos.j] = enemy2Pos.OnFood;
        }
        else {
            board[enemy2Pos.i][enemy2Pos.j] = 0;
        }
        var possibleDirections = [];
        possibleDirections = PossibleMoves(enemy2Pos.i, enemy2Pos.j);
        var newPosEnemy2 = new Object();
        newPosEnemy2 = BestMove(enemy2Pos.i, enemy2Pos.j, shape.i, shape.j, enemy2Pos, possibleDirections);
        enemy2Pos.i = newPosEnemy2.i;
        enemy2Pos.j = newPosEnemy2.j;
        if (enemy2Pos.j >= 0 && enemy2Pos.j <= 9 && enemy2Pos.i <= 9 && enemy2Pos.i >= 0 && board[enemy2Pos.i][enemy2Pos.j] != 4 && board[enemy2Pos.i][enemy2Pos.j] != 6 && board[enemy2Pos.i][enemy2Pos.j] != 3 && board[enemy2Pos.i][enemy2Pos.j] != 11) {
            if (board[enemy2Pos.i][enemy2Pos.j] == 1) {
                enemy2Pos.OnFood = 1;
                board[enemy2Pos.i][enemy2Pos.j] = 5;
            }
            else if (board[enemy2Pos.i][enemy2Pos.j] == 2) {
                livesLeft--;
                if (livesLeft <= 0) {

                    alert("You Lost!!");
                    audio.pause();
                    clearInterval(interval);
                    clearInterval(enemyInterval);
                    clearInterval(frameInterval);
                    clearInterval(powerupInterval);
                    clearInterval(bonusCreatureInterval);
                }
                else {
                    alert("You lost one life, press ok to continue!");
                    var pacman_remain_new = 1;
                    board[enemy2Pos.i][enemy2Pos.j] = 0;
                    for (var i = 2; i < 8; i++) {
                        for (var j = 2; j < 8; j++) {
                            if (board[i][j] == 0 && !(i==0 && j==0)&&!(i==9 && j==0)&&!(i==0 && j==9)&&!(i==9 && j==9) && pacman_remain_new == 1) {

                                shape.i = i;
                                shape.j = j;
                                board[i][j] = 2;
                                pacman_remain_new--;
                            }
                        }
                    }
                    if(pacman_remain_new>0)
                    {
                        shape.i=5;
                        shape.j=5;
                        board[shape.i][shape.j]=2;
                        pacman_remain_new--;
                    }
                    startCreatures();
                }

            }
            else if (board[enemy2Pos.i][enemy2Pos.j] == 7) {
                enemy2Pos.OnFood = 7;
                board[enemy2Pos.i][enemy2Pos.j] = 5;
            }
            else if (board[enemy2Pos.i][enemy2Pos.j] == 8) {
                enemy2Pos.OnFood = 8;
                board[enemy2Pos.i][enemy2Pos.j] = 5;
            }
            else {
                enemy2Pos.OnFood = 0;
                board[enemy2Pos.i][enemy2Pos.j] = 5;
            }
        }
    }
	if(enemy3Pos.i!=-1)
	{
		if(enemy3Pos.OnFood>0)
		{
			board[enemy3Pos.i][enemy3Pos.j]=enemy3Pos.OnFood;
		}
		else
		{
			board[enemy3Pos.i][enemy3Pos.j]=0;
		}
        var possibleDirections = [];
        possibleDirections = PossibleMoves(enemy3Pos.i, enemy3Pos.j);
        var newPosEnemy3 = new Object();
        newPosEnemy3 = BestMove(enemy3Pos.i, enemy3Pos.j, shape.i, shape.j, enemy3Pos, possibleDirections);
        enemy3Pos.i = newPosEnemy3.i;
        enemy3Pos.j = newPosEnemy3.j;
        if (enemy3Pos.j >= 0 && enemy3Pos.j <= 9 && enemy3Pos.i <= 9 && enemy3Pos.i >= 0 && board[enemy3Pos.i][enemy3Pos.j] != 4 && board[enemy3Pos.i][enemy3Pos.j] != 5 && board[enemy3Pos.i][enemy3Pos.j] != 3 && board[enemy3Pos.i][enemy3Pos.j] != 11) {
            if (board[enemy3Pos.i][enemy3Pos.j] == 1) {
                enemy3Pos.OnFood = 1;
                board[enemy3Pos.i][enemy3Pos.j] = 6;
            }
            else if (board[enemy3Pos.i][enemy3Pos.j] == 2) {
                livesLeft--;
                if (livesLeft <= 0) {
                    alert("You Lost!!");
                    audio.pause();
                    clearInterval(interval);
                    clearInterval(enemyInterval);
                    clearInterval(frameInterval);
                    clearInterval(powerupInterval);
                    clearInterval(bonusCreatureInterval);
                }
                else {
                   alert("you lost 1 live");
                    var pacman_remain_new = 1;
                    board[enemy3Pos.i][enemy3Pos.j] = 0;
                    for (var i = 2; i < 8; i++) {
                        for (var j = 2; j < 8; j++) {
                            if (board[i][j] == 0 && !(i==0 && j==0)&&!(i==9 && j==0)&&!(i==0 && j==9)&&!(i==9 && j==9) && pacman_remain_new == 1) {

                                shape.i = i;
                                shape.j = j;
                                board[i][j] = 2;
                                pacman_remain_new--;
                            }
                        }
                    }
                    if(pacman_remain_new>0)
                    {
                        shape.i=5;
                        shape.j=5;
                        board[shape.i][shape.j]=2;
                        pacman_remain_new--;
                    }
                    startCreatures();
                }

            }
            else if (board[enemy3Pos.i][enemy3Pos.j] == 7) {
                enemy3Pos.OnFood = 7;
                board[enemy3Pos.i][enemy3Pos.j] = 6;
            }
            else if (board[enemy3Pos.i][enemy3Pos.j] == 8) {
                enemy3Pos.OnFood = 8;
                board[enemy3Pos.i][enemy3Pos.j] = 6;
            }
            else {
                enemy3Pos.OnFood = 0;
                board[enemy3Pos.i][enemy3Pos.j] = 6;
            }
        }
    }
}
function PossibleMoves(i,j,cost,prev)
{
    var possibleDirections=[];
    if(i+1<BoardSizeX)
    {
        if(board[i+1][j]!=4 && board[i+1][j]!=6 && board[i+1][j]!=5 && board[i+1][j]!=3)
        {
            var pos={i:i+1,j:j,prev:prev,cost:cost+1};
            possibleDirections.push(pos);}
    }
    if(i-1>=0)
    {
        if(board[i-1][j]!=4 && board[i-1][j]!=6 && board[i-1][j]!=5 && board[i-1][j]!=3)
        {
            var pos={i:i-1,j:j,prev:prev,cost:cost+1};
            possibleDirections.push(pos);}

    }
    if(j+1<BoardSizeY)
    {
        if(board[i][j+1]!=4 && board[i][j+1]!=6 && board[i][j+1]!=5 && board[i][j+1]!=3)
        {
            var pos={i:i,j:j+1,prev:prev,cost:cost+1};
            possibleDirections.push(pos);}
    }
    if(j-1>=0)
    {
        if(board[i][j-1]!=4 && board[i][j-1]!=6 && board[i][j-1]!=5 && board[i][j-1]!=3)
        {
            var pos={i:i,j:j-1,prev:prev,cost:cost+1};
            possibleDirections.push(pos);}
    }
    return possibleDirections;

}
//clculate and update the best move for an enemy acording to some distance
function BestMove(currenti,currentj,goali,goalj,enemy,possibleDirections)
{
    var queue=[];
    var visited= [];
    var co=Math.abs(goali-currenti)+Math.abs(goalj-currentj);
    var first={j:-1,i:-1,prev:-1,cost:-1};
    var initialState= {j:currentj,i:currenti,prev:-1,cost:co};
    queue.unshift(initialState);
    var tempPos=new Object();
    while(!IsEmpty(queue))
    {
        tempPos=new Object();
        tempPos=queue.pop();
        if(goalj==tempPos.j && goali==tempPos.i) {
            break;
        }
        var possibleDirections=[];
        possibleDirections= PossibleMoves(tempPos.i,tempPos.j,tempPos,tempPos.cost);
        var pos= new Object();
        for (var i=0; i<possibleDirections.length; i++)
        {
            if (!containPOS(possibleDirections[i], visited))
            {
                possibleDirections[i].prev=tempPos;
                visited.unshift(possibleDirections[i]);
                queue.unshift(possibleDirections[i]);

            }
        }

    }
    var nextPos=new Object();
    while(!(tempPos.i==currenti &&  tempPos.j==currentj)  )
    {
        nextPos= {i:tempPos.i,j:tempPos.j,prev:tempPos.prev,cost:tempPos.cost};
        tempPos=tempPos.prev;
    }
    return nextPos;
}
function contains(value,array)
{
    if (array==null)
        return flase;
    if(array.length==0)
        return false;
    for(var i=0; i<array.length;i++)
    {
        if(array[i]==value) {
            return true;
        }
    }
    return false;
}
function containPOS(value,array)
{
    if (typeof array=== 'undefined')
        return flase;
    if(array.length==0)
        return false;
    for(var i=0; i<array.length;i++)
    {
        if(array[i].i==value.i && array[i].j==value.j) {
            return true;
        }
    }
    return false;

}
function addPowerup(){
	var randomNum=Math.random()*2;//CHANGE NUMBER TO NUMBER OF POWERUPS!
	if(randomNum<1)
	{
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				if(board[i][j]==0){
					board[i][j]=9;//clock powerup
					return;
				}
			}
		}
	}
	else if(randomNum<2)
	{
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				if(board[i][j]==0){
					board[i][j]=10;//heart powerup
					return;
				}
			}
		}
	}
	/*else
	{
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				if(board[i][j]==0){
					board[i][j]=11;//points powerup
					bonusCreaturePos.i=i;
					bonusCreaturePos.j=j;
					bonusCreatureInterval=setInterval(moveBonusCreature,80);
					return;
				}
			}
		}
	}*/
}
function UpdatePosition() {
    board[shape.i][shape.j]=0;
    var x = GetKeyPressed()
    if(x==1)
    {
        if(shape.j>0 && board[shape.i][shape.j-1]!=4 && board[shape.i][shape.j-1]!=3 && board[shape.i][shape.j-1]!=5 && board[shape.i][shape.j-1]!=6)
        {
			shape.j--;
			pacman_direction="up";
        }
    }
    if(x==2)
    {
        if(shape.j<9 && board[shape.i][shape.j+1]!=4 && board[shape.i][shape.j+1]!=3 && board[shape.i][shape.j+1]!=5 && board[shape.i][shape.j+1]!=6)
        {
            shape.j++;
			pacman_direction="down";
        }
    }
    if(x==3)
    {
        if(shape.i>0 && board[shape.i-1][shape.j]!=4 && board[shape.i-1][shape.j]!=3 && board[shape.i-1][shape.j]!=5 && board[shape.i-1][shape.j]!=6)
        {
            shape.i--;
			pacman_direction="left";
			
        }
    }
    if(x==4)
    {
        if(shape.i<9 && board[shape.i+1][shape.j]!=4 && board[shape.i+1][shape.j]!=3 && board[shape.i+1][shape.j]!=5 && board[shape.i+1][shape.j]!=6 )
        {
            shape.i++;
			pacman_direction="right";
			
        }
    }
    if(board[shape.i][shape.j]==1)
    {
        score=score+5;
        cookies_remain--;
    }
	else if(board[shape.i][shape.j]==7)
    {
        score=score+15;
        cookies_remain--;
    }
	else if(board[shape.i][shape.j]==8)
    {
        score=score+25;
        cookies_remain--;
    }
	else if(board[shape.i][shape.j]==9)
    {
        bonusTime=bonusTime+10;
    }
	else if(board[shape.i][shape.j]==10)
    {
        livesLeft++;
    }
	else if(board[shape.i][shape.j]==11)
    {
        score=score+500;
    }
    board[shape.i][shape.j]=2;
	
    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/1000;
	time_left=originTimeLeft-time_elapsed+bonusTime;
    if(time_left<=10)
    {
        pac_color="green";
    }
	else
	{
		pac_color="blue";
	}
    if(time_left<=0 || cookies_remain<=0)
    {
        window.clearInterval(interval);
        window.clearInterval(enemyInterval);
        window.clearInterval(frameInterval);
        window.clearInterval(powerupInterval);
        window.clearInterval(bonusCreatureInterval);
        audio.pause();
        if(score>=150)
        {
            window.alert( "Score - " + score + "! WE GOT A WINNER!!!!!");
        }
        else
        {
            window.alert("Score - " + score +"! YOU CAN DO BETTER!!");
        }
    }
    else
    {
        Draw();
    }
}

function IsEmpty(array)
{
    if(typeof  array === 'undefined')
        return true;
    if(array.length==0)
        return true;
    return false;
}