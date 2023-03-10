
function exec_translate() {
  const input_element = document.getElementById("source-input");
  const input_text = input_element.value;

  const selected_mode = document.getElementById("mode-select").value;
  const radix = document.getElementById("radix-input").value;
  const invert = false;

  // Short cirquit if there is no input
  if (input_text.length === 0) {
    write_output("No Input")
    return;
  }

  // Translate according to the mode
  let output_chars = ["No mode selected"];
  let base_index = 0;
  switch (selected_mode) {
    case "ascii":
      output_chars = text_to_ascii(input_text);
      write_output(output_chars);
      return;
    case "0index":
      break;   /* base_index stays 0 as initialised */
    case "1index":
      base_index = 1;
  }
  output_chars = [...input_text].map((ch) => is_alpha(ch)? ch.charCodeAt() - 'a'.charCodeAt() + base_index: ch);

  // Write output to the page
  write_output(output_chars);

  // let base1 = false;
  // switch (selected_mode) {
  //   case "ascii":
  //     if (invert) {
  //       output = ascii_to_text(input_text);
  //     } else {
  //       output = text_to_ascii(input_text);
  //     }
  //     break;
  //   case "1index":
  //     base1 = true; // no break!
  //   case "0index":
  //     output = text_to_indices_in_alph(input_text, base1);
  //     break;
  // }
}

function is_alpha(ch) {
  return ch.toLowerCase() != ch.toUpperCase();
}

function write_output(out) {
  const output_element = document.getElementsByClassName("output")[0];
  const delimiter = document.getElementById("delimiter-input").value;
  const prefix = document.getElementById("prefix-input").value;
  const suffix = document.getElementById("suffix-input").value;

  if (typeof(out) !== "string")
    out = prefix + out.join(suffix + delimiter + prefix) + suffix;
  output_element.textContent = out;
}

function text_to_ascii(str) {
  let res = [];
  for (var i = 0; i < str.length; ++i) {
    res.push(str.charCodeAt(i));
  }
  return res;
}

function ascii_to_text(ascii) {
  res = String.fromCharCode(...ascii);
  return ascii.map((n) => String.fromCharCode(n));
}

function text_to_indices_in_alph(str, base1) {
  base = "a".charCodeAt() - base1;
  str = str.toLowerCase();
  return [...str].map((s) => s.charCodeAt() - base);
}

function parse_numbers(str, radix, delimiter, prefix, suffix) {
  res = str.split(delimiter).split(prefix).split(suffix);
  res = res.map((ch) => parseInt(ch, radix));
  return res;
}

function toggle_more_settings() {
  const label = document.getElementById("more-settings-label");
  const arrow = document.getElementById("more-settings-arrow");
  if (label.textContent === "More Settings") {
    arrow.style.transform = "rotate(90deg)";
    label.textContent = "Hide";
  } else {
    arrow.style.transform = "rotate(0deg)";
    label.textContent = "More Settings";
  }
}

function select_on_click(inp) {
  inp.setSelectionRange(0, inp.value.length);
}
  