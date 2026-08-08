import express from "express";
import path from "path";
import fs from "fs/promises";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini AI SDK securely on the server
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", geminiReady: !!process.env.GEMINI_API_KEY });
});

// Endpoint to permanently save photo to public/dra-debora.jpg and dist/dra-debora.jpg
app.post("/api/upload-photo", express.json({ limit: "15mb" }), async (req, res) => {
  try {
    const { imageData } = req.body;
    if (!imageData || typeof imageData !== "string") {
      return res.status(400).json({ error: "Imagem inválida" });
    }

    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const publicPath = path.join(process.cwd(), "public", "dra-debora.jpg");
    const distPath = path.join(process.cwd(), "dist", "dra-debora.jpg");

    await fs.writeFile(publicPath, buffer);
    try {
      await fs.writeFile(distPath, buffer);
    } catch (e) {
      // ignore if dist directory doesn't exist yet
    }

    res.json({ success: true, message: "Foto salva com sucesso em public/dra-debora.jpg!" });
  } catch (err: any) {
    console.error("Erro ao salvar foto no servidor:", err);
    res.status(500).json({ error: "Erro ao salvar imagem no servidor." });
  }
});

// AI Assistant endpoint for Psicóloga Débora Costa's clinic pre-screening & FAQ
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userQuery } = req.body;

    if (!userQuery && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: "Mensagem inválida." });
    }

    if (!ai) {
      return res.status(503).json({
        error: "Chave da API Gemini não configurada no servidor.",
        reply:
          "O assistente virtual está temporariamente em manutenção. Você pode agendar sua consulta diretamente pelo formulário ou via WhatsApp!",
      });
    }

    const systemInstruction = `Você é a Assistente Virtual da Psicóloga Débora Costa (CRP 03/24682), especialista em Terapia Cognitivo-Comportamental (TCC).
Sua missão é atender os pacientes com extremo acolhimento, empatia, escuta ética e clareza em português do Brasil.

INFORMAÇÕES CHAVE DA DRA. DÉBORA COSTA:
- Nome: Dra. Débora Costa - Psicóloga Clínica
- Registro Profissional: CRP 03/24682
- Especialidades: Terapia Cognitivo-Comportamental (TCC).
- Público: Adultos, adolescentes, casais e suporte individual.
- Atendimentos:
  * Online: Videoconferência segura e criptografada (Google Meet / Zoom), no conforto da casa do paciente.
  * Presencial: Consultório físico em ambiente tranquilo, acolhedor e silencioso.
- Principais Demandas: Ansiedade, Depressão, Síndrome do Pânico, Autoestima, Autoconhecimento, Estresse/Burnout, Conflitos Amorosos e Familiares, Luto e Transições de Vida.
- Duração da Sessão: Aprox. 50 minutos.
- Reembolso de Convênio/Plano de Saúde: A Dra. Débora fornece recibos oficiais com CRP e laudos para que o paciente solicite o reembolso integral ou parcial junto ao seu plano de saúde (Bradesco, SulAmérica, Unimed, Amil, Porto Seguro, etc.).
- Sigilo Profissional: Todas as conversas e sessões seguem estritamente o Código de Ética Profissional do Psicólogo (CFP).

DIRETRIZES DE RESPOSTA:
1. Seja sempre acolhedor, empático, respeitoso e ético.
2. Esclareça dúvidas sobre como funciona a psicoterapia em TCC, primeira sessão, sigilo e agendamento.
3. Se o paciente relatar sentimentos de ansiedade, estresse ou angústia, ofereça suporte acolhedor e valide os sentimentos dele, incentivando o acompanhamento psicológico.
4. IMPORTANTE: Caso haja menção a ideação suicida ou crise grave imediata, lembre com carinho que para emergências de saúde mental é recomendado entrar em contato imediato com o CVV (Centro de Valorização da Vida) pelo telefone 188 (gratuito, 24h) ou buscar um pronto atendimento (SAMU 192 / UPA).
5. Mantenha respostas claras, diretas, divididas em parágrafos curtos e amigáveis.
6. Sempre inclua um convite gentil para o paciente agendar uma sessão inicial ou chamar a Dra. Débora no WhatsApp.`;

    const promptText = userQuery || messages[messages.length - 1]?.content || "";

    // Call Gemini 3.1 Pro Preview
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    const reply = response.text || "Desculpe, não consegui processar a resposta no momento. Por favor, tente novamente ou entre em contato pelo WhatsApp.";

    res.json({ reply });
  } catch (error: any) {
    console.error("Erro na rota Gemini AI:", error);
    res.status(500).json({
      error: "Erro ao comunicar com a inteligência artificial.",
      details: error?.message || "Erro desconhecido",
      reply:
        "Tivemos um pequeno problema ao processar sua dúvida. Você pode entrar em contato diretamente pelo botão de WhatsApp para falar com a Dra. Débora Costa!",
    });
  }
});

async function startServer() {
  // Serve static assets in production or use Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor PWA Psicóloga Débora Costa executando na porta ${PORT}`);
  });
}

startServer();

