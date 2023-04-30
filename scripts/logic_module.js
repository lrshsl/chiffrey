
function encrypt_caesar(msg, key) {
    // console.assert: check input

    return [...msg].map(
        (ch) => String.fromCharCode(!is_alpha(ch)? ch: ch.charCodeAt() + key)
    ).join("");
}

function encrypt_vigenere(msg, key) {
    const a = 'a'.charCodeAt();
    const z = 'z'.charCodeAt();
    const wrap = (n) => ((n - a) % (a-z)) + a;

    const base = a + 2;
    const key_digit = (i) => key[i%key.length].charCodeAt() - base;

    let outp = "";
    for (let i=0; i<msg.length; ++i) {
        outp += String.fromCharCode(wrap(msg[i].charCodeAt() + key_digit(i)));
    }
    return outp;
}


