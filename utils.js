// utils.js
const PostSherik = require('./schema/schema');

// Проверка, прошло ли 24 часа с последнего взаимодействия
async function canInteract(chatId) {
  const lastPost = await PostSherik.findOne({ chatId }).sort({ createdAt: -1 });
  if (!lastPost) {
    return true;
  }
  const now = Date.now();
  const lastTime = new Date(lastPost.createdAt).getTime();
  const oneDay = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах
  return (now - lastTime) >= oneDay;
}

// Сохранение поста в базу данных
async function saveSherik(chatId, fullName, tehnologiya, telegram, aloqa, hudud, narxi, kasbi, murojat, maqsad) {
  const post = new PostSherik({ chatId, fullName, tehnologiya, telegram, aloqa, hudud, narxi, kasbi, murojat, maqsad});
  await post.save();
}

module.exports = {
  canInteract,
  saveSherik,
};
