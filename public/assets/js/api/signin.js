

// for user signin
function loadSignIn() {


    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.getElementById('signIn_page').style.display = 'block'
        document.getElementById('signIn_page').style.visibility = 'hidden'
    }, 500);
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none'
        document.getElementById('signIn_page').style.visibility = 'visible'
        document.body.style.overflow = '';
    }, 1000);


    const form = document.getElementById('signin_form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const email = form[0].value
        const password = form[1].value

        const obj = {
            email: email,
            password: password
        }

        try {
            const resp = await fetch('/signIn', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })

            const data = await resp.json()

            const email_error = document.getElementById('email_signin_error')
            const password_error = document.getElementById('password_signin_error')
            const visibility = document.getElementById('password_visibility3')

            if (data.type === 'email') {
                showError(form[0], email_error, data.msg)
                removeError(form[0], email_error)
            } else if (data.type === 'blocked') {
                showSnackBar(data.msg)
            }
            else if (data.type === 'password') {
                showError(form[1], password_error, data.msg, visibility)
                removeError(form[1], password_error, visibility)
            } else {
                window.location.href = '/home'
            }
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

//show Password SignIn

function showPasswordSignIn() {
    const password = document.getElementById('singin-password-2');
    const password_visibility = document.getElementById('password_visibility3');
    if (password_visibility.innerText === "visibility_off") {
        password_visibility.innerText = "visibility";
        password.type = "text";
    } else {
        password_visibility.innerText = "visibility_off";
        password.type = "password";
    }
}


// for got password button

function forgotPassword() {
    // const signin_page =  document.getElementById('signIn_page')
    // const verify_page = document.getElementById('verify_page')
    // // const loading = document.getElementById('loadings')

    // signin_page.style.display = 'none'
    // // verify_page.style.display = 'none'
    // // loading.style.display = 'flex'

    // // setTimeout(() => {
    //     verify_page.style.display = 'block'
    //     // loading.style.display = 'none'
    // // }, 500);

    window.location.href = '/forgotPassword?'
}

