"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

interface Messages{
    _id : string;
    content : string;
    userId : string; 
    userName : string;
    createdAt : string;
}

export default function ChatMessages () {

    const [messages, setMessages] = useState<Messages[]>([]);
    const {data : session} = authClient.useSession();

    useEffect(() => {
        async function fetchMessages() {
            const request = await fetch ("/api/messages");
            if (!request.ok) {
                console.log(request.status);
                return;
            }
            const data = await request.json();
            setMessages(data);
        }
        fetchMessages();
        //const interval = setInterval(fetchMessages, 2000);
    }, [])
    if (messages.length === 0) {
        return <div>Aucun message.</div>
    }
    return (
    <div className="p-4 flex gap-4 flex-col">
        {messages.map((m) => {
            const isOwn = m.userId === session?.user.id;
            return (
            <div key={m._id} className={`flex flex-col rounded ${isOwn ? "items-end" : "items-start"}`}>
                {!isOwn && <p>{m.userName}</p>}
                <p>{m.content}</p>
                <p>{new Date(m.createdAt).toLocaleTimeString("fr-FR")}</p>
            </div>
            );
        })}
    </div>
    );
}