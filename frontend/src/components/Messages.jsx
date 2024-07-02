

export const Messages = () => {
  return (
    <div className="chat chat-end p-4">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="chat-bubble">I hate you!</div>
      <time className="text-xs opacity-50">12:46</time>
    </div>
  );
};
