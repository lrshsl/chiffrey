function exec_translate() {
    const output_element = document.getElementById("output");
    const input_element = document.getElementById("source-input");
    const input_text = input_element.value;
    // Short cirquit if there is no input
    if (input_text.length === 0) {
      output_element.textContent = "No input";
      return;
    }
  
    // Get references to the other needed elements or their content
    const selected_mode = document.getElementById("mode-select").value;
    const radix = document.getElementById("radix-input").value;
    const delimiter = document.getElementById("delimiter-input").value;
    const prefix = document.getElementById("prefix-input").value;
    const suffix = document.getElementById("suffix-input").value;
    const invert = false;
  
    // Translate according to the mode
    let output = ["No mode selected"];
    let base1 = false;
    switch (selected_mode) {
      case "ascii":
        if (invert) {
          output = ascii_to_text(input_text);
        } else {
          output = text_to_ascii(input_text);
        }
        break;
      case "1index":
        base1 = true; // no break!
      case "0index":
        output = get_indices(input_text, base1);
        break;
    }
  
    output_element.textContent =
      prefix + output.join(suffix + delimiter + prefix) + suffix;
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
  
  function get_indices(str, base1) {
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
  