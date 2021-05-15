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
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                //console.log("onLoad", args);
                if (args.path === "index.js") {
                    return {
                        loader: "jsx",
                        contents: inputCode,
                    };
                }

                // Check if the modules or file has been stored or already in cache
                // if yes return early, otherwise store the response
                const cachedResult =
                    await fileCache.getItem<esbuild.OnLoadResult>(args.path);

                if (cachedResult) return cachedResult;

                // args.path is now https://unpkg.com/tiny-test-pkg@1.0.0/index.js
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
