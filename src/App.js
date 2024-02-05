import "./App.css";
import { Chat } from "./components/chat/Chat";
import UserContextProvider from "./context/ChatContextProvider";

function App() {
  return (
    <div className="App py-2 h-[100vh]">
      <UserContextProvider>
        <Chat />
      </UserContextProvider>
    </div>
  );
}

export default App;
