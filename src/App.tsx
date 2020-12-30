import React from 'react';
import logo from './logo.svg';
import './App.css';
import ResumeEditor from './components/ResumeEditor';
import TestConfig from './data-model/test-config';

function App() {
  return (
    <ResumeEditor config={TestConfig} />
  );
}

export default App;
