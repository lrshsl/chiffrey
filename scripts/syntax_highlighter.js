const gsyn_editor = document.getElementById("syntax-highlighter_editor");
const gsyn_bg_div = document.getElementById("syntax-highlighter_bg-div");
const gsyn_keywords_input = document.getElementById("syntax-highlighter_keywords-input");
const gsyn_literals_input = document.getElementById("syntax-highlighter_literals-input");
const gsyn_tab_width_input = document.getElementById("syntax-highlighter_tab-width-input");

const STR_REPLACE = `<span class="highlight_str">$1</span>`;
const NUM_REPLACE = `<span class="highlight_num">$1</span>`;

function tab_width() {
    return gsyn_tab_width_input.value;
}

function keywords() {
    return gsyn_keywords_input.value
        .split(WHITESPACE_REGEX);
        // .filter(word => word.length > 0);
}


function refresh() {
    const kw_regex = new RegExp(`\\b(${keywords().join("|")})\\b`, "g");
    const str_regex = /("[^"]*")/g;
    const num_regex = /([0-9]+)/g;
    gsyn_bg_div.innerHTML = gsyn_editor.value
        // Fix newlines, tabs, and spaces
        .replace(/[\n\r]/g, "<br>")
        .replace(/\t/g, " ")
        .replace(/ /g, "&nbsp;")
        // Highlight literals
        .replace(str_regex, STR_REPLACE)
        .replace(num_regex, NUM_REPLACE);
        // Highlight keywords
        // .replace(kw_regex, `<span class="highlight_kw">$1</span>`);
    // console.log(gsyn_editor.value);
    // console.log(gsyn_bg_div.innerHTML);
}

// Prevent tab key from changing the focus
gsyn_editor.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab')
          return;
    e.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value = `${this.value.substring(0, start)}\t${this.value.substring(end)}`;

    // put caret at right position again
    this.selectionStart = start + 1;
    this.selectionEnd = end + 1;
});

// Refresh on new input
// gsyn_keywords_input.addEventListener("input", () => refresh());
gsyn_editor.addEventListener("input", () => refresh());











