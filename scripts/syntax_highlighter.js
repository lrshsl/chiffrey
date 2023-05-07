const gsyn_editor = document.getElementById("syntax-highlighter_editor");
const gsyn_bg_div = document.getElementById("syntax-highlighter_bg-div");
const gsyn_keywords_input = document.getElementById("syntax-highlighter_keywords-input");
const gsyn_literals_input = document.getElementById("syntax-highlighter_literals-input");
const gsyn_tab_width_input = document.getElementById("syntax-highlighter_tab-width-input");
const gsyn_regex_table = document.getElementById("syntax-highlighter_table");

const table = document.getElementById(
    "syntax-highlighter_specifications-table"
);

// Data for the initial table
const TITLES = ["GroupName", "Color", "Keyword", "Regex"];
const groups = [
    {
        name: "Keywords",
        color: "#338899",
        collectors: ["fn", "main", "return", "let"],
        regexes: []
    }, {
        name: "Strings",
        color: "#ff2211",
        collectors: [],
        regexes: [`"[^"]*"`]
    }, {
        name: "Numbers",
        color: "#2244ff",
        collectors: [],
        regexes: ["[0-9]+.?[0-9]*"]
    }
];



const STR_REPLACE = '<span class="highlight_str">$1</span>';
const NUM_REPLACE = '<span class="highlight_num">$1</span>';


function tab_width() {
    return gsyn_tab_width_input.value;
}

// function keywords() {
// return gsyn_keywords_input.value
//     .split(WHITESPACE_REGEX)
//     .filter(word => word.length > 0);
// }


function refresh() {
    // const kw_regex = new RegExp(`\\b(${keywords().join("|")})\\b`, "g");
    // const str_regex = /("[^"]*")/g;
    // const num_regex = /([0-9]+\.?[0-9]*)/g;
    // gsyn_bg_div.innerHTML = gsyn_editor.value
    //     // Fix newlines, tabs, and spaces
    //     // .replace(/[\n\r]/g, "\n")
    //     // .replace(/\t/g, " ")
    //     // .replace(/ /g, " ")
    //     // Highlight literals
    //     .replace(str_regex, STR_REPLACE)
    //     .replace(num_regex, NUM_REPLACE)
    //     // Highlight keywords
    //     .replace(kw_regex, `<span class="highlight_kw">$1</span>`);
    let text = gsyn_editor.value;
    const start_marker = "isentrwyesirntisnwyscfwnrirastirsen";
    const end_marker = "sywrerienrncesntrvwnqqsirncenriaoamz";
    const separator = "rorirnsewrmazmqzawwrzarp";
    let i = 0; // debug
    for (const group of groups) {
        let regex_content = "";
        // If neither a regex nor a collector is set, skip
        if (!group.regexes.length && !group.collectors.length)
            continue;
        // If both are set, combine them in one regex
        if (group.regexes.length && group.collectors.length)
            regex_content = `(${group.regexes.join("|")}|\\b${group.collectors.join("|")}\\b)`;
        // If only one is set, use only that (else it would match to '')
        else if (!group.regexes.length)
            regex_content = `\\b(${group.collectors.join("|")})\\b`;
        else if (!group.collectors.length)
            regex_content = `(${group.regexes.join("|")})`;

        // Build regex, so that nothing between the start and end markers is matched
        const regex = new RegExp(`[^${start_marker}][${regex_content}|#[0-9a-f]{6}]${separator}[${regex_content}|.*][^${end_marker}]`, "g");

        // Insert a some markers, that it won't get replaced by another group
        const marker = `${start_marker}${group.color}${separator}$1${end_marker}`

        // Replace with the right regex
        text = text
            .replace(
                regex, marker
            );
        console.log(`iteration ${i}: ${text}`);
        i++;
    }
    gsyn_bg_div.innerHTML = text
        .replace(new RegExp(`${start_marker}\(#[0-9a-f]{6}\)${separator}\(.*\)${end_marker}`, "g"), 
        `<span style="color: $1">$2</span>`);
}

