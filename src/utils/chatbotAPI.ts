import axios from "axios";

// Fonction pour interagir avec l'API Hugging Face
export async function query(data: string) {
    const initialPrompt = "Tu es un chatbot spécialisé dans l'assistance aux coachs en séduction. Ton rôle est de fournir des conseils et des recommandations sur la gestion des clients dans le contexte de la séduction et de la mode. En tant qu'expert dans ces domaines, tu es là pour aider les coachs à répondre aux questions de leurs clients, leur fournir des stratégies de séduction efficaces, et donner des conseils sur les aspects liés à la mode, comme les choix vestimentaires et les accessoires appropriés. Ton objectif est d'offrir des réponses précises et adaptées aux besoins des coachs, en mettant l'accent sur des conseils pratiques et des stratégies éprouvées. Utilise tes connaissances en séduction et en mode pour donner des recommandations pertinentes et utiles pour améliorer l'expérience de leurs clients.";
    let query = {
        "inputs": initialPrompt + data,
        "parameters": {
            "max_new_tokens": 500,  // Ajuste cette valeur selon la longueur
            "temperature": 0.7,     // Garde les réponses cohérentes
            "top_p": 0.9,           // Contrôle la diversité
            "stop": ["<|endoftext|>", ". "]  // Arrête après une phrase complète
        }
    };
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
            query,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY
                }
            }
        );
        // Extraire toutes les parties après "<|assistant|>"
        const generatedText = response.data[0].generated_text;

        // Diviser par "<|assistant|>" pour récupérer chaque réponse d'assistant
        const assistantResponses = generatedText.split("<|endoftext|>");

        // Récupérer la dernière réponse après "<|assistant|>"
        const lastResponse = assistantResponses[assistantResponses.length - 1].trim();

        return lastResponse;
    } catch (error) {
        console.error("Erreur lors de la requête vers Hugging Face API:", error);
        return "Désolé, il y a eu une erreur avec le chatbot.";
    }
}
