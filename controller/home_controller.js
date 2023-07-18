module.exports.home = (req, res) => {
    return res.render('home', {
        toggle: req.params.toggle
    })
}
module.exports.about = (req, res) => {
    return res.render('about')
}