const feedback = [...document.querySelectorAll('.buyer__review')]

if (!feedback.length) {

} else {
    const feedbackQuantity = document.querySelectorAll('.feedback__quantity')

    feedbackQuantity.forEach(elem => elem.innerHTML = feedback.length)
}

const tabLink = [...document.querySelectorAll('.tabs li a')]

if (!tabLink.length) {

} else {
    tabLink.forEach(elem => {

        elem.addEventListener('click', function (e) {
            e.preventDefault()

            const link = this.getAttribute('href').replace('#', '')
            const pan = document.querySelectorAll('.pan')
            if (this.classList.contains('active')) {
                document.getElementById(link).classList.add('visible')
            } else {
                pan.forEach(item => item.classList.remove('visible'))
                tabLink.forEach(item => item.classList.remove('active'))
                this.classList.add('active')
                document.getElementById(link).classList.add('visible')
            }


        })

    })
}

const showFeedbackBtn = [...document.querySelectorAll('.show__feedback-form')]

if (!showFeedbackBtn.length) {

} else {
    showFeedbackBtn.forEach(elem => {
        elem.addEventListener('click', function () {
            if (this.classList.contains('show')) {
                this.classList.remove('show')
                document.querySelector('.feedback__form').classList.remove('visible')
            } else {
                this.classList.add('show')
                document.querySelector('.feedback__form').classList.add('visible')
            }
        })
    })
}