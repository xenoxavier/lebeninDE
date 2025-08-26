const fs = require('fs');

// Read the working JSON
const questionsData = JSON.parse(fs.readFileSync('fragen/questions-working.json', 'utf8'));

// Read the original script.js
const scriptContent = fs.readFileSync('script.js', 'utf8');

// Simple approach: replace the entire loadQuestions function with embedded version
const startMarker = 'async loadQuestions() {';
const endMarker = '    }\n    \n    loadFallbackQuestions()';

const startIndex = scriptContent.indexOf(startMarker);
const endIndex = scriptContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.log('Could not find function markers, trying alternative approach');
    
    // Alternative: just replace the loadQuestions method entirely
    const newScript = scriptContent.replace(/async loadQuestions\(\) \{[\s\S]*?\n    \}/g, 
        `async loadQuestions() {
        // Embedded questions data (no server required)
        const embeddedData = ${JSON.stringify(questionsData, null, 8)};
        
        console.log('Using embedded questions data');
        
        // Directly set the questions
        const jsonQuestions = [];
        
        for (let index = 0; index < embeddedData.questions.length; index++) {
            const q = embeddedData.questions[index];
            
            // Find correct answer index
            const correctIndex = q.options.findIndex(option => option === q.answer);
            
            // Valid question, convert it
            jsonQuestions.push({
                id: q.number || index + 1,
                question: q.question,
                options: q.options,
                correct: correctIndex
            });
        }
        
        this.allQuestions = jsonQuestions;
        console.log(\`Successfully loaded \${this.allQuestions.length} embedded questions\`);
    }`);
    
    fs.writeFileSync('script-embedded.js', newScript);
    console.log('Created script-embedded.js with embedded questions');
    return;
}

// Original approach with markers
const newLoadQuestions = `async loadQuestions() {
        // Embedded questions data (no server required)
        const embeddedData = ${JSON.stringify(questionsData, null, 8)};
        
        console.log('Using embedded questions data');
        
        // Directly set the questions
        const jsonQuestions = [];
        
        for (let index = 0; index < embeddedData.questions.length; index++) {
            const q = embeddedData.questions[index];
            
            // Find correct answer index
            const correctIndex = q.options.findIndex(option => option === q.answer);
            
            // Valid question, convert it
            jsonQuestions.push({
                id: q.number || index + 1,
                question: q.question,
                options: q.options,
                correct: correctIndex
            });
        }
        
        this.allQuestions = jsonQuestions;
        console.log(\`Successfully loaded \${this.allQuestions.length} embedded questions\`);
    }`;

// Replace the loadQuestions function
const newScript = scriptContent.substring(0, startIndex) + 
                 newLoadQuestions + 
                 scriptContent.substring(endIndex);

fs.writeFileSync('script-embedded.js', newScript);
console.log('Created script-embedded.js with embedded questions');