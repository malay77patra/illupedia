const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const exampleEnvPath = path.join(__dirname, '..', '.env.example');

if (fs.existsSync(envPath)) {
    console.log('.env file has been detected, generating template .env.example...');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const exampleEnvContent = envContent
        .split('\n')
        .map(line => {
            if (line.trim()) {
                const [key] = line.split('=');
                return `${key}=`;
            }
            return line;
        })
        .join('\n');

    fs.writeFileSync(exampleEnvPath, exampleEnvContent, 'utf-8');
    console.log('.env.example has been generated from .env');
}
