const gtana_search_word_field = document.getElementById("text-analyser_search-input");
const gtana_text_input = document.getElementById("text-analyser_text-input");
const gtana_occurrences_output = document.getElementById("text-analyser_occurrences-output");
const gtana_analysis_output_id = "text-analyser_analysis-output";

const gtana_whole_words_input = document.getElementById("text-analyser_whole-words-input");
const gtana_match_case_input = document.getElementById("text-analyser_case-sensitive-input");

// Some often used regular expressions
const SINGLE_WHITESPACE = /[ \n\r\t]/g;
const WHITESPACE_REGEX = /[ \n\r\t]+/g;


function get_search_regex(string) {
    // Returns a regular expression to search for `string` depending on settings
    const whole_words = gtana_whole_words_input.checked;
    const match_case = gtana_match_case_input.checked;
    if (whole_words)
        return new RegExp(`\\b${string}\\b`, match_case? "g": "gi");
    else
        return new RegExp(string, match_case? "g": "gi");
}

// On change of the text input, refresh everything
gtana_text_input.addEventListener("input", () => {
    refresh_search();
    show_analysis();
})

// Refresh the occurrences on change of any element related to search
gtana_search_word_field.addEventListener("input", () => refresh_search());
gtana_match_case_input.addEventListener("input", () => refresh_search());
gtana_whole_words_input.addEventListener("input", () => refresh_search());

// Refreshes all the information about the search
function refresh_search() {
    const string = gtana_search_word_field.value;
    const text = gtana_text_input.value;
    const occurrences = count_occurrences(string, text);
    show_occurrences(occurrences);
    highlight_occurrences(string);
}

// Returns how many occurrences of `string` are in `text`
function count_occurrences(string, text) {
    if (string == null || string.length === 0 || text == null || text.length === 0)
        return 0;
    return text.split(get_search_regex(string)).length - 1;
}

// Display the number of occurences
function show_occurrences(occurrences) {
    gtana_occurrences_output.textContent = occurrences;
}

// Highlight the occurrences in the text (currently NOT working)
function highlight_occurrences(string) {
    const text = gtana_text_input.value;
    if (text == null || text.length === 0
        || string == null || string.length === 0)
        return;

    // Highlight occurrences: TODO
    const regex = get_search_regex(string);
  
    let match = regex.exec(text);
    while (true) {
        if (match == null || match === -1)
            break;

        match = regex.exec(text);
    }
}

// Analyses the text and display the results
function show_analysis() {
    const text = gtana_text_input.value;
    const words = text.split(WHITESPACE_REGEX).filter(word => word.length > 0);
    const nspaces = count(SINGLE_WHITESPACE, text);
    const extremes = find_extremes(words);
    const data_rows = {
        "num-chars_with-whitespace": text.length,
        "num-bytes": byte_length(text),
        "num-chars_without-whitespace": text.length - nspaces,
        "num-spaces": nspaces,
        "num-words": words.length,
        "num-unique-words": new Set(words).size,
        "shortest-word": extremes.shortest_word,
        "longest-word": extremes.longest_word
    }
    show_table(data_rows);
}

function find_extremes(words) {
    // Find the shortest and longest words
    let shortest_word_length = Infinity;
    let longest_word_length = 0;
    let shortest_word = "";
    let longest_word = "";
    // Find the shortest and longest words and store them
    for (const word of words) {
        if (word.length < shortest_word_length) {
            shortest_word = word;
            shortest_word_length = word.length;
        }
        if (word.length > longest_word_length) {
            longest_word = word;
            longest_word_length = word.length;
        }
    };
    // In case nothing was found
    if (shortest_word_length === Infinity)
        shortest_word_length = 0;

    return {
        shortest_word: {
            text: shortest_word, length: shortest_word_length},
        longest_word: {
            text: longest_word, length: longest_word_length}
    };
}

// Some helper functions

function count(char, text) {
    return text.split(char).length - 1;
}

function byte_length(str) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    return bytes.length;
}


// Display the contents of the `data_rows` in the table
function show_table(data_rows) {

    // Loop through the rows and access the cells
    Object.entries(data_rows).forEach(([id, value]) => {
        const table_id = gtana_analysis_output_id;
        const t_row = document.querySelector(`#${table_id} #${id} td`);

        // Should never happen
        if (t_row == null) {
            console.log(`#${table_id} #${id} not found`);
            return;
        }

        // Write to the table entries
        // 
        // Special format
        if (id === "shortest-word" || id === "longest-word") {
            t_row.textContent = `${value.text}, .. [${value.length}]`;
            return;
        }
        // Default: Just display the bare value
        t_row.textContent = value;
    });
}


