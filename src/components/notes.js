import React, { Component } from 'react';
import axios from 'axios';
import Note from './note';

let keyCounter=0; 

class Notes extends Component {
    state = {
        notes: []
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/notes/')
            .then(response => {
                this.setState({ notes: response.data })
            })
            .catch(error => {
                console.log(`An error occured: ${error}`);
            })
    }
    render() {
        return (
          <div className="Notes">
            <h1>Your notes</h1>
              { this.state.notes.map((note) => {
                return <Note title={note.title} content={note.content} key={keyCounter++} />;
              })}
          </div>
        );
      }
    }
    
    export default Notes;