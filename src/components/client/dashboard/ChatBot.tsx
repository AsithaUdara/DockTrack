// src/components/client/dashboard/ChatBot.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  type: "bot" | "user";
  message: string;
  timestamp: string;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatBot({ isOpen, onToggle }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      message:
        "🎉You have 3 active projects. Great news! Your vessel 'MV Sea Voyager' is currently at 68% completion. The hull restoration is complete, and we're now working on engine overhaul. Everything is on schedule! 🚢 ready for delivery on November 15, 2025!",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "2",
      type: "bot",
      message:
        "We completed hull restoration, engine overhaul, electrical system upgrades, and navigation equipment installation. All quality checks have passed with excellent results! ✅",
      timestamp: new Date(Date.now() - 90000).toISOString(),
    },
    {
      id: "3",
      type: "bot",
      message:
        "📋 RECOMMENDED MAINTENANCE SCHEDULE:\n\n🔧 Within 3 months:\n• Hull inspection and cleaning\n• Rudder bearing lubrication\n• Ballast system check\n\n⚙️ Within 6 months:\n• Engine oil analysis\n• Propeller shaft alignment\n• Safety equipment verification\n\n🛠️ Within 12 months:\n• Complete dry-dock inspection\n• Paint system renewal\n• Navigation system calibration",
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
    // {
    //   id: "4",
    //   type: "bot",
    //   message:
    //     "💡 Colombo Dockyard PLC provides comprehensive maintenance services including:\n• Preventive maintenance programs\n• 24/7 emergency repair services\n• Genuine parts supply\n• Certified technician support\n• Remote monitoring systems\n\nWould you like to schedule any of these services?",
    //   timestamp: new Date(Date.now() - 30000).toISOString(),
    // },
    {
      id: "4",
      type: "bot",
      message:
        "💬 You can ask me about your current projects, status and location of on-going projects, completion date, payment, maintenance recommendations and prices of recommendations, or contact details. What would you like to do next?",
      timestamp: new Date(Date.now()).toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    const helpMessage =
      "\n\n💬 You can ask me about your current projects, status and location of on-going projects, completion date, payment, maintenance recommendations and their prices, or contact details. What would you like to do next?";

    // Status and Progress queries
    // if (lowerMessage.includes("status") || lowerMessage.includes("progress")) {
    //   return "Your vessel 'MV Sea Voyager' is currently at 68% completion. The hull restoration is complete, and we're now working on engine overhaul. Everything is on schedule! 🚢";
    // }

    // if (
    //   lowerMessage.includes("completion") ||
    //   lowerMessage.includes("when") ||
    //   lowerMessage.includes("finish")
    // ) {
    //   return "Expected completion date of your current project 'MV Sea Voyager' is November 15, 2025. The project is currently on schedule. We'll notify you of any changes immediately. 📅";
    // }

    // // Project details
    // if (lowerMessage.includes("project") || lowerMessage.includes("details")) {
    //   return "You have 1 active project: MV Sea Voyager (68%) , Pacific Dream, and Atlantic Pearl (just started) are about to start. Star Cruiser has been successfully completed. Would you like details on a specific vessel?";
    // }

    // // Services inquiry
    // if (
    //   lowerMessage.includes("service") ||
    //   lowerMessage.includes("what can you") ||
    //   lowerMessage.includes("help")
    // ) {
    //   return "Colombo Dockyard PLC offers: 🔧 Ship repair & maintenance, ⚡ Hybrid vessel conversion, 🤖 Smart vessel integration, 🌱 Green maritime solutions, and 🛠️ Custom marine engineering. How can we assist you?";
    // }

    // // Location and visit
    // if (
    //   lowerMessage.includes("location") ||
    //   lowerMessage.includes("dock") ||
    //   lowerMessage.includes("where")
    // ) {
    //   return "Your vessel is currently at Dock No. 3. You can visit during working hours (8:00 AM - 5:00 PM). Would you like to schedule a site visit?";
    // }

    // // Cost and payment
    // if (
    //   lowerMessage.includes("cost") ||
    //   lowerMessage.includes("payment")
    // ) {
    //   return "For detailed cost information and payment schedules, please contact our billing department or check the 'Project Details' section. I can help schedule a call with our team if needed.";
    // }

    // // Maintenance recommendations
    // if (
    //   lowerMessage.includes("maintenance") ||
    //   lowerMessage.includes("recommend")
    // ) {
    //   return "� Recommended maintenance: Hull inspection every 6 months, rudder system check, and ballast water treatment system service. Shall I create a maintenance schedule for you?";
    // }

    // // Contact and support
    // if (
    //   lowerMessage.includes("contact") ||
    //   lowerMessage.includes("call") ||
    //   lowerMessage.includes("email")
    // ) {
    //   return "You can reach us at: 📞 +94 11 2 521 011 | 📧 info@colombodockyard.com | Our team is available 24/7 for urgent matters.";
    // }

    // // Greetings
    // if (
    //   lowerMessage.includes("hello") ||
    //   lowerMessage.includes("hi") ||
    //   lowerMessage.includes("hey")
    // ) {
    //   return "Hello! 👋 Great to hear from you! How can I assist you with your vessel today?";
    // }

    // if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
    //   return "You're very welcome! Feel free to ask if you need anything else. We're here to help! 😊";
    // }

    // // Schedule maintenance
    // if (
    //   lowerMessage.includes("schedule") ||
    //   lowerMessage.includes("book") ||
    //   lowerMessage.includes("yes")
    // ) {
    //   setShowQuickReplies(false);
    //   return "Perfect! I'll help you schedule maintenance services. Our team will contact you within 24 hours to confirm your preferred date. You can also call us directly at +94 11 2 521 011. 📅";
    // }

    // // Pricing
    // if (
    //   lowerMessage.includes("prices") ||
    //   lowerMessage.includes("cost") ||
    //   lowerMessage.includes("quote") ||
    //   lowerMessage.includes("how much")
    // ) {
    //   setShowQuickReplies(false);
    //   return "Maintenance service pricing:\n\n💰 3-month service: $2,500 - $4,000\n💰 6-month service: $5,000 - $8,000\n💰 12-month dry-dock: $15,000 - $25,000\n\nPrices vary based on vessel size. Would you like a detailed quote?";
    // }

    // // Delivery/Pickup
    // if (
    //   lowerMessage.includes("delivery") ||
    //   lowerMessage.includes("pickup") ||
    //   lowerMessage.includes("collect") ||
    //   lowerMessage.includes("ready")
    // ) {
    //   setShowQuickReplies(false);
    //   return "Your vessel 'MV Sea Voyager' is ready for pickup at Dock No. 3! 🚢\n\nPlease bring:\n• Vessel registration\n• Payment confirmation\n• Valid ID\n\nPickup: 8 AM - 5 PM (Mon-Fri)";
    // }

    // // More services
    // if (
    //   lowerMessage.includes("service") ||
    //   lowerMessage.includes("what") ||
    //   lowerMessage.includes("offer")
    // ) {
    //   setShowQuickReplies(false);
    //   return "We offer:\n\n🔧 Regular maintenance programs\n⚡ Emergency 24/7 repairs\n📦 Genuine parts supply\n👨‍🔧 Certified technicians\n📱 Remote monitoring\n\nWhich service interests you?";
    // }

    // // Contact
    // if (
    //   lowerMessage.includes("contact") ||
    //   lowerMessage.includes("call") ||
    //   lowerMessage.includes("email")
    // ) {
    //   setShowQuickReplies(false);
    //   return "📞 Contact Us:\n\nOffice: +94 11 2 521 011\nEmergency: +94 77 123 4567\nEmail: info@colombodockyard.com\n\nHours: Mon-Fri 8AM-5PM\nEmergency: 24/7";
    // }

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return (
        "Hello! 👋 Great to hear from you! How can I assist you with your vessel today?" +
        helpMessage
      );
    }

    // Vessel Status / Progress
    if (lowerMessage.includes("status") || lowerMessage.includes("progress")) {
      return (
        "Your vessel 'MV Sea Voyager' is currently at 68% completion. The hull restoration is complete, and we're now working on engine overhaul. Everything is on schedule! 🚢" +
        helpMessage
      );
    }

    // Completion / Timeline
    if (
      lowerMessage.includes("completion") ||
      lowerMessage.includes("when") ||
      lowerMessage.includes("finish")
    ) {
      return (
        "Expected completion date of your current project 'MV Sea Voyager' is November 15, 2025. The project is currently on schedule. We'll notify you of any changes immediately. 📅" +
        helpMessage
      );
    }

    // Project Details
    if (lowerMessage.includes("project") || lowerMessage.includes("details")) {
      return (
        "You have 1 active project: MV Sea Voyager (68%). Pacific Dream and Atlantic Pearl are about to start. Star Cruiser has been successfully completed. Would you like details on a specific vessel?" +
        helpMessage
      );
    }

    // Services Inquiry (General)
    if (
      lowerMessage.includes("service") ||
      lowerMessage.includes("what can you") ||
      lowerMessage.includes("help")
    ) {
      return (
        "Colombo Dockyard PLC offers: 🔧 Ship repair & maintenance, ⚡ Hybrid vessel conversion, 🤖 Smart vessel integration, 🌱 Green maritime solutions, and 🛠️ Custom marine engineering. How can we assist you?" +
        helpMessage
      );
    }

    // Location & Visit
    if (
      lowerMessage.includes("location") ||
      lowerMessage.includes("dock") ||
      lowerMessage.includes("where")
    ) {
      return (
        "Your vessel is currently at Dock No. 3. You can visit during working hours (8:00 AM - 5:00 PM). Would you like to schedule a site visit?" +
        helpMessage
      );
    }

    // Cost & Payment
    if (lowerMessage.includes("cost") || lowerMessage.includes("payment")) {
      return (
        "For detailed cost information and payment schedules, please contact our billing department or check the 'Project Details' section. I can help schedule a call with our team if needed." +
        helpMessage
      );
    }

    // Maintenance Recommendation
    if (
      lowerMessage.includes("maintenance") ||
      lowerMessage.includes("recommend")
    ) {
      return (
        "🛠️ Recommended maintenance: Hull inspection every 6 months, rudder system check, and ballast water treatment system service. Shall I create a maintenance schedule for you?" +
        helpMessage
      );
    }

    // Maintenance Pricing
    if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("prices") ||
      lowerMessage.includes("quote") ||
      lowerMessage.includes("how much")
    ) {
      setShowQuickReplies(false);
      return (
        "Maintenance service pricing:\n\n💰 3-month service: $2,500 - $4,000\n💰 6-month service: $5,000 - $8,000\n💰 12-month dry-dock: $15,000 - $25,000\n\nPrices vary based on vessel size. Would you like a detailed quote?" +
        helpMessage
      );
    }

    // Delivery / Pickup
    if (
      lowerMessage.includes("delivery") ||
      lowerMessage.includes("pickup") ||
      lowerMessage.includes("collect") ||
      lowerMessage.includes("ready")
    ) {
      setShowQuickReplies(false);
      return (
        "Your vessel 'MV Sea Voyager' is ready for pickup at Dock No. 3! 🚢\n\nPlease bring:\n• Vessel registration\n• Payment confirmation\n• Valid ID\n\nPickup hours: 8 AM - 5 PM (Mon–Fri)" +
        helpMessage
      );
    }

    // Schedule Maintenance
    if (
      lowerMessage.includes("schedule") ||
      lowerMessage.includes("book") ||
      lowerMessage.includes("yes")
    ) {
      setShowQuickReplies(false);
      return (
        "Perfect! I'll help you schedule maintenance services. Our team will contact you within 24 hours to confirm your preferred date. You can also call us directly at +94 11 2 521 011. 📅" +
        helpMessage
      );
    }

    // Contact / Support
    if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("call") ||
      lowerMessage.includes("email")
    ) {
      setShowQuickReplies(false);
      return (
        "📞 Contact Us:\n\nOffice: +94 11 2 521 011\nEmergency: +94 77 123 4567\nEmail: info@colombodockyard.com\n\nHours: Mon–Fri 8AM–5PM | Emergency: 24/7" +
        helpMessage
      );
    }

    // Gratitude
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return (
        "You're very welcome! Feel free to ask if you need anything else. We're here to help! 😊" +
        helpMessage
      );
    }

    // Default Fallback Recommendation
    return "💬 You can ask me about your current projects, status and location of on-going projects, completion date, payment, maintenance recommendations and their prices, or contact details. What would you like to do next?";

    // // Default response
    // setShowQuickReplies(false);
    // return (
    //   "I understand you're asking about: \"" +
    //   userMessage +
    //   '"\n\nI can help with:\n🔧 Maintenance scheduling\n💰 Service pricing\n📦 Parts information\n📞 Contact details\n\nWhat would you like to know?'
    // );
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      message: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: botResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  //   const quickActions = [
  //     // {
  //     //   icon: "✅",
  //     //   label: "Yes, Schedule Service",
  //     //   message: "Yes, I want to schedule maintenance",
  //     // },
  //     // {
  //     //   icon: "�",
  //     //   label: "Get Pricing",
  //     //   message: "How much does maintenance cost?",
  //     // },
  //     // {
  //     //   icon: "�",
  //     //   label: "Pickup Details",
  //     //   message: "I want to collect my vessel",
  //     // },
  //     // { icon: "�", label: "Contact Support", message: "How can I contact you?" },
  //   ];

  const handleQuickAction = (message: string) => {
    setInputMessage(message);
    setShowQuickReplies(false);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[calc(100vh-8rem)] flex flex-col">
          <div className="bg-linear-to-r from-blue-800 to-blue-900 text-white p-4 rounded-t-xl flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold">CDL Assistant</h3>
              <span className="text-xs text-blue-200">Online</span>
            </div>
            <button
              onClick={onToggle}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 flex-1 overflow-y-auto bg-gray-50 min-h-[300px] max-h-[400px]">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 shadow-sm ${
                      msg.type === "bot"
                        ? "bg-white border border-gray-200 text-gray-800"
                        : "bg-blue-800 text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {msg.message}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.type === "bot" ? "text-gray-400" : "text-blue-200"
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Reply Buttons */}
          {/* {showQuickReplies && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-600 mb-2 font-medium">
                Quick replies:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.message)}
                    className="flex items-center justify-start space-x-2 px-4 py-2.5 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg text-sm text-gray-700 hover:text-blue-800 transition-all shadow-sm hover:shadow"
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl shrink-0">
            <div className="flex space-x-2 mb-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-800"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="px-4 py-2.5 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <Link
              href="/client/contact"
              className="w-full block text-center px-4 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              📞 Contact Support Team
            </Link>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-800 hover:bg-blue-900 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40 group"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
              1
            </span>
          </>
        )}
      </button>
    </>
  );
}
