const fs = require('fs');

try {
    console.log('Reading file...');
    let content = fs.readFileSync('fragen/1-300 question.txt', 'utf8');
    
    console.log('Original length:', content.length);
    
    // Common JSON fixes
    // Remove trailing commas before closing brackets/braces
    content = content.replace(/,(\s*[\]}])/g, '$1');
    
    // Fix any double commas
    content = content.replace(/,,/g, ',');
    
    // Fix missing commas between array elements (when } is followed by {)
    content = content.replace(/}\s*\n\s*{/g, '},\n  {');
    
    // Try to parse
    let parsed;
    try {
        parsed = JSON.parse(content);
        console.log('JSON parsed successfully!');
        console.log('Type:', Array.isArray(parsed) ? 'Array' : 'Object');
        console.log('Items:', parsed.length);
        
        // Check for question 300
        const q300 = parsed.find(item => item.number === 300);
        console.log('Question 300:', q300 ? 'Found' : 'Not found');
        if (q300) {
            console.log('Q300:', q300.question);
        }
        
        // Convert to quiz format
        const quizFormat = { questions: parsed };
        fs.writeFileSync('fragen/questions-working.json', JSON.stringify(quizFormat, null, 2));
        console.log('Success! Created: fragen/questions-working.json');
        
    } catch (parseError) {
        console.log('Parse error:', parseError.message);
        
        // Try to find the error location
        const match = parseError.message.match(/position (\d+)/);
        if (match) {
            const pos = parseInt(match[1]);
            const start = Math.max(0, pos - 100);
            const end = Math.min(content.length, pos + 100);
            console.log('Error context:');
            console.log(content.substring(start, end));
        }
    }
    
} catch (error) {
    console.error('File error:', error.message);
}