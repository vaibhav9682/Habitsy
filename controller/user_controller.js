const User = require('../model/user')
const Habit = require('../model/habit')

module.exports.signup = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('signUp');

}

module.exports.signin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }

    return res.render('signIn')
}


module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect("back");
    }
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        await User.create(req.body)
        return res.redirect('/users/signin')
    } else {
        return res.redirect('back')
    }

}

module.exports.profile = async function (req, res) {
    let user = await User.findById(req.user.id)
    return res.render('profile', {
        profile_user: user
    })

}

// login

module.exports.dashboard = async function (req, res) {


    let habits = await Habit.find({ user: req.user._id })



    return res.render('dashboard', {
        habits: habits,
    })
}



module.exports.createSession = async function (req, res) {

    return res.redirect('/users/dashboard')
}





// logout

module.exports.destroySession = function (req, res) {

    req.logout(function (err) {
        if (err) {
            console.log(err)
        }
    });

    return res.redirect('/');
}