// Node.js script to encrypt question files
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class NodeCryptoUtils {
    constructor() {
        this.keyMaterial = 'LebenInDeutschland2024Quiz';
    }

    // Generate encryption key from password
    generateKey(password, salt) {
        return crypto.pbkdf2Sync(
            password || this.keyMaterial,
            salt,
            100000,
            32,
            'sha256'
        );
    }

    // Encrypt data (using simpler method that works with all Node.js versions)
    encrypt(data, password) {
        try {
            const dataString = JSON.stringify(data);
            
            // Simple XOR encryption with key stretching
            const key = crypto.createHash('sha256').update(password || this.keyMaterial).digest();
            const dataBuffer = Buffer.from(dataString, 'utf8');
            
            // XOR each byte with repeated key
            const encrypted = Buffer.alloc(dataBuffer.length);
            for (let i = 0; i < dataBuffer.length; i++) {
                encrypted[i] = dataBuffer[i] ^ key[i % key.length];
            }
            
            // Return as base64
            return encrypted.toString('base64');
        } catch (error) {
            console.error('Encryption failed:', error);
            throw error;
        }
    }

    // Simple obfuscation for additional layer
    obfuscate(data) {
        const jsonString = JSON.stringify(data);
        const encoded = Buffer.from(jsonString).toString('base64');
        // Simple character substitution
        return encoded.split('').map(char => {
            return String.fromCharCode(char.charCodeAt(0) + 1);
        }).join('');
    }

    // Encrypt and obfuscate (double protection)
    protectData(data, password) {
        const encrypted = this.encrypt(data, password);
        return this.obfuscate({ encrypted });
    }
}

// Process files
async function encryptQuestionFiles() {
    const cryptoUtils = new NodeCryptoUtils();
    const questionDir = path.join(__dirname, 'fragen');
    const encryptedDir = path.join(__dirname, 'encrypted');

    // Create encrypted directory if it doesn't exist
    if (!fs.existsSync(encryptedDir)) {
        fs.mkdirSync(encryptedDir);
    }

    // Files to encrypt
    const files = [
        'corrected 300 question.json',
        'questions.json',
        'questions-clean.json',
        'questions-working.json'
    ];

    for (const file of files) {
        const filePath = path.join(questionDir, file);
        
        if (fs.existsSync(filePath)) {
            console.log(`Encrypting ${file}...`);
            
            try {
                // Read the file
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                
                // Encrypt the data
                const encrypted = cryptoUtils.protectData(data);
                
                // Write encrypted file
                const outputFile = file.replace('.json', '.encrypted.js');
                const outputPath = path.join(encryptedDir, outputFile);
                
                // Create a JavaScript file that can be included in HTML
                const jsContent = `// Encrypted question data
const ENCRYPTED_DATA_${file.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()} = \`${encrypted}\`;

if (typeof window !== 'undefined') {
    window.ENCRYPTED_DATA_${file.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()} = ENCRYPTED_DATA_${file.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()};
}`;
                
                fs.writeFileSync(outputPath, jsContent);
                console.log(`✓ Created ${outputFile}`);
            } catch (error) {
                console.error(`✗ Failed to encrypt ${file}:`, error.message);
            }
        } else {
            console.log(`⚠ File not found: ${file}`);
        }
    }
    
    console.log('\\nEncryption complete! Encrypted files are in the /encrypted directory.');
    console.log('Include the encrypted .js files in your HTML and use CryptoUtils to decrypt.');
}

// Run the encryption
encryptQuestionFiles().catch(console.error);