let punishments = [
  "The next person to reply to you can choose you a profile picture that you have to keep for 24 hours.",
  "Speak a different language for 1 hour.",
  "Act like a furry for 1 hour. (This includes wearing a furry pfp and speaking like a furry.)",
  "Kill yourself. <b>Now.</b>",
  "Go outside or something",
  "You must play OneShot. All of it. From the beginning.",
  "Publicly ashame yourself in a VC by saying the most dumb shit ever. (..Yeah. An 'uwu nyaa' will suffice.)",
  "<a style='color: red'>"+("Succumb to the wounds. ").repeat(300)+"</a>", //Writ deep into Arcaea's heart is a name you do not know.
  "The next person to reply to you can give you one task to do and you must do it.",
  "You know what? I'm feeling generous right now. No punishment for ya.",
  "JACKPOT! Pray that you hit the punishment and your luck streak gets artificially boosted for no reason.",
  "You thought youre only here for screenshotting? Nuh uh. Make your own roulette.",
  "Ping a random member in the server. It can't be you, someone in this chat, someone you know or a bot.",
  "Transcend beyond the mortal plane.",
  "You must do whatever punishment the next person gets... even if that person misses.",
  "Pretend your sense of humor is stuck in 2018 for 1 hour.",
  "Speak like a nerd for 15 minutes.",
  "Silence! Dont say anything for 10 minutes.",
  "Do another roulette someone has posted.",
  "Looks like someone forgot how to speak English! Talk in emojis for 20 minutes.",
  "Proclaim your love and devotion to that one weird ass toilet head trend.",
  "Make and wear the weirdest roblox furry avatar you can think of. No, I swear to god, you not having enough Robux isnt an excuse.",
  "Approximate 2+2.",
  "Endure the pain that is r/japanesepeopletwitter. <sub>(I'm really sorry.)</sub>",
  "Play one of those \"\"\"sus hangout\"\"\" games for atleast 10 minutes.",
  "Leave Discord for an hour.",
  "Present a thesis on why #staff-furry-rp is very much a real thing.",
  "Sample Text",
  "<i>Master the power forbidden to all but one.</i>",
  "You must do the next punishment regardless of if you hit or miss it.",
  "Play your most hated game.",
  "Make a game. It doesn't matter what platform it is, just make a playable game.",
  "Impersonate a random member in the server. It can't be you, someone in this chat, someone you know or a bot.",
  "For the next 30 minutes, all your screenshots need to be taken with a camera.",
  "You must forget.",
  "Deploy a forkbomb on your computer and watch it struggle to operate as its last bits of RAM are consumed by the bomb.",
  "Next person to send a message must do whatever punishment you get, even if you miss it.",
  "Capitalize All Your Words for the next 24 hours."
];
let spinning = true
let chamber = 0;
let hitRange = 0;
let luckStreak = 0;
let lastNum = 0
let doFunnyTitleThing = false;
let isAlerted = false
let blindfolded = false
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
let sounds = {
  deny: new Howl({ src: ["assets/insight_deny.wav"] }),
  wind: new Howl({ src: ["assets/wind1.ogg"], loop: true })
}

function random(min, max) {
  while (true) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let num = Math.floor(Math.random() * (max - min + 1) + min)
    if (num != lastNum) { lastNum = num; return num }
  }
}

function updateLuckStreak() {
  document.getElementById("streak").innerHTML = `Luck streak: ${luckStreak}${("!").repeat(Math.min(10,luckStreak/10))} (best ${localStorage["luckStreak"] || 0})`
}

function spin() {
  if (spinning) {
    let punishment = punishments[random(0,punishments.length-1)]
    document.getElementById("punishment").innerHTML = punishment;
    document.getElementById("punishment").classList.toggle("makeitstop",punishment.startsWith("<a style='color: red'>") || punishment.startsWith("The skies"))
    chamber++; if (chamber >= 6) chamber = 0;
    document.getElementById("chambers").src = 
      blindfolded ? `./assets/blank.png` : `./assets/${chamber >= 6 ? 5 : chamber}/idk.png`
  }
	if (doFunnyTitleThing) {
		let title = ""
		for (let i = 0; i < 20; i++) {
      let b = random(0,letters.length-1)
			title += letters.substring(b,b+1)
    }
		document.title = title
	} else document.title = "Infinite Judgement"
  setTimeout(spin, 50)
}
function fire() {
  if (doFunnyTitleThing) {theThingContinued(); return}
  spinning = !spinning
  let punishment = document.getElementById("punishment").innerHTML
  if (!spinning) {
    if (chamber >= 6 ? 5 : chamber <= hitRange) {
      document.getElementById("outcome").innerHTML = "Hit! How unfortunate..."
      document.getElementById("chambers").src = `./assets/${chamber >= 6 ? 5 : chamber}/hit.png`
      if (blindfolded) {
        switch (true) {
          case punishment.startsWith("JACKPOT!"):
            luckStreak += 999; break;
          case punishment.startsWith("You know what?"):
            break;
          default:
            luckStreak = 0; break;
        }
        updateLuckStreak()
      } 
      if (document.getElementById("punishment").innerHTML.startsWith("<i>Master the power")) {
        sounds.wind.play()
        doFunnyTitleThing = true
      }
    } else {
      document.getElementById("chambers").src = `./assets/${chamber >= 6 ? 5 : chamber}/miss.png`
      document.getElementById("outcome").innerHTML = "Miss! You avoided the punishment."
      if (blindfolded) {
        luckStreak += hitRange+1
        if (luckStreak > localStorage["luckStreak"] || !localStorage["luckStreak"]) localStorage["luckStreak"] = luckStreak
        updateLuckStreak()
      }
    }
  } else {
    document.getElementById("outcome").innerHTML = "You haven't fired yet"
  }
}

function riskUp() {
  if (doFunnyTitleThing) {theThingContinued(); return}
  hitRange = Math.min(hitRange+1, 4)
  document.getElementById("riskUp").classList.toggle("hide", hitRange >= 4)
  document.getElementById("riskDown").classList.toggle("hide", hitRange <= 0)
  document.getElementById("riskLevel").innerHTML = `Rounds loaded: ${hitRange+1}/6`
}

function riskDown() {
  if (doFunnyTitleThing) {theThingContinued(); return}
  hitRange = Math.max(hitRange-1, 0)
  document.getElementById("riskUp").classList.toggle("hide", hitRange >= 4)
  document.getElementById("riskDown").classList.toggle("hide", hitRange <= 0)
  document.getElementById("riskLevel").innerHTML = `Rounds loaded: ${hitRange+1}/6`
}

function blindfold() {
  if (doFunnyTitleThing) {theThingContinued(); return}
  blindfolded = !blindfolded
  document.getElementById("blindfold").innerHTML = blindfolded ? "Take that thing off!" : "Blindfold mode"
  document.getElementById("streak").classList.toggle("hide", !blindfolded)
}

function theThing(enabled) {
  document.getElementById("warning").classList.toggle("clickthrough", !enabled)
  document.getElementById("roulette").classList.toggle("dim", enabled)
  document.getElementsByClassName("whar")[0].classList.toggle("asdfghjk", enabled)
  if (enabled) sounds.deny.play()
}

function theThingContinued() {
  isAlerted = !isAlerted
  theThing(isAlerted)
}

for (let i = 0; i < 6; i++) {
  for (let name of ["hit", "miss", "idk"]) {
    let img = document.createElement("img")
    img.src = `assets/${i}/${name}.png`
    document.head.appendChild(img)
  }
}

spin()
updateLuckStreak()