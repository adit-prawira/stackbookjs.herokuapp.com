import { useState, useRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import "../styles/text-editor.css";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps {
    cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const [isEdit, setIsEdit] = useState(false);
    const { updateCell } = useActions();
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // the condition  that check is the clicked the area is inside the MD editor
            if (
                ref.current &&
                event.target &&
                ref.current.contains(event.target as Node)
            ) {
                return;
            }
            setIsEdit(false);
        };
        document.addEventListener("click", listener, { capture: true });
        return () => {
            document.removeEventListener("click", listener, { capture: true });
        };
    }, []);

    return (
        <div
            onClick={() => setIsEdit(true)}
            ref={ref}
            className="text-editor card"
        >
            <div className="card-content">
                {isEdit ? (
                    <MDEditor
                        value={cell.content}
                        onChange={(val) => updateCell(cell.id, val || "")}
                    />
                ) : (
                    <MDEditor.Markdown
                        source={cell.content || "Click here to edit"}
                    />
                )}
            </div>
        </div>
    );
};
export default TextEditor;
