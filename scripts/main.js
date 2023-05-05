const WHITESPACE_REGEX = /[ \n\r\t]+/;


const g_color_scheme = "light";
const root = document.querySelector(":root");
const dark_mode_button = document.querySelector("#dark-mode-toggle");
dark_mode_button.addEventListener("click", toggle_dark_mode);

function toggle_dark_mode() {
    switch (dark_mode_button.textContent) {
        case "Switch to dark mode":
            dark_mode_button.textContent = "Switch to light mode";
            activate_colorscheme("dark");
            break;
        case "Switch to light mode":
            dark_mode_button.textContent = "Switch to dark mode";
            activate_colorscheme("light");
            break;
        default:
            dark_mode_button.textContent = "Something went wrong";
    }
}

function activate_colorscheme(colorscheme) {
    if (colorscheme === "light") {
        root.style.setProperty("--bg-darkness0", "#fff");
        root.style.setProperty("--bg-darkness1", "#999");
        root.style.setProperty("--bg-darkness2", "#bbb");
        root.style.setProperty("--bg-darkness3", "#fff");
        root.style.setProperty("--fg-normal", "#000");

    } else if (colorscheme === "dark") {
        root.style.setProperty("--bg-darkness0", "#000");
        root.style.setProperty("--bg-darkness1", "#202020");
        root.style.setProperty("--bg-darkness2", "#282828");
        root.style.setProperty("--bg-darkness3", "#333");
        root.style.setProperty("--fg-normal", "#fff");
    } else {
        console.error("main.js > activate_colorscheme: Undefined: ${colorscheme}");
    }
}

