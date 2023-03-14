const selected_mode = document.querySelector("#cv-mode-select").value;
document.getElementById("cv-source-input");


function exec_encode() {
    console.log("sent");
    write_output("sie");
    return;
}


// Util/IO functions
function write_output(out) {
    const output_element = document.getElementsByClassName("cv-output");
    output_element.textContent = out;
}

