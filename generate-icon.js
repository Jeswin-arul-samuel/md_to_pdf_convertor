const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateIcon() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Read the SVG file
    const svgPath = path.join(__dirname, 'assets', 'icon.svg');
    const svgContent = fs.readFileSync(svgPath, 'utf-8');

    // Create HTML that renders the SVG
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: transparent; }
          svg { display: block; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
      </html>
    `;

    // Set viewport and render
    await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });
    await page.setContent(html);

    // Take screenshot
    const outputPath = path.join(__dirname, 'assets', 'icon.png');
    await page.screenshot({
      path: outputPath,
      type: 'png',
      omitBackground: true
    });

    console.log(`✓ Generated 512x512 PNG icon: ${outputPath}`);

    // Generate 256x256 icon for smaller uses
    await page.setViewport({ width: 256, height: 256, deviceScaleFactor: 1 });
    const smallPath = path.join(__dirname, 'assets', 'icon-256.png');
    await page.screenshot({
      path: smallPath,
      type: 'png',
      omitBackground: true
    });

    console.log(`✓ Generated 256x256 PNG icon: ${smallPath}`);

    // Generate 128x128 for taskbar
    await page.setViewport({ width: 128, height: 128, deviceScaleFactor: 1 });
    const tinyPath = path.join(__dirname, 'assets', 'icon-128.png');
    await page.screenshot({
      path: tinyPath,
      type: 'png',
      omitBackground: true
    });

    console.log(`✓ Generated 128x128 PNG icon: ${tinyPath}`);

    await browser.close();
    console.log('\n✓ Icon generation complete!');

  } catch (error) {
    console.error('Error generating icon:', error.message);
    if (browser) await browser.close();
    process.exit(1);
  }
}

generateIcon();
