import "../styles/add-cell.css";
import { useActions } from "../hooks/use-actions";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

interface AddCellProps {
    previousCellId: string | null;
    forceVisible?: boolean; // optional prop
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
    const { insertCellAfter } = useActions();
    return (
        <div className={`add-cell ${forceVisible && "force-visible"}`}>
            <div className="add-buttons">
                <Button
                    style={{
                        backgroundColor: "rgb(106, 234, 161)",
                    }}
                    startIcon={<AddIcon />}
                    onClick={() => insertCellAfter(previousCellId, "code")}
                    id="button"
                    variant="contained"
                >
                    Code Editor
                </Button>
                <Button
                    style={{
                        backgroundColor: "rgb(106, 234, 161)",
                    }}
                    startIcon={<AddIcon />}
                    onClick={() => insertCellAfter(previousCellId, "text")}
                    id="button"
                    variant="contained"
                >
                    Text Editor
                </Button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddCell;
