import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteIcon from "@material-ui/icons/Delete";
import { useActions } from "../hooks/use-actions";
import "../styles/action-bar.css";
interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();
    return (
        <div className="action-bar">
            <IconButton style={{color:"rgb(106, 234, 161)"}} onClick={() => moveCell(id, "up")}>
                <ArrowUpwardIcon />
            </IconButton>
            <IconButton
                style={{color:"rgb(106, 234, 161)"}}
                onClick={() => moveCell(id, "down")}
            >
                <ArrowDownwardIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => deleteCell(id)}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};
export default ActionBar;
