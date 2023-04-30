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

    if (mode === "caesar") {
        g_vigenere_key_container.style.display = "None";
        g_caesar_key_container.style.display = "inline-block";
    } else {
        g_caesar_key_container.style.display = "none";
        g_vigenere_key_container.style.display = "inline-block";
    }
}


function exec_encode() {
    hide_according_to_mode();

    const inp = g_input_element.value;
    // let outp = "";
    // const radix = g_radix_input.value;
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
            return "not yet implemented";
    }
    // g_output_element.textContent = outp;
    // return;
}





