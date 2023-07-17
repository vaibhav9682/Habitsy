const Habit = require('../model/habit')
const Day = require('../model/day')


let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let thirtyDays = ['April', 'June', 'November', 'September']
let dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


module.exports.form = (req, res) => {
    if (req.xhr) {

        return res.status(200).json({

            message: "form appeard"
        })

    }
}

module.exports.create = async (req, res) => {

    try {
        let habit = await Habit.create({
            name: req.body.habit,
            about: req.body.about,
            user: req.user._id
        })
        if (req.xhr) {

            return res.status(200).json({

                message: "form appeard"
            })

        }

        return res.redirect('back')
    } catch (error) {
        console.log(error)
        return res.redirect('back')

    }

}


module.exports.showTrack = async (req, res) => {

    let habit = await Habit.findOne({ _id: req.params.id })


    let dayArray = await Day.find({ habit: req.params.id })
    // console.log(dayArray)    



    return res.render('track', {
        months: monthArr,
        thirty: thirtyDays,
        days: dayArr,
        user: req.user,
        habit: habit,
        dayArray: dayArray
    })

}


module.exports.day = async (req, res) => {

    let { habit, month, date } = req.query;
    let Astatus = "done";
    // console.log(req.query)



    let day = await Day.findOne({ habit: habit, month: month, date: date })
    if (!day) {
        let newDay = await Day.create({
            month: month,
            date: date,
            habit: habit,
            status: 'done'
        })

        let Myhabit = await Habit.findOne({ _id: habit })

        Myhabit.track.push(newDay)
        Myhabit.save();

    }

    if (day) {
        let preStatus = day.status

        if (preStatus == 'none') {
            newstatus = "done"
        } else if (preStatus == 'done') {
            newstatus = "notDone"
        } else if (preStatus == 'notDone') {
            newstatus = 'none'
        }

        day.status = newstatus;
        day.save();

    }
    if (day) {
        Astatus = day.status;
    }

    let uniqeid = habit + date + month

    if (req.xhr) {
        return res.status(200).json({
            uniqeid: uniqeid,
            status: Astatus,
            message: 'day created'
        })
    }

    return res.redirect('back')

}

module.exports.delete = async (req, res) => {

    await Day.deleteMany({ habit: req.params.id })

    await Habit.findOneAndDelete({ _id: req.params.id })


    return res.redirect('back')

}
