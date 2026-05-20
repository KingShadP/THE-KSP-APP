const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const files = fs.readdirSync(rootDir);
const pngFiles = files.filter(f => f.endsWith('.png'));

const images = [];

// To make filenames web-friendly
pngFiles.forEach((file, index) => {
  const ext = path.extname(file);
  const newName = `gallery-${index}${ext}`;
  fs.renameSync(path.join(rootDir, file), path.join(publicDir, newName));
  images.push(`/${newName}`);
});

console.log(JSON.stringify(images, null, 2));
