import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component {
  constructor(){

  }
  render(){
    return(
      <div className="NoteForm">
        <input type="text"/>

        <button>
          Add Note
        </button>
      </div>
    )   
  }
}

export default NoteForm;