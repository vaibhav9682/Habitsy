

let changeMonth = () => {

    let div = document.getElementById('date-container')

    let pixel = div.scrollTop.toFixed();

    let display = document.getElementById('monthDisplay')

    console.log(pixel)

    if (pixel >= 0 && pixel <= 300) {
        display.innerText = 'January'
    } else if (pixel <= 750) {
        display.innerText = 'February'
    } else if (pixel <= 1150) {
        display.innerText = 'March'
    } else if (pixel <= 1700) {
        display.innerText = 'April'
    } else if (pixel <= 2100) {
        display.innerText = 'May'
    } else if (pixel <= 2500) {
        display.innerText = 'June'
    } else if (pixel <= 3050) {
        display.innerText = 'July'
    } else if (pixel <= 3450) {
        display.innerText = 'August'
    } else if (pixel <= 4000) {
        display.innerText = 'September'
    } else if (pixel <= 4400) {
        display.innerText = 'October'
    } else if (pixel <= 4800) {
        display.innerText = 'November'
    } else if (pixel <= 5410) {
        display.innerText = 'December'
    }
}

let month = new Date().getMonth() + 1
// let month = 3;
let obj = {};
let pxl = 0;
for (i = 1; i <= 12; i++) {
    obj[i] = pxl;
    pxl += 435;
}

// console.log(obj)
let div = document.getElementById('date-container')
for (key in obj) {
    if (key == month) {
        let val = obj[key]
        div.scrollBy(0, val)

    }
}
// div.scrollBy(0, 2500)

let toggle = () => {
    let anchors = $('.displayDate');
    anchors.each(function () {
        let anchor = $(this);
        anchor.click(function (e) {
            e.preventDefault();

            // Get the URL query parameters for this specific anchor
            let urlParams = new URLSearchParams(anchor.attr('href').split('?')[1]);
            let habitId = urlParams.get('habit');
            let month = urlParams.get('month');
            let date = urlParams.get('date');

            // Perform your AJAX call using the retrieved parameters
            $.ajax({
                url: '/habit/day',
                method: 'GET',
                data: {
                    habit: habitId,
                    month: month,
                    date: date
                },
                success: async function (data) {
                    // console.log(data.status)
                    let uniqeid = data.uniqeid;
                    let status = data.status;
                    // Handle the AJAX response here


                    let div = document.getElementById(uniqeid)
                    div.innerHTML = ''

                    if (status == 'done') {
                        $('<img src="/image/tick.png">').appendTo(div)
                    } else if (status == 'notDone') {

                        $('<img src="/image/cross.png">').appendTo(div)

                    }

                }
            });
        });
    });
};



toggle()