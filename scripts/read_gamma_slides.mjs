import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pptxPath = path.join(__dirname, '..', 'Sistema-Operativo-y-de-Soporte (2)-no-watermark.pptx');
const zip = new AdmZip(pptxPath);

const entries = zip.getEntries();
const slideEntries = entries
  .filter(e => e.entryName.startsWith('ppt/slides/slide') && e.entryName.endsWith('.xml'))
  .sort((a, b) => {
    const numA = parseInt(a.entryName.match(/\d+/)[0], 10);
    const numB = parseInt(b.entryName.match(/\d+/)[0], 10);
    return numA - numB;
  });

slideEntries.forEach(entry => {
  console.log(`\n=================== ${entry.entryName} ===================`);
  const content = entry.getData().toString('utf8');
  const texts = content.match(/<a:t>[^<]*<\/a:t>/g);
  if (texts) {
    texts.forEach(t => {
      const clean = t.replace(/<\/?a:t>/g, '');
      if (clean.trim()) console.log(`   - "${clean}"`);
    });
  }
});
