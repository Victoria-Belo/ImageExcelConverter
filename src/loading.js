
/* 
        ──────▄▀▄─────▄▀▄─────────────────────────────────
        ─────▄█░░▀▀▀▀▀░░█▄
        ─▄▄──█░░░░░░░░░░░█──▄▄  Victória Belo @ 2024
        █▄▄█─█░░▀░░┬░░▀░░█─█▄▄█ https://github.com/Victoria-Belo 
 */
const box = require('ascii-box').box;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function loading(status) {
    let load = ["[▒▒▒▒▒▒▒▒▒▒] ", "", "[\x1b[36m█\x1b[0m▒▒▒▒▒▒▒▒▒] ", "", "[\x1b[36m███\x1b[0m▒▒▒▒▒▒▒] ", "", "[\x1b[36m█████\x1b[0m▒▒▒▒▒] ", "", "[\x1b[36m███████\x1b[0m▒▒▒] ", "", "[\x1b[36m██████████\x1b[0m] "];  
    for (let i = 0; i < 12; i++) {
      if (i % 2 === 0) {
        process.stdout.write(`${status}... ${i * 10}% ${load[i]} \r`);
        await sleep(100); 
      }
    }
    console.log("\n"); 
}

module.exports = {loading, sleep}
