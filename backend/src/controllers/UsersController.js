import User from "../models/User";

const login = async (req, res) => {
  try {
    let user = await User.findByCredentials(
      req.body.userName,
      req.body.password
    );

    if (!user) return res.status(404).send({ error: "Wrong Credentials" });

    const token = await user.generateAuthToken();

    return res.status(200).send({ token, userName: user.userName });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User({
      userName: req.body.userName,
      password: req.body.password,
      //TODO: adding other fields that constitute the User
    });

    await user.save();
    const token = await user.generateAuthToken();

    return res.status(201).send({ token, userName: user.userName });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const testRoute = async (req, res) => {
  return res.status(200).send(`Seja Bem-Vindo ${req.user.userName}!`);
};

export default { login, createUser, testRoute };
