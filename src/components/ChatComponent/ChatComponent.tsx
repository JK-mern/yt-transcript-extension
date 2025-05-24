import ChatHeader from "./ChatHeader/ChatHeader"


interface chatComponentProps {
    setEdit : (value : boolean) => void
}
function ChatComponent( {setEdit} : chatComponentProps) {
  return (
    <div>
      <ChatHeader  setEdit={setEdit}/>
    </div>
  )
}

export default ChatComponent
