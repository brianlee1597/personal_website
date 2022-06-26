const quill = new Quill('#editor', {
    theme: 'snow'
});

function validateEmail (email) {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

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

async function submit () {
    const from = document.getElementById("email_input").value;
    const text = quill.root.innerHTML;
    if (from === "") {
        alert("Please input your email address");
        return;
    } else if (!validateEmail(from)) {
        alert("Please input a correct email address");
        return;
    } else if (text === "<p><br></p>") {
        alert("Please populate the text field");
        return;
    }
    try {
        const url = "https://contactemailsend.herokuapp.com/send_email";
        
        const res = await post(url, { from, text });
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}