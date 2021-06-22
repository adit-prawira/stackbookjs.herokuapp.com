import { useState } from "react";
import ReactDOM from "react-dom";
import CodeEditor from "./components/code-editor";
import Button from "@material-ui/core/Button";
import Preview from "./components/preview";
import bundle from "./bundler";
const App = () => {
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

ReactDOM.render(<App />, document.querySelector("#root"));
