# MD to PDF Converter

A beautiful desktop application to convert Markdown files to PDF with live preview and customizable styling.

![Version](https://img.shields.io/badge/version-2.0.1-blue)
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

### v2.0.1 New Features ✨
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

## What's New in v2.0.1

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
| **Setup Installer** | Full installer with Start Menu shortcuts | [![Download](https://img.shields.io/badge/Download-Setup.exe-blue?style=for-the-badge)](https://github.com/Jeswin-arul-samuel/md_to_pdf_convertor/releases/download/v2.0.1/MD.to.PDF.Converter.Setup.2.0.1.exe) |
| **Portable** | No installation required, run directly | [![Download](https://img.shields.io/badge/Download-Portable.exe-blue?style=for-the-badge)](https://github.com/Jeswin-arul-samuel/md_to_pdf_convertor/releases/download/v2.0.1/MD.to.PDF.Converter-Portable-2.0.1.exe) |

### Linux

| Package | Description | Downloads |
|---------|-------------|:---:|
| **Debian/Ubuntu** | For Debian-based distributions | [![Download](https://img.shields.io/badge/Download-.deb-orange?style=for-the-badge)](https://github.com/Jeswin-arul-samuel/md_to_pdf_convertor/releases/download/v2.0.1/md_to_pdf_2.0.1_amd64.deb) |
| **AppImage** | Universal Linux package (portable) | [![Download AppImage](https://img.shields.io/badge/Download-AppImage-orange?style=for-the-badge)](https://github.com/Jeswin-arul-samuel/md_to_pdf_convertor/releases/download/v2.0.1/MD.to.PDF.Converter-2.0.1.AppImage) [![Download Wrapper](https://img.shields.io/badge/Download-Wrapper%20Script-orange?style=for-the-badge)](https://github.com/Jeswin-arul-samuel/md_to_pdf_convertor/releases/download/v2.0.1/md-to-pdf-wrapper.sh) |

---

## Installation

### Windows

#### System Requirements
- **OS**: Windows 10 or later (64-bit)
- **Disk Space**: ~200MB for installation
- **RAM**: 4GB minimum (8GB recommended)
- **Display**: 1366x768 or higher resolution

#### Option 1: Setup Installer (Recommended)

This option provides the most integrated Windows experience with Start Menu shortcuts and desktop icons.

**Installation Steps:**

1. Download `MD to PDF Converter Setup 2.0.1.exe`

2. Run the installer:
   - Double-click the `.exe` file
   - You may see a **"Windows protected your PC"** warning - this is normal
   - Click **"More info"** then **"Run anyway"** to proceed
   - This warning appears because we don't have a paid code-signing certificate (common for indie apps)

3. Follow the installer wizard:
   - Read the welcome screen
   - Choose installation location (default is fine for most users)
   - Select optional shortcuts:
     - ☑ Create Desktop shortcut
     - ☑ Create Start Menu shortcut
   - Click **"Install"**

4. Launch the application:
   - From the **Start Menu**: Search for "MD to PDF Converter"
   - From **Desktop shortcut** (if created)
   - Or look in: `C:\Program Files\md_to_pdf\` (or your chosen location)

#### Option 2: Portable Version

Use this option if you prefer a standalone executable with no system installation.

**Installation Steps:**

1. Download `MD to PDF Converter-Portable-2.0.1.exe`

2. Place it anywhere convenient:
   - Desktop
   - Documents folder
   - USB drive
   - Any folder on your computer

3. Run it:
   - Double-click the `.exe` file
   - First run may show the Windows Defender SmartScreen warning (same as Option 1)
   - Click **"More info"** → **"Run anyway"**
   - Application launches immediately

**Advantages of Portable:**
- No installation required
- Can run from USB drive
- Easy to move between computers
- No files left in system directories

#### Uninstall (Windows)

**For Setup Installer:**
1. Go to **Settings** → **Apps** → **Apps & features**
2. Search for "MD to PDF Converter"
3. Click on it
4. Click **"Uninstall"**
5. Confirm the uninstallation
6. Application and shortcuts are completely removed

**For Portable Version:**
1. Simply delete the `.exe` file
2. No system files to remove
3. Optional: Delete any saved PDFs in your Documents folder

#### Windows Defender SmartScreen Warning

**What is it?**
Windows Defender SmartScreen is a security feature that warns about unfamiliar applications. You'll see this message:
> "Windows protected your PC. Windows Defender SmartScreen prevented an unrecognized app from running."

**Why does it appear?**
- The app is new/not widely installed yet
- We don't have a paid code-signing certificate
- This is completely normal for indie/open-source applications

**How to proceed:**
1. Click **"More info"**
2. Click **"Run anyway"**
3. The app will launch normally
4. Windows will remember this and may not warn you again

---

### Linux

#### Option 1: Debian/Ubuntu (.deb) - RECOMMENDED

This is the traditional Linux installation method. The package will integrate with your system and appear in your applications menu.

**Installation Steps:**

1. Download `md_to_pdf_2.0.1_amd64.deb`

2. Install the package:
```bash
sudo dpkg -i md_to_pdf_2.0.1_amd64.deb
```

3. **Important:** If you see dependency errors, run this to automatically install missing dependencies:
```bash
sudo apt-get install -f
```

This command will:
- Detect missing system libraries
- Download and install them automatically
- Complete the installation

4. **Launch the application:**
   - Search for "MD to PDF Converter" in your application menu, OR
   - Run from terminal:
```bash
md-to-pdf
```

**Troubleshooting .deb installation:**

If `sudo apt-get install -f` doesn't work, you can manually install the dependencies:
```bash
sudo apt-get install libnotify4 libxtst6 libnss3 libglib2.0-0 libx11-6 libxkbfile1 libfreetype6
```

**Uninstall the .deb:**
```bash
sudo dpkg -r md_to_pdf
```

---

#### Option 2: AppImage (Portable - Any Linux Distribution)

If you prefer a portable installation or have issues with the .deb, use the AppImage. It's self-contained and works on any Linux distribution.

**Installation Steps:**

1. Download `MD to PDF Converter-2.0.1.AppImage`

2. Download the wrapper script `md-to-pdf-wrapper.sh` (from the same release)

3. Place both files in the same folder

4. Make the wrapper script executable:
```bash
chmod +x md-to-pdf-wrapper.sh
```

5. **Run the application:**
```bash
./md-to-pdf-wrapper.sh
```

The wrapper script automatically handles sandbox configuration that's required on most Linux systems.

**Alternative: Direct AppImage Execution (without wrapper)**

If you don't have the wrapper script:
```bash
chmod +x "MD to PDF Converter-2.0.1.AppImage"
ELECTRON_DISABLE_SANDBOX=1 ./"MD to PDF Converter-2.0.1.AppImage"
```

**Optional: Move to permanent location:**

If you want to run it from anywhere:
```bash
mkdir -p ~/.local/bin
mv "MD to PDF Converter-2.0.1.AppImage" ~/.local/bin/md-to-pdf
mv md-to-pdf-wrapper.sh ~/.local/bin/
chmod +x ~/.local/bin/md-to-pdf-wrapper.sh

# Then run it from anywhere:
~/.local/bin/md-to-pdf-wrapper.sh
```

**Troubleshooting AppImage:**

If you get a FUSE error:
```bash
sudo apt-get install libfuse2
```

**Uninstall AppImage:**

Simply delete the AppImage file(s). No system integration to remove.

---

## Usage Guide

### Sidebar Tabs (v2.0.1)

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

#### Margins (v2.0.1) NEW
| Option | Description |
|--------|-------------|
| Custom Page Margin | Set custom margins in any unit: inches (in), centimeters (cm), millimeters (mm), pixels (px), points (pt) |
| Example | `1in`, `2.5cm`, `20mm`, `96px` |

#### Table Styling (v2.0.1) NEW
| Option | Description |
|--------|-------------|
| Show Borders | Toggle table borders on/off |
| Alternate Row Colors | Alternate background colors for table rows |
| Border Width | Customize border thickness |
| Cell Padding | Adjust spacing inside table cells |
| Header Background | Color of table headers |
| Header Text Color | Text color for table headers |

#### Image Styling (v2.0.1) NEW
| Option | Values |
|--------|--------|
| Max Width | Set maximum image width (e.g., 100%, 500px) |
| Alignment | Left, Center, Right |
| Spacing | Margin around images |

#### List Styling (v2.0.1) NEW
| Option | Values |
|--------|--------|
| Bullet Style | Disc (●), Circle (○), Square (■) |
| Number Style | Decimal (1), Lower Alpha (a), Upper Alpha (A), Lower Roman (i), Upper Roman (I) |
| Indentation | Customizable list indentation |
| Item Spacing | Space between list items |

#### Code Block Styling (v2.0.1) NEW
| Option | Description |
|--------|-------------|
| Border Radius | Corner roundness of code blocks |
| Padding | Internal spacing in code blocks |
| Line Height | Space between code lines |

#### Heading Spacing (v2.0.1) NEW
| Option | Description |
|--------|-------------|
| Top Margin | Space above headings |
| Bottom Margin | Space below headings |

#### Link Styling (v2.0.1) NEW
| Option | Description |
|--------|-------------|
| Underline | Toggle underline for links |

#### Blockquote Styling (v2.0.1) NEW
| Option | Description |
|--------|-------------|
| Border Color | Color of blockquote left border |
| Background Color | Background color for blockquotes |

#### Text & Spacing (v2.0.1) NEW
| Option | Values |
|--------|--------|
| Text Alignment | Left, Center, Right, Justify |
| Letter Spacing | Space between letters |
| Word Spacing | Space between words |

#### PDF Headers & Footers (v2.0.1) NEW
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

**"Windows protected your PC" or SmartScreen warning:**

This is a common security check and completely safe to bypass for our app.

Steps to proceed:
1. Click **"More info"** button
2. Click **"Run anyway"** button
3. The application will launch normally
4. Windows may remember this app and not warn again on future runs

Why it appears:
- The app is new and not yet widely installed (Windows tracks this)
- We don't have a paid code-signing certificate (costs $300+/year, common for indie apps)
- It's a normal security check, not an actual danger

**App won't start or crashes immediately:**

1. Check Windows version:
   - Right-click Windows menu → System
   - Verify you have **Windows 10 or later**
   - If older, you need to upgrade Windows

2. Try running as Administrator:
   - Right-click the `.exe` file
   - Select "Run as administrator"
   - Click "Yes" when prompted

3. Check available disk space:
   - Right-click C: drive → Properties
   - Ensure you have **at least 200MB free space**
   - If low on space, delete some files and try again

4. Verify system requirements:
   - Windows 10 or later
   - 4GB RAM minimum (8GB recommended)
   - Intel/AMD 64-bit processor

**"Permission denied" or "Access denied" errors:**

1. Right-click the `.exe` file
2. Select "Run as administrator"
3. Click "Yes" on the UAC prompt
4. This grants the necessary permissions for PDF generation

**PDF files won't save or convert fails:**

1. Ensure the output folder has write permissions:
   - Right-click the folder → Properties
   - Go to "Security" tab
   - Verify your user account has "Modify" permissions

2. Try saving to a different location:
   - Documents folder (safest)
   - Desktop
   - Any folder you created yourself

3. Check disk space:
   - PDF files can be large
   - Ensure enough free space on your drive

**Application seems slow or unresponsive:**

This is normal when:
- Converting large files (can take 5-10 seconds)
- First launch (browser engine initializing)
- Complex styled documents (with many images/tables)

Wait a moment and it should respond. If it freezes for more than 30 seconds:
1. Close the window
2. Restart the application
3. Try with a simpler markdown file

**Need to uninstall completely:**

If the regular uninstall doesn't work:
1. Download and run CCleaner (free tool)
2. Go to Tools → Uninstall
3. Find "MD to PDF Converter"
4. Click Uninstall
5. Let CCleaner clean registry
6. Restart computer

### Linux

**AppImage won't run - FUSE error:**
```bash
# Install FUSE library
sudo apt-get install libfuse2
```

**AppImage won't run - Sandbox error:**

If you see: `The SUID sandbox helper binary was found, but is not configured correctly...`

This is expected and normal. The solution is simple:

1. **Use the wrapper script** (Recommended):
```bash
./md-to-pdf-wrapper.sh
```

2. **Or run with sandbox disabled**:
```bash
ELECTRON_DISABLE_SANDBOX=1 ./"MD to PDF Converter-2.0.1.AppImage"
```

The wrapper script automatically handles this for you, so you don't need to manually set the environment variable each time.

**PDF generation fails - Missing system libraries:**

If the app launches but PDF generation fails, some system libraries may be missing:

```bash
# Install all required dependencies
sudo apt-get install -y libnotify4 libxtst6 libnss3 libglib2.0-0 libx11-6 libxkbfile1 libfreetype6 fonts-dejavu fonts-liberation
```

**.deb installation shows dependency errors:**

This is normal and expected. After running `sudo dpkg -i`, always run:
```bash
sudo apt-get install -f
```

This automatically detects and installs any missing dependencies.

**App crashes or won't start:**

1. First, install system dependencies:
```bash
sudo apt-get install -f
```

2. If using AppImage, ensure you're using the wrapper script:
```bash
./md-to-pdf-wrapper.sh
```

3. Check that your system has at least 100MB free disk space in `/tmp`

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
