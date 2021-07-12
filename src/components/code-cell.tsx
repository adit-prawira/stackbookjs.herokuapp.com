import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypeSelector } from "../hooks/use-type-selector";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../styles/code-cell.css";
interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypeSelector((state) => state.bundles[cell.id]);

    // get all codes from previous cells
    const cumulativeCode = useTypeSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map((id) => data[id]);
        const codes = [];
        for (let c of orderedCells) {
            if (c.type === "code") {
                codes.push(c.content);
            }
            if (c.id === cell.id) {
                break;
            }
        }
        return codes;
    });

    // Every time the code inside the editor changes, run the bundling logic in 1 second.
    // Hence, auto bundling or run the code automatically
    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cumulativeCode.join("\n"));
            return;
        }
        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode.join("\n"));
        }, 750);
        return () => {
            // the next time the useEffect is called,
            // cancel the previous timer that has been setup
            clearTimeout(timer);
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
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
                <div className="progress-wrapper">
                    {!bundle || bundle.loading ? (
                        <div className="progress-cover">
                            <CircularProgress
                                style={{ color: "rgb(106, 234, 161)" }}
                            />
                        </div>
                    ) : (
                        <Preview code={bundle.code} error={bundle.err} />
                    )}
                </div>
            </div>
        </Resizable>
    );
};
export default CodeCell;
