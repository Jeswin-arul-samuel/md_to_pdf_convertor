# MD to PDF Converter

A beautiful desktop application to convert Markdown files to PDF with live preview and customizable styling.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux-lightgrey)
![License](https://img.shields.io/badge/license-ISC-green)

## Features

- **Live Preview** - See your PDF in real-time as you adjust settings
- **Multiple File Support** - Add and convert multiple markdown files at once
- **Drag & Drop** - Drop markdown files directly into the app
- **Custom Styling** - Adjust fonts, colors, margins, and more without CSS knowledge
- **Custom CSS** - Use your own CSS file for complete control
- **Batch Conversion** - Save all files to a folder with one click
- **Beautiful UI** - Modern, dark-themed interface
- **Zero Dependencies** - No need to install Pandoc, LaTeX, or other tools
- **Cross-platform** - Works on Windows and Linux

## Download

### Windows

| Package | Description | Download |
|---------|-------------|----------|
| **Setup Installer** | Full installer with Start Menu shortcuts | `MD to PDF Converter Setup 1.0.0.exe` |
| **Portable** | No installation required, run directly | `MD to PDF Converter-Portable-1.0.0.exe` |

### Linux

| Package | Description | Download |
|---------|-------------|----------|
| **Debian/Ubuntu (.deb)** | For Debian-based distributions | `md_to_pdf_1.0.0_amd64.deb` |
| **AppImage** | Universal Linux package | `MD to PDF Converter-1.0.0.AppImage` |

---

## Installation

### Windows

#### Option 1: Setup Installer (Recommended)
1. Download `MD to PDF Converter Setup 1.0.0.exe`
2. Double-click to run the installer
3. Follow the installation wizard
4. Choose installation directory (optional)
5. Click "Install"
6. Launch from Start Menu or Desktop shortcut

#### Option 2: Portable Version
1. Download `MD to PDF Converter-Portable-1.0.0.exe`
2. Move it to your preferred location
3. Double-click to run - no installation needed!

#### Uninstall (Windows)
- Go to **Settings** → **Apps** → **Apps & features**
- Find "MD to PDF Converter"
- Click **Uninstall**

---

### Linux

#### Option 1: Debian/Ubuntu (.deb)
```bash
# Install the package
sudo dpkg -i md_to_pdf_1.0.0_amd64.deb

# If there are dependency issues, run:
sudo apt-get install -f
```

**Launch:** Search for "MD to PDF Converter" in your application menu, or run:
```bash
md-to-pdf
```

**Uninstall:**
```bash
sudo dpkg -r md_to_pdf
```

#### Option 2: AppImage (Any Linux Distribution)
```bash
# Make it executable
chmod +x "MD to PDF Converter-1.0.0.AppImage"

# Run it
./"MD to PDF Converter-1.0.0.AppImage"
```

**Note:** If you get a FUSE error, install libfuse2:
```bash
sudo apt-get install libfuse2
```

**Optional:** Move to a permanent location:
```bash
mkdir -p ~/.local/bin
mv "MD to PDF Converter-1.0.0.AppImage" ~/.local/bin/md-to-pdf
chmod +x ~/.local/bin/md-to-pdf
```

---

## Usage Guide

### Adding Files

1. **Click "Add Files"** - Opens file browser to select .md files
2. **Drag & Drop** - Drop markdown files anywhere on the sidebar
3. **Multiple Selection** - Select multiple files at once (Ctrl+Click or Shift+Click)

> **Note:** Only `.md` and `.markdown` files are accepted.

### Live Preview

The preview panel shows your document in real-time:
- Preview appears automatically when you add a file
- Click on any file in the list to preview it
- Changes to styling update the preview instantly

### Styling Options

Customize your PDF without writing CSS:

#### Typography
| Option | Values |
|--------|--------|
| Font Family | Serif, Sans-serif, Monospace |
| Font Size | Small (10pt), Medium (12pt), Large (14pt), Extra Large (16pt) |
| Line Height | Compact (1.4), Normal (1.6), Relaxed (1.8), Double (2.0) |
| Heading Font | Sans-serif, Serif, Same as body |

#### Layout
| Option | Values |
|--------|--------|
| Page Margins | Narrow (0.5in), Normal (1in), Wide (1.5in) |
| Content Width | Narrow (600px), Medium (800px), Wide (1000px), Full |
| Paragraph Spacing | Compact (8px), Normal (16px), Relaxed (24px) |

#### Colors
| Option | Default |
|--------|---------|
| Text Color | #333333 |
| Background | #ffffff |
| Headings | #1a1a1a |
| Links | #0066cc |
| Code Background | #f5f5f5 |
| Code Text | #c7254e |

### Custom CSS File

For complete control over styling:
1. Check **"Custom CSS File"**
2. Click **Browse** to select your CSS file
3. Your CSS will override the built-in style options

### Converting to PDF

#### Single File
1. Add a file
2. Adjust styling as needed
3. Click **"Convert All to PDF"**
4. Choose save location
5. Done! A confirmation shows where the file was saved.

#### Multiple Files
1. Add multiple files
2. Click **"Convert All to PDF"**
3. Choose save mode:
   - **Save One by One** - Choose location for each file individually
   - **Save All to Folder** - Select a folder and all PDFs are saved there
4. A confirmation shows where files were saved

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Add Files | Click button or drag & drop |
| Remove File | Click "Remove" on file item |
| Clear All | Click "Clear All" button |

---

## Troubleshooting

### Windows

**"Windows protected your PC" warning:**
- Click "More info"
- Click "Run anyway"
- This appears because the app isn't code-signed with a paid certificate

**App won't start:**
- Make sure you have Windows 10 or later
- Try running as Administrator

### Linux

**AppImage won't run:**
```bash
# Install FUSE
sudo apt-get install libfuse2

# Make sure it's executable
chmod +x "MD to PDF Converter-1.0.0.AppImage"
```

**PDF generation fails:**
```bash
# Install Chrome/Chromium dependencies
sudo apt-get install -y libnss3 libatk-bridge2.0-0 libx11-xcb1 libxcb-dri3-0 libdrm2 libgbm1 libasound2
```

**Sandbox errors:**
The app runs with sandbox disabled by default. If you encounter issues, this is expected behavior for Electron apps with Puppeteer.

---

## Building from Source

### Prerequisites
- Node.js 18 or later
- npm

### Development
```bash
# Clone the repository
git clone https://github.com/jeswin/md-to-pdf-converter.git
cd md-to-pdf-converter

# Install dependencies
npm install

# Run in development mode
npm start
```

### Build Packages
```bash
# Build for Linux (AppImage + deb)
npm run build:linux

# Build for Windows (Installer + Portable)
npm run build:win

# Build for all platforms
npm run build:all
```

Output files will be in the `dist/` folder.

---

## Technologies Used

- **Electron** - Desktop application framework
- **Marked** - Markdown to HTML parser
- **Puppeteer** - Headless Chrome for PDF generation
- **electron-builder** - Application packaging

---

## License

ISC License - See [LICENSE](LICENSE) for details.

---

## Author

**Jeswin**
Email: jeswin.arul.samuel@gmail.com

---

## Support

If you encounter any issues or have feature requests, please open an issue on GitHub.
