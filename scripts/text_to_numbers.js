
// Main execution
function exec_translate() {
    // Some variables that should get refreshed every time
    const input_element = document.getElementById("nt-source-input");
    const input_text = input_element.value.toLowerCase();

    const selected_mode = document.getElementById("nt-mode-select").value;
    const radix = parseInt(document.getElementById("radix-input").value);
    // const invert = false; // TODO


    // Short cirquit if there is no input
    if (input_text.length === 0) {
        write_output("No Input");
        return;
    }

    // Translate according to the mode
    let output = ["No mode selected"];
    let base_index = 0;
    switch (selected_mode) {
        case "ascii":
            output = text_to_ascii(input_text);
            write_output(apply_radix(output, radix));
            return;
        case "0index":
            break; /* base_index stays 0 as initialised */
        case "1index":
            base_index = 1;
        default:
            console.log(`Unknown mode: ${selected_mode}`);
    }

    // Convert to number representation (zero-, one-based indices or ascii, depending on `base_index`)
    output = [...input_text].map((ch) =>
        !is_alpha(ch) ? ch.charCodeAt() : ch.charCodeAt() - "a".charCodeAt() + base_index
    );

    // Apply radix
    output = apply_radix(output, radix);

    // Fill chars in binary mode that length is always 8
    if (radix === 2) {
        // Pad with zeros
        output = output.map((e) => "0".repeat(8 - e.length) + e);
    }

    // Write output to the page
    write_output(output);
}

// Writes `out` to the output element in the page
function write_output(out) {
    const output_element = document.getElementsByClassName("output")[0];
    const delimiter = document.getElementById("delimiter-input").value;
    const prefix = document.getElementById("prefix-input").value;
    const suffix = document.getElementById("suffix-input").value;

    // If it is an array, join it
    if (typeof out !== "string")
        out = prefix + out.join(suffix + delimiter + prefix) + suffix;
    output_element.textContent = out;
}


/// Util functions for this page ///

// Convert characters to ascii
function text_to_ascii(str) {
    return [...str].map((ch) => ch.charCodeAt());
}

// Convert ascii to characters
function ascii_to_text(ascii) {
    return ascii.map((n) => String.fromCharCode(n));
}

function text_to_indices_in_alph(str, base1) {
    const base = "a".charCodeAt() - base1;
    str = str.toLowerCase();
    return [...str].map((s) => s.charCodeAt() - base);
}

// Util function to parse a string into numbers
function parse_numbers(str, radix, delimiter, prefix, suffix) {
    res = str.split(delimiter).split(prefix).split(suffix);
    res = res.map((ch) => parseInt(ch, radix));
    return res;
}

// Apply a radix to a array of characters
function apply_radix(char_array, radix) {
    return char_array.map((ch) => {
        try {
            return ch.toString(radix);
        } catch (e) {
            console.log(`Error applying radix ${radix} to char ${ch}: ${e}`);
            return ch;
        }
    });
}


// UI function
// Sets the text to 'More' or 'Hide' and toggles the arrow
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



