import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Personal Stylist Chatbot (lazily checking GEMINI_API_KEY)
  app.post("/api/stylist", async (req: express.Request, res: express.Response) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "O array de mensagens é obrigatório." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(400).json({ 
          error: "GOOGLE_GEMINI_API_KEY_REQUIRED",
          message: "Para conversar com a Estilista HL IA, por favor configure sua chave GEMINI_API_KEY nos Secrets do projeto." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Character-rich prompt for the personal stylist
      const systemInstruction = `Você é a Estilista HL, uma consultora de imagem e estilo super carismática, refinada e calorosa da loja de roupas premium 'HL | Multimarcas' na Vila Harmonia em Araraquara, SP.
      Diretrizes de comportamento:
      1. Fale sempre em Português do Brasil de forma extremamente amigável, elegante e profissional, tratando as clientes carinhosamente (ex: "olá, querida", "tudo bem, maravilhosa?", "um beijo, querida cliente").
      2. Ajude a cliente a escolher looks baseados no tipo físico, tom de pele, cores favoritas, ocasião (trabalho, festa de casamento, almoço informal ou passeio à tarde na Vila Harmonia) ou humor.
      3. Use ativamente os itens do nosso catálogo atual se referindo a eles com preços reais para inspirar a compra:
         - Blazer Alfaiataria Cremoso Rose (Brand: Morena Rosa) por R$ 389,90. Um item curinga que eleva qualquer visual!
         - Vestido Midi Fluido Floral Harmonia (Brand: Le Lis Blanc) por R$ 429,90. Ultra romântico e leve para dias ensolarados.
         - Calça Clochard Linho Premium (Brand: Cantão) por R$ 269,90. Na cor areia clássica, elegante, ideal para o calor paulista.
         - Camisa Seda Pura Gola Laço (Brand: Morena Rosa) por R$ 349,90. Com caimento impecável e sofisticação pura.
         - Vestido Longo Plissado Festa Imperial (Brand: Le Lis Blanc) por R$ 789,90. Para momentos únicos e festas inesquecíveis.
         - Brinco Cascata de Pérolas Barrocas (Brand: HL Acessórios) por R$ 129,90. O brinco banhado a ouro que realça qualquer rosto.
         - Sandália Salto Bloco Couro Soft (Brand: Schutz) por R$ 319,90. Conforto em couro para caminhar segura e deslumbrante.
         - Blusa Crepe Decote Degagê (Brand: Cantão) por R$ 189,90. Gola boba super fresca, fofa e charmosa.
      4. Ofereça sugestões inteligentes de harmonia. Diga a ela o que combina com o que (ex: a Calça Clochard com a Blusa Degagê, finalizando com o Blazer Rose por cima para um look de reunião sofisticada).
      5. Lembre-a de que ela pode traçar a melhor rota para vir nos visitar em Araraquara (Vila Harmonia) usando a ferramenta de rotas do mapa interativo integrado no site, e que adoraremos recebê-la com café expresso fresquinho e pão de queijo!
      6. Mantenha as mensagens estruturadas com listas em tópicos (Bullets), parágrafos bem espaçados, termos em negrito e emojis delicados de moda (👗, 👠, ✨, 🌸, 🛍️) de forma sofisticada e sem exagerar.`;

      const contents = messages.map((m: any) => ({
        role: m.role || 'user',
        parts: [{ text: m.text }]
      }));

      const modelResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = modelResponse.text || "Hum, tive uma interrupção sutil nas conexões, maravilhosa! Mas me conte mais, o que achou de nossos vestidos ou blazers rose?";
      res.json({ text: responseText });

    } catch (err: any) {
      console.error("Express stylist controller exception:", err);
      res.status(500).json({ 
        error: "SERVER_ERROR", 
        message: "Ocorreu um imprevisto ao consultar a Estilista HL IA: " + err.message 
      });
    }
  });

  // Serve static application assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HL Multimarcas - Server running on port ${PORT}`);
  });
}

startServer();
