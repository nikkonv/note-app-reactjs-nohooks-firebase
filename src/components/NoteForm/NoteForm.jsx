import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component {
  constructor(){
    super();
    this.addNote = this.addNote.bind(this);
  }

  addNote(){
    this.props.addNote(this.textInput.value);
    this.textInput.value = "";
    this.textInput.focus();
  }

  render(){
    return(
      <div className="NoteForm">
      <input 
        placeholder="Write a note"
        ref={input => {this.textInput = input;}}
        type="text"

      />
      {/*funcion anonima para no perder el scope de addNote*/}
      <button
        onClick={this.addNote}  
      >
      
        Add Note
      </button>
    </div>
    )
  }
}

export default NoteForm;