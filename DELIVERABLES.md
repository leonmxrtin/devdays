# ENTREGABLES de NIVEL 0

## N0-1
Añadir el campo updatedAt en el modelo de Issue.

# ENTREGABLES de NIVEL 1

## N1-1 
Resuelto usando [octokit.js](https://github.com/octokit/octokit.js), SDK oficial de GitHub. En la función `fetchGithubIssues` se utiliza un iterador asíncrono de dicha librería, que se encarga de extraer todas las páginas disponibles del endpoint en cuestión.

## N1-2 
Añado métricas relativas a los tiempos de ejecución del LLM, ya sea local o remoto, concretamente:
- Time to First Token (TTFT): mide el lapso de tiempo entre el envío de la entrada hasta la generación del primer token de la respuesta. Implemento su medición haciendo uso de las "streamed responses", es decir, solicitar a la API de inferencia que vaya devolviendo la salida de forma incremental conforme se vaya generando. A la recepción del primer token de la respuesta, se mide el TTFT.
- Tiempo total de inferencia: tiempo total transcurrido hasta obtener la respuesta completa. Mido el tiempo a la recepción del evento `response.completed`, que indica la finalización de la inferencia.
Añado ambas métricas como atributo de la traza generada al llamar a la función `generateAIResponse`, y también el proveedor de LLM utilizado `ollama/openai`, para desglosar futuras estadísticas.

## N1-3 
Completo la implementación de Ollama, usando la misma librería de OpenAI. Añado la propiedad `provider` tanto al controller como a la función `generateText` para facilidad de uso.

# ENTREGABLES de NIVEL 2

Para integrar los requisitos de todos los retos, estoy pensando en implementar un sistema similar al [ATIS](https://en.wikipedia.org/wiki/Automatic_terminal_information_service) del mundo aeronáutico. Es un sistema que emite periódicamente mensajes por radio con información sobre estado meteorológico general, condición de las pistas, visibilidad, etc.

Utilizaría la API de Open-Meteo para obtener la información

## N2-P2-A 

## N2-P2-B

## N2-P2-C