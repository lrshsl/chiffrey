
function encrypt_caesar(msg, key) {
    // console.assert: check input

    return [...msg].map(
        (ch) => String.fromCharCode(!is_alpha(ch)? ch: ch.charCodeAt() + key)
    ).join('');
}
