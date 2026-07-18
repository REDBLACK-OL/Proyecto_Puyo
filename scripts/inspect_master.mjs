import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pptxPath = path.join(__dirname, '..', 'Sistema-Operativo-y-de-Soporte.pptx');
const zip = new AdmZip(pptxPath);

['ppt/slideMasters/slideMaster1.xml', 'ppt/slideLayouts/slideLayout1.xml', 'ppt/slideLayouts/slideLayout2.xml'].forEach(name => {
  const entry = zip.getEntry(name);
  if (entry) {
    console.log(`\n=================== ${name} ===================`);
    const content = entry.getData().toString('utf8');
    console.log(content);
  }
});