// Prevent tab key from changing the focus
gsyn_editor.addEventListener("keydown", function(e) {
    if (e.key !== "Tab")
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




//------- Table --------//


refresh_table(); // Defined at the buttom of the page

// This produces a table with a vertical and horizontal header column, the vertical ones are:
// GroupName   |   Color   |  Keyword  |  Regex
// You can add new columns (groups) to the right, with all the options prefilled
// with a '+'-click, and several regex inputs with anothe '+'.
// In every field of type "Group Name" there is a single-line text input,
// in "Color" a color select, in "Collector" a textarea and in "Regex" again a single-line text input



// Helps to create elements less verbosely
function new_el(type, attrs, text) {
    //
    const el = document.createElement(type);
    if (text) el.textContent = text;
    if (attrs)
        for (const [attr, val] of Object.entries(attrs))
            el.setAttribute(attr, val);
    return el;
}

function new_td(type, attrs) {
    const td = document.createElement("td");
    td.appendChild(new_el(type, attrs));
    return td;
}

// Creates the table from the data and displays it
function build_table() {
    /// Add header row ///
    const header_row = document.createElement("tr");
    for (const title of TITLES) {
        header_row.appendChild(new_el("th", {}, title));
    }
    table.appendChild(header_row);

    /// Add defined rows ///
    for (const group_data of groups) {
        table.appendChild(new_group(group_data));
    }

    /// Add Plus row ///
    const plus_row = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = "+";
    td.setAttribute("colspan", "4");
    td.style.textAlign = "center";
    td.addEventListener("click", () => add_group());
    plus_row.appendChild(td);
    table.appendChild(plus_row);
}


function new_group(group_data) {
    // Create Row
    const row = new_el("tr", { id: group_data.name });

    // Append GroupName field
    row.appendChild(
        new_td("input", {
            type: "text",
            value: group_data.name
        })
    );

    // Append ColorSelect Field
    row.appendChild(
        new_td("input", {
            type: "color",
            value: group_data.color
        })
    );

    // Append Collectors
    row.appendChild(
        new_td("textarea", {
            value: group_data.collectors.join(" ")
        })
    );

    // Append Regexes
    const td = new_el("td");
    for (const regex of group_data.regexes) {
        td.appendChild(
            new_el("input", {
                type: "text",
                value: regex
            })
        );
    }

    // Add Plus button to regexes
    td.appendChild(
        new_el(
            "button", {
                onclick: "add_regex(this.parentElement)",
                style: "display:block"
            },
            "+"
        )
    );
    row.appendChild(td);

    return row;
}

// Adds a new regex input to the group of `td`
function add_regex(td) {
    // Get group
    const group = groups.find((group) => group.name === td.parentElement.id);
    // Insert regex
    group.regexes.push("");
    // Show changes
    refresh_table();
}

// Adds a new group as the second last row
function add_group() {
    // Insert a group
    groups.splice(groups.length, 0, {
        name: "",
        color: "#ffffff",
        collectors: [],
        regexes: []
    });
    // Show changes
    refresh_table();
}

// Delete the whole table
function clear_table() {
    while (table.firstChild) table.removeChild(table.firstChild);
}

// Refresh the table
function refresh_table() {
    clear_table();
    build_table();
}


// Read from the table
document.querySelectorAll("table td").forEach((el) => {
    let row;
    if (el.tagName === "TR")
        row = el;
    else if (el.parentElement.tagName === "TR")
        row = el.parentElement;
    else if (el.parentElement.parentElement.tagName === "TR")
        row = el.parentElement.parentElement;
    else return;
    el.addEventListener("input", () => read_from_table(row));
})

function read_from_table(row) {
    // Get the group
    const group_name = row.id;
    const group_data = groups.find(
        (group) => group.name === group_name
    );
    if (!group_data) {
        console.error(`Group ${group_name} not found`);
        return;
    } 
    console.log(group_data);
    if (group_name)
        group_data.name = group_name;
    const color = row.children[1].value;
    if (color) group_data.color = color;
    group_data.collectors = row
        .children[2]
        .children[0]
        .value
        .split(WHITESPACE_REGEX)
        .filter((el) => el.trim() !== "");
    regex_elements = row.children[3]
        .querySelectorAll("input")
        .entries();
    for (const regex of regex_elements) {
        console.log(regex);
        if (regex.value)
            group_data.regexes.push(regex.value);
    }
    console.log("processed");
    console.log(group_data);
}
