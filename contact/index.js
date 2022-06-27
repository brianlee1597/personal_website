const container = select("#container");
const home = select("#home");
const from = select("#email_input");
const title = select("#title_input");
const warning = select("#warning");

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
    home.style.display = "none";

    const temp = document.getElementsByTagName("template")[0];
    const clone = temp.content.cloneNode(true);
    container.replaceChildren(clone);
}

function setWarning (text) {
    (warning.style.visibility = "visible") && (warning.innerText = text);
}

function clearWarning () {
    (warning.style.visibility = "hidden") && (warning.innerText = "");
}

async function submit () {
    if (warning.innerText.includes("unauthorized")) return;

    const text = quill.root.innerHTML;

    if (from.value === "") {
        setWarning("Please include your email address");
    } else if (!validateEmail(from.value)) {
        setWarning("Please include a correct email address");
    } else if (text === "<p><br></p>") {
        setWarning("Please let me know what the email is for in the text field")
    } else {
        clearWarning();
        let url = "https://contactemailsend.herokuapp.com/send_email", res;

        try {
            res = await post(url, { from, title, text });

            if(res.includes("Unauthorized")) 
                setWarning("You are unauthorized to send an email from this URL");
            else populateComplete();
        } catch (e) {
            alert(`There has been an error in processing your email request, please try again`);
        }
    }
}

quill.root.addEventListener("keydown", () => {
    const text_no_space = quill.root.innerHTML.replaceAll(" ", "");
    const box_populated = text_no_space !== "<p></p>" && text_no_space !== "<p><br></p>";
    const has_warning = warning.style.visibility === "visible";
    const authorized = !warning.innerText.includes("unauthorized");

    if (box_populated && has_warning && authorized) clearWarning();
})

from.addEventListener("keydown", () => {
    const has_warning = warning.style.visibility === "visible";
    const authorized =  !warning.innerText.includes("unauthorized");
    if (from.value !== "" && has_warning) {
        if (warning.innerText === "Please include your email address") {
            warning.innerText = "Please include a correct email address";
        } else if (validateEmail(from.value) && authorized) {
            clearWarning();
        }
    }
})