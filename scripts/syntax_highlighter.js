const gsyn_editor = document.getElementById("syntax-highlighter_editor");
const gsyn_bg_div = document.getElementById("syntax-highlighter_bg-div");


// Input fields
const gsyn_keywords_input = document.getElementById("syntax-highlighter_keywords-collector");
const gsyn_op_input = document.getElementById("syntax-highlighter_operators-collector");
const gsyn_comment_input = document.getElementById("syntax-highlighter_comment-collector");

// Color inputs
const gsyn_normal_color_input = document.getElementById("syntax-highlighter_normal-color-input");
const gsyn_bg_color_input = document.getElementById("syntax-highlighter_bg-color-input");
const gsyn_kw_color_input = document.getElementById("syntax-highlighter_kw-color-input");
const gsyn_str_color_input = document.getElementById("syntax-highlighter_str-color-input");
const gsyn_num_color_input = document.getElementById("syntax-highlighter_num-color-input");
const gsyn_op_color_input = document.getElementById("syntax-highlighter_op-color-input");
const gsyn_comment_color_input = document.getElementById("syntax-highlighter_comment-color-input");

const make_regex_compatible = (str) => {
    return str
        // They appear in the <span> tag, so they are not allowed (not yet)
        .replace("<", "")
        .replace(">", "")
        .replace("=", "")
        .replace("'", "")
    
        // Others
        // .replace("/", "\/")
        // .replace("*", "\*")
        // .replace("+", "\+")
        // .replace("?", ".")
        // .replace("!", "\!")
        // .replace("|", "\|")
        // .replace("(", "\(")
        // .replace(")", "\)")
        // .replace("{", "\{")
        // .replace("}", "\}")
        // .replace("[", "\[")
        // .replace("]", "\]")
        // .replace("^", "\^")
        // .replace("$", "\$")
        // .replace("&", "\&")
    ;
}

const kw_regex = () => {
    const kwords = gsyn_keywords_input.value
        .split(WHITESPACE_REGEX)
        .filter(word => word.length > 0);
    return new RegExp(`\\b(${kwords.join("|")})\\b`, "g");
}
const str_regex = () => new RegExp(`("[^"]*")`, "g");
const num_regex = () => new RegExp("([0-9]+\.?[0-9]*)", "g");
const op_regex = () => {
    const inp = make_regex_compatible(gsyn_op_input.value);
    const ops = inp.split(WHITESPACE_REGEX);
    return new RegExp(`([${ops.join("|")}])`, "g");
}
const comment_regex = () => {
    const inp = make_regex_compatible(gsyn_comment_input.value);
    const values = inp.split(WHITESPACE_REGEX);
    if (values.length === 1)
        return new RegExp(`(${values[0]}.*\n\r)`);
    else if (values.length === 2)
        return new RegExp(`(${values[1]}.*${values[1]}|${values[0]}.*\n\r)`, "g");
    else if (values.length === 3)
        return new RegExp(`(${values[1]}.*${values[2]}|${values[0]}.*\n\r)`, "g");
    return /x^/; // Match nothing
}

colors = {
    normal: () => gsyn_normal_color_input.value? gsyn_normal_color_input.value : "#2e9494",
    bg: () => gsyn_bg_color_input.value? gsyn_bg_color_input.value : "#171717",
    kw: () => gsyn_kw_color_input.value? gsyn_kw_color_input.value : "#51e1e1",
    str: () => gsyn_str_color_input.value? gsyn_str_color_input.value : "#7887ab",
    num: () => gsyn_num_color_input.value? gsyn_num_color_input.value : "#162955",
    op: () => gsyn_op_color_input.value? gsyn_op_color_input.value : "yellow",
    comment: () => gsyn_comment_color_input.value? gsyn_comment_color_input.value : "#4f628e"
}

color_tag = (kind) => `<span style='background-color: ${colors.bg()}; color: ${colors[kind]()}'>$1</span>`;

function refresh() {
    // Add background color
    gsyn_bg_div.style.backgroundColor = colors.bg();

    // Add normal color
    gsyn_bg_div.style.color = colors.normal();

    // Add highlighting
    gsyn_bg_div.innerHTML = gsyn_editor.value
        // Highlight numbers
        .replace(num_regex(), color_tag("num"))
        // Highlight operators
        .replace(op_regex(), color_tag("op"))
        // Highlight comments
        .replace(comment_regex(), color_tag("comment"))
        // Highlight strings
        .replace(str_regex(), color_tag("str"))
        // Highlight keywords
        .replace(kw_regex(), color_tag("kw"))
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


// Refresh highlighting
gsyn_bg_color_input.addEventListener("input", () => refresh());
gsyn_normal_color_input.addEventListener("input", () => refresh());
gsyn_kw_color_input.addEventListener("input", () => refresh());
gsyn_str_color_input.addEventListener("input", () => refresh());
gsyn_num_color_input.addEventListener("input", () => refresh());
gsyn_op_color_input.addEventListener("input", () => refresh());
gsyn_comment_color_input.addEventListener("input", () => refresh());

gsyn_keywords_input.addEventListener("input", () => refresh());
gsyn_comment_input.addEventListener("input", () => refresh());
gsyn_op_input.addEventListener("input", () => refresh());


refresh();




