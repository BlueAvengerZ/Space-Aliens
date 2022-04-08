// lager variabel for canvas/banen og score. Sier også at canvas skal være 2d.
let score2 = document.querySelector('#score2')
let canvas = document.getElementById("canvas");
let cvs = canvas.getContext('2d');
// lager vairabel for canvas bakgrunnsfarge.
let bFarge;
//høyde og bredde til canvas eller områden.
canvas.width = 1445
canvas.height = 680
// lager variabel, når spillet er over og
// sier at verdien skal være falsk
let taptSpill = false;
let enSpiller = false;
let toSpiller = false;

// lager variabel for bakgrunnsmusikk, skytelyd både for alien
// og spilleren osv. Deretter legger jeg til musikkene eller lydene.
let musikk = new Audio('Sounds/musikk.mp3');
let skytelyd = new Audio("Sounds/Jetflys.mp3");
let skytelyd2 = new Audio("Sounds/skytelyd.mp3")
let skytelyd3 = new Audio("Sounds/Jetflys.mp3");
let eksplosjonslyd = new Audio("Sounds/eksplosjon.mp3");
let GameOver = new Audio("Sounds/Game-Over.mp3")

// hvis spillet er tapt, eller er over. Da stopp musikk osv.,
// hvis ikke fortsett musikken.
function musikkSpiller() {
  if (taptSpill == true) {
    musikk.pause();
    skytelyd.pause();
    skytelyd2.pause();
    skytelyd3.pause();
  } else {
    musikk.play();
  }
}

// hvis spillern 1 er ute,
// da stopp skytelyd for spilleren 1.
function musikkSpiller2() {
  if (enSpiller == true) {
    skytelyd.pause();
  }
}

// hvis spillern 2 er ute,
// da stopp skytelyd for spilleren 2.
function musikkSpiller2() {
  if (toSpiller == true) {
    skytelyd.pause();
  }
}

//lager klasse for spilleren 1.
class Player {
  constructor() {
    //lager funskjon for spillere til å bevege seg eller hastigheten.
    this.velocity = {
      x: 0,
      y: 0
    }
    // synlighet til spilleren 1.
    this.opacity = 1

    //lager variabel for bildet og lager objekt for den.
    let image = new Image()
    //henter bildet eller spilleren 1.
    image.src = './Bilder/spaceship-2.png'

    //last inn bildet eller spillern 1.
    image.onload = () => {
      //lager funskjon for bilde (spillern 1).
      this.image = image
      //lager variabel for størrelse til spilleren 1.
      let scale = 0.15
      //sier at høyde og bredde til spilleren 1 skal være standard.
      //altså den skal ha original størrelse på starten.
      //Dertter minker størrelse til bildet med bestemt
      //størrelse (0.15).
      this.width = image.width * scale
      this.height = image.height * scale
      // gir spilleren 1 eller bildet posisjon basert på canvas bredde
      // og høyde. Samtidig spillerens bestemt høyde og bestemt bredde også.
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height
      }
    }
  }

  //Legger til draw funksjon for spilleren 1.
  draw() {
    //skjul spilleren 1 basert på player opacity.
    cvs.globalAlpha = this.opacity


    //vis bildet som er valgt (spilleren eller bilde
    //med objekt Image) og setter inn verdier
    //som posisjon, høyde og bredde til spillern osv.
    cvs.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update() {
    // hvis bildet er lastet inn, hvis den på vinduet.
    if (this.image) {
      this.draw()
      this.position.x += this.velocity.x
      // spiller bakgrunnsmusikk for spillet.
      musikkSpiller();
    }
  }
}

//lager klasse for spilleren 2.
class Player2 {
  constructor() {
    //lager funskjon for spillere til å bevege seg eller hastigheten.
    this.velocity = {
      x: 0,
      y: 0
    }
    // synlighet til spilleren 2.
    this.opacity = 1

    //lager variabel for bildet og lager objekt for den.
    let image = new Image()
    //henter bildet eller spilleren.
    image.src = './Bilder/spaceship-2.png'

    //last inn bildet eller spillern 2.
    image.onload = () => {
      //lager funskjon for bilde (spillern 2).
      this.image = image
      //lager variabel for størrelse til spilleren 2.
      let scale = 0.15
      //sier at høyde og bredde til spilleren 2 skal være standard.
      //altså den skal ha original størrelse på starten.
      //Dertter minker størrelse til bildet med bestemt
      //størrelse (0.15).
      this.width = image.width * scale
      this.height = image.height * scale
      // gir spilleren 2 eller bildet posisjon basert på canvas bredde
      // og høyde. Samtidig spillerens bestemt høyde og bestemt bredde også.
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height
      }
    }
  }

  //Legger til draw funksjon for spilleren 2.
  draw() {
    //skjul spilleren 2 basert på player 2 opacity.
    cvs.globalAlpha = this.opacity

    //vis bildet som er valgt (spilleren eller bilde
    //med objekt Image) og setter inn verdier
    //som posisjon, høyde og bredde til spillern osv.
    cvs.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update() {
    // hvis bildet er lastet inn, hvis den på vinduet.
    if (this.image) {
      this.draw()
      this.position.x += this.velocity.x
      // spiller bakgrunnsmusikk for spillet.
      musikkSpiller();
    }
  }
}

