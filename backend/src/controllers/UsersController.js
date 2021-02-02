import User from "../models/User";

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
    });

    await user.save();
    const token = await user.generateAuthToken();

    return res.status(201).send({ token, userName: user.userName });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

const getUser = async (req, res) => {
  try{
    const user = await User.findByCredentials(req.body.userName);
    if (!user) {
      console.log(`User not found with ${req.body.userName}`);
    } else {
      console.log(user);
      return res.status(200).send({user});
    }
  }
  catch(error){
    console.log(error);
    return res.status(404).send({error});
  }
  
};

export default { login, createUser, getUser };
