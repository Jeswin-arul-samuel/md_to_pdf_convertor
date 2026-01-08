const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

class SystemCheck {
  constructor() {
    this.checks = [];
    this.warnings = [];
    this.errors = [];
  }

  log(message) {
    console.log(`[System Check] ${message}`);
  }

  checkPuppeteerDependencies() {
    this.log('Checking Puppeteer dependencies...');

    // Check for required system libraries on Linux
    if (process.platform === 'linux') {
      const requiredLibs = [
        'libnotify',
        'libxtst6',
        'libnss3',
        'libglib2.0-0',
        'libx11-6'
      ];

      requiredLibs.forEach(lib => {
        try {
          execSync(`dpkg -l | grep ${lib}`, { stdio: 'pipe' });
          this.log(`✓ ${lib} found`);
        } catch (e) {
          this.warnings.push(`Library ${lib} may not be installed. The app might fail to run.`);
        }
      });
    }

    // Check /tmp directory
    const tmpDir = os.tmpdir();
    try {
      if (!fs.existsSync(tmpDir)) {
        throw new Error('not found');
      }
      // Try to write a test file
      const testFile = path.join(tmpDir, `.mdtopdf-test-${Date.now()}`);
      fs.writeFileSync(testFile, 'test', { mode: 0o600 });
      fs.unlinkSync(testFile);
      this.log(`✓ Temp directory ${tmpDir} is writable`);
    } catch (e) {
      this.errors.push(`Temp directory ${tmpDir} is not writable: ${e.message}`);
    }

    // Check disk space
    try {
      const freeSpace = this.getFreeDiskSpace(tmpDir);
      if (freeSpace < 500 * 1024 * 1024) { // Less than 500MB
        this.warnings.push(`Low disk space: ${(freeSpace / 1024 / 1024).toFixed(0)}MB free in temp directory`);
      } else {
        this.log(`✓ Disk space available: ${(freeSpace / 1024 / 1024 / 1024).toFixed(1)}GB`);
      }
    } catch (e) {
      this.log(`⚠ Could not check disk space: ${e.message}`);
    }
  }

  checkNodeModules() {
    this.log('Checking critical node modules...');

    const critical = ['marked', 'puppeteer'];
    critical.forEach(mod => {
      try {
        require.resolve(mod);
        this.log(`✓ ${mod} found`);
      } catch (e) {
        this.errors.push(`Critical module ${mod} not found. Run npm install.`);
      }
    });
  }

  async testPuppeteerLaunch() {
    this.log('Testing Puppeteer launch...');

    try {
      const puppeteer = require('puppeteer');
      let browser;

      try {
        browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          timeout: 10000 // 10 second timeout
        });

        await browser.close();
        this.log('✓ Puppeteer launch successful');
        return true;
      } catch (e) {
        this.errors.push(`Puppeteer launch failed: ${e.message}`);
        if (browser) {
          try { await browser.close(); } catch (ex) {}
        }
        return false;
      }
    } catch (e) {
      this.errors.push(`Could not test Puppeteer: ${e.message}`);
      return false;
    }
  }

  getFreeDiskSpace(dirPath) {
    try {
      const { execSync } = require('child_process');
      const result = execSync(`df ${dirPath} | tail -1`).toString();
      const parts = result.split(/\s+/);
      return parseInt(parts[3]) * 1024; // Convert to bytes
    } catch (e) {
      throw new Error(`Could not determine free space: ${e.message}`);
    }
  }

  async run() {
    this.log('Starting system compatibility check...\n');

    this.checkNodeModules();
    this.checkPuppeteerDependencies();
    await this.testPuppeteerLaunch();

    this.log('\n--- Check Summary ---');
    console.log(`Errors: ${this.errors.length}, Warnings: ${this.warnings.length}`);

    if (this.warnings.length > 0) {
      this.log('\nWarnings:');
      this.warnings.forEach(w => console.log(`  ⚠ ${w}`));
    }

    if (this.errors.length > 0) {
      this.log('\nErrors:');
      this.errors.forEach(e => console.log(`  ✗ ${e}`));
      return false;
    }

    this.log('\n✓ All checks passed!\n');
    return true;
  }
}

module.exports = SystemCheck;

// Run checks if called directly
if (require.main === module) {
  const check = new SystemCheck();
  check.run().then(success => {
    process.exit(success ? 0 : 1);
  });
}
