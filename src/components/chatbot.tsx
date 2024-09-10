import React, { useState, useEffect, useRef } from 'react';
import { query } from '../utils/chatbotAPI';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [chatLog, setChatLog] = useState([{user: "assistant", message: "Bonjour, je suis votre expert en séduction. Comment puis-je vous aider ?"}]);

  // Référence à la div contenant les messages
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    // Ajoute la question à la conversation
    const newChatLog = [...chatLog, { user: "prompter", message: inputText }];
    setChatLog(newChatLog);

    setInputText(""); // Réinitialiser l'input

    let prompt = "";
    for (let i = 0; i < newChatLog.length; i++) {
      prompt += "<|" + newChatLog[i].user + "|>" + newChatLog[i].message + "<|endoftext|>";
    }

    // Appel à l'API Hugging Face
    const botResponse = await query(prompt);

    // Ajoute la réponse du chatbot à la conversation
    setChatLog([...newChatLog, { user: "assistant", message: botResponse }]);
  };

  // Effet pour faire défiler jusqu'au bas à chaque ajout de message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog]);

  // Fonction pour gérer l'appui sur la touche Entrée
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Empêche le saut de ligne
      handleSend(); // Envoie le message
    }
  };

  return (
    <>
      {/* Bouton flottant pour ouvrir/fermer le chatbot */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={toggleChatbot}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500 focus:outline-none"
        >
          💬
        </button>
      </div>

      {/* Boîte de chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white border border-gray-300 rounded-lg shadow-lg w-96 h-80 flex flex-col">
          {/* En-tête du chat */}
          <div className="bg-blue-600 text-white p-2 rounded-t-lg text-center font-bold">
            Chatbot
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatLog.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.user === 'prompter' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${chat.user === 'prompter' ? 'bg-blue-500 text-white' : 'bg-gray-100 border border-gray-300'}`}
                >
                  <strong>{chat.user === 'prompter' ? 'Vous' : 'Assistant'}:</strong> <span>{chat.message}</span>
                </div>
              </div>
            ))}
            {/* Référence pour le défilement */}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-2 flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none"
              placeholder="Écris un message..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
