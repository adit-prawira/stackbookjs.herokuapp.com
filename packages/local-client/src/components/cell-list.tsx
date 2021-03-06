import { useTypeSelector } from "../hooks/use-type-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";
import "../styles/cell-list.css";
const CellList: React.FC = () => {
    const cells = useTypeSelector(({ cells: { order, data } }) =>
        order.map((id) => data[id])
    );
    const renderCells = cells.map((cell) => {
        return (
            <Fragment key={cell.id}>
                <CellListItem key={cell.id} cell={cell} />
                <AddCell previousCellId={cell.id} />
            </Fragment>
        );
    });
    return (
        <div className="cell-list">
            <AddCell forceVisible={cells.length === 0} previousCellId={null} />
            {renderCells}
        </div>
    );
};

export default CellList;
