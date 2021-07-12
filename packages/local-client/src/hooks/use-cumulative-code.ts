import { useTypeSelector } from "./use-type-selector";
export const useCumulativeCode = (cellId: string) => {
    const renderFunc = `
            import _React from "react";
            import _ReactDOM from "react-dom";

            var render = (value) => {
                const root = document.querySelector('#root')
                if(typeof value === 'object'){
                    if(value.$$typeof && value.props){
                        _ReactDOM.render(value, root)
                    }else{
                        root.innerHTML = JSON.stringify(value);
                    }
                }else{
                    root.innerHTML = value;
                }
            };
            `;
    const renderFuncNoOp = "var render = () => {}";
    return useTypeSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map((id) => data[id]);
        const codes = [];
        for (let c of orderedCells) {
            if (c.type === "code") {
                if (c.id === cellId) {
                    codes.push(renderFunc);
                } else {
                    codes.push(renderFuncNoOp);
                }
                codes.push(c.content);
            }
            if (c.id === cellId) {
                break;
            }
        }
        return codes;
    }).join("\n");
};
