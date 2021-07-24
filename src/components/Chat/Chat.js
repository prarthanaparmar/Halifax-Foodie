import './Chat.css';
import 'firebase/firestore';
import 'firebase/auth';

import { useRef, useState } from 'react';

import Header from '../Header/Header';
import PropTypes from 'prop-types';
import React from 'react';
import SideBar from '../SideBar/SideBar'
import firebase from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();

function Chat() {
  const [user] = useAuthState(auth);

  return(
    <body>
        <Header />
        <SideBar />
          <div className="chat-screen-container">
             <div className="chat-screen-content">
                <section>
                  <ChatRoom />
                </section>
              </div>
           </div>
    </body>
  )
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input className="inputClassMessage" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Enter a message" />

      <button className="sendButton" type="submit" disabled={!formValue}>Send</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL, createdAt } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p className="textMessages">{text}</p>
    </div>
  </>)
}

// Chat.propTypes = {};

// Chat.defaultProps = {};

export default Chat;
