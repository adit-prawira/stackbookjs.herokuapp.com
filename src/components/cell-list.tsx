import { useTypeSelector } from "../hooks/use-type-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";
const CellList: React.FC = () => {
    const cells = useTypeSelector(({ cells: { order, data } }) =>
        order.map((id) => data[id])
    );
    const renderCells = cells.map((cell) => {
        return (
            <Fragment key={cell.id}>
                <AddCell nextCellId={cell.id} />
                <CellListItem key={cell.id} cell={cell} />
            </Fragment>
        );
    });
    return (
        <div>
            {renderCells}
            <AddCell nextCellId={null} />
        </div>
    );
};

export default CellList;
