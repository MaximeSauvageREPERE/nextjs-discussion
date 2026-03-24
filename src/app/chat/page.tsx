import ChatInput from "../components/ChatInput";
import ChatMessages from "../components/ChatMessages";
import LogoutButton from "../components/LogoutButton";

export default function ChatPage() {
    return (
        <h1>
            <LogoutButton></LogoutButton>
            <ChatMessages></ChatMessages>
            <ChatInput></ChatInput>
        </h1>
    );
}