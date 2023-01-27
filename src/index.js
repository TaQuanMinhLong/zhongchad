const { Client, GatewayIntentBits, Events } = require("discord.js");
const { media, emoji } = require("./resource");
const { mention } = require("./config");
const { config } = require("dotenv");

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
});

client.on(Events.ClientReady, () => {
  console.log(`${client.user?.username} is online...`);
});

//RESPOND MESSAGES
client.on(Events.MessageCreate, (message) => {
  const content = message.content;
  const messageData = content.toLowerCase().trimEnd();
  const isEmoji = messageData.startsWith("<");
  const sendMessage = (data) => message.channel.send(data);
  const getSticker = (stickerId) =>
    `https://media.discordapp.net/stickers/${stickerId}.webp?size=lossless`;
  if (message.author.bot) return;
  if (message.stickers.map(($) => $).length < 1) {
    console.log(`[${message.author.tag}]: ${content}`);
  }
  if (message.stickers.map(($) => $).length > 0) {
    console.log("Sticker: ", getSticker(message.stickers.map(($) => $.id)[0]));
  }

  // Content: Original message
  switch (content) {
    case emoji._worry_think:
      sendMessage(emoji._worry_wow);
    case emoji._worry_coffee_hmm:
      sendMessage(emoji._worry_coffee_smile);
    case emoji._pepe_hao:
      sendMessage(emoji._pepe_hao);
    case emoji._worry_awokege:
      sendMessage(emoji._hehe_boi);
    case emoji._worry_sob || emoji._worry_cry || emoji._worry_sad:
      sendMessage(emoji._worry_sad_pat);
    case emoji._worry_dont_know:
      sendMessage(emoji._worry_wheelchair);
    case emoji._pepe_giga_wheeze:
      sendMessage(emoji._worry_patkek);
    case emoji._jerry_nani:
      sendMessage(emoji._jerry_nani_);
    case emoji._worry_brick:
      sendMessage(emoji._worry_bonk);
    case emoji._kek_sweat:
      sendMessage(emoji._worry_sweat);
    case emoji._worry_sweat:
      sendMessage(emoji._kek_sweat);
    case emoji._kaeya_lick:
      sendMessage(media._worry_think_lick);
    case emoji._worry_heart:
      sendMessage(media._worry_heart_butt);
  }

  if (content.includes(emoji._pepe_KKK)) {
    sendMessage(emoji._pepe_giga_wheeze);
  }

  switch (messageData) {
    case "hmm":
      sendMessage(media.hmm);
    case "bonk": {
      sendMessage(emoji._worry_brick);
      sendMessage(media.bonk);
    }
    case "kek":
      sendMessage(media.kek_gif);
    case "chad":
      sendMessage(media.baseCHAD);
    case "chad?":
      sendMessage(emoji._zhongli_chad);
    case "wut" || "wut?":
      sendMessage(emoji._jerry_nani_);
  }

  const messages = [
    { has: "noice", do: () => sendMessage(media.noice) },
    { has: "shiet", do: () => sendMessage(media.shiet) },
    { has: "oh no", do: () => sendMessage(media.fadedClown) },
    { has: "horni", do: () => sendMessage(media._worry_bonk) },
    {
      has: "zhongchad?",
      do: () => {
        sendMessage(media._worry_clown);
        sendMessage("WUT?");
      },
    },
    { has: "ara", do: () => sendMessage(media.ara_ara) },
    { has: "yare", do: () => sendMessage(emoji._worry_yare_yare) },
    { has: "sigh", do: () => sendMessage(emoji._worry_sad_pat) },
    { has: "segg?", do: () => sendMessage(media._OWO_) },
    { has: "wheeze", do: () => sendMessage(media.omegaLOL) },
    { has: "beeg brain", do: () => sendMessage(emoji._worry_smart) },
    { has: "hoho" || "not bad", do: () => sendMessage(emoji._worry_ehe) },
    {
      has: mention,
      do: () => {
        sendMessage("What's up?");
        sendMessage(media._worry_clown);
      },
    },
    {
      has: "right?",
      do: () => {
        sendMessage("Right");
        sendMessage(emoji._worry_coffee_smile);
      },
    },
  ];

  for (let i = 0; i < messages.length; i++) {
    if (messageData.includes(messages[i].has)) {
      messages[i].do();
    }
  }

  if (messageData.length > 3 && messageData.includes("hmm") && !isEmoji) {
    sendMessage(emoji._worry_think);
  }

  if (messageData.includes("gib") && messageData.includes("luck")) {
    sendMessage(media.gib_luck);
  }
});

client.login(process.env.TOKEN);
