import { useRef, useEffect } from "react";
import "../styles/preview.css";

interface PreviewProps {
    code: string;
    error: string;
}

// HTML snippet for the preview window
const html = `
    <html>
        <head>
            <style>html {background-color:white;}</style>
        </head>
        <body>
            <div id="root"></div>
            <script>
                const handleError = (err) => {
                    const root = document.querySelector("#root");
                    root.innerHTML = '<div style = "color:red;"><h4>Runtime Error</h4>' + err + "</div>";
                    console.error(err);
                }
                window.addEventListener("error", event => {
                    event.preventDefault();
                    handleError(event.error);
                })
                window.addEventListener("message", (event) => {
                    try{
                        eval(event.data);
                    }catch(err){
                        handleError(err);
                    }
                }, false)
            </script>
        </body>
    </html>`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
    const iframe = useRef<any>();
    useEffect(() => {
        iframe.current.srcdoc = html;

        // setting delay that will make sure the browser has enough time to updsate the source doc
        // and set up a message or event listener inside there for the postMessage attempt.
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, "*");
        }, 50);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe
                ref={iframe}
                title="code-execution"
                sandbox="allow-scripts"
                srcDoc={html}
            />
            {error && <div className="preview-error">{error}</div>}
        </div>
    );
};
export default Preview;
