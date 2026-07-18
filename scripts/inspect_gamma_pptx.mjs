import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pptxPath = path.join(__dirname, '..', 'Sistema-Operativo-y-de-Soporte.pptx');

if (!fs.existsSync(pptxPath)) {
  console.error('No se encontró el archivo Sistema-Operativo-y-de-Soporte.pptx');
  process.exit(1);
}

const zip = new AdmZip(pptxPath);
const zipEntries = zip.getEntries();

console.log('--- BUSCANDO REFERENCIAS A GAMMA O MARCAS DE AGUA EN EL PPTX ---');

let foundCount = 0;

zipEntries.forEach(entry => {
  if (entry.entryName.endsWith('.xml') && (entry.entryName.includes('slides/') || entry.entryName.includes('slideMasters/') || entry.entryName.includes('slideLayouts/'))) {
    const content = entry.getData().toString('utf8');
    if (content.toLowerCase().includes('gamma') || content.toLowerCase().includes('made with') || content.toLowerCase().includes('hecho con')) {
      foundCount++;
      console.log(`\nEncontrado en: ${entry.entryName}`);
      // Extraer fragmentos donde aparece
      const lines = content.split('><');
      lines.forEach(line => {
        if (line.toLowerCase().includes('gamma') || line.toLowerCase().includes('made with') || line.toLowerCase().includes('hecho con')) {
          console.log(`   Fragmento: <${line.slice(0, 300)}>`);
        }
      });
    }
  }
});

if (foundCount === 0) {
  console.log('\nNo se encontraron palabras "gamma", "made with" ni "hecho con" explícitas. Listando nombres de imágenes o archivos en ppt/media...');
  zipEntries.forEach(entry => {
    if (entry.entryName.includes('media/') || entry.entryName.includes('drawings/')) {
      console.log('   Media/Drawing entry:', entry.entryName);
    }
  });
}
