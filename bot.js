const { Bot, Keyboard } = require("grammy");
const PostSherik = require('./schema/schema')
const connectDB = require('./config/db');
const { handleSherikKerak, handleTextMessage } = require('./sherikKerak');
const cron = require('node-cron');


// Подключаемся к базе данных
connectDB();

const bot = new Bot(""); // <-- put your bot token between the ""

const channel_id = ""

const moodKeyboard = new Keyboard()
  .text('Sherik kerak')
  .text('Ish joyi kerak')
  .row()
  .text('Hodim kerak')
  .text('Ustoz kerak')
  .row()
  .text('Shogird kerak')
  .row()
  .resized();

bot.command('help', async (ctx) => {
  await ctx.reply(
  `<a href="https://t.me/abdurahmonxamroqulov">Abdurahmon Xamroqulov</a> tomonidan tuzilgan ModernJob kanali.\n\n` +
  `Bu yerda siz\n` +
  '#Ustoz\n' +
  '#Shogird\n' +
  '#Sherik\n' +
  '#Xodim\n' +
  '#IshJoyi\n' +
  'topishingiz mumkin.\n\n' +
  'E\'lon berish: @ModernJob_Bot\n\n', {
      parse_mode: "HTML"
  })
})


bot.command('start', async (ctx) => {
  const chatId = ctx.chat.id;
    await ctx.reply(
    `<b>Assalom alaykum ${ctx.chat.first_name}</b>\n`+
    `<b>ModernJob kanalining rasmiy botiga xush kelibsiz!</b>\n\n`+
    `/help yordam buyrugi orqali bot nimalarga qodir ekanligini bilib oling!`, {
      reply_markup: moodKeyboard, parse_mode: "HTML"
    });
});

bot.hears("Sherik kerak", handleSherikKerak);
bot.on('message:text', handleTextMessage);


// Планировщик задач для отправки нового поста каждый час
cron.schedule('* * * * *', async () => {
  const postSherik = await PostSherik.findOneAndUpdate(
    { sent: false }, 
    { sent: true }, 
    { sort: { createdAt: 1 } }
  );
  if (postSherik) {
    await bot.api.sendMessage(channel_id,
      `<b>Sherik kerak:</b>\n\n`+
        `🏅 Sherik: <b>${postSherik.fullName}</b>\n`+
        `📚 Tehnologiya: <b>${postSherik.tehnologiya}</b>\n`+
        `🇺🇿 Telegram: @${postSherik.telegram}\n`+
        `📞 Aloqa: <code>${postSherik.aloqa}</code>\n`+
        `🌐 Hudud: <b>${postSherik.hudud}</b>\n`+
        `💰 Narxi: <i>${postSherik.narxi}</i>\n`+
        `👨🏻‍💻 Kasbi: <u>${postSherik.kasbi}</u>\n`+
        `🕓 Murojat qilish vaqti: ${postSherik.murojat}\n`+
        `↗ Maqsad: <b>${postSherik.maqsad}</b>\n\n`+
        `#sherik #${postSherik.hudud.split(' ').join('')} #${postSherik.kasbi} #${postSherik.tehnologiya.split(', ').join(' #')}\n\n`+
        `👉 <a href="https://t.me/ModernJob_rasmiy">Modern Job</a> kanaliga ulanish`,
      { parse_mode: "HTML" }
    );
  }



});

bot.start();
