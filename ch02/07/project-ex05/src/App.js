import React, { Component } from 'react';
import content from './hello.txt';

function App() {
    return (
        <h1>{ content.text }</h1>
    );
}

export default App;