//lager funskjon for spillerene kan skyte skudd og
//legger til klasse for den.
// og setter inn verider som posisjon og hastighet i constructor.
class Bullet {
  constructor({
    position,
    velocity
  }) {
    this.position = position
    this.velocity = velocity

    // sier hvor rund skal skuddene være.
    this.radius = 5
  }
  // lager skuddene, gir den farge, posisjon og hvis det på vinduet.
  draw() {
    //start.
    cvs.beginPath()
    //sirkel som er skuddene til spilleren.
    cvs.arc(this.position.x, this.position.y, this.radius, 0,
      Math.PI * 2)
    // farge for skuddene til spilleren.
    cvs.fillStyle = 'red'
    cvs.fill()
    //slutt.
  }

  // lager bevegelse med bestemt hastighet for
  // skuddene basert på x og y posisjon til
  // spilleren og hvis det på vinduet.
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}


//lager klasse for Aliens og
//setter inn verider som posisjon i constructor.
class Alien {
  constructor({
    position
  }) {

    //lager funskjon for spillere til å bevege seg.
    this.velocity = {
      x: 0,
      y: 0
    }

    //lager variabel for bildet og lager objekt som Image.
    let image = new Image()
    //henter bildet eller alien.
    image.src = './Bilder/alien.png'
    //last inn bildet eller alien som er bestemt.
    image.onload = () => {
      //lager funskjon for bilde (alien).
      this.image = image
      //lager variabel for størrelse til alien.
      let scale = 0.12

      //sier at høyde og bredde til alien skal være standard.
      //altså den skal ha original størrelse på starten.
      //Dertter minker størrelse til bildet med bestemt
      //størrelse (0.10).
      this.width = image.width * scale
      this.height = image.height * scale
      // gir alien verider som x posisjon og y posisjon.
      this.position = {
        x: position.x,
        y: position.y
      }
    }
  }

  draw() {
    //vis bildet som er valgt (alien eller bilde
    //med objekt Image) og setter inn verdier
    //som posisjon, høyde og bredde til alien osv.
    cvs.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  // hvis bildet er lastet inn, hvis den på vinduet
  // og oppdater bevegelse.
  update({
    velocity
  }) {
    if (this.image) {
      this.draw()
      // x posisjonen og y posisjon for aliens sammen med hastighet.
      this.position.x += velocity.x
      this.position.y += velocity.y
    }
  }
  //lager funksjon for at alien kan skyte skudd basert på posisjon x , y,
  // bredde og høyde. Dertter gir hastighet til skuddene.
  shoot(alienBullets) {
    // spill skytelyd når alien skyter.
    skytelyd2.play();
    alienBullets.push(new AlienBullet({
      position: {
        x: this.position.x + this.width,
        y: this.position.y + this.height
      },
      // hastighet til skuddene.
      velocity: {
        x: 0,
        y: 3
      }
    }))
  }
}


//lager klasse for AlienBullet.
//setter inn verider som posisjon og hastighet i constructor.
class AlienBullet {
  constructor({
    position,
    velocity
  }) {
    this.position = position
    this.velocity = velocity
    // sier at alien sin bullet sitt bredde
    // er 5 og høyde er 6.
    this.width = 7
    this.height = 9
  }
  // lager skuddene til aliens, gir den farge,
  // setter inn verider som posisjon, bredde, høyde
  // og hvis det på vinduet.
  draw() {
    cvs.fillStyle = 'green'
    cvs.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  // lager bevegelse med bestemt hastighet for
  // skuddene basert på x og y posisjon til
  // aliens og hvis det på vinduet.
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

//lager funskjon for eksplosjon, når alien blir truffet av skuddene til
//spilleren og legger til klasse. Setter inn verdiene i constructor.
class Eksplosjon {
  constructor({
    position,
    velocity,
    radius,
    color
  }) {
    this.position = position
    this.velocity = velocity

    // lager funksjon for radiusen til eksplosjon og fargen.
    this.radius = radius
    this.color = color
    // synlighet til eksplosjonene.
    this.opacity = 1
  }
  draw() {
    //lagre canvas.
    cvs.save()
    // fjerner synlighet basert på koden under.
    cvs.globalAlpha = this.opacity
    // start.
    cvs.beginPath()
    // lager eksplosjonene basert på,
    // posisjon, radius, pi (3,14 * 2) og hvis det på vinduet.
    cvs.arc(this.position.x, this.position.y, this.radius, 0,
      Math.PI * 2)
    // gir den bestemt farge.
    cvs.fillStyle = this.color
    // setter inn farge av eksplosjon.
    cvs.fill()
    //rette opp canvas.
    cvs.restore()
  }

  // lager bevegelse med bestemt hastighet for
  // eksplosjonene basert på x og y posisjon til
  // eksplosjon og hvis det på vinduet.
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    // hvor mye synlig skal det være.
    this.opacity -= 0.01
  }
}


// lager klasse for rutenett, gir posisjon til den.
// Deretter sier at alien skal bli bevege seg
// med hastighet på 5 basert på x posisjonen.
class AlienGrid {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }

