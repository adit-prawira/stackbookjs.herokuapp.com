import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell = () => {
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    // Every time the code inside the editor changes, run the bundling logic in 1 second.
    // Hence, auto bundling or run the code automatically
    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            // bundling process
            setCode(output.code);
            setError(output.error);
        }, 750);
        return () => {
            // the next time the useEffect is called,
            // cancel the previous timer that has been setup
            clearTimeout(timer);
        };
    }, [input]);
    return (
        <Resizable direction="vertical">
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue={"const a = 1;"}
                        onChange={(value) => setInput(value)}
                    />
                </Resizable>

                <Preview code={code} error={error} />
            </div>
        </Resizable>
    );
};
export default CodeCell;
