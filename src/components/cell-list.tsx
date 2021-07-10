import { useTypeSelector } from "../hooks/use-type-selector";
import CellListItem from "./cell-list-item";

const CellList: React.FC = () => {
    const cells = useTypeSelector(({ cells: { order, data } }) =>
        order.map((id) => data[id])
    );
    const renderCells = cells.map((cell) => {
        return <CellListItem key={cell.id} cell={cell} />;
    });
    return <div>{renderCells}</div>;
};

export default CellList;
