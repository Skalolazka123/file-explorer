import React from 'react';
import fsData from './data/fs.json';
import FileNode from './components/FileNode/FileNode';
import './App.css';

function App() {
  const rootContent = fsData.root;
  return (
    <div className='App'>
      <h1>File Explorer</h1>
      {Object.entries(rootContent).map(([name, data]) => (
        <FileNode 
          key={name} 
          name={name} 
          data={data} 
        />
      ))}
    </div>
  );
}

export default App;