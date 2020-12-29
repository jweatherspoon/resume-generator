import React from 'react';
import logo from './logo.svg';
import './App.css';
import ResumeEditor from './components/ResumeEditor';

function App() {
  return (
    <ResumeEditor config={{
        name: "New Configuration",
        templateId: "flashy",
        theme: "",
        regions: {
            sidebar: [

            ],
            mainContent: [
                
            ]
        }
    }} />
  );
}

export default App;
