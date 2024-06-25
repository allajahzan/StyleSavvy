// load page
function loadForgotPassword() {
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
}

// get email

async function getEmail(event) {
    event.preventDefault()
    const form = document.getElementById('verify_form')
    const email = form[0].value

    try {
        const resp = await fetch('/forgotPassword?', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })

        const data = await resp.json()

        const input = form[0]
        const err = document.getElementById('email_error')

        if (data.type === 'email') {
            showError(input, err, data.msg)
            removeError(input, err)
        } else if (data.type === 'auth') {
            document.getElementById('snackbar_icon').innerHTML = 'error'
            document.getElementById('snackbar_icon').style.color = 'red'
            showSnackBar(data.msg)
        }
        else {
            form.reset()
            showSnackBar(data.msg)
        }
    } catch (err) {
        console.log(err);
        window.location.href = '/500-Server-Error'
    }

}


// show snack bar
function showSnackBar(text) {
    document.getElementById('snackbar_msg').innerHTML = text
    const x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
        document.getElementById('snackbar_icon').innerHTML = 'task_alt'
    }, 3000);
}


// show and remove Errors

function showError(input, err, msg) {
    input.style.color = 'red'
    input.value = msg
    input.type = 'text'
    input.removeAttribute('required')
    input.setAttribute('readOnly', 'readOnly')
    err.innerHTML = 'error'
}

function removeError(input, err) {
    setTimeout(() => {
        input.value = ''
        input.style.color = 'black'
        input.removeAttribute('readOnly')
        input.setAttribute('required', 'required')
        err.innerHTML = ''
    }, 2000);
}
