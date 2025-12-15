import { inngest } from "./client";
  
  export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
      await step.sleep("wait-a-moment", "1s");
  
      await step.run("LLM-call", async () => {
        return { output: "this is some random message from LLM" };
      });
  
      return { message: `Hello ${event.data.email}!` };
    }
  );
  
  // 🔥 Gemini-based summarizer
  export const summarizeContent = inngest.createFunction(
    { id: "summarize-content" },
    { event: "ai/summarize.content" },
  
    async ({ event, step }) => {
      // ✅ now typed
      const { text } = event.data;
  
      const llmResult = await step.ai.infer("LLM-call", {
        model: step.ai.models.gemini({
          model: "gemini-2.5-flash",
          apiKey:'...',
        }),
        body: {
          contents: [
            {
              role: "user",
              parts: [{ text: `Summarize the following content:\n\n${text}` }],
            },
          ],
        },
      });
  
      // ✅ SAFE Gemini output extraction
      const summary =
        "output_text" in llmResult && typeof llmResult.output_text === "string"
          ? llmResult.output_text
          : "";
  
      const dbResult = await step.run("save-to-db", async () => {
        return {
          id: crypto.randomUUID(),
          content: summary,
        };
      });
  
      const emailResult = await step.invoke("send-email", {
        function: helloWorld,
        data: {
          email: "roshanpanda@gmail.com",
        },
      });
  
      return {
        done: true,
        content: summary,
        dbResult,
        emailResult,
      };
    }
  );
  
  export const functions = [helloWorld, summarizeContent];

