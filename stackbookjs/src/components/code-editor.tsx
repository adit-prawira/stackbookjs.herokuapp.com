import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
    initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
    return (
        <MonacoEditor
            value={initialValue}
            height="500px"
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
    );
};
export default CodeEditor;
