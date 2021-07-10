import "bulmaswatch/cyborg/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import CellList from "./components/cell-list";
import { Provider } from "react-redux";
import { store } from "./state";

const App = () => {
    return (
        <div style={{ margin: "1%" }}>
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
