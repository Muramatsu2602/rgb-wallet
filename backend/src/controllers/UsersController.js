import User from '../models/User';

const login = async (req, res) => {
    try {
        let user = await User.findByCredentials(req.body.login, req.body.password);
    } catch (error) {
        
    }
}