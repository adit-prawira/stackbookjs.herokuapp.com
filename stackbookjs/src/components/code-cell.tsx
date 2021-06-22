import { useState } from "react";
import CodeEditor from "./code-editor";
import Button from "@material-ui/core/Button";
import Preview from "./preview";
import bundle from "../bundler";

const CodeCell = () => {
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");

    const onClick = async () => {
        const output = await bundle(input);
        // bundling process
        setCode(output);
    };

    return (
        <div>
            <CodeEditor
                initialValue={"const a = 1;"}
                onChange={(value) => setInput(value)}
            />

            <div>
                <Button
                    onClick={onClick}
                    color="primary"
                    variant="outlined"
                    style={{ width: "100%", border: "" }}
                >
                    Run
                </Button>
            </div>
            <Preview code={code} />
        </div>
    );
};
export default CodeCell;
