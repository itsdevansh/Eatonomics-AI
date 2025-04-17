import { motion } from "framer-motion";
import { MessageSquare, Send, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const token = localStorage.getItem("token")

  const defaultPrompts = [
    "Give me a week's meal plan according to my goal under $100"
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (message.trim()) {
      // Add the user's message to the chat
      const userMessage = { id: Date.now(), text: message, isBot: false };
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");
  
      // Show typing indicator
      setIsTyping(true);
  
      try {
        // Make the API call
        const response = await fetch("http://127.0.0.1:8000/chat/reply", {
          method: "POST",
          headers: { "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`},
          body: JSON.stringify({"message": message}),
        });
  
        const data = await response.json();
  
        // Add the bot's response to the chat
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: data.reply || `Your Personalized Meal Plan is on the Way! 🍎🍽️
Hi there!
I’m thrilled to see you taking the first step toward healthier eating. Let’s be honest—eating healthy isn’t always easy, and eating healthy on a budget? That’s a whole new level of challenge. But don’t worry, you’re not in this alone!
I’m working hard to craft a meal plan tailored just for you, along with a custom grocery list designed to make sticking to your goals simple and stress-free. You’ll find everything you need waiting for you on the Meal Planner tab soon.
So sit tight and get ready to enjoy a delicious, healthy, and budget-friendly journey. You've got this, and I’ve got your back!
Cheers to healthy eating,
Your Meal Planner AI 🍳🌱`, isBot: true },
        ]);
      } catch (error) {
        console.error("API call failed:", error);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: "Oops! I couldn't fetch a response. Please try again.", isBot: true },
        ]);
      } finally {
        // Remove typing indicator
        setIsTyping(false);
      }
  
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully!",
      });
    }
  };
  

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Voice recording stopped" : "Voice recording started",
      description: "This feature will be implemented soon!",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-accent pt-20 px-4" // Updated pt-16 to pt-20
    >
      <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-lg h-[calc(100vh-8rem)]">
        <div className="h-full flex flex-col">
          <div className="flex items-center p-4 border-b">
            <MessageSquare className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-xl font-serif font-semibold">Health Assistant</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                    msg.isBot
                      ? "bg-muted text-foreground hover:bg-muted/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-muted text-foreground p-3 rounded-lg">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </span>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="p-4 border-t space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {defaultPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(prompt)}
                  className="text-sm px-3 py-1 rounded-full bg-accent hover:bg-accent/80 transition-colors duration-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="flex-none"
                onClick={toggleVoiceRecording}
              >
                {isRecording ? (
                  <MicOff className="w-5 h-5 text-destructive" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit">
                <Send className="w-4 h-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;