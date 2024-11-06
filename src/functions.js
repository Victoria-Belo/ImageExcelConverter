
/* 
        ──────▄▀▄─────▄▀▄─────────────────────────────────
        ─────▄█░░▀▀▀▀▀░░█▄
        ─▄▄──█░░░░░░░░░░░█──▄▄  Victória Belo @ 2024
        █▄▄█─█░░▀░░┬░░▀░░█─█▄▄█ https://github.com/Victoria-Belo 
 */
const tesseract = require('tesseract.js');
const exceljs = require('exceljs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const loading = require('./loading.js')
const fs = require('fs');

async function askURL(){  
  return new Promise((res)=>
    {
      const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout   
    });
      rl.question('\n→ Local: ', (pathFile) => {
      const content = [{ file: pathFile}];   
      res(content);
      rl.resume();
      rl.close();     
    });
  });
}

// valida tipo
function fileValidation(type){  
  const ext = ['.jpg', '.jpeg', '.png'];
  return ext.some(element => type.endsWith(element)); 
}

// Tesseract. Processa imagem, reconhece texto e o transforma em dados
async function imgTotxtConverter(url) {   
    const worker = await tesseract.createWorker("por");  
    const { data: { text } } = await worker.recognize(url);
    await worker.terminate();
    await loading.loading("\x1b[36mProcessando imagem\x1b[0m");
    await loading.sleep(100);
    return [text];
}

async function createTxt(text) {
  try{    
    const dateHour = new Date();
    const fileName = dateHour.toISOString().split(/[-T:.Z]/).join('');
    
    const desktopPath = path.join(os.homedir(), 'Desktop');
    const filePath = path.join(desktopPath, `${fileName}_output.txt`);    
 
    fs.writeFileSync(filePath, String(text), 'utf8');
    await loading.loading("\x1b[36mGerando arquivo de texto\x1b[0m");
    loading.sleep(900);
    console.log(`\x1b[35m→ Arquivo de texto gerado com sucesso em\x1b[36m ${filePath} \n`);
    loading.sleep(200);
  }catch(error){    
    console.error('\x1b[31m→ Desculpe, algo deu errado! Se o problema persistir informe  < vickbelo17@gmail.com >\x1b[0m', error);
  }    
}

// Cria XLSX
async function createXLSX(text) {
  try{    
    const dateHour = new Date();
    const fileName = dateHour.toISOString().split(/[-T:.Z]/).join('');
    
    const desktopPath = path.join(os.homedir(), 'Desktop');
    const filePath = path.join(desktopPath, `${fileName}_output.xlsx`);
   
    const excelInstance = new exceljs.Workbook();
    const worksheet = excelInstance.addWorksheet('Sheet 1');    
   
    text.forEach((line, index) => {      
      const lines = line.split('\n');
      worksheet.addRow(["ID", "CONTEUDO"]);
      lines.forEach((line, i) => {
        worksheet.addRow([i+1, line]); 
      });
    });
   
    await excelInstance.xlsx.writeFile(filePath);
    await loading.loading("\x1b[36mGerando arquivo XLSX\x1b[0m");
    loading.sleep(900);
    console.log(`\x1b[35m→ Arquivo XLSX gerado com sucesso em\x1b[36m ${filePath} \n`);
    loading.sleep(200);
  }catch(error){    
    console.error('\x1b[31m→ Desculpe, algo deu errado! Se o problema persistir informe  < vickbelo17@gmail.com >\x1b[0m', error);
  }    
}

module.exports = {askURL, fileValidation, imgTotxtConverter, createTxt, createXLSX}
