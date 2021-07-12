import { useRef } from "react";
import "../styles/syntax.css";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";

import prettier from "prettier";
import parser from "prettier/parser-babel";
import Button from "@material-ui/core/Button";
import "bulmaswatch/slate/bulmaswatch.min.css";
import "../styles/code-editor.css";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";

// properties that declares the expected properties CodeEditor component will receive
interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>();
    // the function will be called when the editor is being first rendered on the screen
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;

        // will compute the passed onChange function every time changes is being made
        // in the text editor.
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        });

        // updating MonacoEditor options
        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

        // highlighter setup
        const highlighter = new Highlighter(
            //@ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        );

        // Prevent the highlighter to console log error for every key press
        highlighter.highLightOnDidChangeModelContent(
            () => {},
            () => {},
            undefined,
            () => {}
        );
    };

    // format code editor with prettier (need reference from the monaco editor)
    const onFormatClick = () => {
        // get current value in the editor
        const unformattedCode = editorRef.current.getModel().getValue();

        // format the value with prettier

        const formattedCode = prettier
            .format(unformattedCode, {
                parser: "babel",
                plugins: [parser],
                useTabs: false,
                semi: true,
                singleQuote: true,
            })
            .replace(/\n$/, "");

        // set the formatted value to the editor
        editorRef.current.setValue(formattedCode);
    };

    return (
        <div className="editor-wrapper">
            <Button onClick={onFormatClick} className="format-button">
                Re-Format
            </Button>
            <MonacoEditor
                editorDidMount={onEditorDidMount}
                value={initialValue}
                height="100%"
                language="javascript"
                theme="dark"
                options={{
                    wordWrap: "on",
                    minimap: { enabled: false }, // turning minimap off
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};
export default CodeEditor;
