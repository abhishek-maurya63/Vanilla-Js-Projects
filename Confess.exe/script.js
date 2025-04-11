const story = [
  // 🌟 Scene 1: Intro
  {
    id: 1,
    text: "👦 Me: Hey... I wanted to say something for a long time...",
    gif: "https://media.tenor.com/v0JnKBarh6kAAAAi/dudu-bubu-dudu.gif",
    options: [
      { text: "What is it?", next: 2 },
      { text: "Don’t waste my time 😒", next: 1, effect: "slap-shake" },
    ],
  },

  // 💬 Scene 2: Confession Starts
  {
    id: 2,
    text: "👦 Me: Umm... it's kinda weird but... I think you're really...",
    gif: "https://media.tenor.com/W2mpdr-w3WcAAAAi/tkthao219-quby.gif",
    options: [
      { text: "Beautiful 😳", next: 3 },
      { text: "Smart 🤓", next: 4 },
      { text: "Out of my league 😅", next: 5 },
    ],
  },

  // 💘 Scene 3.1: Beautiful Path
  {
    id: 3,
    text: "👧 Her: Wow, breaking news 🌍! Someone finally noticed 😌",
    gif: "https://media.tenor.com/N95TNueqMjcAAAAi/lovely-cute-bear.gif",
    options: [
      { text: "I always noticed, just couldn’t say 😔", next: 6 },
      { text: "You’re overconfident 🫣", next: 6 },
    ],
    effect: "hearts-fly",
  },

  // 🧠 Scene 3.2: Smart Path
  {
    id: 4,
    text: "👧 Her: Smart? Or just good at guessing MCQs? 😏",
    gif: "https://media.tenor.com/mWoJKSusBWgAAAAi/tkthao219-bubududu.gif",
    options: [
      { text: "Still smarter than me 😭", next: 6 },
      { text: "Don’t act too cool 😜", next: 6 },
    ],
  },

  // 😭 Scene 3.3: Out of League Path
  {
    id: 5,
    text: "👧 Her: Aww... finally someone who knows their place 😂",
    gif: "https://media.tenor.com/7G2s5Mn8pC8AAAAi/cute-happy.gif",
    options: [
      { text: "Ouch. My self-respect 🥲", next: 6 },
      { text: "But I still like you 😶", next: 6 },
    ],
    effect: "tears-flood",
  },

  // 💖 Scene 4: Get Real
  {
    id: 6,
    text: "👦 Me: You know... I'm saying all this because I kinda... like you.\nAnd no, this isn’t a prank or dare.",
    gif: "https://media.tenor.com/9X_EXRhnImUAAAAm/love-ilu.webp",
    options: [
      { text: "😶 Seriously?", next: 7 },
      { text: "😂 LOL", next: 8, effect: "fire-burn" },
      { text: "I kinda like you too… maybe.", next: 9, effect: "confetti" },
    ],
  },

  // 😐 Scene 5.1: Neutral response
  {
    id: 7,
    text: "👦 Me: Yes seriously. I just wanted to be honest for once 😅",
    gif: "https://media.tenor.com/vauv5Ig_L5UAAAAm/honest-frank.webp",
    options: [
      { text: "You’re brave 🫡", next: 10 },
      { text: "I’ll think about it 🤔", next: 10 },
    ],
  },

  // 🔥 Scene 5.2: LOL Response (Wrong Path)
  {
    id: 8,
    text: "👦 Me: OUCH. My heart just got roasted 💔",
    gif: "https://media.tenor.com/n0kN84CPVIoAAAAM/tom.gif",
    options: [
      { text: "I’ll cry now 😭", next: 11 },
      { text: "That’s fair 💔", next: 11 },
    ],
  },

  // 💌 Scene 5.3: Cute Ending Path
  {
    id: 9,
    text: "👧 Her: Okay okay… you’re cute and persistent. Maybe I’ll say yes. Someday 💕\nBut let’s talk more first. Deal?",
    gif: "https://media.tenor.com/-9FF6BVgdaIAAAAm/peach-cat.webp",
    options: [{ text: "Deal 💌", next: 12 }],
    effect: "music-hearts",
  },

  // 🫶 Scene 6: Final Feel-Good Response
  {
    id: 10,
    text: "👧 Her: Well… let’s talk more and see where it goes 🙂",
    gif: "https://media.tenor.com/kQjsTRbRQoYAAAAm/quby.webp",
    options: [{ text: "Sure 😄", next: 12 }],
  },

  // 💔 Scene 7: Sad Ending (Wrong Path)
  {
    id: 11,
    text: "👧 Her: Nice effort but... I think we're better off as friends.",
    gif: "https://media.tenor.com/Khu7rSwEZGkAAAAM/love-love-you.gif",
    options: [
      { text: "That’s fair 💔", next: 0 },
      { text: "Restart 🔁", next: 1 },
    ],
  },

  // 🚀 The End / To Be Continued
  {
    id: 12,
    text: "👧 Her: To be continued... 😌\nWanna share this with her now? Or start again?",
    gif: "https://media.tenor.com/EVev4sv7IvwAAAAm/let%27s-continue-nik-popovic.webp",
    options: [
      { text: "Restart 🔁", next: 1 },
      { text: "Share 💬", next: "share" },
    ],
  },
];

let currentScene = 1;
let h1 = document.querySelector("h1");
let img = document.querySelector("img");
let options = document.querySelector(".option");

function sceneShow(sceneId) {
  const scene = story.find((s) => s.id === sceneId);
  if (!scene) return;

  h1.innerText = scene.text;
  img.setAttribute("src", `${scene.gif}`);

  options.innerHTML = " ";

  scene.options.forEach((elem, idx) => {
    console.log(elem.text);
    let btn = document.createElement("button");
    btn.innerText = elem.text;
    btn.setAttribute("id", `${idx}`);
    options.appendChild(btn);
  });
}

options.addEventListener("click", (dets) => {
  const scene = story.find((s) => s.id === currentScene);
  if (!scene) return;

  const next = scene.options[dets.target.id].next;
  if (next === "share") {
    alert("Share this with someone special! 💖");
    return;
  }

  currentScene = next;
  sceneShow(currentScene);
});

sceneShow(currentScene);
