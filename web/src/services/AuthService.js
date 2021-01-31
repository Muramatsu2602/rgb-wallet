import axios from 'axios' //import axios to make 

const logInUser = async (userLogin, password) => {
    try {
        const res = await axios.post("/login", {login: userLogin, password});
        const {token, login} = res.data;
        localStorage.setItem('user', JSON.stringify({login, token}));
        return true;
    }
    catch(error) {
        console.log(error);
        localStorage.removeItem('user');
        return false;
    }
}

const logOut = () => {
    localStorage.removeItem('user');
    localStorage.clear();
    axios.defaults.headers.common.Authorization = null;
}

const isLogged = () => {
    let user = localStorage.getItem('user');
    if(!user) return false;
  
    user = JSON.parse(user);
    axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
  
    return user;
}

export default {isLogged, logInUser, logOut};
