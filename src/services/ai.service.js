import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const ollama = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama', // required but unused
});

const providers = {
    "openai": {
        client: openai,
        model: 'gpt-5-mini',
    },
    "ollama": {
        client: ollama,
        model: 'llama3',
    }
}

export const generateText = async (provider, prompt) => {
    let textResponse, firstTokenTime, endTime;

    const { client, model } = providers[provider];

    const startTime = Date.now();
    const stream = await client.responses.create({
        model: model,
        input: prompt,
        stream: true
    });

    for await (const event of stream) {
        if (!firstTokenTime && event.type === 'response.output_text.delta') {
            firstTokenTime = Date.now();
        } 
        else if (event.type === 'response.completed') {
            endTime = Date.now();
            textResponse = event.response.output.find(output => output.type === 'message').content[0].text;
        }
    }

    return {
        text: textResponse,
        metrics: {
            timeToFirstToken: firstTokenTime - startTime,
            totalTime: endTime - startTime
        }
    }
};

export const generateSpeech = async (prompt, instructions) => {    
    const mp3 = await openai.audio.speech.create({
        model: 'gpt-4o-mini-tts',
        voice: 'alloy',
        format: 'mp3',
        input: prompt,
        instructions: instructions,
    });
    
    return mp3;
}