const quill = new Quill('#editor', {
    theme: 'snow'
});

async function post (url = '', data = {}) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    return res.json();
}

function validateEmail (email) {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function populateComplete () {
    const container = document.getElementById("container");
    container.innerHTML = "Success";
}

async function submit () {
    const from = document.getElementById("email_input").value;
    const title = document.getElementById("title_input").value;
    const text = quill.root.innerHTML;
    
    if (from === "") {
        alert("Please input your email address");
        return;
    } 

    if (!validateEmail(from)) {
        alert("Please input a correct email address");
        return;
    }
    
    if (text === "<p><br></p>") {
        alert("Please populate the text field");
        return;
    }

    let url = "https://contactemailsend.herokuapp.com/send_email", res;

    try {
        res = await post(url, { from, title, text });
    } catch (e) {
        alert(`There has been an error in processing your email request (${e}), please try again`);
        return;
    }

    if(res.includes("Unauthorized")) {
        alert(`You are unauthorized to send an email from this URL`);
        return;
    }

    populateComplete();
}