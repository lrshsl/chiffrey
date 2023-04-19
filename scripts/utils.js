
function is_alpha(ch) {
  return ch.toLowerCase() != ch.toUpperCase();
}

function select_content(inp) {
  inp.setSelectionRange(0, inp.value.length);
}
