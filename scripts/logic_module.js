
function encrypt_caesar(msg, key) {
    // console.assert: check input

    return [...msg].map(
        (ch) => String.fromCharCode(!is_alpha(ch)? ch: ch.charCodeAt() + key)
    ).join("");
}

function encrypt_vigenere(msg, key) {
    const a = 'a'.charCodeAt();
    const z = 'z'.charCodeAt();

    // wraps a number between a and z
    const wrap = (n) => ((n - a) % (z - a)) + a;

    // helper function that returns the corresponding digit of the key (input is a int: 0..inp, output a int: 0-25)
    const key_digit = (i) => key[i%key.length].charCodeAt() - a;

    // encode one letter at a time with the corresponding digit of the key
    let outp = "";
    for (let i=0; i<msg.length; ++i) {
        outp += String.fromCharCode(wrap(msg[i].charCodeAt() + key_digit(i)));
    }
    return outp;
}


