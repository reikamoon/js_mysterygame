const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const nameElement = document.getElementById('name')
const portrait = document.getElementById('portrait')
const photo = document.getElementById('photo')

let state = {}

// Variables used in game
//Ending Points
let score = 0

let interrogationscore = 0


function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  nameElement.innerText = textNode.name
  portrait.src = textNode.portrait
  if (textNode.photo) {
     photo.src = textNode.photo
  }
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  if (option.score) {
    modScore(option.score)
  }

  if (option.interrogationscore) {
    modInterrogationScore(option.interrogationscore)
  }

  const nextTextNodeId = option.nextText
  if (nextTextNodeId == 214) {
      if(interrogationscore == 10) {
          nextTextNodeId = 215
      }
      else {
          nextTextNodeId = 216
      }
  }
  
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

///Scorekeeping

function modScore(number) {
    score += number
    window.alert("Current Score: " + number)
}

function modInterrogationScore(number) {
  interrogationscore += number
  window.alert("Current Score: " + interrogationscore)
}


const textNodes = [

  {
    id: 1,
    name: "Valeria",
    text: "Welcome! Please select one of the below choices to get started.",
    portrait: "/js_mysterygame/assets/Busts/Valeria/Valeria4.png",
    options: [
      {
        text: 'Prologue',
        nextText: 100
      },

      {
        text: 'Interrogation',
        nextText: 200
      },

       {
        text: 'Meet the Cast',
        nextText: 300
      },

       {
        text: 'Freetime',
        nextText: 400
      }
    ]
  },

    {
    id: 100,
    name: "???",
    text: "Oh, I see you're awake now. How are you feeling, Sam?",
    portrait: "/js_mysterygame/assets/busts/Valeria/ValeriaSad.png",
    options: [
      {
        text: 'Who are you?',
        nextText: 101
      },
      {
        text: 'What happened?',
        nextText: 101
      }
    ]
  },

  {
    id: 101,
    name: "???",
    text: "It's alright, calm down. My name is Valeria, I am an old friend of your father's. You are in my home, I invited you and your father here for a dinner party. Alas, you had an...accident.",
    portrait: "/js_mysterygame/assets/busts/Valeria/ValeriaSad.png",
    options: [
      {
        text: 'An accident?',
        nextText: 102
      },
      {
        text: 'Where is my father?',
        nextText: 103
      }
    ]
  },

  {
    id: 102,
    name: "Valeria",
    text: "Yes. You hit your head in the dining room, and were asleep for a while. The puzzled look on your face may suggest retrograde amnesia...but I'm no doctor. I hope your memories return soon, you were our key witness.",
    portrait: "/js_mysterygame/assets/busts/Valeria/Valeria3.png",
    options: [
      {
        text: 'Key witness?',
        nextText: 104
      },
      {
        text: 'Where is my father?',
        nextText: 103
      }
    ]
  },

  {
    id: 103,
    name: "Valeria",
    text: "Oh, you mustn't worry your little bandaged head, Sammy. Your father is with the others right now, in the den. It's best we have everyone in one room, considering there's a murderer on the loose. ",
    portrait: "/js_mysterygame/assets/busts/Valeria/Valeria4.png",
    options: [
      {
        text: 'Murderer?!',
        nextText: 104
      },
      {
        text: 'What happened to my head?',
        nextText: 102
      }
    ]
  },

  {
    id: 104,
    name: "Valeria",
    text: "Ah, yes. I won't beat around the bush: our guest of honor, Arius, has been murdered in the kitchen. You were the last person with Arius before he died.",
    portrait: "/js_mysterygame/assets/busts/Valeria/ValeriaSad2.png",
    options: [
      {
        text: 'Can you tell me more details about the murder?',
        nextText: 105
      },
      {
        text: 'Can you tell me about Arius?',
        nextText: 106
      }
    ]
  },

  {
    id: 105,
    name: "Valeria",
    text: "Certainly. Arius was murdered with a kitchen knife, and left bleeding on the kitchen floor. I believe it was one stab to the chest. Again, you were the last one with Arius before he died.I don't believe you did it, but the others...",
    portrait: "/js_mysterygame/assets/busts/Valeria/ValeriaThinking.png",
    photo: "/js_mysterygame/assets/busts/Arius/AriusPortraitBW.png",
    options: [
      {
        text: 'The others?',
        nextText: 107
      },
      {
        text: 'Who was Arius?',
        nextText: 106
      }
    ]
  },

  {
    id: 106,
    name: "Valeria",
    text: "Arius...he was your father's protégé. We were celebrating his very first art competition victory after several losses. It's such a tragedy...his luck has run dry.",
    portrait: "/js_mysterygame/assets/busts/Valeria/ValeriaSad2.png",
    photo: "/js_mysterygame/assets/busts/Arius/AriusPortraitBW.png",
    options: [
      {
        text: 'Any other information on his murder?',
        nextText: 105
      },
      {
        text: 'Any suspects?',
        nextText: 107
      }
    ]
  },

  {
    id: 107,
    name: "???",
    text: "Valeria, Sam, is everything alright in there?",
    portrait: "/js_mysterygame/assets/busts/Valeria/Valeria2.png",
    photo: "None",
    options: [
      {
        text: '(Answer politely)',
        score: 2,
        nextText: 108
      },
      {
        text: '(Ignore)',
        score: -2,
        nextText: 109
      }
    ]
  },

  {
    id: 108,
    name: "???",
    text: "Thank god you're alright, Valeria. It's good to see you're awake, Sam. You've got a lot to answer for.",
    portrait: "/js_mysterygame/assets/busts/Dante/DanteAnnoyed.png",
    options: [
      {
        text: 'Who are you?',
        nextText: 110
      },
      {
        text: 'Answer for?',
        nextText: 111
      }
    ]
  },

  {
    id: 109,
    name: "???",
    text: "Valeria! Thank god you're alright. It was so quiet in here...I had thought Sam gutted you as well. You've got a lot of nerve, Sam. I'll personally make sure you answer for your crimes!",
    portrait: "/js_mysterygame/assets/busts/Dante/DanteAngry2.png",
    photo: "None",
    options: [
      {
        text: 'Who are you?',
        nextText: 110
      },
      {
        text: 'My crimes? Sure, I j-walked once...',
        nextText: 111
      }
    ]
  },
  
  {
    id: 110,
    name: "Dante",
    text: "You must've hit your head harder than I thought. But you could easily be playing dumb. It's me, Dante. You know, Katalina's brother, and Arius's friend. You know, the guy your murdered in cold blood. You will pay for what you did. I swear it.",
    portrait: "/js_mysterygame/assets/busts/Dante/DanteAngry2.png",
    options: [
      {
        text: 'My crimes?',
        nextText: 111
      },
      {
        text: 'Watch your tongue.',
        score: -2,
        nextText: 112
      }
    ]
  },

  {
    id: 112,
    name: "Valeria",
    text: "Dante, stop it! There's no way that Sam killed Arius. Sam is innocent. Sam, you must prove your innocence. I cannot allow the others to slander you like this any further! ",
    portrait: "/js_mysterygame/assets/busts/Valeria/ValeriaAngry4.png",
    options: [
      {
        text: "Don't worry. I won't let you down.",
        nextText: 113
      },
      {
        text: "I swear I will find the killer.",
        nextText: 113
      }
    ]
  },

  {
    id: 111,
    name: "Dante",
    text: "Don't play stupid. You were the last one with Arius before he died. We found you unconscious in the kitchen with Arius's dead body. It had to be you!",
    portrait: "/js_mysterygame/assets/busts/Dante/DanteAngry2.png",
    options: [
      {
        text: "I swear I'm not the killer.",
        nextText: 112
      },
      {
        text: "I don't even remember what happened.",
        nextText: 112
      }
    ]
  },

  {
    id: 113,
    name: "Valeria",
    text: "Thank you, Sam. There are 11 possible suspects. (You can read more about the suspects in Meet the Cast on the menu) You must find the killer before they strike again. (Prologue End.)",
    portrait: "/js_mysterygame/assets/busts/Valeria/ValeriaSad2.png",
    options: [
      {
        text: "Restart the Prologue",
        nextText: 100
      },
      {
        text: "Back to Menu",
        nextText: 1
      }
    ]
  },

  {
    id: 200,
    name: "Dad",
    text: "Welcome to interrogation mode. This is a snippet of the gameplay for interrogations. I will tell you a story, and make sure you pay attention.",
    portrait: "/js_mysterygame/assets/busts/Dad/Dad.png",
    options: [
      {
        text: "Ready.",
        nextText: 201
      },
      {
        text: "Back to Menu",
        nextText: 1
      }
    ]
  },

  {
    id: 201,
    name: "Dad",
    text: "There was a crooked man, and he walked a crooked mile. He found a crooked sixpence, and a crooked stile. He bought a crooked cat, which caught a crooked mouse, and they all lived together, in a crooked little house. Did you get that?",
    portrait: "/js_mysterygame/assets/busts/Dad/DadConfused.png",
    options: [
      {
        text: "Ready.",
        nextText: 202
      },
      {
        text: "Back to Menu",
        nextText: 1
      }
    ]
  },

  {
    id: 202,
    name: "Aurelia",
    text: "I will try to retell the nursery rhyme, and if you see an error, make sure to point it out to get points. If you miss an error, you will lose points.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Ready!",
        nextText: 203
      },
      {
        text: "Back to the Rhyme",
        nextText: 201
      }
    ]
  },

   {
    id: 203,
    name: "Aurelia",
    text: "There was a crooked woman...",
    portrait: "/js_mysterygame/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: 1,
        nextText: 205
      },
      {
        text: "Truth",
        interrogationscore: -1,
        nextText: 220
      }
    ]
  },

  {
    id: 205,
    name: "Aurelia",
    text: "Me? Wrong? Don't be absurd!",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaAngry.png",
    options: [
      {
        text: "The crooked man, not woman.",
        interrogationscore: 1,
        nextText: 206
      },
      {
        text: "The malformed man, not crooked.",
        interrogationscore: -1,
        nextText: 206
      }
    ]
  },

  {
    id: 206,
    name: "Aurelia",
    text: "And he walked a crooked mile.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: -1,
        nextText: 221
      },
      {
        text: "Truth",
        interrogationscore: 1,
        nextText: 207
      }
    ]
  },

  {
    id: 207,
    name: "Aurelia",
    text: "He found a crooked sixpence and a crooked stile.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: -1,
        nextText: 222
      },
      {
        text: "Truth",
        interrogationscore: 1,
        nextText: 208
      }
    ]
  },

  {
    id: 208,
    name: "Aurelia",
    text: "He bought a crooked dog, which caught a crooked mouse.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: 1,
        nextText: 209
      },
      {
        text: "Truth",
        interrogationscore: -1,
        nextText: 225
      }
    ]
  },

  {
    id: 209,
    name: "Aurelia",
    text: "Me, wrong? Don't be absurd! Where's your proof?",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaAngry.png",
    options: [
      {
        text: "He bought a crooked hog.",
        interrogationscore: -1,
        nextText: 210
      },
      {
        text: "He bought a crooked cat.",
        interrogationscore: 1,
        nextText: 210
      }
    ]
  },

  {
    id: 210,
    name: "Aurelia",
    text: "And they all lived together.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: -1,
        nextText: 223
      },
      {
        text: "Truth",
        interrogationscore: 1,
        nextText: 211
      }
    ]
  },

  {
    id: 211,
    name: "Aurelia",
    text: "In a crooked little hows.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: 1,
        nextText: 212
      },
      {
        text: "Truth",
        interrogationscore: -1,
        nextText: 224
      }
    ]
  },

  {
    id: 212,
    name: "Aurelia",
    text: "Me, wrong? Don't be absurd! Where's your proof?",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaAngry.png",
    options: [
      {
        text: "crooked house.",
        interrogationscore: 1,
        nextText: 213
      },
      {
        text: "crooked hausse.",
        interrogationscore: -1,
        nextText: 1
      }
    ]
  },

  {
    id: 213,
    name: "Aurelia",
    text: "Let's see how well you did. What animal caught what in the poem?",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaSurprised.png",
    options: [
      {
        text: "The crooked dog caught a crooked mouse.",
        interrogationscore: -1,
        nextText: 214
      },

      {
        text: "The crooked cat caught a crooked rat.",
        interrogationscore: -1,
        nextText: 214
      },

       {
        text: "The crooked cat caught a crooked mouse",
        interrogationscore: 1,
        nextText: 214
      },

      {
        text: "The crooked hamster caught a crooked dog",
        interrogationscore: -1,
        nextText: 214
      },
    ]
  },

  {
    id: 215,
    name: "Aurelia",
    text: "Congratulations! A perfect score! Great job! (End of interrogation demo).",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaSurprised.png",
    options: [
      {
        text: "Restart",
        interrogationscore: -9,
        nextText: 200
      },

      {
        text: "Back to Menu",
        interrogationscore: -9,
        nextText: 1
      },
    ]
  },

  {
    id: 216,
    name: "Aurelia",
    text: "Oh, dear. Looks like you lost. You need a perfect score in order to win. (End of interrogation demo).",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaSad2.png",
    options: [
      {
        text: "Restart",
        interrogationscore: 10,
        nextText: 200
      },

      {
        text: "Back to Menu",
        interrogationscore: 10,
        nextText: 1
      },
    ]
  },

  {
    id: 220,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 206
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

  {
    id: 221,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 207
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

  {
    id: 225,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 210
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

  {
    id: 222,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 208
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

  {
    id: 223,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 211
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

   {
    id: 224,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/js_mysterygame/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 213
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

   {
    id: 300,
    name: "Valeria",
    text: "There are exactly 13 characters throughout the game. Care to meet them?",
    portrait: "/js_mysterygame/assets/busts/Valeria/ValeriaHappy2.png",
    options: [
      {
        text: "Yes",
        nextText: 301
      },

      {
        text: "Back to Menu",
        nextText: 0
      },
    ]
  },

  {
    id: 301,
    name: "Valeria",
    text: "Choose who you would like to meet.",
    portrait: "/js_mysterygame/assets/busts/Valeria/Valeria4.png",
    options: [

      {
        text: "Valeria",
        nextText: 306
      },

      {
        text: "Dad",
        nextText: 310
      },

      {
        text: "Sam",
        nextText: 314
      },

      {
        text: "More",
        nextText: 302
      },
    ]
  },

  {
    id: 302,
    name: "Valeria",
    text: "Choose who you would like to meet.",
    portrait: "/js_mysterygame/assets/busts/Valeria/Valeria4.png",
    options: [

      {
        text: "Arius",
        nextText: 318
      },

      {
        text: "Dante",
        nextText: 321
      },

      {
        text: "Katalina",
        nextText: 325
      },

      {
        text: "More",
        nextText: 303
      },
    ]
  },

   {
    id: 303,
    name: "Valeria",
    text: "Choose who you would like to meet.",
    portrait: "/js_mysterygame/assets/busts/Valeria/Valeria4.png",
    options: [

      {
        text: "Vivian",
        nextText: 329
      },

      {
        text: "Oskar",
        nextText: 332
      },

      {
        text: "Elijah",
        nextText: 336
      },

      {
        text: "More",
        nextText: 304
      },
    ]
  },

  {
    id: 304,
    name: "Valeria",
    text: "Choose who you would like to meet.",
    portrait: "/js_mysterygame/assets/busts/Valeria/Valeria4.png",
    options: [

      {
        text: "Sabrina",
        nextText: 340
      },

      {
        text: "Lena",
        nextText: 344
      },

      {
        text: "Connor",
        nextText: 348
      },

      {
        text: "More",
        nextText: 305
      },
    ]
  },

  {
    id: 305,
    name: "Valeria",
    text: "Choose who you would like to meet.",
    portrait: "/js_mysterygame/assets/busts/Valeria/Valeria4.png",
    options: [

      {
        text: "Aurelia",
        nextText: 352
      },

      {
        text: "Back to beginning",
        nextText: 301
      },

      {
        text: "Back to Menu",
        nextText: 1
      },
    ]
  },

  {
    id: 400,
    name: "Dante",
    text: "This is an example Freetime Event. What do you want?",
    portrait: "/js_mysterygame/assets/busts/Dante/Dante.png",
    options: [

      {
        text: "Talk",
        nextText: 401
      },

      {
        text: "Show",
        nextText: 400
      },

      {
        text: "Back to Menu",
        nextText: 1
      },

      {
        text: "Trivia",
        nextText: 1
      },
    ]
  },

   {
    id: 401,
    name: "Dante",
    text: "What do you want to talk about?",
    portrait: "/js_mysterygame/assets/busts/Dante/Dante.png",
    options: [

      {
        text: "The murder.",
        nextText: 402
      },

      {
        text: "How are you faring?",
        nextText: 400
      },
    ]
  },

  

]

startGame()