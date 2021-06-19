import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
    name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: "fetch-plugin",
        setup(build: esbuild.PluginBuild) {
            // load for file name exactly named "index.js"
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return {
                    loader: "jsx",
                    contents: inputCode,
                };
            });

            // On load code block that check if the imported modules or file has
            // been stored or already in cache if yes return early, otherwise store the response
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const cachedResult =
                    await fileCache.getItem<esbuild.OnLoadResult>(args.path);

                if (cachedResult) return cachedResult;
            });

            // load for any file that ends with .css, basically any css file
            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                // args.path is now https://unpkg.com/.../...css
                const { data, request } = await axios.get(args.path);

                // replacing all newline character in the data with empty string
                // then escape any double quotes and single quotes
                const escaped = data
                    .replace(/\n/g, "")
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");

                // If not working with css import return the original data, otherwise
                // return the following Javascript commands.
                const contents = `
                    const style = document.createElement("style");
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                    `;

                // storing file or module in cache
                const result: esbuild.OnLoadResult = {
                    loader: "jsx",
                    contents,
                    resolveDir: new URL("./", request.responseURL).pathname,
                };
                await fileCache.setItem(args.path, result);
                return result;
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                // args.path is now https://unpkg.com/.../...js
                const { data, request } = await axios.get(args.path);

                // storing file or module in cache
                const result: esbuild.OnLoadResult = {
                    loader: "jsx",
                    contents: data,
                    resolveDir: new URL("./", request.responseURL).pathname,
                };
                await fileCache.setItem(args.path, result);
                return result;
            });
        },
    };
};
