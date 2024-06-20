// handlers.js
const { Keyboard } = require("grammy");
const { canInteract, saveSherik } = require('./utils');

// Определение клавиатуры
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

const haYoq = new Keyboard()
  .text('Ha')
  .text('Yoq')
  .resized();

const userStates = {};

// Обработчик команды "Sherik kerak"
async function handleSherikKerak(ctx) {
  const chatId = ctx.chat.id;

  // Проверяем, может ли пользователь взаимодействовать
  if (!(await canInteract(chatId))) {
    await ctx.reply("Siz bir kunda faqat bir marta e'lon berishingiz mumkin. Iltimos, keyinroq qayta urinib ko'ring.");
    return;
  }

  userStates[chatId] = { stage: 'askingFullName' };
  await ctx.reply(
    `<b>Sherik topish uchun ariza berish</b>\n\n` +
    `Hozir sizga birnecha savollar beriladi\.\n` +
    `Har biriga javob bering\.\n` +
    `Oxirida agar hammasi tog'ri bo'lsa, HA tugmasini bosing va\n` +
    `arizangiz Adminga yuboriladi\.`,
    { parse_mode: "HTML" }
  );
  await ctx.reply("<b>Ismingiz va familiyangiz nima?</b>", { parse_mode: "HTML" });
}

// Обработчик текстовых сообщений
async function handleTextMessage(ctx) {
  const chatId = ctx.chat.id;
  const text = ctx.message.text;

  if (userStates[chatId]) {
    const userState = userStates[chatId];

    if (userState.stage === 'askingFullName') {
      userState.fullName = text;
      userState.stage = 'tehnologiya';
      await ctx.reply(
        `📚 <b>Texnologiya:</b>\n\n` +
        `Talab qilinadigan texnologiyalarni kiriting?\n` +
        `Texnologiya nomlarini vergul bilan ajrating\. Masalan\,\n\n` +
        `<i>JavaScript\, Python\, React</i>`,
        { parse_mode: "HTML" }
      );
    }else if (userState.stage === 'tehnologiya') {
        userState.tehnologiya = text;
        userState.stage = 'aloqa'
        await ctx.reply(
            `<b>📞 Aloqa: </b>\n\n`+
            `Bog\`lanish uchun raqamingizni kiriting?\n`+
            `Masalan, +998 93 628 73 37`,
            { parse_mode: "HTML" }
        )
    }else if(userState.stage === 'aloqa'){
        userState.aloqa = text
        userState.stage = 'hudud'
        await ctx.reply(
            `<b>🌐 Hudud:</b>\n\n`+
            `Qayerdansiz?\n`+
            `Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`,
            { parse_mode: "HTML" }
        )
    }else if(userState.stage === 'hudud'){
      userState.hudud = text
      userState.stage = 'narxi'
      await ctx.reply(
            `💰<b>Narxi:</b>\n\n`+
            `Tolov qilasizmi yoki Tekinmi?\n`+
            `Kerak bo\`lsa, Summani kiriting?`,
            { parse_mode: "HTML" }
      )
    }else if(userState.stage === 'narxi'){
      userState.narxi = text
      userState.stage = 'kasbi'
      await ctx.reply(
            `👨🏻‍💻 <b>Kasbi:</b>\n\n`+
            `Ishlaysizmi yoki o\`qiysizmi?\n`+
            `Masalan, Talaba`,
            { parse_mode: "HTML" }
      )
    }else if(userState.stage === 'kasbi'){
      userState.kasbi = text
      userState.stage = 'murojat'
      await ctx.reply(
            `🕰 <b>Murojat qilish vaqti:</b>\n\n`+
            `Qaysi vaqtda murojat qilish mumkin?\n`+
            `Masalan, 9:00 - 18:00`,
            { parse_mode: "HTML" }
      )
    }else if (userState.stage === 'murojat') {
      userState.murojat = text;
      userState.stage = 'maqsad';
      await ctx.reply(
            `↗ <b>Maqsad:</b>\n\n` +
            `Maqsadingiz nima?`,
            { parse_mode: "HTML" }
      );
    } else if(userState.stage === 'maqsad'){
      userState.maqsad = text
      
      // const { fullName, tehnologiya, aloqa, hudud, narxi, kasbi, murojat, maqsad } = userState;
      const telegram = ctx.chat.username;

      const fullName = userState.fullName;
      const tehnologiya = userState.tehnologiya;
      const aloqa = userState.aloqa;
      const hudud = userState.hudud;
      const narxi = userState.narxi;
      const kasbi = userState.kasbi;
      const murojat = userState.murojat;
      const maqsad = userState.maqsad;

      await ctx.reply(
        `<b>Sherik kerak:</b>\n\n`+
        `🏅 Sherik: <b>${fullName}</b>\n`+
        `📚 Tehnologiya: <b>${tehnologiya}</b>\n`+
        `🇺🇿 Telegram: @${telegram}\n`+
        `📞 Aloqa: <code>${aloqa}</code>\n`+
        `🌐 Hudud: <b>${hudud}</b>\n`+
        `💰 Narxi: <i>${narxi}</i>\n`+
        `👨🏻‍💻 Kasbi: <u>${kasbi}</u>\n`+
        `🕓 Murojat qilish vaqti: ${murojat}\n`+
        `↗ Maqsad: <b>${maqsad}</b>\n\n`+
        `#sherik #${hudud.split(' ').join('')} #${kasbi} #${tehnologiya.split(', ').join(" #")}\n\n`+
        `👉 <a href="https://t.me/ModernJob_rasmiy">Modern Job</a> kanaliga ulanish`,
        { parse_mode: "HTML" });
  
       await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`, {
         reply_markup: haYoq,
       });
  
       // Сохраняем состояние для следующего шага
       userStates[chatId] = { 
        stage: 'yakun', 
        fullName,
        tehnologiya,
        telegram,
        aloqa,
        hudud,
        narxi,
        kasbi,
        murojat,
        maqsad
       };

    }else if (userState.stage === 'yakun') {
      if (text === 'Ha') {
        const { fullName, tehnologiya, telegram, aloqa, hudud, narxi, kasbi, murojat, maqsad } = userState;

        // Сохраняем пост в базу данных
        await saveSherik(chatId, fullName, tehnologiya, telegram, aloqa, hudud, narxi, kasbi, murojat, maqsad);

        await ctx.reply('Elon bazaga qoshilda navbati kelganda kanalga chiqadi!', {
          reply_markup: moodKeyboard,
        });

      } else {
        await ctx.reply('Qabul qilinmadi', {
          reply_markup: moodKeyboard,
        });
      }

      delete userStates[chatId];
    }
  }
}

module.exports = {
  handleSherikKerak,
  handleTextMessage,
};
