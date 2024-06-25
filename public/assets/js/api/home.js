function loadHomePage() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.getElementById('home').style.display = 'block'
        document.getElementById('home').style.visibility = 'hidden'
    }, 500);
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none'
        document.getElementById('home').style.visibility = 'visible'
        document.body.style.overflow = '';
    }, 1000);
}

// get color

function getColor1(color) {
    const elements = document.querySelectorAll(`.${color}`);
    elements.forEach(element => {
        if (color === 'White') {
            element.style.backgroundColor = '#EFEFEF';
        }
        else if (color === 'Blue') {
            element.style.backgroundColor = '#7BC9FF';
        }
        else if (color === 'Red') {
            element.style.backgroundColor = '#D24545';
        }
        else if (color === 'Yellow') {
            element.style.backgroundColor = '#FFBB64';
        }
        else {
            element.style.backgroundColor = color;
        }
    });
}

// get clothes depends on the color

async function getClothe1(pId, cId) {
    try {
        const resp = await fetch(`/home/product/varient?pId=${pId}&cId=${cId}`)
        const data = await resp.json()
        document.getElementById("varient_image11" + pId).src = `/products/uploads/${data.varient.images[0]}`
        document.getElementById("varient_image22" + pId).src = `/products/uploads/${data.varient.images[1]}`
        document.getElementById("anchor_tag1" + pId).href = `/product?pId=${pId}&vId=${data.varient._id}`
        document.getElementById("product_price1" + pId).innerHTML = '₹ ' + data.varient.price[0]

        if (data.varient.stock[0] === 0) {
            document.getElementById('label_1' + pId).style.display = 'block'
            document.getElementById('label_1' + pId).innerHTML = 'Out of stock'
        } else {
            document.getElementById('label_1' + pId).style.display = 'none'
        }

        // document.getElementById(`${pId} + ${data.varient.color.color_name}`).classList.add('active')

    } catch (err) {
        console.log(err);
        window.location.href = '/500-Server-Error'
    }
}

// for trending products==============================================

// get color


function getColor(color, colorcode) {
    const elements = document.querySelectorAll(`.${color}`);
    elements.forEach(element => {
        if (colorcode === '#FFFFFF') {
            element.style.backgroundColor = '#EEEEEE';
        } else {
            element.style.backgroundColor = colorcode;
        }
    });
}

// get clothes depends on the color

async function getClothe(pId, cId) {
    try {
        const resp = await fetch(`/home/product/varient?pId=${pId}&cId=${cId}`)
        const data = await resp.json()
        document.getElementById("varient_image1" + pId).src = `/products/uploads/${data.varient.images[0]}`
        document.getElementById("varient_image2" + pId).src = `/products/uploads/${data.varient.images[1]}`
        document.getElementById("anchor_tag" + pId).href = `/product?pId=${pId}&vId=${data.varient._id}`
        document.getElementById("product_price" + pId).innerHTML = '₹ ' + data.varient.price[0]

        if (data.varient.stock[0] === 0) {
            document.getElementById('label_' + pId).style.display = 'block'
            document.getElementById('label_' + pId).innerHTML = 'Out of stock'
        } else {
            document.getElementById('label_' + pId).style.display = 'none'
        }

        // document.getElementById(`${pId} + ${data.varient.color.color_name}`).classList.add('active')

    } catch (err) {
        console.log(err);
        window.location.href = '/500-Server-Error'
    }
}


// for trending products for women==============================================

// get color

function getColorWomen(color) {
    const elements = document.querySelectorAll(`.${color}`);
    elements.forEach(element => {
        if (color === 'White') {
            element.style.backgroundColor = '#EFEFEF';
        }
        else if (color === 'Blue') {
            element.style.backgroundColor = '#7BC9FF';
        }
        else if (color === 'Red') {
            element.style.backgroundColor = '#D24545';
        }
        else if (color === 'Yellow') {
            element.style.backgroundColor = '#FFBB64';
        }
        else {
            element.style.backgroundColor = color;
        }
    });
}

// get clothes depends on the color

async function getClotheWomen(pId, cId) {
    try {
        const resp = await fetch(`/home/product/varient?pId=${pId}&cId=${cId}`)
        const data = await resp.json()
        document.getElementById("varient_image_women1" + pId).src = `/products/uploads/${data.varient.images[0]}`
        document.getElementById("varient_image_women2" + pId).src = `/products/uploads/${data.varient.images[1]}`
        document.getElementById("anchor_tag_women" + pId).href = `/product?pId=${pId}&vId=${data.varient._id}`
        document.getElementById("product_price_women" + pId).innerHTML = '₹ ' + data.varient.price[0]

        if (data.varient.stock[0] === 0) {
            document.getElementById('label_women' + pId).style.display = 'block'
            document.getElementById('label_women' + pId).innerHTML = 'Out of stock'
        } else {
            document.getElementById('label_women' + pId).style.display = 'none'
        }

        // document.getElementById(`${pId} + ${data.varient.color.color_name}`).classList.add('active')

    } catch (err) {
        console.log(err);
        window.location.href = '/500-Server-Error'
    }
}


// for trending products for men==============================================

// get color

function getColorMen(color) {
    const elements = document.querySelectorAll(`.${color}`);
    elements.forEach(element => {
        if (color === 'White') {
            element.style.backgroundColor = '#EFEFEF';
        }
        else if (color === 'Blue') {
            element.style.backgroundColor = '#7BC9FF';
        }
        else if (color === 'Red') {
            element.style.backgroundColor = '#D24545';
        }
        else if (color === 'Yellow') {
            element.style.backgroundColor = '#FFBB64';
        }
        else {
            element.style.backgroundColor = color;
        }
    });
}

// get clothes depends on the color

async function getClotheMen(pId, cId) {
    try {
        const resp = await fetch(`/home/product/varient?pId=${pId}&cId=${cId}`)
        const data = await resp.json()
        document.getElementById("varient_image_men1" + pId).src = `/products/uploads/${data.varient.images[0]}`
        document.getElementById("varient_image_men2" + pId).src = `/products/uploads/${data.varient.images[1]}`
        document.getElementById("anchor_tag_men" + pId).href = `/product?pId=${pId}&vId=${data.varient._id}`
        document.getElementById("product_price_men" + pId).innerHTML = '₹ ' + data.varient.price[0]

        if (data.varient.stock[0] === 0) {
            document.getElementById('label_men' + pId).style.display = 'block'
            document.getElementById('label_men' + pId).innerHTML = 'Out of stock'
        } else {
            document.getElementById('label_men' + pId).style.display = 'none'
        }

        // document.getElementById(`${pId} + ${data.varient.color.color_name}`).classList.add('active')

    } catch (err) {
        console.log(err);
        window.location.href = '/500-Server-Error'
    }
}