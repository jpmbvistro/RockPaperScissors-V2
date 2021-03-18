/***************************************
======Project: Rock Paper Scissors V2.0======
Made for Coding Challenge
By:
Juan Vistro, Jerry Lafume, Kevin Sandoval,
Khorally Pierre, Miggie Garcia,
Milan Robinson, Rodas Ghidei,
and Tamika Sterlin
***************************************/

/***************************************
===========Selection Class==============
cardFaces: array of Cards to duplicate
match number: number of card duplicates to match
****************************************/
class Selection {
  constructor(beats, beaten, name) {
    this.beats = beats;
    this.beatenBy = beaten;
    this.name = name;
  }
}

let spock = new Selection(["scissors", "rock"], ["paper", "lizard"], "spock")
let scissors = new Selection(["paper","lizard"],["rock","spock"], "scissors")
let rock = new Selection(["lizard","scissors"], ["paper", "spock"], "rock")
let lizard = new Selection(["paper", "spock"], ["rock", "scissors"], "lizard")
let paper = new Selection(["rock", "spock"], ["lizard", "scissors"], "paper")


//array of all selections
let selection = [spock, rock, paper, scissors, lizard]



/*************************
===Server stuff Below====


**************************/

const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');


const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  // the forward slash represents the main page's root
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      console.log('Found index')
      res.end();
    });
  }
  // conditional logic leads to another page using node
  else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      console.log('Found js')
      res.end();
    });
  }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      console.log('Found index')
      res.end();
    });
  }
  else if (page == '/css/reset.css'){
    fs.readFile('css/reset.css', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/img/rock.png'){
    fs.readFile('img/rock.png', function(err, data) {
      res.write(data);
      res.end();
    });
  }
  else if (page == '/img/paper.png'){
    fs.readFile('img/paper.png', function(err, data) {
      res.write(data);
      res.end();
    });
  }
  else if (page == '/img/scissors.png'){
    fs.readFile('img/scissors.png', function(err, data) {
      res.write(data);
      res.end();
    });
  }
  else if (page == '/img/lizard.png'){
    fs.readFile('img/lizard.png', function(err, data) {
      res.write(data);
      res.end();
    });
  }
  else if (page == '/img/spock.png'){
    fs.readFile('img/spock.png', function(err, data) {
      res.write(data);
      res.end();
    });
  }
  else if (page == '/img/logo-white.png'){
    fs.readFile('img/logo-white.png', function(err, data) {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/img/logo-dark.png'){
    fs.readFile('img/logo-dark.png', function(err, data) {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.write(data);
      res.end();
    });
  }

  else if (page == '/api') {
    //checks if the string 'pick' is in the array params
    if('pick' in params){
      res.writeHead(200, {'Content-Type': 'application/json'});
      //What is on script.js: fetch(`/api?pick=${pick}`)

      let result = ''
      let userPick = params['pick'] //what was picked
      // params = query that is used to get what you want selected
      let computerPick = selection[Math.floor(Math.random()*5)]
      if (computerPick.beats.includes(userPick)) {
          result = "Sorry, You lost :("
          //computer wins
      } else if (computerPick.beatenBy.includes(userPick)){
         result = "You won!"
        //user wins
      } else {
         result = "It's a Tie.."
        //tie
      }

      //objToJson is what we return
      const objToJson = {
        computerPick: computerPick.name,
        response: result
      }
      res.end(JSON.stringify(objToJson));

    }
  }

});

server.listen(8000);
