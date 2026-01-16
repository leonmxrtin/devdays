import { trace } from '@opentelemetry/api';
import { buildReportText, generateAudioReport } from '../services/atis.service.js';
import { getWeatherForecast } from '../services/meteo.service.js';

const tracer = trace.getTracer('atis-controller-tracer');

export const generateReport = async (req, res) => {
    const span = tracer.startSpan('generateReport');
    try {
        const cityName = req.body.city;
        const weatherInfo = await getWeatherForecast(cityName);
        const text = buildReportText(weatherInfo);
        const audio = await generateAudioReport(text);
            
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');

        res.send(Buffer.from(await audio.arrayBuffer()));
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}` });
    } finally {
        span.end();
    }
}