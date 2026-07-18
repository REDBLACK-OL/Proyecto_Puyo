import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pptxPath = path.join(__dirname, '..', 'Sistema-Operativo-y-de-Soporte.pptx');
const zip = new AdmZip(pptxPath);
const zipEntries = zip.getEntries();

console.log('--- INSPECCIONANDO TEXTOS, ENLACES E IMÁGENES REPETIDAS ---');

// Revisar rels para ver enlaces externos o rels a imágenes
zipEntries.forEach(entry => {
  if (entry.entryName.includes('rels') && entry.entryName.endsWith('.rels')) {
    const content = entry.getData().toString('utf8');
    if (content.includes('http') || content.includes('Target="http')) {
      console.log(`\nLinks externos en ${entry.entryName}:`);
      console.log(content);
    }
  }
});

// Revisar todos los textos de slideMaster1.xml y slideMasters
zipEntries.forEach(entry => {
  if (entry.entryName.includes('slideMasters/') && entry.entryName.endsWith('.xml')) {
    console.log(`\n--- Contenido de ${entry.entryName} ---`);
    const content = entry.getData().toString('utf8');
    // Extraer etiquetas de texto <a:t>
    const texts = content.match(/<a:t>[^<]*<\/a:t>/g);
    if (texts) console.log('Textos en SlideMaster:', texts);
  }
});

// Revisar todos los textos y pics en slide1.xml
zipEntries.forEach(entry => {
  if (entry.entryName === 'ppt/slides/slide1.xml' || entry.entryName === 'ppt/slides/slide2.xml') {
    console.log(`\n--- Textos en ${entry.entryName} ---`);
    const content = entry.getData().toString('utf8');
    const texts = content.match(/<a:t>[^<]*<\/a:t>/g);
    if (texts) {
      texts.forEach(t => console.log('   ', t));
    }
    // Revisar cNvPr (nombres de las formas e imágenes)
    const shapeNames = content.match(/<p:cNvPr[^>]*>/g);
    if (shapeNames) {
      console.log('Formas en el slide:', shapeNames);
    }
  }
});
