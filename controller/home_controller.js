module.exports.home = (req, res) => {
    return res.render('home', {
        toggle: req.params.toggle
    })
}