// for user signUp with email verification

function loadSignUp() {



    const form = document.getElementById('signup_form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form)
        const obj = Object.fromEntries(formData)

        try {
            const resp = await fetch('/signUp', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })

            const data = await resp.json()

            const name = form[0]
            const email = form[1]
            const phoneNo = form[2]
            const password = form[3]
            const cpassword = form[4]

            const name_err = document.getElementById('name_error')
            const email_err = document.getElementById('email_error')
            const phoneNo_err = document.getElementById('phoneNo_error')
            const passsword_err = document.getElementById('password_error')
            const cpassword_err = document.getElementById('cpassword_error')
            const visibility1 = document.getElementById('password_visibility1')
            const visibility2 = document.getElementById('password_visibility2')


            if (data.type === 'name') {
                showError(name, name_err, data.msg)
                removeError(name, name_err)
            } else if (data.type === 'email') {
                showError(email, email_err, data.msg)
                removeError(email, email_err)
            } else if (data.type === 'phoneNo') {
                showError(phoneNo, phoneNo_err, data.msg)
                removeError(phoneNo, phoneNo_err)
            } else if (data.type === 'password') {
                showError(password, passsword_err, data.msg, visibility1)
                removeError(password, passsword_err, visibility1)
            } else if (data.type === 'cpassword') {
                showError(cpassword, cpassword_err, data.msg, visibility2)
                removeError(cpassword, cpassword_err, visibility2)
            } else {



                window.location.href = '/verifyEmail'


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

// show password SignUp1

function showPasswordSignUp1() {
    const password = document.getElementById('password1');
    const password_visibility = document.getElementById('password_visibility1');
    if (password_visibility.innerText === "visibility_off") {
        password_visibility.innerText = "visibility";
        password.type = "text";
    } else {
        password_visibility.innerText = "visibility_off";
        password.type = "password";
    }
}

function showPasswordSignUp2() {
    const password = document.getElementById('password2');
    const password_visibility = document.getElementById('password_visibility2');
    if (password_visibility.innerText === "visibility_off") {
        password_visibility.innerText = "visibility";
        password.type = "text";
    } else {
        password_visibility.innerText = "visibility_off";
        password.type = "password";
    }
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

