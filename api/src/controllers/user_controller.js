const { User } = require("../db");
const { encript } = require("../controllers/encript_controller");
const jwt = require("jsonwebtoken");
const { KEY_SECRET } = process.env;
const { transporter } = require("../config/mailer");

const getUsers = async () => {
  const result = await User.findAll();
  return result;
};

const getUser = async (params) => {
  const { email } = params;
  const result = await User.findOne({ where: { email: email } });
  return result;
};

const generateUser = async (params) => {
  try {
    const { name, email, picture } = params;
    const user = await User.findOne({ where: { email: email } });
    //console.log(user, 'TTTTTTT');
    if (!user) {
      const newUser = await User.findOrCreate({
        where: { email: email },
        defaults: {
          name: name,
          picture: picture,
        },
      });
      await transporter.sendMail({
        from: '"Mc Burger 🍔" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "¡Thanks for your register!", // Subject line
        html: "<b>Welcome to the Mc Burger App 😊</b>", // html body
      });
      //console.log('CREANDOOOOOO');
      //console.log(newUser, " new user");
      return newUser[0];
    } else {

      //console.log('deberia haber enviado mail');
      user.picture = picture;
      user.name = name;
      await user.save();
      return user;
    }
  } catch (error) {
    //console.log(error.message);
    //return res.status(404).json(error)
    res.status(403).json({ msg: "error en solicitud" });
  }
};

const updateUser = async (data) => {
  try {
    const {
      name,
      first_name,
      last_name,
      email,
      password,
      phone_number,
      address,
      wallet,
      userType,
      status,
    } = data;
    //console.log(email + '*****');
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      user.first_name = first_name;
      user.last_name = last_name;
      user.password = password;
      user.phone_number = phone_number;
      user.address = address;
      user.userType = userType;
      user.wallet = wallet;
      user.status = status;
      await user.save();
      return user;
    }
    //res.status(404).json({msg: 'el mail no existe'})
  } catch (error) {
    res.status(404).json({ msg: "error actualizando" });
  }
};

const findUserBbdd = async (email) => {
  if (!email) return { msg: "no escribieron el email" };
  const user = await User.findOne({ where: { email: email } });
  if (user) return user;
  return [{ msg: "error" }];
};

const loadUser = async () => {
  await User.create({
    name: "Admin McBurger",
    first_name: "Administrador",
    last_name: "McBurger",
    email: "admin@mcburger.com",
    picture: "https://us.123rf.com/450wm/ylivdesign/ylivdesign2110/ylivdesign211012504/176252000-hombre-con-el-icono-de-administrador-de-inscripci%C3%B3n-contorno-hombre-con-la-inscripci%C3%B3n-admin-vector-.jpg?ver=6",
    password: "admin",
    userType: "admin",
    wallet: 20000,
    address: "Palo alto - California",
    phone_number: "+54-2665847544",
  });

/*   await User.create({
    name: "Sandra",
    first_name: "Noemi",
    last_name: "Garay",
    email: "san2015@gmail.com",
    password: "admin",
    userType: "admin",
    wallet: 50000,
    address: "Bs As - Argentina",
    phone_number: "+549988877777",
  }); */
};

const validateToken = (req, res, next) => {
  const accessToken = req.body.token;
  // console.log(accessToken + '  .....');
  if (!accessToken) res.status(403).json({ msg: "Acceso denegado" });

  jwt.verify(accessToken, KEY_SECRET, (err, user) => {
    if (err) {
      const data = { msg: "Acceso denegado, token expired or incorrect" };
      res
        .status(400)
        .json({ msg: "Acceso denegado, token expired or incorrect" });
    } else {
      next();
    }
  });
};

module.exports = {
  getUser,
  getUsers,
  generateUser,
  updateUser,
  findUserBbdd,
  loadUser,
  validateToken,
};
