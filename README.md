# MD to PDF Converter

A beautiful desktop application to convert Markdown files to PDF with live preview and customizable styling.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux-lightgrey)
![License](https://img.shields.io/badge/license-Source%20Available-orange)

## Free Trial & Purchase

**30-Day Free Trial** - Try all features with no limitations for 30 days.

After the trial, purchase a lifetime license to continue using the app:

[![Purchase License](https://img.shields.io/badge/Purchase-$12.99-purple?style=for-the-badge)](https://jeswinarulsamuel.gumroad.com/l/ojiwme)

- One-time payment - **no subscription**
- Lifetime access to all features
- Free updates included

---

## Features

### Core Features
- **Live Preview** - See your PDF in real-time as you adjust settings
- **Multiple File Support** - Add and convert multiple markdown files at once
- **Drag & Drop** - Drop markdown files directly into the app
- **Batch Conversion** - Save all files to a folder with one click
- **Custom CSS** - Use your own CSS file for complete control
- **Beautiful UI** - Modern, dark-themed interface with tabbed sidebar
- **Zero Dependencies** - No need to install Pandoc, LaTeX, or other tools
- **Cross-platform** - Works on Windows and Linux

### v2.0.0 New Features ✨
- **Comprehensive Styling Options** - Advanced customization without CSS:
  - **Table Styling** - Borders, alternating rows, cell padding, header colors
  - **Image Controls** - Max-width, alignment (left/center/right), spacing
  - **List Styling** - Bullet types, numbering styles, indentation
  - **Code Block Styling** - Border radius, padding, line height
  - **Typography** - Text alignment, letter spacing, word spacing
  - **Heading Customization** - Top/bottom margin control
  - **Link Styling** - Underline toggle
  - **Blockquote Styling** - Border colors and backgrounds
- **Custom Margins** - Support for multiple units (inches, cm, mm, px, pt)
- **PDF Headers & Footers** - Custom header/footer text with automatic page numbers
- **A4 Page Preview** - Visual representation of exact page boundaries with proper margins
- **Smart Scroll Preservation** - Preview stays at your position while customizing
- **Tabbed Interface** - Separate "Files" and "Customize" tabs for cleaner workspace

---

## What's New in v2.0.0

### Major Features Added
- **Sidebar Tabs**: Cleaner interface with separate Files and Customize sections
- **Advanced Table Styling**: Control borders, alternating rows, cell padding, and header colors
- **Image Customization**: Set max-width, alignment (left/center/right), and spacing
- **List Configuration**: Choose bullet styles, numbering formats, indentation, and item spacing
- **Code Block Styling**: Customize border radius, padding, and line height
- **PDF Headers & Footers**: Add custom text and automatic page numbers to your PDFs
- **Custom Margins**: Support for multiple units (inches, cm, mm, pixels, points)
- **Typography Control**: Text alignment, letter spacing, and word spacing options
- **Heading Control**: Independent top/bottom margin customization
- **Blockquote Styling**: Custom border and background colors
- **Link Control**: Toggle underlines on/off

### UI Improvements
- **Better Preview**: A4 page boundaries are now visually clear with proper dimensions
- **Smart Scroll**: Preview position is preserved when updating styles (no more jumping to top!)
- **Organized Controls**: All customization options grouped into collapsible sections
- **Intuitive Tabs**: Easy navigation between file management and styling

### Technical Improvements
- Full support for margin units: `in`, `cm`, `mm`, `px`, `pt`
- Improved preview rendering with proper page container styling
- Scroll position preservation in real-time preview
- Better CSS generation for all customization options
- PDF headers/footers integrated with Puppeteer

---

## Download

> **All downloads are free.** The app includes a 30-day trial. [Purchase a license](https://jeswinarulsamuel.gumroad.com/l/ojiwme) after the trial to continue using.

### Windows

| Package | Description | |
|---------|-------------|:---:|
| **Setup Installer** | Full installer with Start Menu shortcuts | [![Download](https://img.shields.io/badge/Download-Setup.exe-blue?style=for-the-badge)](https://github.com/Jeswin-arul-samuel/md_to_pdf_convertor/releases/download/v2.0.0/MD.to.PDF.Converter.Setup.2.0.0.exe) |
| **Portable** | No installation required, run directly | [![Download](https://img.shields.io/badge/Download-Portable.exe-blue?style=for-the-badge)](https://github.com/Jeswin-arul-samuel/md_to_pdf_convertor/releases/download/v2.0.0/MD.to.PDF.Converter-Portable-2.0.0.exe) |

### Linux

| Package | Description | |
|---------|-------------|:---:|
| **Debian/Ubuntu** | For Debian-based distributions | [![Download](https://img.shields.io/badge/Download-.deb-orange?style=for-the-badge)](https://github.com/Jeswin-arul-samuel/md_to_pdf_convertor/releases/download/v2.0.0/md_to_pdf_2.0.0_amd64.deb) |
| **AppImage** | Universal Linux package | [![Download](https://img.shields.io/badge/Download-AppImage-orange?style=for-the-badge)](https://github.com/Jeswin-arul-samuel/md_to_pdf_convertor/releases/download/v2.0.0/MD.to.PDF.Converter-2.0.0.AppImage) |

---

## Installation

### Windows

#### Option 1: Setup Installer (Recommended)
1. Download `MD to PDF Converter Setup 2.0.0.exe`
2. Double-click to run the installer
3. Follow the installation wizard
4. Choose installation directory (optional)
5. Click "Install"
6. Launch from Start Menu or Desktop shortcut

#### Option 2: Portable Version
1. Download `MD to PDF Converter-Portable-2.0.0.exe`
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
sudo dpkg -i md_to_pdf_2.0.0_amd64.deb

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
chmod +x "MD to PDF Converter-2.0.0.AppImage"

# Run it
./"MD to PDF Converter-2.0.0.AppImage"
```

**Note:** If you get a FUSE error, install libfuse2:
```bash
sudo apt-get install libfuse2
```

**Optional:** Move to a permanent location:
```bash
mkdir -p ~/.local/bin
mv "MD to PDF Converter-2.0.0.AppImage" ~/.local/bin/md-to-pdf
chmod +x ~/.local/bin/md-to-pdf
```

---

## Usage Guide

### Sidebar Tabs (v2.0.0)

The sidebar now has two tabs for better organization:

#### Files Tab
Manage your markdown files:
1. **Click "Add Files"** - Opens file browser to select .md files
2. **Drag & Drop** - Drop markdown files anywhere on the sidebar
3. **Multiple Selection** - Select multiple files at once (Ctrl+Click or Shift+Click)

> **Note:** Only `.md` and `.markdown` files are accepted.

#### Customize Tab
Access all styling options for your PDF (see Styling Options section below).

### Live Preview

The preview panel shows your document in real-time:
- Preview appears automatically when you add a file
- Click on any file in the list to preview it
- Changes to styling update the preview instantly
- **Smart Scroll:** Preview stays at your scrolled position when updating styles
- **Page Visualization:** A4 page boundaries are clearly shown in the preview

### Styling Options

Access the **Customize tab** to customize your PDF without writing CSS. All options are organized into collapsible sections:

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
| Page Margins (Preset) | Narrow (0.5in), Normal (1in), Wide (1.5in) |
| **Custom Margin** (NEW) | Enter any value with unit (1in, 20mm, 2cm, etc.) |
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

#### Margins (v2.0.0) NEW
| Option | Description |
|--------|-------------|
| Custom Page Margin | Set custom margins in any unit: inches (in), centimeters (cm), millimeters (mm), pixels (px), points (pt) |
| Example | `1in`, `2.5cm`, `20mm`, `96px` |

#### Table Styling (v2.0.0) NEW
| Option | Description |
|--------|-------------|
| Show Borders | Toggle table borders on/off |
| Alternate Row Colors | Alternate background colors for table rows |
| Border Width | Customize border thickness |
| Cell Padding | Adjust spacing inside table cells |
| Header Background | Color of table headers |
| Header Text Color | Text color for table headers |

#### Image Styling (v2.0.0) NEW
| Option | Values |
|--------|--------|
| Max Width | Set maximum image width (e.g., 100%, 500px) |
| Alignment | Left, Center, Right |
| Spacing | Margin around images |

#### List Styling (v2.0.0) NEW
| Option | Values |
|--------|--------|
| Bullet Style | Disc (●), Circle (○), Square (■) |
| Number Style | Decimal (1), Lower Alpha (a), Upper Alpha (A), Lower Roman (i), Upper Roman (I) |
| Indentation | Customizable list indentation |
| Item Spacing | Space between list items |

#### Code Block Styling (v2.0.0) NEW
| Option | Description |
|--------|-------------|
| Border Radius | Corner roundness of code blocks |
| Padding | Internal spacing in code blocks |
| Line Height | Space between code lines |

#### Heading Spacing (v2.0.0) NEW
| Option | Description |
|--------|-------------|
| Top Margin | Space above headings |
| Bottom Margin | Space below headings |

#### Link Styling (v2.0.0) NEW
| Option | Description |
|--------|-------------|
| Underline | Toggle underline for links |

#### Blockquote Styling (v2.0.0) NEW
| Option | Description |
|--------|-------------|
| Border Color | Color of blockquote left border |
| Background Color | Background color for blockquotes |

#### Text & Spacing (v2.0.0) NEW
| Option | Values |
|--------|--------|
| Text Alignment | Left, Center, Right, Justify |
| Letter Spacing | Space between letters |
| Word Spacing | Space between words |

#### PDF Headers & Footers (v2.0.0) NEW
| Option | Description |
|--------|-------------|
| Header Text | Custom header text (optional) |
| Footer Text | Custom footer text (optional) |
| Show Page Numbers | Toggle automatic page numbering |
| Page Number Position | Header Left/Center/Right, Footer Left/Center/Right |

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
chmod +x "MD to PDF Converter-2.0.0.AppImage"
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

## Activating Your License

After purchasing, you'll receive a license key via email.

1. Open the app
2. Click on the **"Trial"** badge in the header
3. Enter your license key (format: `MDPDF-XXXX-XXXX-XXXX-XXXX`)
4. Click **"Activate"**

Your license is tied to your installation and provides unlimited access forever.

---

## License

**Source Available - Non-Commercial**

- **Personal use**: Free 30-day trial, then $12.99 lifetime license
- **Commercial use**: Requires a paid license

See [LICENSE](LICENSE) for full details.

For commercial licensing inquiries: jeswin.arul.samuel@gmail.com

---

## Author

**Jeswin**
Email: jeswin.arul.samuel@gmail.com

---

## Support

If you encounter any issues or have feature requests, please open an issue on GitHub.
