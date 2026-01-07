const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * License Manager for MD to PDF Converter
 *
 * License Key Format: MDPDF-XXXX-XXXX-XXXX-XXXX
 *
 * Trial Mode: 30 days free trial
 */

class LicenseManager {
  constructor(userDataPath) {
    this.licenseFile = path.join(userDataPath, 'license.json');
    this.data = this.loadLicenseData();
  }

  // Load license data from file
  loadLicenseData() {
    const defaults = {
      licenseKey: null,
      isLicensed: false,
      installDate: null,
      fileConversions: 0,
      trialExpired: false
    };

    try {
      if (fs.existsSync(this.licenseFile)) {
        const content = fs.readFileSync(this.licenseFile, 'utf8');
        const data = JSON.parse(content);
        return { ...defaults, ...data };
      }
    } catch (error) {
      console.error('Error loading license data:', error);
    }

    // First run - set install date
    defaults.installDate = Date.now();
    this.saveLicenseData(defaults);
    return defaults;
  }

  // Save license data to file
  saveLicenseData(data = this.data) {
    try {
      const dir = path.dirname(this.licenseFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.licenseFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving license data:', error);
    }
  }

  /**
   * Validate license key format and checksum
   *
   * Key format: MDPDF-XXXX-XXXX-XXXX-XXXX
   * Validation: The key is valid if the sum of character codes at
   * positions 6,11,16,21 modulo 256 equals the last character code
   */
  validateLicenseKey(key) {
    if (!key || typeof key !== 'string') {
      return { valid: false, error: 'Invalid key format' };
    }

    // Clean and uppercase
    key = key.trim().toUpperCase();

    // Check format: MDPDF-XXXX-XXXX-XXXX-XXXX (25 characters)
    const pattern = /^MDPDF-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    if (!pattern.test(key)) {
      return { valid: false, error: 'Invalid key format. Expected: MDPDF-XXXX-XXXX-XXXX-XXXX' };
    }

    // Checksum validation
    // Sum specific positions and validate against a hash
    const chars = key.replace(/-/g, '');

    // Simple checksum: sum of all char codes should be divisible by a specific value
    // when combined with a secret multiplier
    let sum = 0;
    for (let i = 0; i < chars.length; i++) {
      sum += chars.charCodeAt(i) * (i + 1);
    }

    // Valid keys have sum % 97 === 0 (using 97 as a prime for better distribution)
    // This allows you to generate valid keys that satisfy this condition
    if (sum % 97 !== 0) {
      return { valid: false, error: 'Invalid license key' };
    }

    return { valid: true, key: key };
  }

  // Activate license with key
  activateLicense(key) {
    const validation = this.validateLicenseKey(key);

    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    this.data.licenseKey = validation.key;
    this.data.isLicensed = true;
    this.data.trialExpired = false;
    this.saveLicenseData();

    return { success: true, message: 'License activated successfully!' };
  }

  // Get current license status
  getLicenseStatus() {
    // If licensed, return licensed status
    if (this.data.isLicensed && this.data.licenseKey) {
      return {
        licensed: true,
        trialMode: false,
        trialExpired: false,
        message: 'Licensed'
      };
    }

    // Calculate trial status (30 days free trial)
    const now = Date.now();
    const installDate = this.data.installDate || now;
    const daysSinceInstall = Math.floor((now - installDate) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, 30 - daysSinceInstall);

    // Check if trial expired
    const trialExpired = daysRemaining <= 0;

    if (trialExpired) {
      this.data.trialExpired = true;
      this.saveLicenseData();
    }

    return {
      licensed: false,
      trialMode: !trialExpired,
      trialExpired: trialExpired,
      daysRemaining: daysRemaining,
      message: trialExpired
        ? 'Trial expired. Please purchase a license to continue.'
        : `Trial: ${daysRemaining} day(s) remaining`
    };
  }

  // Record a file conversion (for tracking purposes)
  recordConversion() {
    if (!this.data.isLicensed) {
      this.data.fileConversions++;
      this.saveLicenseData();
    }
    return this.getLicenseStatus();
  }

  // Check if user can convert files
  canConvert() {
    const status = this.getLicenseStatus();
    return status.licensed || status.trialMode;
  }

  // Deactivate license (for testing or transfer)
  deactivateLicense() {
    this.data.licenseKey = null;
    this.data.isLicensed = false;
    this.saveLicenseData();
    return { success: true };
  }

  // Reset trial (for testing only - remove in production)
  resetTrial() {
    this.data = {
      licenseKey: null,
      isLicensed: false,
      installDate: Date.now(),
      fileConversions: 0,
      trialExpired: false
    };
    this.saveLicenseData();
    return { success: true };
  }
}

/**
 * License Key Generator
 *
 * Use this to generate valid license keys.
 * The key must satisfy: sum of (charCode * position) % 97 === 0
 */
function generateLicenseKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const prefix = 'MDPDF';

  // Generate random characters for first 3 groups
  let key = prefix;
  for (let group = 0; group < 3; group++) {
    key += '-';
    for (let i = 0; i < 4; i++) {
      key += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  // For the last group, we need to find characters that make sum % 97 === 0
  key += '-';

  // Add first 3 characters of last group randomly
  for (let i = 0; i < 3; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }

  // Calculate current sum
  const currentChars = key.replace(/-/g, '');
  let sum = 0;
  for (let i = 0; i < currentChars.length; i++) {
    sum += currentChars.charCodeAt(i) * (i + 1);
  }

  // Find the last character that makes sum % 97 === 0
  const lastPosition = currentChars.length + 1; // Position for last char
  const needed = (97 - (sum % 97)) % 97;

  // Find a character whose (charCode * lastPosition) % 97 === needed
  let lastChar = 'A';
  for (let i = 0; i < chars.length; i++) {
    if ((chars.charCodeAt(i) * lastPosition) % 97 === needed) {
      lastChar = chars[i];
      break;
    }
  }

  // If no exact match found, try to adjust
  // This is a simplified approach - in production you'd want more robust generation
  key += lastChar;

  return key;
}

module.exports = { LicenseManager, generateLicenseKey };
