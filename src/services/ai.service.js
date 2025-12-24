import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const ollama = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama', // required but unused
})

export const generateText = async (provider, prompt) => {
    let response;

    if (provider === 'openai') {
        response = await openai.responses.create({
            // given API key only has access to 'gpt-5-mini'
            model: 'gpt-5-mini',
            input: prompt,
        });
    } else {
        response = await ollama.responses.create({
            model: 'llama2',
            input: prompt,
        });
    }
    
    return response.output_text;
};