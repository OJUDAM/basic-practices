import React, { Component } from 'react';
import content from './hello.txt';
import './App.css'

function App() {
    return (
        <h1 className='Header'>{ content }</h1>
    );
}

export default App;