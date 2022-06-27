const quill = new Quill('#editor', {
    theme: 'snow'
});

class Form {
    constructor () {
        this.container = select("#container");
        this.home = select("#home");
        this.from = select("#email_input");
        this.title = select("#title_input");
        this.warning = select("#warning");
        this.url = "https://contactemailsend.herokuapp.com/send_email";

        quill.root.addEventListener("keydown", () => {
            const text_no_space = quill.root.innerHTML.replaceAll(" ", "");
            const box_populated = text_no_space !== "<p></p>" && text_no_space !== "<p><br></p>";
            const has_warning = this.warning.style.visibility === "visible";
            const authorized = !this.warning.innerText.includes("unauthorized");
        
            if (box_populated && has_warning && authorized) 
                this.#clearWarning();
        })
        
        this.from.addEventListener("keydown", () => {
            const has_warning = this.warning.style.visibility === "visible";
            const no_text_warning = !this.warning.innerText.includes("text field");
            const authorized =  !this.warning.innerText.includes("unauthorized");
            if (this.from.value !== "" && has_warning) {
                if (this.warning.innerText === "Please include your email address") {
                    this.warning.innerText = "Please include a correct email address";
                } else if (this.#validateEmail(this.from.value) && authorized && no_text_warning) {
                    this.#clearWarning();
                }
            }
        })
    }

    async #post (url = '', data = {}) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          });
          return res.json();
    }

    #validateEmail (email) {
        return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    #populateComplete () {
        this.home.style.display = "none";
    
        const temp = document.getElementsByTagName("template")[0];
        const clone = temp.content.cloneNode(true);
        this.container.replaceChildren(clone);
    }

    #setWarning (text) {
        this.warning.style.visibility = "visible";
        this.warning.innerText = text;
    }

    #clearWarning () {
        this.warning.style.visibility = "hidden";
        this.warning.innerText = "";
    }

    async submit () {
        if (this.warning.innerText.includes("unauthorized")) return;

        const text = quill.root.innerHTML;
    
        if (this.from.value === "") {
            this.#setWarning("Please include your email address");
        } else if (!this.#validateEmail(this.from.value)) {
            this.#setWarning("Please include a correct email address");
        } else if (text === "<p><br></p>") {
            this.#setWarning("Please let me know what the email is for in the text field")
        } else {
            this.#clearWarning();
            const res = await this.#post(this.url, { from: this.from, title: this.title, text });

            if(res.includes("Unauthorized")) 
                this.#setWarning("You are unauthorized to send an email from this URL");
            else this.#populateComplete();
        }
    }
};