    this.velocity = {
      x: 5,
      y: 0
    }
    // lager funksjon for alien med tom array.
    this.aliens = []
    // last inn aliens basert på x akse.
    //  Det vil være tilpasset med kolonne.
    let columns = 20
    // last inn aliens basert på y akse.
    // Det vil være tilpasset med rad.
    let rows = 5
    // når aliens kommer til slutt punktet, gå motsatt retning
    this.width = columns * 40
    // lager for-løkke for x mindre enn kolonne.
    for (let x = 0; x < columns; x++) {
      // lager for-løkke for y mindre enn rad.
      for (let y = 0; y < rows; y++) {

        // sett inn aliens og utvid x veriden med 30.
        // Det samme gjelder y verdien også utvid den med 30.
        this.aliens.push(
          new Alien({
            position: {
              x: x * 40,
              y: y * 40
            }
          }))
      }
    }
  }

  update() {
    // Sier at aliens skal bevege sidelengs og nedover.
    // og gir y posisjon av hastighet verdi for 0 (standard).
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.velocity.y = 0

    // hvis posisjon x og bredde er større eller lik canvas/banen.
    // Eller posisjon x er mindre eller lik 0. Hvis alt dette her stemmer
    // kjør koden.
    if (this.position.x + this.width >= canvas.width ||
      this.position.x <= 0) {

      //Da beveger aliens -x posisjoen (venstre side).
      this.velocity.x = -this.velocity.x

      // tar alines nedover, dersom de treffer
      // en av sidene (høyre eller venstre).
      this.velocity.y = 20
    }
  }
}

// lager variabler for spilleren, spillerenes liv 
// og skuddene til spilleren, rutenett
// og knappene som blir brukt.
// deretter gir noen av de tomme arrayes og oppretter
// spiller som klasse objektet.
let player = new Player()
let player2 = new Player()
let player1_Liv = 10;
let player2_Liv = 10;
let bullets = []
let grids = []
let alienBullets = []
let eksplosjon = []
let keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  space: {
    pressed: false
  }
}

let keys2 = {
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  m: {
    pressed: false
  }
}

// lager variabel for frame med verdien 0.
let frames = 0

// lager variabel for tilfeldig intervall og gir den verdi
// som er basert på tilfeldig frames. sier også at
// det skal ta utgangspunktet i heltall
let randomInterval = Math.floor(Math.random() * 500 + 500)

// lager variabel for game med over verdien falsk
// og active verdi sant.
let game = {
  over: false,
  active: true
}
//lager variabel for score og sier at standard verdi er 0.
let score = 0;
// lager funksjon for å få tilfeldige bakgrunnsfarger.
function changeBackgroundColor() {
  let n = Math.floor(Math.random() * 9) + 1;

  switch (n) {
    case 1:
      bFarge = "#420a08";
      break;
    case 2:
      bFarge = "#001457";
      break;
    case 3:
      bFarge = "#08112e";
      break;
    case 4:
      bFarge = "#111930";
      break;
    case 5:
      bFarge = "#171d2e";
      break;
    case 6:
      bFarge = "#1d212b";
      break;
    case 7:
      bFarge = "#25282e";
      break;
    case 8:
      bFarge = "#28292b";
      break;
    case 9:
      bFarge = "#002673";
      break;
  }
}
// hvert 0,5 sekund byttes bakgrunnsfarge.
setInterval(changeBackgroundColor, 500);

//lager funksjon for eksplosjon og legger til verdi objekt
//og farge.
function createEksplosjon({
  object,
  color
}) {

  // legg til 15 eksplosjon/sirkelene per
  //  skuddene som blir truffet til aliens.
  for (let i = 0; i < 15; i++) {

    //legger til eksplosjon basert på x, y posisjon og bredden delt med 2
    // for at det skal være i sentrum. Samme med høyde.
    eksplosjon.push(new Eksplosjon({
      position: {
        x: object.position.x + object.width / 2,
        y: object.position.y + object.height / 2
      },
      //hastighet til eksplosjon som er tilfeldig.
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      },
      // formen til eksplosjoen som er tilfeldig og gir fargen lys grå.
      radius: Math.random() * 3,
      color: color || 'lightgrey'
    }))
  }
}

