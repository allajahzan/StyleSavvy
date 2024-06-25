const validateUser = async (req, res, next) => {

    const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const phoneNoPattern = /^[1-9][0-9]{9}$/;
    const passEmptyPattern = /^\S+$/;
    const passwordPattern = /^(?!.*\s).{8,16}$/;

    const { name, email, password, cpassword, phoneNo } = req.body;

    // Name Validation
    if (!namePattern.test(name.trim())) {
        return res.status(401).json({ msg: 'Invalid Name', type: 'name' });
    }

    // Email validation
    if (!emailPattern.test(email.toLocaleLowerCase().trim())) {
        return res.status(401).json({ msg: 'Invalid Email Format', type: 'email' });
    }

    // PhoneNo validation
    if (!phoneNoPattern.test(phoneNo.trim())) {
        return res.status(401).json({ msg: 'Invalid Phone Number', type: 'phoneNo' });
    }

    // Password Validation if password is not undefined
    if (!passEmptyPattern.test(password.trim())) {
        return res.status(401).json({ msg: 'Invalid Password', type: 'password' });
    }

    // Password Validation if password is not undefined
    if (!passwordPattern.test(password.trim())) {
        return res.status(401).json({ msg: 'Password length must be 8-16', type: 'password' });
    }

    if (email === password) {
        return res.status(401).json({ msg: 'Password shouldn\'t be same as email ', type: 'password' });
    }

    if (cpassword !== password) {
        return res.status(401).json({ msg: 'Password doesn\'t match', type: 'cpassword' });
    }

    next()
}

module.exports = validateUser;
