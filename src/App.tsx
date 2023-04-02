import React, { Component } from 'react';

import "./assets/styles.css";

import { CKEditor } from '@ckeditor/ckeditor5-react';


// NOTE: Use the editor from source (not a build)!
import DecoupledEditor from 'ckeditor5-custom-build/build/ckeditor';

//import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { minuta } from './minuta';

const editorConfiguration = {
    toolbar: [ 'bold', 'italic' ]
};

class App extends Component {
  render() {
    return (
        <div className="App">
          <h2>CKEditor 5 using a custom build - DecoupledEditor</h2>

          <div className="document-editor">
            <div className="document-editor__toolbar"></div>
            <div className="document-editor__editable-container">
            <CKEditor
              config={
                {
                  ...DecoupledEditor.defaultConfig,
                  fontSize: {
                    options: [ 9, 10, 11, 12, 'default', 14, 15 ],
                    supportAllValues: true
                  }
                }
              }
              editor={ DecoupledEditor }
              onReady={ editor => {
                  console.log( 'Editor is ready to use!', editor );

                  // Add these two lines to properly position the toolbar
                  const toolbarContainer = document.querySelector( '.document-editor__toolbar' );

                  // idk why editor is calling onReady twice (probably some bug with react context), so delete previous toolbar
                  toolbarContainer?.replaceChildren();
                  toolbarContainer?.appendChild( editor.ui.view.toolbar.element );
              } }
              onChange={ ( event, editor ) => console.log( { data: editor.getData(), event, editor } ) }
              data={ minuta }
            />
            </div>
          </div>
        </div>
      );
    }
}

export default App;