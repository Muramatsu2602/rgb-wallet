import User from "../models/User";

/**
 * checks credentials are grants acess to system
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  try {
    // checks in db to see if credentials are valid
    let user = await User.findByCredentials(
      req.body.userName,
      req.body.password,
      req.body.isAdmin
    );

    if (!user) return res.status(404).send({ error: "Wrong Credentials" });

    const token = await user.generateAuthToken();

    return res.status(200).send({ token, userName: user.userName });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

/**
 * creates a new user from the admin/ pannel
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {
  try {
    const user = new User({
      userName: req.body.userName,
      fullName: req.body.fullName,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      didSellProj: req.body.didSellProj,
      isExecutingProj: req.body.isExecutingProj,
      weeklyHours: req.body.weeklyHours,
      createdAt: req.body.createdAt,
    });

    await user.save();
    const token = await user.generateAuthToken();

    return res.status(201).send({ token, userName: user.userName });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

/**
 * returns information regarding a single user given their userName. It's used on the /user page
 * @param {*} req
 * @param {*} res
 */
const getUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.userName);

    // console.log("USER: ", user);

    if (!user) {
      return res
        .status(404)
        .send({ error: `User not found with ${req.body.userName}` });
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error });
  }
};

/**
 * returns all users (those with !isAdmin) on the database
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.findAllUsers(false);

    //console.log("users", users);
    return res.status(200).send(users);
  } catch (e) {
    console.log("erro", e);
  }
};

/**
 * deletes user given their userName
 * @param {} req
 * @param {*} res
 */
const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteUser(req.body.userName);

    return res.status(200).send(result);
  } catch (e) {
    console.log("erro", e);
  }
};

/**
 * Adds cash to all users (everyone one gets a different amount) based on this equation:
 * saldo += (40 +( 5 * semanasCumpridas)) * (1 + (vendeuProjeto && 0,2) + (executandoProjeto && 0,1))
 * @param {*} req
 * @param {*} res
 */
const addCred = async (req, res) => {
  try {
    const result = await User.addCred(req.body.userName);
    // ....

    return res.status(200).send(result);
  } catch (error) {
    console.log("erro", e);
  }
};

export default { login, createUser, getUser, getUsers, deleteUser, addCred };
