
/* 
        ──────▄▀▄─────▄▀▄─────────────────────────────────
        ─────▄█░░▀▀▀▀▀░░█▄
        ─▄▄──█░░░░░░░░░░░█──▄▄  Victória Belo @ 2024
        █▄▄█─█░░▀░░┬░░▀░░█─█▄▄█ https://github.com/Victoria-Belo 
 */
const functions = require('./src/functions.js');
const send = require('./src/sendReport.js');
const loading = require('./src/loading.js');
const box = require('ascii-box').box;
const readline = require('readline');

let x = "■".repeat(60);  

async function main() {
  await welcome();
  await start(); 
}

async function start() {
  let choice = 0;  

  while (choice !== 4) {    
    try {
      menu();
      const response = await askQuestion();
      let content = "";
      let txt;
      choice = parseInt(response);    
      if (choice === 1 || choice === 2) {
        content = await functions.askURL();
        if (!functions.fileValidation(content[0].file)) {
          console.log(box("Tipo de arquivo não suportado...!", getMessageBoxConfig('red')));
        } else {
          txt = await functions.imgTotxtConverter(content[0].file);
          await (choice === 1 ? functions.createXLSX(txt) : functions.createTxt(txt));
        } 
      } else if (choice === 3) {
        about(); 
      } else if (choice === 4) {
        console.log(box("Até logo...!     ", getMessageBoxConfig('magenta')));
        return 0;
      } else {
        console.log(box("Opção inválida, tente novamente  ", getMessageBoxConfig('red')));
      }
    } catch (error) {
      const emailSubject = 'Erro no programa';
      const emailText = `Um erro ocorreu no programa:\n\n${error.stack}`;
      await send.sendEmail(emailSubject, emailText);      
      setTimeout(() => {}, 1000 * 120); 
    }
    setTimeout(() => {}, 2000); 
  } 
}

async function askQuestion() {
  return new Promise((res) =>{
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('→ Opção:', (op) => {
      const option = op;   
      res(option);
      rl.resume();
      rl.close();   
    })
  }); 
}

function getMessageBoxConfig(color) {
  return {
    border: 'double',
    color,
    maxWidth: 55,
    padding: 10
  };
}

function menu() {
  const menuContent = `
  SELECIONE
  [1] IMG → EXCEL
  [2] IMG → TEXTO
  [3] Sobre
  [4] Sair
  `;

  console.log(
    box(
      menuContent,
      {
        border: 'double',
        color: 'cyan',
        maxWidth:200,
        padding: 18
      }
    )
  );
}

async function welcome() { 
  let title = "■".repeat(18)+"  IMAGE → EXCEL SCRIPT  "+"■".repeat(18);
  console.log(x);
  console.log(x);
  console.log(title);
  console.log(x);
  console.log(x+"\n"); 
  await loading.loading("\x1b[36mIniciando\x1b[0m");
  await loading.sleep(2000);
}


function about(){
  let lineDraw = "─".repeat(50);
  let space = "   ".repeat(10);
  console.log(box(` ${lineDraw}${space}SOBRE\n ${lineDraw}\nImageExcelConverter v0.1 é um conversor de imagens para arquivos XLSX,visando facilitar cenários onde haja muito a se escrever\n\n→ Modo de usar\n  Informe a URL completa do documento\n  As planilhas serão criadas na Área de Trabalho  \n\n${lineDraw}\n                  2024 ♢ Victória Belo`,
             {
               border: 'double',
               color: 'white',
               maxWidth:80,
               padding: 10
             })
    )
}

main();

