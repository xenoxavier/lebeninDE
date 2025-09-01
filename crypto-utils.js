// Encryption utilities for protecting quiz data
class CryptoUtils {
    constructor() {
        // Base key material (can be further derived)
        this.keyMaterial = 'LebenInDeutschland2024Quiz';
    }

    // Generate encryption key from password
    async generateKey(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password || this.keyMaterial);
        
        return window.crypto.subtle.importKey(
            'raw',
            data,
            { name: 'PBKDF2' },
            false,
            ['deriveKey']
        );
    }

    // Derive AES key for encryption/decryption
    async deriveAESKey(baseKey, salt) {
        return window.crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            baseKey,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    // Encrypt data
    async encrypt(data, password) {
        try {
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(JSON.stringify(data));
            
            // Generate random salt and IV
            const salt = window.crypto.getRandomValues(new Uint8Array(16));
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            
            // Generate keys
            const baseKey = await this.generateKey(password);
            const aesKey = await this.deriveAESKey(baseKey, salt);
            
            // Encrypt
            const encrypted = await window.crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: iv },
                aesKey,
                dataBuffer
            );
            
            // Combine salt + iv + encrypted data
            const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
            result.set(salt, 0);
            result.set(iv, salt.length);
            result.set(new Uint8Array(encrypted), salt.length + iv.length);
            
            // Return as base64
            return btoa(String.fromCharCode(...result));
        } catch (error) {
            console.error('Encryption failed:', error);
            throw error;
        }
    }

    // Decrypt data
    async decrypt(encryptedBase64, password) {
        try {
            // Convert from base64
            const encryptedData = new Uint8Array(
                atob(encryptedBase64).split('').map(c => c.charCodeAt(0))
            );
            
            // Extract salt, IV, and encrypted content
            const salt = encryptedData.slice(0, 16);
            const iv = encryptedData.slice(16, 28);
            const encrypted = encryptedData.slice(28);
            
            // Generate keys
            const baseKey = await this.generateKey(password);
            const aesKey = await this.deriveAESKey(baseKey, salt);
            
            // Decrypt
            const decrypted = await window.crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                aesKey,
                encrypted
            );
            
            // Convert back to string and parse JSON
            const decoder = new TextDecoder();
            const decryptedString = decoder.decode(decrypted);
            return JSON.parse(decryptedString);
        } catch (error) {
            console.error('Decryption failed:', error);
            throw error;
        }
    }

    // Simple obfuscation for additional layer (less secure but hides structure)
    obfuscate(data) {
        const jsonString = JSON.stringify(data);
        const encoded = btoa(jsonString);
        // Simple character substitution
        return encoded.split('').map(char => {
            return String.fromCharCode(char.charCodeAt(0) + 1);
        }).join('');
    }

    deobfuscate(obfuscated) {
        // Reverse character substitution
        const decoded = obfuscated.split('').map(char => {
            return String.fromCharCode(char.charCodeAt(0) - 1);
        }).join('');
        return JSON.parse(atob(decoded));
    }

    // Encrypt and obfuscate (double protection)
    async protectData(data, password) {
        const encrypted = await this.encrypt(data, password);
        return this.obfuscate({ encrypted });
    }

    // Decrypt and deobfuscate
    async unprotectData(protectedData, password) {
        const deobfuscated = this.deobfuscate(protectedData);
        return await this.decrypt(deobfuscated.encrypted, password);
    }

    // Simple XOR decrypt (matching Node.js encryption)
    async decryptXOR(encryptedBase64, password) {
        try {
            // Convert from base64
            const encryptedData = atob(encryptedBase64);
            const dataBuffer = new Uint8Array(encryptedData.length);
            for (let i = 0; i < encryptedData.length; i++) {
                dataBuffer[i] = encryptedData.charCodeAt(i);
            }
            
            // Generate key (same as Node.js)
            const encoder = new TextEncoder();
            const keyData = encoder.encode(password || this.keyMaterial);
            const keyHash = await window.crypto.subtle.digest('SHA-256', keyData);
            const key = new Uint8Array(keyHash);
            
            // XOR decrypt
            const decrypted = new Uint8Array(dataBuffer.length);
            for (let i = 0; i < dataBuffer.length; i++) {
                decrypted[i] = dataBuffer[i] ^ key[i % key.length];
            }
            
            // Convert back to string and parse JSON
            const decoder = new TextDecoder();
            const decryptedString = decoder.decode(decrypted);
            return JSON.parse(decryptedString);
        } catch (error) {
            console.error('XOR Decryption failed:', error);
            throw error;
        }
    }

    // Simple decrypt and deobfuscate (XOR version)
    async unprotectDataXOR(protectedData, password) {
        const deobfuscated = this.deobfuscate(protectedData);
        return await this.decryptXOR(deobfuscated.encrypted, password);
    }
}

// Export for use in other files
if (typeof window !== 'undefined') {
    window.CryptoUtils = CryptoUtils;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CryptoUtils;
}