
// const gsyn_text_input = document.getElementById("syntax-highlighter_text-input");
// const gsyn_highlighting_div = document.getElementById("syntax-highlighter_highlighting-div");
// const keywords = ["function", "let", "if", "else", "while", "for", "switch", "case", "break", "default", "return", "const", "var"];


// // Position the text input
// gsyn_text_input.style.position = "absolute";

// // Position the highlighting div
// gsyn_highlighting_div.style.position = "absolute";
// gsyn_highlighting_div.style.marginLeft = gsyn_text_input.style.marginLeft;
// gsyn_highlighting_div.style.marginRight = gsyn_text_input.style.marginRight;
// gsyn_highlighting_div.style.width = gsyn_text_input.style.width;
// gsyn_highlighting_div.style.height = gsyn_text_input.style.height;

// gsyn_highlighting_div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

// gsyn_text_input.addEventListener("input", () => {
//     const start = gsyn_text_input.selectionStart;
//     let highlighted_text = highlightKeywords(gsyn_text_input.value, keywords);
//     highlighted_text = textarea.value.replace(/\n/g, "<br>");
//     gsyn_highlighting_div.innerHTML = highlighted_text;
//     const end = start + highlighted_text.length - gsyn_text_input.value.length;
//     gsyn_text_input.setSelectionRange(start, end);
// });

// function highlightKeywords(text, keywords) {
//   const kw_regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
//   return text.replace(kw_regex, '<span class="highlight_kw">$1</span>');
// }


const gsyn_editor = document.getElementById("syntax-highlighter_editor");
const gsyn_bg_div = document.getElementById("syntax-highlighter_bg-div");

const keywords = ["function", "let", "if", "else", "while", "for", "switch", "case", "break", "default", "return", "const", "var"];


gsyn_editor.addEventListener("input", () => {
    let output = gsyn_editor.value;
    output = insert_newlines(output);
    output = highlight_keywords(output, keywords);
    output = highlight_literals(output);
    gsyn_bg_div.innerHTML = output;
})

function insert_newlines(text) {
    return text.replace(/\n/g, "<br>");
}

function highlight_keywords(text, keywords) {
    const kw_regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
    return text.replace(kw_regex, '<span class="highlight_kw">$1</span>');
}

function highlight_literals(text) {
    text = text.replace(/\\b(true|false|null)\\b/g, '<span class="highlight_literal">$1</span>');
    const string_regex = /"([^"]*)"/g;
    return text.replace(string_regex, '<span class="highlight_string">$1</span>');
}













