import { useState, useRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import "../styles/text-editor.css";
const TextEditor: React.FC = () => {
    const [isEdit, setIsEdit] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // the condition  that check is the clicked the area is inside the MD editor
            if (
                ref.current &&
                event.target &&
                ref.current.contains(event.target as Node)
            ) {
                console.log("inside editor");
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
        <div onClick={() => setIsEdit(true)} ref={ref}>
            {isEdit ? <MDEditor /> : <MDEditor.Markdown source={"# Header"} />}
        </div>
    );
};
export default TextEditor;
