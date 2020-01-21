function validatePasswordStrength() {
    var passw = document.getElementById('passwordTag').value;
    var reg = /\w*/g;
    var largeCase = passw.search(/[A-Z]/g);
    var smallCase = passw.search(/[a-z]/g);
    var numericChar = passw.search(/[0-9]/g);
    var specialChar = passw.search(/[^a-zA-Z0-9]/g);

    if (smallCase != -1) {
        //console.log('small cases is present at ' + smallCase);
        document.getElementById('small-case').innerHTML = ' Done';
        document.getElementById('small-case').style.color = 'green';
    } else {
        document.getElementById('small-case').innerHTML = '  small case alphabet required ';
        document.getElementById('small-case').style.color = 'red';
    }

    if (largeCase != -1) {
        //console.log('large cases is present at ' + largeCase);
        document.getElementById('large-case').innerHTML = ' Done';
        document.getElementById('large-case').style.color = 'green';
    } else {
        document.getElementById('large-case').innerHTML = ' large case alphabet required ';
        document.getElementById('large-case').style.color = 'red';
    }

    if (numericChar != -1) {
        //console.log('number is present at ' + numericChar);
        document.getElementById('numeric-char').innerHTML = ' Done';
        document.getElementById('numeric-char').style.color = 'green';
    } else {
        document.getElementById('numeric-char').innerHTML = ' number required ';
        document.getElementById('numeric-char').style.color = 'red';
    }

    if (specialChar != -1) {
        //console.log('special char is present at ' + specialChar);
        document.getElementById('special-char').innerHTML = ' Done';
        document.getElementById('special-char').style.color = 'green';
    } else {
        document.getElementById('special-char').innerHTML = ' special character required ';
        document.getElementById('special-char').style.color = 'red';
    }
}

document.getElementById('passwordTag').addEventListener('keyup', validatePasswordStrength);

function ajax(url, method, data) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(method, url, true);
        request.responseType = 'text';
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject(Error(request.statusText));
                }
            }
        };
        request.onerror = function () {
            reject(Error("Network Error"));
        };
        request.send(data);
    });
}

var submitLoginForm = function (e) {
    var loginData = {
        'username': document.getElementById('usernameTag').value,
        'password': document.getElementById('passwordTag').value
    }
    ajax('http://localhost:3000/validatePassword', 'POST', JSON.stringify(loginData)).then( result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
}

document.getElementById('login-button').addEventListener('click', submitLoginForm);