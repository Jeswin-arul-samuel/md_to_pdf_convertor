const fs = require('fs');
const path = require('path');

// Simple PNG to ICO converter
// ICO format: Header + Icon Directory Entries + Icon Images

function pngToIco() {
  try {
    // Read PNG file
    const pngPath = path.join(__dirname, 'assets', 'icon.png');
    const pngBuffer = fs.readFileSync(pngPath);

    // ICO header
    // 0-1: Reserved (must be 0)
    // 2-3: Image type (1 = ICO)
    // 4-5: Number of images in file
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);      // Reserved
    header.writeUInt16LE(1, 2);      // Type: ICO
    header.writeUInt16LE(1, 4);      // Number of images

    // Icon directory entry (22 bytes)
    // 0: Width
    // 1: Height
    // 2: Number of colors
    // 3: Reserved
    // 4-5: Color planes
    // 6-7: Bits per pixel
    // 8-11: Size of image data
    // 12-15: Offset to image data

    const dirEntry = Buffer.alloc(16);
    dirEntry.writeUInt8(0, 0);              // Width: 0 means 256
    dirEntry.writeUInt8(0, 1);              // Height: 0 means 256
    dirEntry.writeUInt8(0, 2);              // Colors in palette
    dirEntry.writeUInt8(0, 3);              // Reserved
    dirEntry.writeUInt16LE(1, 4);           // Planes
    dirEntry.writeUInt16LE(32, 6);          // Bits per pixel
    dirEntry.writeUInt32LE(pngBuffer.length, 8);  // Size
    dirEntry.writeUInt32LE(22, 12);         // Offset (header + dir entry)

    // Combine header + directory + PNG data
    const icoBuffer = Buffer.concat([header, dirEntry, pngBuffer]);

    // Write ICO file
    const icoPath = path.join(__dirname, 'assets', 'icon.ico');
    fs.writeFileSync(icoPath, icoBuffer);

    console.log(`✓ Generated ICO icon: ${icoPath}`);
    console.log(`  File size: ${(icoBuffer.length / 1024).toFixed(1)} KB`);

  } catch (error) {
    console.error('Error generating ICO:', error.message);
    process.exit(1);
  }
}

pngToIco();
