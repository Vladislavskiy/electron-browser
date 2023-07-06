import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ url, setUrl ] = useState('');
  const ipcRenderer = (window as any).ipcRenderer;

  return (
    <div className="App">
      <form action="#" onSubmit={(e) => {
        e.preventDefault();
        console.log(url)
        ipcRenderer.send('loadURL', url)
      }}>
        <input type="text" name="URL" value={url} onChange={(e) => setUrl(e.target.value)}/>
        <input type="submit" value="go"/>
      </form>
    </div>
  );
}

export default App;
