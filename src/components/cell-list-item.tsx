import { Cell } from "../state";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";
import "../styles/cell-list-item.css";
interface CellListItemProps {
    cell: Cell;
}
const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    return (
        <div className="cell-list-item">
            {cell.type === "code" ? (
                <>
                    <div className="action-bar-wrapper">
                        <ActionBar id={cell.id} />
                    </div>
                    <CodeCell cell={cell} />
                </>
            ) : (
                <>
                    <TextEditor cell={cell} />
                    <ActionBar id={cell.id} />
                </>
            )}
        </div>
    );
};
export default CellListItem;
