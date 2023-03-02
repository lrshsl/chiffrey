const g_selected_mode = document.getElementById("mode-select").value;
const g_caesar_key_container = document.getElementById("caesar-key-container");
const g_vigenere_key_container = document.getElementById("vigenere-key-container");

// Show only one key input
hide_according_to_mode();

function hide_according_to_mode(mode) {
    if (mode == null) {
        const mode = g_selected_mode;
    }
    console.log(mode)

    if (mode == "caesar") {
        g_vigenere_key_container.style.display = "None";
    } else {
        g_caesar_key_container.style.display = "None";
    }
}

function exec_encode() {
    hide_according_to_mode();
    return;
}