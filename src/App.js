import React, {Component} from 'react';
import './App.css';
import Note from './components/Note/Note.jsx';
import NoteForm from './components/NoteForm/NoteForm.jsx';
import firebase from 'firebase';
import {DBCONFIG} from './config/config.js';
import 'firebase/database';

class App extends Component {

  constructor(){
    super();

    this.state = {
      notes: [
        //{noteId: 1, noteContent: 'nota 1'},
        //{noteId: 2, noteContent: 'nota 2'}
      ]
    };
    // conectar a firebase 
    this.app = firebase.initializeApp(DBCONFIG);
    // referencia a coleccion de la base de datos
    // lo que guardo se quedara en notes (cjto de datos) de la base de datos
    this.db = this.app.database().ref().child('notes');
    // this.db.push this.db.delete etc

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount(){
    const {notes} = this.state;
    
    // actualizar la vista cuando se agrega un dato
    this.db.on('child_added', snap =>{
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState(
        {notes}
      );
    });
    /***********************/

    // actualizar la vista cuando se elimina un dato
    this.db.on('child_removed', snap => {
      for (let i = 0; i< notes.length; i++) {
        if(notes[i].noteId == snap.key){
          notes.splice(i, 1);
        }
      }
      this.setState({notes});
    })
  }

  removeNote(noteId){
    this.db.child(noteId).remove();
  }

  addNote(note){
    /*let {notes} = this.state;
    notes.push({
      noteId: note.length+1,
      noteContent: note
    });*/
    
    /*this.setState({
      notes
    });*/
    this.db.push().set({noteContent: note});
  }

  render() {
    return (
      <div className="notesContainer">
        <div className="notesHeader">
          <h2 className="text-center text-white">React + Firebase</h2>
        </div>

        <div className="notesBody">

          <ul>
          {
            this.state.notes.map(note => {
              return (
                  <Note 
                    noteContent = {note.noteContent}
                    noteId = {note.noteId}
                    key = {note.noteId}
                    removeNote = {this.removeNote}
                  />
            )
            })
          }
          </ul>
        </div>
        <div className="notesFooter">
          <NoteForm 
            addNote={this.addNote}
          />
        </div>
      
      </div>
    );
  }
}

export default App;