// lager funksjon for å starte spillet med en spiller,
// dertter sier hvilken ting som skal være synlig
//  og usynlig. Når spillet er startet.
function singleGame() {
  let startSpill = document.getElementById("start")
  let gameCanvas = document.getElementById("canvas")
  let gameOver = document.getElementById("game-over")
  let showScore = document.getElementById("score")
  let showScore2 = document.getElementById("score2")
  let healthBar = document.getElementById("health-bar")
  let healthBar1 = document.getElementById("health-bar-1")
  let healthBar2 = document.getElementById("health-bar-2")
  let healthBar3 = document.getElementById("health-bar-3")
  let healthBar4 = document.getElementById("health-bar-4")
  let healthBar5 = document.getElementById("health-bar-5")
  let healthBar6 = document.getElementById("health-bar-6")
  let healthBar7 = document.getElementById("health-bar-7")
  let healthBar8 = document.getElementById("health-bar-8")
  let healthBar9 = document.getElementById("health-bar-9")
  let healthBar10 = document.getElementById("health-bar-10")
  let bgn = document.getElementById("bgn")
  let video = document.getElementById("myVideo")
  startSpill.style.display = "none";
  gameCanvas.style.display = "block";
  healthBar.style.display = "block";
  healthBar1.style.display = "block";
  healthBar2.style.display = "block";
  healthBar3.style.display = "block";
  healthBar4.style.display = "block";
  healthBar5.style.display = "block";
  healthBar6.style.display = "block";
  healthBar7.style.display = "block";
  healthBar8.style.display = "block";
  healthBar9.style.display = "block";
  healthBar10.style.display = "block";
  video.style.display = "none";
  gameOver.style.display = "none";
  bgn.style.display = "block";
  showScore.style.display = "block";
  showScore2.style.display = "block";
  player2.opacity = 0;
  // stopp video, når spillet er startet.
  video.pause();
  // start spillet, dersom knappen ble trykket.
  start();
}


// lager funksjon for å starte spillet med to spillere,
// dertter sier hvilken ting som skal være synlig
//  og usynlig. Når spillet er startet.
function coopGame() {
  let startSpill = document.getElementById("start")
  let gameCanvas = document.getElementById("canvas")
  let gameOver = document.getElementById("game-over")
  let showScore = document.getElementById("score")
  let showScore2 = document.getElementById("score2")
  let bgn = document.getElementById("bgn")
  let video = document.getElementById("myVideo")
  let healthBar = document.getElementById("health-bar")
  let healthBar1 = document.getElementById("health-bar-1")
  let healthBar2 = document.getElementById("health-bar-2")
  let healthBar3 = document.getElementById("health-bar-3")
  let healthBar4 = document.getElementById("health-bar-4")
  let healthBar5 = document.getElementById("health-bar-5")
  let healthBar6 = document.getElementById("health-bar-6")
  let healthBar7 = document.getElementById("health-bar-7")
  let healthBar8 = document.getElementById("health-bar-8")
  let healthBar9 = document.getElementById("health-bar-9")
  let healthBar10 = document.getElementById("health-bar-10")
  healthBar.style.display = "block";
  healthBar1.style.display = "block";
  healthBar2.style.display = "block";
  healthBar3.style.display = "block";
  healthBar4.style.display = "block";
  healthBar5.style.display = "block";
  healthBar6.style.display = "block";
  healthBar7.style.display = "block";
  healthBar8.style.display = "block";
  healthBar9.style.display = "block";
  healthBar10.style.display = "block";

  let player2healthBar = document.getElementById("player2-health-bar")
  let player2healthBar1 = document.getElementById("player2-health-bar-1")
  let player2healthBar2 = document.getElementById("player2-health-bar-2")
  let player2healthBar3 = document.getElementById("player2-health-bar-3")
  let player2healthBar4 = document.getElementById("player2-health-bar-4")
  let player2healthBar5 = document.getElementById("player2-health-bar-5")
  let player2healthBar6 = document.getElementById("player2-health-bar-6")
  let player2healthBar7 = document.getElementById("player2-health-bar-7")
  let player2healthBar8 = document.getElementById("player2-health-bar-8")
  let player2healthBar9 = document.getElementById("player2-health-bar-9")
  let player2healthBar10 = document.getElementById("player2-health-bar-10")
  player2healthBar.style.display = "block";
  player2healthBar1.style.display = "block";
  player2healthBar2.style.display = "block";
  player2healthBar3.style.display = "block";
  player2healthBar4.style.display = "block";
  player2healthBar5.style.display = "block";
  player2healthBar6.style.display = "block";
  player2healthBar7.style.display = "block";
  player2healthBar8.style.display = "block";
  player2healthBar9.style.display = "block";
  player2healthBar10.style.display = "block";

  startSpill.style.display = "none";
  gameCanvas.style.display = "block";
  video.style.display = "none";
  gameOver.style.display = "none";
  bgn.style.display = "block";
  showScore.style.display = "block";
  showScore2.style.display = "block";
  // stopp video, når spillet er startet.
  video.pause();
  // start spillet, dersom knappen ble trykket.
  start();
}


