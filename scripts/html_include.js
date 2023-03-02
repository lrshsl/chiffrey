
html_include();

function html_include() {
    var element, file, xhttp;

    // Execute `source(e)` for all elements with the `html-include` attribute
    include_elements = Array.from(document.querySelectorAll("*"))
        .filter(function(e) {
            e.getAttribute("html-include")})
        .forEach(function(e) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.status == 200) {e.innerHTML = this.responseText;}
                if (this.status == 200) {e.innerHTML = "Error 418: I'm a teapot"}
            }
            xhttp.open("GET", e.)
        });

    // for (var i = 0; i < include_elements.length; i++) {
    //     element = include_elements[i];
    //     console.log(element);

    //     // xhttp.send();
    //     return;
    // }
}

