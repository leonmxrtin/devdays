No he podido trabajar con Docker en el entorno de desarrollo ya que Ollama [no puede acceder a la GPU en MacOS cuando se ejecuta dentro de un contenedor](https://chariotsolutions.com/blog/post/apple-silicon-gpus-docker-and-ollama-pick-two/).

Sustituir API key de OpenAI en `.env`, usando `.env.example` como plantilla.

Recomiendo levantar MongoDB con `docker run --name mongodb -d -p 27017:27017 -v mongodb_data:/data/db mongo`, instalar los paquetes con `npm install` y ejecutar con `npm run dev` (para que lea directamente el fichero de variables de entorno).

Si se desean probar las funcionalidades relacionadas con Ollama, se puede descargar directamente en la [web](https://ollama.com/download).

Debe correrse con `ollama serve`.

Endpoints añadidos:

### POST http://localhost:31337/api/v1/atis/report

```json
{
    "city": "Seville"
}
```

### POST http://localhost:31337/api/v1/ai/chat

```json
{
    "provider": "openai", // or ollama
    "prompt": "Hola, qué modelo eres?"
}
```
