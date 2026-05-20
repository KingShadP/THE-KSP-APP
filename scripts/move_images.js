const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const files = fs.readdirSync(rootDir);
const pngFiles = files.filter(f => f.endsWith('.png'));

let startIndex = 17;
pngFiles.forEach(file => {
  const newName = `gallery-${startIndex}.png`;
  fs.renameSync(path.join(rootDir, file), path.join(publicDir, newName));
  console.log(`Moved ${file} to ${newName}`);
  startIndex++;
});
