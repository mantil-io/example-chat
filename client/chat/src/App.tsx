import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.scss';
import createApi, { ChatApi } from './api';
import { format, differenceInCalendarDays } from 'date-fns';

interface Message {
  id: string;
  user: string;
  content: string;
  createdAt: string;
}

function requestUri(method: string) {
  return `mantil-project-demo-chat-chat.${method}`;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const api = useMemo(() => {
    return createApi('wss://uaejc9t3ga.execute-api.eu-central-1.amazonaws.com/$default');
  }, []);

  useEffect(() => {
    api.subscribe('chat-messages', msg => {
      setMessages(messages => [...messages, msg]);
    });
    api.request(requestUri('get'), null).then(rsp => {
      setMessages(rsp.messages);
    });
  }, []);

  const [username, setUsername] = useState<string>("");

  return (
    <div className="App">
      <div className="chat">
        { username === "" ?
          <UserPrompt setUsername={setUsername} />
          :
          <>
            <Messages messages={messages} />
            <Input api={api} username={username} />
          </>
        }
      </div>
    </div>
  );
}

interface MessagesProps {
  messages: Message[];
}

function Messages({ messages }: MessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const formatTime = (m: Message) => {
    const diff = differenceInCalendarDays(new Date(), new Date(m.createdAt));
    if (diff >= 1) {
      return format(new Date(m.createdAt), 'M.d. H:mm:ss');
    } else {
      return format(new Date(m.createdAt), 'H:mm:ss');
    }
  }
  return (
    <div className="messages">
      { messages.map(message => {
        return (
          <div className="message" key={message.id}>
            <div className="info-row">
              <div className="user">{message.user}</div>
              <div className="time">{formatTime(message)}</div>
            </div>
            <div className="content">{message.content}</div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

interface InputProps {
  api: ChatApi;
  username: string;
}

function Input({ api, username }: InputProps) {
  const [content, setContent] = useState<string>("");
  const onEnter = useCallback((e: any) => {
    if (e.key !== 'Enter') {
      return
    }
    api.request(requestUri('add'), {
      message: {
        user: username,
        content,
      },
    });
    setContent('');
  }, [content, api]);

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <input
      ref={inputRef}
      className="input"
      type="text"
      value={content}
      onChange={e => setContent(e.target.value)}
      onKeyDown={onEnter}
    />
  )
}

interface UserPromptProps {
  setUsername: (name: string) => void;
}

function UserPrompt({ setUsername }: UserPromptProps) {
  const [userInput, setUserInput] = useState<string>("");
  const onEnter = useCallback((e: any) => {
    if (e.key !== 'Enter') {
      return
    }
    setUsername(userInput);
  }, [setUsername, userInput]);
  return (
    <div className="user-prompt">
      Enter your username:
      <input
        className="user-input"
        type="text"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        onKeyPress={onEnter}
      />
    </div>
  )
} 

export default App;
