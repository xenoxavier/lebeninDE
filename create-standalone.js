const fs = require('fs');

// Read the working JSON
const questionsData = JSON.parse(fs.readFileSync('fragen/questions-working.json', 'utf8'));

// Read the current script.js
const scriptContent = fs.readFileSync('script.js', 'utf8');

// Find where the loadQuestions function starts
const loadQuestionsStart = scriptContent.indexOf('async loadQuestions() {');
const loadQuestionsEnd = scriptContent.indexOf('    }', loadQuestionsStart) + 5;

// Create the new loadQuestions function that uses embedded data
const newLoadQuestions = `async loadQuestions() {
        // Embedded questions data (no server required)
        const embeddedData = ${JSON.stringify(questionsData, null, 8)};
        
        console.log('Using embedded questions data');
        const data = embeddedData;
        
        if (!data || !data.questions) {
            console.error('No embedded questions found');
            return;
        }
        
        console.log(\`Found \${data.questions.length} embedded questions\`);
        
        // Validate and convert questions
        const jsonQuestions = [];
        
        for (let index = 0; index < data.questions.length; index++) {
            const q = data.questions[index];
            
            if (!q.question || typeof q.question !== 'string') {
                console.warn(\`Question \${index + 1} missing or invalid 'question' field:\`, q);
                continue;
            }
            
            if (!q.options || !Array.isArray(q.options) || q.options.length === 0) {
                console.warn(\`Question \${index + 1} missing or invalid 'options' field:\`, q);
                continue;
            }
            
            if (!q.answer || typeof q.answer !== 'string') {
                console.warn(\`Question \${index + 1} missing or invalid 'answer' field:\`, q);
                continue;
            }
            
            // Find correct answer index
            const correctIndex = q.options.findIndex(option => option === q.answer);
            if (correctIndex === -1) {
                console.warn(\`Question \${index + 1} answer "\${q.answer}" not found in options:\`, q.options);
                continue;
            }
            
            // Valid question, convert it
            jsonQuestions.push({
                id: q.number || q.id || index + 1,
                question: q.question,
                options: q.options,
                correct: correctIndex
            });
        }
        
        if (jsonQuestions.length > 0) {
            this.allQuestions = jsonQuestions;
            console.log(\`Successfully loaded \${this.allQuestions.length} embedded questions\`);
        } else {
            console.error('No valid embedded questions found');
        }
    }`;

// Replace the loadQuestions function
const newScript = scriptContent.substring(0, loadQuestionsStart) + 
                 newLoadQuestions + 
                 scriptContent.substring(loadQuestionsEnd);

// Write the new script
fs.writeFileSync('script-standalone.js', newScript);
console.log('Created script-standalone.js with embedded questions');