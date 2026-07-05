import React from 'react';
import FileNodeProvider from './components/FileNode/FileNodeProvider';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>File Explorer</h1>
      <FileNodeProvider />
    </div>
  );
}

export default App;