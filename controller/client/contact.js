const jwt = require('jsonwebtoken')
const User = require('../../model/user/user')

exports.getContactPage = async (req, res) => {
    try {
        const token = req.session.user;
        if (token) {
            const isTokenValid = jwt.verify(token, process.env.userSecretCode);
            const id = isTokenValid.id;
            const user = await User.findById(id);
            return res.render('contact', { user })
        }

        res.render('contact')
    } catch (err) {
        console.log(err);
        res.render('500')
    }
}