const bcrypt = require("bcryptjs");

const encript = async (textPlain) => {
  const hash = await bcrypt.hash(textPlain, 10);
  return hash;
};

const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = { encript, compare };