// lager funksjon for å stoppe spillet eller over,
// dertter sier hvilken ting som skal være synlig
// og usynlig. Når spillet er stoppet eller over.
function gameOver() {
  let startSpill = document.getElementById("start")
  let gameCanvas = document.getElementById("canvas")
  let gameOver = document.getElementById("game-over")
  let showScore = document.getElementById("score")
  let showScore2 = document.getElementById("score2")
  startSpill.style.display = "none";
  gameCanvas.style.display = "block";
  gameOver.style.display = "block";
  showScore.style.display = "none";
  showScore2.style.display = "none";
  
  let yourScore = document.getElementById("yourScore");
  yourScore.innerHTML = "Your score: " + score;

  let healthBar = document.getElementById("health-bar")
  let healthBar1 = document.getElementById("health-bar-1")
  let healthBar2 = document.getElementById("health-bar-2")
  let healthBar3 = document.getElementById("health-bar-3")
  let healthBar4 = document.getElementById("health-bar-4")
  let healthBar5 = document.getElementById("health-bar-5")
  let healthBar6 = document.getElementById("health-bar-6")
  let healthBar7 = document.getElementById("health-bar-7")
  let healthBar8 = document.getElementById("health-bar-8")
  let healthBar9 = document.getElementById("health-bar-9")
  let healthBar10 = document.getElementById("health-bar-10")
  healthBar.style.display = "none";
  healthBar1.style.display = "none";
  healthBar2.style.display = "none";
  healthBar3.style.display = "none";
  healthBar4.style.display = "none";
  healthBar5.style.display = "none";
  healthBar6.style.display = "none";
  healthBar7.style.display = "none";
  healthBar8.style.display = "none";
  healthBar9.style.display = "none";
  healthBar10.style.display = "none";

  let player2healthBar = document.getElementById("player2-health-bar")
  let player2healthBar1 = document.getElementById("player2-health-bar-1")
  let player2healthBar2 = document.getElementById("player2-health-bar-2")
  let player2healthBar3 = document.getElementById("player2-health-bar-3")
  let player2healthBar4 = document.getElementById("player2-health-bar-4")
  let player2healthBar5 = document.getElementById("player2-health-bar-5")
  let player2healthBar6 = document.getElementById("player2-health-bar-6")
  let player2healthBar7 = document.getElementById("player2-health-bar-7")
  let player2healthBar8 = document.getElementById("player2-health-bar-8")
  let player2healthBar9 = document.getElementById("player2-health-bar-9")
  let player2healthBar10 = document.getElementById("player2-health-bar-10")
  player2healthBar.style.display = "none";
  player2healthBar1.style.display = "none";
  player2healthBar2.style.display = "none";
  player2healthBar3.style.display = "none";
  player2healthBar4.style.display = "none";
  player2healthBar5.style.display = "none";
  player2healthBar6.style.display = "none";
  player2healthBar7.style.display = "none";
  player2healthBar8.style.display = "none";
  player2healthBar9.style.display = "none";
  player2healthBar10.style.display = "none";
}

