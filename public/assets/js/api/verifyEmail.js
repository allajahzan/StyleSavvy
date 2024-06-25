// load page
async function loadVerifyEmail() {

    // const endTime =  localStorage.getItem('endTime');
    // alert(endTime)
    // if(endTime === 0){
    //     document.getElementById('otp_p').style.display = 'none'
    //     document.getElementById('otp_button').style.display = 'block'
    // }


    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.getElementById('verify_page').style.display = 'block'
        document.getElementById('verify_page').style.visibility = 'hidden'
    }, 500);
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none'
        document.getElementById('verify_page').style.visibility = 'visible'
        document.body.style.overflow = '';
    }, 1000);

    function timer() {

        let num = 36

        const intervalId = setInterval(async () => {
            if (num > 0) {
                document.getElementById('timer_otp').innerHTML = num;

                // document.getElementById('timer_otp').innerHTML = num;
                num--;
            } else {
                // clear intervel
                // localStorage.setItem('endTime', 0);
                clearInterval(intervalId)

                // delete OTP after 37 seconds
                await fetch('/user/deleteOTP', { method: 'DELETE' })
                document.getElementById('otp_p').style.display = 'none'
                document.getElementById('otp_button').style.display = 'block'

            }
        }, 1000);
    }

    timer();

    // Send OTP to verify email----------------------------------------

    const form_otp = document.getElementById('verify_form');
    form_otp.addEventListener('submit', async (e) => {
        e.preventDefault()

        const otp = form_otp[0].value
        const obj = {
            otp: otp
        }

        try {
            const resp = await fetch('/user/verify', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })

            const data = await resp.json()

            if (data.type === 'error') {
                form_otp[0].style.color = 'red'
                form_otp[0].value = data.msg
                form_otp[0].setAttribute('readOnly', 'readOnly')
                form_otp[0].removeAttribute('required')
                document.getElementById('otp_error').innerHTML = 'error'

                setTimeout(() => {
                    form_otp[0].style.color = 'black'
                    form_otp[0].value = ''
                    form_otp[0].setAttribute('required', 'required')
                    form_otp[0].removeAttribute('readOnly')
                    document.getElementById('otp_error').innerHTML = ''
                }, 2000);
            } else {

                form_otp.reset()
                showSnackBar(data.msg)

                setTimeout(() => {
                    window.location.href = '/signIn'
                }, 2000);

            }
        } catch (err) {
            console.log(err);
            window.location.href = '/500-Server-Error'
        }
    })



    // resend OTP here------------------------------------------------

    document.getElementById('otp_button').addEventListener('click', async (e) => {

        try {
            await fetch('/user/resendOTP', {
                method: 'GET',
            })

            // setintervel

            function timer() {
                let num = 37;
                document.getElementById('timer_otp').innerHTML = num;
                document.getElementById('otp_p').style.display = 'block'
                document.getElementById('otp_button').style.display = 'none'

                const intervalId = setInterval(async () => {
                    if (num > 0) {
                        document.getElementById('timer_otp').innerHTML = num;
                        num--;
                    } else {
                        // clear intervel
                        clearInterval(intervalId)

                        // delete OTP after 37 seconds
                        await fetch('/user/deleteOTP', { method: 'DELETE' })
                        document.getElementById('otp_p').style.display = 'none'
                        document.getElementById('otp_button').style.display = 'block'

                    }
                }, 1000);
            }

            timer();
        } catch (err) {
            console.log(err);
            window.location.href = '/500-Server-Error'
        }

    })
}

// show snack bar
function showSnackBar(text) {
    document.getElementById('snackbar_msg').innerHTML = text
    const x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}


// show and remove Errors

function showError(input, err, msg, visibility) {
    input.style.color = 'red'
    input.value = msg
    input.type = 'text'
    input.removeAttribute('required')
    input.setAttribute('readOnly', 'readOnly')
    err.innerHTML = 'error'
    if (visibility) {
        visibility.style.display = 'none'
    }
}

function removeError(input, err, visibility) {
    setTimeout(() => {
        input.value = ''
        input.style.color = 'black'
        input.removeAttribute('readOnly')
        input.setAttribute('required', 'required')
        err.innerHTML = ''
        if (visibility) {
            visibility.style.display = 'block'
            visibility.innerHTML = 'visibility_off'
            input.type = 'password'
        }
    }, 2000);
}

