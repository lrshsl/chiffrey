const g_cv_page         = document.getElementById("page-caesar-vigenere");
const g_input_element   = document.getElementById("cv-source-input");
const g_output_element  = document.getElementById("cv-output");

const g_radix_input     = document.getElementById("radix-input");

const g_mode_select     = document.getElementById("cv-mode-select");
const g_caesar_key      = document.getElementById("caesar-key-input");
const g_vigenere_key    = document.getElementById("vigenere-key-input");

const g_caesar_key_container    = document.getElementById("caesar-key-container");
const g_vigenere_key_container  = document.getElementById("vigenere-key-container");


// Show only one key input
hide_according_to_mode();


function hide_according_to_mode(mode) {
    if (typeof mode === "undefined") { mode = g_mode_select.value; }
    console.assert(typeof mode === "string");

    if (mode === "caesar") {
        g_vigenere_key_container.style.display = "none";
        g_caesar_key_container.style.display = "inline-block";
    } else {
        g_caesar_key_container.style.display = "none";
        g_vigenere_key_container.style.display = "inline-block";
    }
}


function exec_encode() {
    hide_according_to_mode();
    const inp = g_input_element.value;
    g_output_element.textContent = encrypt_msg(inp);
}

function encrypt_msg(inp) {
    console.assert(typeof inp === "string");

    let key = 0;
    switch (g_mode_select.value) {
        case "caesar":
            if (g_caesar_key.value)
                key = parseInt(g_caesar_key.value);
            return encrypt_caesar(inp, key);
        case "vigenere":
            if (g_vigenere_key.value)
                key = g_vigenere_key.value;
            return encrypt_vigenere(inp, key);
        default:
            return `mode "${g_mode_select.value}" not (yet) implemented`;
    }
}

// Helper method to wrap a number between a and z
const a = 'a'.charCodeAt();
const z = 'z'.charCodeAt();
const wrap = (n) => ((n - a) % (z - a)) + a;

// Helper function that returns the corresponding digit of the key (input is a int: 0..inp, output a int: 0-25)
const key_digit = (key, i) => key[i%key.length].charCodeAt() - a;

function encrypt_caesar(msg, key) {
    console.assert(typeof msg === "string");
    console.assert(typeof key === "number");

    key %= 26;

    return [...msg].map(
        (ch) => String.fromCharCode(!is_alpha(ch)? ch: wrap(ch.charCodeAt() + key))
    ).join("");
}


function encrypt_vigenere(msg, key) {

    // Encode one letter at a time with the corresponding digit of the key
    let outp = "";
    for (let i=0; i<msg.length; ++i) {
        outp += String.fromCharCode(wrap(msg[i].charCodeAt() + key_digit(key, i)));
    }
    return outp;
}


