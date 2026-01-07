# Installation Guide

## Quick Start

Your MD to PDF Converter application has been built and is ready to use!

### Location
The application is located at:
```
dist/MD to PDF Converter-1.0.0.AppImage
```

### Installation Steps

#### 1. Install libfuse2 (Required)
AppImages require libfuse2 to run:
```bash
sudo apt-get install libfuse2
```

#### 2. Run the Application

**Option A: Use the wrapper script (Recommended)**
```bash
cd dist
./run-md-to-pdf.sh
```

**Option B: Run directly**
```bash
cd dist
ELECTRON_DISABLE_SANDBOX=1 ./"MD to PDF Converter-1.0.0.AppImage"
```

#### 3. (Optional) Move to Applications Folder
For easier access, create an alias or move the wrapper script:

**Option A: Create an alias**
```bash
# Add to your ~/.bashrc or ~/.zshrc
echo 'alias md-to-pdf="ELECTRON_DISABLE_SANDBOX=1 /home/jeswin/projects/md_to_pdf/dist/MD\ to\ PDF\ Converter-1.0.0.AppImage"' >> ~/.bashrc
source ~/.bashrc

# Run from anywhere
md-to-pdf
```

**Option B: Move wrapper to local bin**
```bash
mkdir -p ~/.local/bin
cp dist/run-md-to-pdf.sh ~/.local/bin/md-to-pdf
chmod +x ~/.local/bin/md-to-pdf

# Make sure ~/.local/bin is in your PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Run from anywhere
md-to-pdf
```

### Creating a Desktop Shortcut (Optional)

Create a desktop entry file:

```bash
cat > ~/.local/share/applications/md-to-pdf.desktop << 'EOF'
[Desktop Entry]
Name=MD to PDF Converter
Comment=Convert Markdown files to PDF with live preview
Exec=/home/YOUR_USERNAME/.local/bin/md-to-pdf
Icon=application-pdf
Terminal=false
Type=Application
Categories=Office;Utility;
EOF
```

Replace `YOUR_USERNAME` with your actual username.

## What's Included

The AppImage is a self-contained application that includes:
- Electron runtime
- Puppeteer (with bundled Chromium)
- Marked (Markdown parser)
- All assets and dependencies

**No additional installation required!**

## System Requirements

- Linux (64-bit)
- Minimal dependencies (most Linux systems have these already)
- ~120 MB disk space for the AppImage

## Troubleshooting

### AppImage won't run
Make sure it's executable:
```bash
chmod +x "MD to PDF Converter-1.0.0.AppImage"
```

### Missing dependencies
If you get dependency errors, install:
```bash
sudo apt-get install libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils libatspi2.0-0 libsecret-1-0
```

### Sandboxing issues
If the app fails to start due to sandboxing, run with:
```bash
ELECTRON_DISABLE_SANDBOX=1 ./dist/MD\ to\ PDF\ Converter-1.0.0.AppImage
```

## Enjoy!

You now have a fully functional Markdown to PDF converter with:
- Multiple file support
- Live preview
- Custom CSS styling
- Batch conversion
- Beautiful dark-themed UI

Happy converting! 🎉
