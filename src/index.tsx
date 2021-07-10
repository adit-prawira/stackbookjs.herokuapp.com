import "bulmaswatch/slate/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import CellList from "./components/cell-list";
// import CellListItem from "./components/cell-list-item";
import { Provider } from "react-redux";
import { store } from "./state";

const App = () => {
    return (
        <div>
            <CellList />
        </div>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);
