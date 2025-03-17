import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Paperclip, Plus, X } from "lucide-react";
import { ChatMessage, ModalProps } from "@/types";
import { motion } from "framer-motion";

const contacts = [
  {
    name: "Udit",
    image:
      "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
  },
  {
    name: "Saransh",
    image:
      "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
  },
  {
    name: "Rushil",
    image:
      "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
  },
  {
    name: "Dhruv",
    image:
      "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
  },
];

export default function ChatApp(props: ChatMessage) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How are you?", sender: "other" },
    { text: "I'm good! How about you?", sender: "me" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "me" }]);
    setInput("");
  };

  return (
    <Card className="w-full h-full border-0 rounded-none  max-w-xl shadow-lg flex">
      {/* Sidebar */}
      <div className="w-[35%] border-r    flex flex-col">
        <div className="flex justify-between items-center pt-3 pb-2 px-2 ">
          <h2 className="text-lg font-bold inline-block">Messages</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        <ScrollArea className="flex-grow space-y-2">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <Avatar className="border-orange-600 border-2">
                <AvatarImage
                  src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
                  alt="User"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="overflow-x-hidden">
                <h3 className="text-sm font-semibold">Lorem10</h3>
                <p className="text-xs text-gray-500">Lorem ipsume iusto!</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      {/* Chat Area */}
      <div className="w-[65%] flex flex-col  h-full ">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center justify-center gap-1">
            <img
              src={
                "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
              } // Default image if none provided
              alt="Sender"
              className="w-8 h-8 rounded-full mr-2"
            />

            <h2 className="text-lg font-semibold">Lorem10</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={props.close}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <ScrollArea className="flex-grow p-2 flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end ${msg.sender === "me" ? "justify-end" : ""}`}
            >
              <div
                className={`p-2 rounded-xl mt-2 max-w-xs w-fit ${
                  msg.sender === "me"
                    ? "bg-indigo-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="p-4 border-t flex gap-2  ">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim() !== "") {
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="bg-gray-100 rounded-full px-4"
          />
          <Button
            onClick={sendMessage}
            className="rounded-full bg-indigo-700 hover:bg-indigo-900 text-white"
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
}
