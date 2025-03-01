import React, { useState } from "react";

export type WithJoinChatProps = {
  name?: string;
};

export type PropsWithJoinChat<T extends object = {}> = T & WithJoinChatProps;

//todo: fix this any type
const withJoinChat = (WrappedComponent: React.ComponentType<any>) => {
  return function WithJoinChatComponent(props: any) {
    const [isJoined, setIsJoined] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const handleJoinChat = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (name.trim()) {
        setIsJoined(true);
      }
    };

    if (!isJoined) {
      return (
        <div>
          <h1>Join Chat</h1>
          <form onSubmit={handleJoinChat}>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button type="submit">Join</button>
          </form>
        </div>
      );
    }

    return <WrappedComponent {...props} name={name} />;
  };
};

export default withJoinChat;
