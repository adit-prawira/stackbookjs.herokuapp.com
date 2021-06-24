import { useState } from "react";
import CodeEditor from "./code-editor";
import Button from "@material-ui/core/Button";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell = () => {
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");

    const onClick = async () => {
        const output = await bundle(input);
        // bundling process
        setCode(output);
    };

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

                {/* <div>
                    <Button
                        onClick={onClick}
                        color="primary"
                        variant="outlined"
                        style={{ width: "100%", border: "" }}
                    >
                        Run
                    </Button>
                </div> */}
                <Preview code={code} />
            </div>
        </Resizable>
    );
};
export default CodeCell;
