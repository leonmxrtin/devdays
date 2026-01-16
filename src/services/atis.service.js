import { generateSpeech } from "./ai.service.js";

let reportLetter = "A";

export const buildReportText = ({time, city, windDirection, windSpeed, windVariableFrom, windVariableTo, visibility, temperature, dewPoint, qnh}) => {
    const runway = "09L"; // example fixed runway

    // const runwayConditionCodeNumber = "555"; 
    // const runwayConditionCodeWord = "WET WET WET";

    const transitionLevel = "150"; // I don't know how to get it dynamically

    let report = '';
    report += `This is ${city} Airport ATIS information ${reportLetter} at time ${time}.\n`;
    report += `Runway in use ${runway}.\n`;
    report += `Runway ${runway} at time ${time}.\n`; // for simplicity using same time as report time
    // report += `Runway condition code ${runwayConditionCodeNumber} ${runwayConditionCodeWord}.\n`;
    report += `Transition level ${transitionLevel}.\n`;
    report += `Wind ${windDirection} degrees, ${windSpeed} knots.\n`;
    report += `Variable between ${windVariableFrom} and ${windVariableTo} degrees.\n`;
    report += `Visibility ${visibility}.\n`;
    report += `Temperature ${temperature}, dew point ${dewPoint}.\n`;
    report += `QNH ${qnh}.\n`;
    report += `This was ${city} Airport ATIS information ${reportLetter}.\n`;

    // round robin
    reportLetter = reportLetter === "Z" ? "A" : String.fromCharCode(reportLetter.charCodeAt(0) + 1);

    return report;
}

export const generateAudioReport = async (text) => {
    const guidelines = 'Speak in a clear tone, suitable for radio communication. ' +
                       'Make long pauses between sentences. ' +
                       'Pronounce numbers and letters as in the NATO phonetic alphabet. ' +
                       'Pronounce numbers individually. ' +
                       'Follow aviation communication standards.'
    return await generateSpeech(text, guidelines);
}