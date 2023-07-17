
let createHabit = () => {

    let button = $('#habitForm');

    button.click(function (e) {
        e.preventDefault();


        $.ajax({
            type: 'get',
            url: '/habit/form',
            success: function () {



                $('#form').empty()



                $('#form').append(habitDom);
                submitForm()

            }

        })


    })






    let habitDom = function () {

        return $(`
        <div class='innerForm'>
        <form action="/habit/create" method="POST" id="habitForm">
        <label for="habit">Habit</label>
        <input type="text" id="habit" name="habit" required>
        <label for="about">Description</label>
        <textarea name="about" id="about" cols="30" rows="5" ></textarea>
        <input type="submit" id="submit" value="Add to dashboard" >
        
        </form>
         <div>
        <a href="/users/dashboard" id="backButton" >Close</a>
         </div>
        </div>
        `)

    }



}


let submitForm = () => {
    let habitForm = $('form')

    let button = $('#submit')
    button.click(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/habit/create',
            data: habitForm.serialize(),
            success: function () {

                $('#habit').val('')
                $('#about').val('')

            }

        })




    })

}



const toggle = () => {
    const blurEl = document.getElementById("blur");
    blurEl.classList.toggle("active");

    const popupEl = document.getElementById("form");
    popupEl.classList.toggle("active");
}

createHabit()

