import javascriptLogo from './assets/javascript.svg'
import * as monaco from "monaco-editor";
import "./style.css";

import pikachuHTML from "./exercices/pikachu.html?raw";
import pikachuCSS from "./exercices/pikachu.css?raw";

document.querySelector("#app").innerHTML = `
<div class="container">

    <header>
        <h1>🎓 Validation HTML / CSS 🎓</h1>
    </header>

    <section class="editors">

        <div class="editor-box">
            <h2>HTML</h2>
            <div id="html-editor"></div>
        </div>

        <div class="editor-box">
            <h2>CSS</h2>
            <div id="css-editor"></div>
        </div>

    </section>

    <section class="buttons">

        <button id="run">
            ▶ Exécuter
        </button>

        <button id="reset">
            ↺ Réinitialiser
        </button>

    </section>

    <section class="preview">

        <h2>Aperçu</h2>

        <iframe id="result"></iframe>

    </section>

</div>
`;
const htmlEditor = monaco.editor.create(
    document.getElementById("html-editor"),
    {
        value:pikachuHTML,

        language: "html",
        theme: "vs-dark",
        automaticLayout: true,
        readOnly: true,
        minimap: {
            enabled: false
        }
    }
);

const cssEditor = monaco.editor.create(
    document.getElementById("css-editor"),
    {
        value: pikachuCSS,

        language: "css",

        theme: "vs-dark",

        automaticLayout: true,

        minimap: {
            enabled: false
        }
    }
);
const runButton = document.getElementById("run");
const iframe = document.getElementById("result");

runButton.addEventListener("click", () => {

    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();

    const documentComplet = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <style>
                ${css}
            </style>
        </head>
        <body>

            ${html}

        </body>
        </html>
    `;

    iframe.srcdoc = documentComplet;

});
htmlEditor.onDidChangeModelContent(() => {
    executerCode();
});

cssEditor.onDidChangeModelContent(() => {
    executerCode();
});