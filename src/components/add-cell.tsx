import "../styles/add-cell.css";
import { useActions } from "../hooks/use-actions";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

interface AddCellProps {
    nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
    const { insertCellBefore } = useActions();
    return (
        <div className="add-cell">
            <div className="add-buttons">
                <Button
                    style={{
                        backgroundColor: "rgb(106, 234, 161)",
                    
                    }}
                    startIcon={<AddIcon />}
                    onClick={() => insertCellBefore(nextCellId, "code")}
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
                    onClick={() => insertCellBefore(nextCellId, "text")}
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
