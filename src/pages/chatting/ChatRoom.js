import React, { useEffect, useState, useRef } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import './ChatRoom.css';
import axios from 'axios';
import duck from './파비콘.png';

var stompClient = null;
const ChatRoom = props => {
  const { open, close, header, data } = props;
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState('CHATROOM');
  const [class_num2, setClass_num] = useState(props.data.class_num);
  const [userData, setUserData] = useState({
    username: localStorage.username,
    receivername: '',
    connected: true,
    message: '',
    class_num: '',
    class_name: '',
  });

  const mesData = useRef([]);

  const SPRING_URL = process.env.REACT_APP_SPRING_URL;
  let dataUrl = SPRING_URL + 'message/get?class_num=' + props.data.class_num;

  const getMessage = () => {
    axios.get(dataUrl, { class_num: props.data.class_num }).then(res => {
      console.log(res.data);
      mesData.current = res.data;
      console.log(mesData);
    });
  };
  useEffect(() => {
    console.log(userData);
    connect();
  }, []);

  const resetValues = () => {
    close();
  };
  const connect = () => {
    let Sock = new SockJS('http://localhost:9009/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe('/chatroom/public/' + class_num2, onMessageReceived);
    stompClient.subscribe(
      '/user/' + userData.username + '/private',
      onPrivateMessage
    );
    userJoin();
    getMessage();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: 'JOIN',
      class_num: class_num2,
      class_name: props.data.class_name,
    };
    stompClient.send(
      '/app/message/' + class_num2,
      {},
      JSON.stringify(chatMessage)
    );
  };

  const onMessageReceived = payload => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case 'MESSAGE':
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = payload => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = err => {
    console.log(err);
  };

  const handleMessage = event => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE',
        class_num: class_num2,
        class_name: props.data.class_name,
      };
      console.log(chatMessage);
      stompClient.send(
        '/app/message/' + class_num2,
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: '' });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: 'MESSAGE',
        class_num: class_num2,
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const handleUsername = event => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  return (
    <div>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
              {userData.connected ? (
                <div className="chat-box">
                  <div className="member-list">
                    <ul>
                      <li
                        onClick={() => {
                          setTab('CHATROOM');
                        }}
                        className={`member ${tab === 'CHATROOM' && 'active'}`}
                      >
                        Chatroom
                      </li>
                      {[...privateChats.keys()].map((name, index) => (
                        <li
                          onClick={() => {
                            setTab(name);
                          }}
                          className={`member ${tab === name && 'active'}`}
                          key={index}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {tab === 'CHATROOM' && (
                    <div className="chat-content">
                      <ul
                        className="chat-messages"
                        style={{ overflowY: 'auto' }}
                      >
                        {mesData.current &&
                          mesData.current.map((chat, index) => (
                            <li
                              className={`message ${
                                chat.senderName === userData.username && 'self'
                              }`}
                              key={index}
                            >
                              {chat.senderName !== userData.username && (
                                <div className="avatar">{chat.senderName}</div>
                              )}
                              <div className="message-data">{chat.message}</div>
                              {chat.senderName === userData.username && (
                                <div className="avatar self">
                                  {chat.senderName}
                                </div>
                              )}
                            </li>
                          ))}
                        {publicChats &&
                          publicChats.map((chat, index) => (
                            <li
                              className={`message ${
                                chat.senderName === userData.username && 'self'
                              }`}
                              key={index}
                            >
                              {chat.senderName !== userData.username && (
                                <div className="avatar">{chat.senderName}</div>
                              )}
                              <div className="message-data">{chat.message}</div>
                              {chat.senderName === userData.username && (
                                <div className="avatar self">
                                  {chat.senderName}
                                </div>
                              )}
                            </li>
                          ))}
                      </ul>

                      <div className="send-message">
                        <input
                          type="text"
                          className="input-message"
                          placeholder="메세지를 입력해 주세요"
                          value={userData.message}
                          onChange={handleMessage}
                          onKeyUp={e => {
                            if (e.key === 'Enter' && userData.message !== '') {
                              sendValue();
                            }
                          }}
                        />
                        {/* <button
                          type="button"
                          className="send-button"
                          onClick={sendValue}
                          >
                            </button> */}
                        <img
                          src={duck}
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50px',
                          }}
                          onClick={sendValue}
                        />
                      </div>
                    </div>
                  )}
                  {tab !== 'CHATROOM' && (
                    <div className="chat-content">
                      <ul className="chat-messages">
                        {[...privateChats.get(tab)].map((chat, index) => (
                          <li
                            className={`message ${
                              chat.senderName === userData.username && 'self'
                            }`}
                            key={index}
                          >
                            {chat.senderName !== userData.username && (
                              <div className="avatar">{chat.senderName}</div>
                            )}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && (
                              <div className="avatar self">
                                {chat.senderName}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>

                      <div className="send-message">
                        <input
                          type="text"
                          className="input-message"
                          placeholder="enter the message"
                          value={userData.message}
                          onChange={handleMessage}
                          onKeyUp={e => {
                            if (e.key === 'Enter' && userData.message !== '') {
                              sendPrivateValue();
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="send-button"
                          onClick={sendPrivateValue}
                        >
                          send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                ''
              )}
            </main>
            <footer>
              <button className="close" onClick={resetValues}>
                닫기
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default ChatRoom;
