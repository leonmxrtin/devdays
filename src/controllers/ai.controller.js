import { trace } from '@opentelemetry/api';
import { generateText } from '../services/ai.service.js' ;

const tracer = trace.getTracer('ai-controller-tracer');

export const generateAIResponse = async (req, res) => {
    const span = tracer.startSpan('generateAIResponse');
    try {
        const { provider, prompt } = req.body;

        const aiResponse = await generateText(provider, prompt);
        res.status(200).json({ response: aiResponse });
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}` });
    } finally {
        span.end();
    }
};