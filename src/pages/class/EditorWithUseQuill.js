import { useEffect, useState, useRef } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import './ClassDetail.css';

const Editor = props => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  });

  const content = useRef('');

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldContents, source) => {
        // console.log('Text change!');
        // console.log(delta);
        // console.log(setContent);
        let currrentContents = quill.getContents();
        console.log(currrentContents);
        updateHtmlOutput();
      });
    }
  }, [quill, Quill]);

  // Return the HTML content of the editor
  function getQuillHtml() {
    return quill.root.innerHTML;
  }

  function updateHtmlOutput() {
    let html = getQuillHtml();
    //console.log ( html );

    content.current = html;

    //console.log ( 'da2'+content.current ); //O

    props.onMessage(content.current);

    // return content.current;

    // document.getElementById('output-html').innerText = html;
  }

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
