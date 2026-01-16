import { fetchWeatherApi } from 'openmeteo';

export const getCityCoordinates = async (cityName) => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`)
    const data = await response.json();

    if (data && data.results && data.results[0]) {
        const { latitude, longitude } = data.results[0];
        return { latitude, longitude };
    } else {
        throw new Error(`City "${cityName}" not found.`);
    }
}

export const getWeatherForecast = async (cityName) => {
    const { latitude, longitude } = await getCityCoordinates(cityName);

    const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", {  
        latitude: latitude,
        longitude: longitude,
        current: ["temperature_2m", "dew_point_2m", "wind_speed_10m", "visibility", "wind_direction_10m", "pressure_msl"],
        wind_speed_unit: "kn"
    });

    const response = responses[0];    
    const current = response.current();

	const weather = {
		temperature_2m: current.variables(0).value(),
		dew_point_2m: current.variables(1).value(),
		wind_speed_10m: current.variables(2).value(),
		visibility: current.variables(3).value(),
		wind_direction_10m: current.variables(4).value(),
		pressure_msl: current.variables(5).value(),
    };

    const hours = String(new Date().getUTCHours()).padStart(2, '0');
    const minutes = String(new Date().getUTCMinutes()).padStart(2, '0');

    // simplistic approach, API does not provide wind variability (we could calculate it from hourly data if needed)
    const windDirection = Math.round(weather.wind_direction_10m);
    const windVariableFrom = windDirection - 20 >= 0 ? windDirection - 20 : 360 + (windDirection - 20);
    const windVariableTo = windDirection + 20 <= 360 ? windDirection + 20 : (windDirection + 20) - 360;

    return {
        time: `${hours}${minutes}`,
        city: cityName, 
        windDirection: windDirection,
        windSpeed: Math.round(weather.wind_speed_10m),
        windVariableFrom: windVariableFrom,
        windVariableTo: windVariableTo,
        visibility: weather.visibility <= 10000 ? Math.round(weather.visibility) : 10000, 
        temperature: Math.round(weather.temperature_2m), 
        dewPoint: Math.round(weather.dew_point_2m), 
        qnh: Math.round(weather.pressure_msl)
    };
}