//lager funksjon til alle bildene
//og den vil gå i loop.
function start() {
  function draw() {
    // hvis spillet vårt er ikke aktivert, stopp alt.
    if (!game.active) return
    requestAnimationFrame(draw)
    // tilfeldig bakgrunn farge. Se funksjonen changeBackgroundColor()
    cvs.fillStyle = bFarge;
    //Dertter lager firekant som vil dekke hele banen osv.
    cvs.fillRect(0, 0, canvas.width, canvas.height)
    // oppdaterer spilleren 1 og 2.
    player.update();
    player2.update();
    // velger hvert eneste skudd til aliens og gir verdi som i.
    alienBullets.forEach((alienBullet, i) => {
      // hvis skuddene y posisjon + høyde til alien skudd er
      // større eller lik høyde til canvas, da ta bort en alien skudd.
      if (alienBullet.position.y + alienBullet.height >= canvas.height) {
        setTimeout(() => {
          alienBullets.splice(i, 1)
        }, 0)
      } else {
        alienBullet.update()
      }
    })

    // hvis begge spillerene dør, da er spillet over.
    if (player.opacity === 0 && player2.opacity === 0) {
      // musikk blir stoppet etter spilleren dør.
      taptSpill = true;
      // stopp spillet etter ett sekundd og stopp skytelyden.
      setTimeout(() => {
        game.active = false
        skytelyd.pause();
      }, 1500)

      // vis game over screen etter halv sekund
      setTimeout(() => {
        gameOver()
        // spill lyden.
        GameOver.play();
      }, 500)
    }


    // player.opacity er lik 0, da oppdater player2 osv.
    // PS: måtte endre på posisjon til spilleren for å hindre eksplosjon og lyd.
    if (player.opacity === 0) {
        player2.update()
        player.position.y = -200;
        player.position.x = -200;
        player.width = 0;
        enSpiller = true;
     }

    // player2.opacity er lik 0, da oppdater player osv.
    // PS: måtte endre på posisjon til spilleren for å hindre eksplosjon og lyd.
    if (player2.opacity === 0) {
        player.update()
        player2.position.y = -200;
        player2.position.x = -200;
        player2.width = 0;
        toSpiller = true;
     }

    // velger hvert eneste skudd til aliens og gir verdi som i.
    alienBullets.forEach((alienBullet, i) => {
      // spilleren dør, hvis skuddene til alien treffer spilleren.
      if (alienBullet.position.y + alienBullet.height >= player.position.y &&
          alienBullet.position.x + alienBullet.width >= player.position.x &&
          alienBullet.position.x <= player.position.x + player.width) {

    // antall liv til spilleren 1.
      if(player1_Liv == 10){
        let healthBar = document.getElementById("health-bar")
        healthBar.style.display = "none";
        }
        if(player1_Liv == 9){
          let healthBar = document.getElementById("health-bar-1")
          healthBar.style.display = "none";
        }
        if(player1_Liv == 8){
          let healthBar = document.getElementById("health-bar-2")
          healthBar.style.display = "none";
        }
        if(player1_Liv == 7){
          let healthBar = document.getElementById("health-bar-3")
          healthBar.style.display = "none";
        }
        if(player1_Liv == 6){
          let healthBar = document.getElementById("health-bar-4")
          healthBar.style.display = "none";
        }
        if(player1_Liv == 5){
          let healthBar = document.getElementById("health-bar-5")
          healthBar.style.display = "none";
        }
        if(player1_Liv == 4){
          let healthBar = document.getElementById("health-bar-6")
          healthBar.style.display = "none";
        }
        if(player1_Liv == 3){
          let healthBar = document.getElementById("health-bar-7")
          healthBar.style.display = "none";
        }
        if(player1_Liv == 2){
          let healthBar = document.getElementById("health-bar-8")
          healthBar.style.display = "none";
        }
        if(player1_Liv == 1){
          let healthBar = document.getElementById("health-bar-9")
          healthBar.style.display = "none";
        }
        if(player1_Liv == 0){
          let healthBar = document.getElementById("health-bar-10")
          healthBar.style.display = "none";

        }
          // spilleren 1 mister liv, hver gang alien skudd treffer spilleren 1.
          player1_Liv--;
          // hver gan alien bulltet treffer spillerene, ta bort alien skuddene.
          // ta ut en alien skudd.
          alienBullets.splice(i, 1)
          if (player1_Liv == 0) {
          // når spilleren dør, spill eksplosjonslyd.
          eksplosjonslyd.play();
          setTimeout(() => {
          //skjul spilleren.
          player.opacity = 0
          }, 0)

          // velger object som spilleren og når aliens skudd
          // treffer spilleren, skal det komme grå eksplosjon.
          createEksplosjon({
          object: player,
          color: 'grey'
          })
          }
        }
      alienBullet.update()
    })

    // velger hvert eneste skudd til aliens og gir verdi som i.
    alienBullets.forEach((alienBullet, i) => {
      // spilleren dør, hvis skuddene til alien treffer spilleren 2.
      if (alienBullet.position.y + alienBullet.height >= player2.position.y &&
          alienBullet.position.x + alienBullet.width >= player2.position.x &&
          alienBullet.position.x <= player2.position.x + player2.width) {

            // antall liv til spilleren 2.
            if(player2_Liv == 10){
              let healthBar = document.getElementById("player2-health-bar")
              healthBar.style.display = "none";
              }
              if(player2_Liv == 9){
                let healthBar = document.getElementById("player2-health-bar-1")
                healthBar.style.display = "none";
              }
              if(player2_Liv == 8){
                let healthBar = document.getElementById("player2-health-bar-2")
                healthBar.style.display = "none";
              }
              if(player2_Liv == 7){
                let healthBar = document.getElementById("player2-health-bar-3")
                healthBar.style.display = "none";
              }
              if(player2_Liv == 6){
                let healthBar = document.getElementById("player2-health-bar-4")
                healthBar.style.display = "none";
              }
              if(player2_Liv == 5){
                let healthBar = document.getElementById("player2-health-bar-5")
                healthBar.style.display = "none";
              }
              if(player2_Liv == 4){
                let healthBar = document.getElementById("player2-health-bar-6")
                healthBar.style.display = "none";
              }
              if(player2_Liv == 3){
                let healthBar = document.getElementById("player2-health-bar-7")
                healthBar.style.display = "none";
              }
              if(player2_Liv == 2){
                let healthBar = document.getElementById("player2-health-bar-8")
                healthBar.style.display = "none";
              }
              if(player2_Liv == 1){
                let healthBar = document.getElementById("player2-health-bar-9")
                healthBar.style.display = "none";
              }
              if(player2_Liv == 0){
                let healthBar = document.getElementById("player2-health-bar-10")
                healthBar.style.display = "none";
      
              }
                // spilleren 2 mister liv, hver gang alien skudd treffer spilleren 2.
                player2_Liv--;
                // ta ut en alien skudd.
                alienBullets.splice(i, 1)
                if (player2_Liv == 0) {
                setTimeout(() => {
                 // når spilleren dør, spill eksplosjonslyd.
                eksplosjonslyd.play();
                //skjul spilleren.
                player2.opacity = 0
                }, 0)
      
                // velger object som spilleren og når aliens skudd
                // treffer spilleren, skal det komme grå eksplosjon.
                createEksplosjon({
                object: player2,
                color: 'grey'
                })
                }
              }
              alienBullet.update()
            })

    // velg hver ensete eksplosjon og oppdater.
    eksplosjon.forEach((eksplosjon) => {
      eksplosjon.update()
    })

    // velg hver ensete bullet og oppdater.
    bullets.forEach((bullet) => {
      bullet.update()
    })

    //velg hver ensete rutenett og oppdater.
    grids.forEach((grid) => {
      grid.update()
      // legg til bullets til aliens på tilfeldig posisjon.
      // Og hvor mange skudd per frames i sekunder.
      if (frames % 80 === 0 && grid.aliens.length > 0) {
          grid.aliens[Math.floor(Math.random() *
          grid.aliens.length)].shoot(alienBullets)
      }
      //Deretter velg hver ensete alien og gir alien verdi for i.
      grid.aliens.forEach((alien) => {
        //hvis spilleren blir truffet av aliens,
        //da dør spilleren eller spillet er over.
        if (alien.position.y >= player.position.y &&
          alien.position.x <= player.position.x) {
          setTimeout(() => {
            //skjul spilleren.
            player.opacity = 0
            eksplosjonslyd.play()
          }, 0)
          // velger object som spilleren og når aliens skudd
          // treffer spilleren, skal det komme grå eksplosjon.
          createEksplosjon({
            object: player,
            color: 'grey'
          })
        }
        // samme vil gjelde spilleren #2
        if (alien.position.y >= player2.position.y &&
            alien.position.x <= player2.position.x) {
            setTimeout(() => {
              //skjul spilleren.
              player2.opacity = 0;
              eksplosjonslyd.play()
            }, 0)
          // velger object som spilleren og når aliens skudd
          // treffer spilleren, skal det komme grå eksplosjon.
          createEksplosjon({
            object: player2,
            color: 'grey'
          })
        }
      })
      //Deretter velg hver ensete alien og gir alien verdi for i.
      grid.aliens.forEach((alien, i) => {
        //Oppdater og sier at bevegelse til aliens
        //skal være basert på rutenett bevegelse.
        alien.update({
          velocity: grid.velocity
        })
        //velg hver ensete bullet og gir bullet verdi for j.
        bullets.forEach((bullet, j) => {
          // hvis bullet posisjon y minus bullet radius er mindre eller
          //lik enn alien posisjon y pluss alien høyde. Samtidig hvis bullet
          //posisjon x pluss bullet radius er større eller lik alien posisjon x
          //og omvendt sammen med alien bredde. Sier også at hvis
          //bullet posisjon pluss bullet radius er større
          //eller lik alien posisjon y, da ta ut alien når spilleren skyter.
          if (bullet.position.y - bullet.radius <= alien.position.y +
            alien.height && bullet.position.x + bullet.radius >=
            alien.position.x && bullet.position.x - bullet.radius <=
            alien.position.x + alien.width && bullet.position.y +
            bullet.radius >= alien.position.y) {

            setTimeout(() => {
              // lager variabel for alien som er basert på gjenkjenne alien.
              let alienFound = grid.aliens.find(
                (alien2) => alien2 === alien
              )

              // lager variabel for skuddene som er basert på gjenkjenne skudd.
              let bulletFound = bullets.find(bullet2 => bullet2 === bullet)
              // hvis alien og bullet ble funnet.
              if (alienFound && bulletFound) {
                // gi spilleren poeng hver gang spilleren tar ut alien.
                score += 100
                // hvis det på viduet.
                score2.innerHTML = score

                // eksploder aliens.
                createEksplosjon({
                  object: alien
                })

                // ta ut en alien, når spilleren skyter en skudd og
                // tar ut skuddene også.
                grid.aliens.splice(i, 1)
                bullets.splice(j, 1)
              }
            }, 0)
          }
        })
      })
    })

    //hvis knappen a er trukket på, da beveger spilleren til venstre.
    if (keys.a.pressed && player.position.x >= 0) {
      //hastighet til spillerens bevegelse.
      player.velocity.x = -10
      //når knappen d blir trukket, da beveg spilleren høyre og
      //ikke la spilleren gå ut av banen.
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
      //hastighet til spillerens bevegelse.
      player.velocity.x = 10
    }

    //men hvis knappen a ikke er trukket på, da skal spilleren være på
    //standard posisjon.
    else {
      player.velocity.x = 0
    }


    //hvis knappen venstre pil blir trukket på, da beveger spilleren til venstre.
    if (keys2.ArrowLeft.pressed && player2.position.x >= 0) {
      //hastighet til spillerens bevegelse.
      player2.velocity.x = -8
      //når knappen høyre pil blir trukket, da beveg spilleren høyre og
      //ikke la spilleren gå ut av banen.
    } else if (keys2.ArrowRight.pressed && player2.position.x + player2.width <= canvas.width) {
      //hastighet til spillerens bevegelse.
      player2.velocity.x = 8
    }

    //men hvis knappen a ikke er trukket på, da skal spilleren være på
    //standard posisjon.
    else {
      player2.velocity.x = 0
    }

    // hvis det stemmer, legg til ny rad med aliens.
    // hvert ett minutt frames.
    if (frames % randomInterval === 0) {
      grids.push(new AlienGrid())
      randomInterval = 1000;
      frames = 0
    }

    // øk frames
    frames++
  }
  //kjør funksjonen.
  draw();



  //lager funskjon for å spesifisere hvilken knapper som skal bli
  //trukket på, for at spilleren skal bevege seg. Den tome er space-knappen.
  addEventListener('keydown', ({
    key
  }) => {
    // kontrollen til spilleren
    switch (key) {
      case 'a':
        keys.a.pressed = true
        break
      case 'd':
        keys.d.pressed = true
        break

      case ' ':
        keys.space.pressed = true
        break
    }
  })

  addEventListener('keyup', ({
    key
  }) => {
    // kontrollen til spilleren
    switch (key) {
      case 'a':
        keys.a.pressed = false
        break
      case 'd':
        keys.d.pressed = false
        break
      case ' ':
        //legger til skudd og gir skuddene posisjon som er
        //basert på spilleren og spilleren sin lengde delt med to
        //og sier at skuddene skal gå oppover.
        bullets.push(
          new Bullet({
            position: {
              x: player.position.x + player.width / 2,
              y: player.position.y
            },
            velocity: {
              x: 0,
              y: -20
            }
          }))

        // hvis spillet er ikke over, da spill sktyelyd for spilleren.
        if (enSpiller == false) {
          let skytelyd = new Audio("Sounds/Jetflys.mp3");
          skytelyd.play()
        }
        break
    }
  })

  //lager funskjon for å spesifisere hvilken knapper skal bli trykket på,
  //for at spilleren skal bevege seg.
  addEventListener('keydown', ({
    key
  }) => {
    // kontrollen til spilleren
    switch (key) {
      case 'ArrowLeft':
        keys2.ArrowLeft.pressed = true
        break
      case 'ArrowRight':
        keys2.ArrowRight.pressed = true
        break

      case 'm':
        keys2.m.pressed = true
        break
    }
  })

  addEventListener('keyup', ({
    key
  }) => {
    // kontrollen til spilleren
    switch (key) {
      case 'ArrowLeft':
        keys2.ArrowLeft.pressed = false
        break

      case 'ArrowRight':
        keys2.ArrowRight.pressed = false
        break

      case 'm':
        //legger til skudd og gir skuddene posisjon som er
        //basert på spilleren 2 og spilleren 2 sin lengde delt med to
        //og sier at skuddene skal gå oppover.
        bullets.push(
          new Bullet({
            position: {
              x: player2.position.x + player2.width / 2,
              y: player2.position.y
            },
            velocity: {
              x: 0,
              y: -20
            }
          }))

        // hvis spillet er ikke over, da spill sktyelyd for spilleren.
        if (toSpiller == false) {
          let skytelyd3 = new Audio("Sounds/Jetflys.mp3");
          skytelyd3.play()
        }
        break
    }
  })
}
