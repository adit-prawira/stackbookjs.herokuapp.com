import * as esbuild from "esbuild-wasm";
import axios from "axios";
export const unpkgPathPlugin = () => {
    return {
        name: "unpkg-path-plugin",
        setup(build: esbuild.PluginBuild) {
            /*
                1.  filter is regex that allow us to control the onResolve and onLoad when it is executed
                2.  namespace is used pretty similar of how filter is used, which enable us
                    to control on which files onResolve and onLoad will be executed on.
             */
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log("onResolve", args);

                if (args.path === "index.js") {
                    return { path: args.path, namespace: "a" };
                }

                if (args.path.includes("./") || args.path.includes("../")) {
                    return {
                        namespace: "a",
                        path: new URL(
                            args.path,
                            "https://unpkg.com" + args.resolveDir + "/"
                        ).href,
                    };
                }

                return {
                    path: `https://unpkg.com/${args.path}`,
                    namespace: "a",
                };
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log("onLoad", args);

                if (args.path === "index.js") {
                    return {
                        loader: "jsx",
                        contents: `
                            import React, {useState} from 'react';
                            console.log(React, useState);
                        `,
                    };
                }

                // args.path is now https://unpkg.com/tiny-test-pkg@1.0.0/index.js
                const { data, request } = await axios.get(args.path);
                return {
                    loader: "jsx",
                    contents: data,
                    resolveDir: new URL("./", request.responseURL).pathname,
                };
            });
        },
    };
};
