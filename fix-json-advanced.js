const fs = require('fs');

console.log('Reading original file...');
const content = fs.readFileSync('fragen/1-300 question.txt', 'utf8');

// Split on }\n{ pattern more reliably
const parts = content.split(/}\s*\n\s*{/);
console.log('Split into', parts.length, 'parts');

const allQuestions = [];

for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    
    // Add missing braces back
    if (i > 0) part = '{' + part;
    if (i < parts.length - 1) part = part + '}';
    
    try {
        const parsed = JSON.parse(part);
        if (parsed.questions && Array.isArray(parsed.questions)) {
            console.log(`Part ${i+1}: Found ${parsed.questions.length} questions`);
            allQuestions.push(...parsed.questions);
        }
    } catch (e) {
        console.log(`Part ${i+1}: Parse failed - ${e.message}`);
        // Try to find and show the problematic area
        if (part.length < 500) {
            console.log('Part content:', part);
        } else {
            console.log('Part start:', part.substring(0, 200));
            console.log('Part end:', part.substring(part.length - 200));
        }
    }
}

// Remove duplicates and sort
const uniqueQuestions = [];
const seen = new Set();

for (const question of allQuestions) {
    if (!seen.has(question.number)) {
        seen.add(question.number);
        uniqueQuestions.push(question);
    }
}

uniqueQuestions.sort((a, b) => a.number - b.number);

console.log('Total unique questions:', uniqueQuestions.length);
console.log('Range:', uniqueQuestions[0]?.number, 'to', uniqueQuestions[uniqueQuestions.length-1]?.number);

// Check if question 300 exists
const q300 = uniqueQuestions.find(q => q.number === 300);
console.log('Question 300:', q300 ? 'Found' : 'Missing');
if (q300) {
    console.log('Q300 text:', q300.question);
}

// Write the final clean JSON
const finalJson = {
    questions: uniqueQuestions
};

fs.writeFileSync('fragen/questions-clean.json', JSON.stringify(finalJson, null, 2));
console.log('Clean JSON written to: fragen/questions-clean.json');