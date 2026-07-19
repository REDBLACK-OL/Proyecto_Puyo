import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pptxPath = path.join(__dirname, '..', 'Sistema-Operativo-y-de-Soporte.pptx');
const zip = new AdmZip(pptxPath);

zip.getEntries().forEach(entry => {
  if (entry.entryName.endsWith('.xml') && (entry.entryName.includes('slides/') || entry.entryName.includes('slideLayouts/') || entry.entryName.includes('slideMasters/'))) {
    const content = entry.getData().toString('utf8');
    if (content.includes('8029180') || content.includes('hlinkClick') || content.includes('4844491')) {
      console.log(`\nMarca o link encontrado en: ${entry.entryName}`);
      // mostrar fragmentos con pic que tengan hlinkClick o esas coordenadas
      const pics = content.match(/<p:pic>[\s\S]*?<\/p:pic>/g);
      if (pics) {
        pics.forEach(p => {
          if (p.includes('hlinkClick') || p.includes('8029180') || p.includes('4844491')) {
            console.log('   -> Pic sospechoso:', p);
          }
        });
      }
    }
  }
});
