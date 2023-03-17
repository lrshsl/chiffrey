
function is_alpha(ch) {
  return ch.toLowerCase() != ch.toUpperCase();
}

function select_on_click(inp) {
  inp.setSelectionRange(0, inp.value.length);
}
