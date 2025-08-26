const fs = require('fs');

try {
    // Read the problematic file
    const data = fs.readFileSync('fragen/1-300 question.txt', 'utf8');
    
    // Split by '}' followed by '{' (end of one JSON, start of another)
    const jsonChunks = data.split(/}\s*{/);
    
    // Fix the chunks by adding back the braces and parse each
    const allQuestions = [];
    
    for (let i = 0; i < jsonChunks.length; i++) {
        let chunk = jsonChunks[i];
        
        // Add back the missing braces
        if (i > 0) chunk = '{' + chunk;
        if (i < jsonChunks.length - 1) chunk = chunk + '}';
        
        try {
            const parsed = JSON.parse(chunk);
            if (parsed.questions && Array.isArray(parsed.questions)) {
                allQuestions.push(...parsed.questions);
            }
        } catch (parseError) {
            console.log(`Chunk ${i} parse error:`, parseError.message);
            console.log(`Chunk content preview:`, chunk.substring(0, 200));
        }
    }
    
    // Sort questions by number to ensure proper order
    allQuestions.sort((a, b) => a.number - b.number);
    
    // Create the final JSON structure
    const finalJson = {
        questions: allQuestions
    };
    
    // Write the cleaned JSON file
    fs.writeFileSync('fragen/questions.json', JSON.stringify(finalJson, null, 2));
    
    console.log(`Successfully processed ${allQuestions.length} questions`);
    console.log(`Question numbers range from ${allQuestions[0]?.number} to ${allQuestions[allQuestions.length-1]?.number}`);
    console.log('Clean JSON file created: fragen/questions.json');
    
} catch (error) {
    console.error('Error:', error.message);
}