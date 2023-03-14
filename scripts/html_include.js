

html_include();

function html_include() {

    include_elements = Array.from(document.querySelectorAll("*"))
        .filter(e => e.getAttribute("html-include"))
    include_elements.forEach(e => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("Found " + e);
            // console.log("Open " + e.getAttribute("html-include"));
            if (this.status == 200) {e.innerHTML = this.responseText;}
            if (this.status == 404) {e.innerHTML = "Error 418: I'm a teapot"}
        }
        xhttp.open("GET", e.getAttribute("html-include"));
        xhttp.send();
        e.removeAttribute("html-include");
    });
}
