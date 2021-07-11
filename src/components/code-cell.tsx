import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypeSelector } from "../hooks/use-type-selector";
interface CodeCellProps {
    cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypeSelector((state) => state.bundles[cell.id]);
    // Every time the code inside the editor changes, run the bundling logic in 1 second.
    // Hence, auto bundling or run the code automatically
    useEffect(() => {
        const timer = setTimeout(async () => {
            createBundle(cell.id, cell.content);
        }, 750);
        return () => {
            // the next time the useEffect is called,
            // cancel the previous timer that has been setup
            clearTimeout(timer);
        };
    }, [cell, createBundle]);
    return (
        <Resizable direction="vertical">
            <div
                style={{
                    height: "calc(100% - 10px)",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                {bundle && <Preview code={bundle.code} error={bundle.err} />}
            </div>
        </Resizable>
    );
};
export default CodeCell;
