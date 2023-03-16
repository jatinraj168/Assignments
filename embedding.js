const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
async function bootstrap() {
  const openai = new OpenAIApi(configuration);
  const response = await openai.listModels();
  console.log(response);
}

async embedding() {
    let embedding = openai.embedding.
}


bootstrap();
