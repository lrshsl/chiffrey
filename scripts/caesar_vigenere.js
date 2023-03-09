document.querySelector(".translate-btn").addEventListener("click", exec_encode);
const selected_mode = document.getElementById("cv-mode-select").value;
document.getElementById("ceasar-input");


function exec_encode() {
    console.log("sent");
    write_output("sie");
    return;
}


// Util/IO functions
function write_output(out) {
  const output_element = document.getElementsByClassName("output")[0];
  const delimiter = document.getElementById("delimiter-input").value;
  const prefix = document.getElementById("prefix-input").value;
  const suffix = document.getElementById("suffix-input").value;

  if (typeof(out) !== "string")
    out = prefix + out.join(suffix + delimiter + prefix) + suffix;
  output_element.textContent = out;
}

