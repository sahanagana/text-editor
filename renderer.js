const { ipcRenderer } = require("electron");
const path = require('path');


//check if index.html is loaded
window.addEventListener("DOMContentLoaded", () => {
   //html vars
    const el = {
        docname : document.getElementById("docname"),
        textarea : document.getElementById("textarea"),
        createdoc : document.getElementById("createdoc"),
        opendoc : document.getElementById("opendoc"),
    }
    //wrapper function for changing the document
    const docChange = (filePath, content = "") => {
        //parse only displays filename
        el.docname.innerHTML = path.parse(filePath).base;
        //enable typing
        el.textarea.removeAttribute("disabled");
        //set text area content
        el.textarea.value = content;
        //can type immediately
        el.textarea.focus();
    }
    //create document button clicked
    el.createdoc.addEventListener("click", () => {
        //ipcRenderer lets main process know that button has been clicked
        ipcRenderer.send("createdoc-trigger");
    });

    //open document button clicked
    el.opendoc.addEventListener("click", () =>{
        ipcRenderer.send("opendoc-trigger");
    });
    //what to do once document created : underscore bc no event obj
    ipcRenderer.on("document-created", (_, filePath) => {
        docChange(filePath);
    });
    //what to do once doc opened
    ipcRenderer.on("document-opened", (_, {filePath, content}) => {
        docChange(filePath, content); 
    });
})