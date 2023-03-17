const g_cv_page        = document.getElementById("page-caesar-vigenere");
const g_input_element  = document.getElementById("cv-source-input");
const g_output_element = document.getElementById("cv-output");

const g_mode_select     = document.getElementById("cv-mode-select");
const g_caesar_key      = document.getElementById("caesar-key-input");
const g_vigenere_key      = document.getElementById("vigenere-key-input");

const g_caesar_key_container    = document.getElementById("caesar-key-container");
const g_vigenere_key_container  = document.getElementById("vigenere-key-container");


// Show only one key input
hide_according_to_mode();


function hide_according_to_mode(mode) {
    if (typeof mode === "undefined") { mode = g_mode_select.value; }

    if (mode == "caesar") {
        g_vigenere_key_container.style.display = "None";
    } else {
        g_caesar_key_container.style.display = "None";
    }
}


function exec_encode() {
    hide_according_to_mode();

    let outp = "";
    let key = 0;
    switch (g_mode_select.value) {
        case "caesar":
            if (g_caesar_key.value)
                key = parseInt(g_caesar_key.value);
            outp = encrypt_caesar(g_input_element.value, key);
            break;
        case "vigenere":
        default:
            outp = "not yet implemented";
    }
    g_output_element.textContent = outp;
    return;
}

