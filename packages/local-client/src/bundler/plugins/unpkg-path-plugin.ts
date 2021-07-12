import * as esbuild from "esbuild-wasm";
export const unpkgPathPlugin = () => {
    return {
        name: "unpkg-path-plugin",
        setup(build: esbuild.PluginBuild) {
            /*
                1.  filter is regex that allow us to control the onResolve and onLoad when it is executed
                2.  namespace is used pretty similar of how filter is used, which enable us
                    to control on which files onResolve and onLoad will be executed on.
             */

            // find file with the name exactly index.js
            build.onResolve({ filter: /(^index\.js$)/ }, () => {
                return {
                    path: "index.js",
                    namespace: "a",
                };
            });
            // find any requires or imports file with ./ or ../
            build.onResolve({ filter: /^\.+\// }, (args: any) => {
                return {
                    namespace: "a",
                    path: new URL(
                        args.path,
                        "https://unpkg.com" + args.resolveDir + "/"
                    ).href,
                };
            });
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                if (args.path.includes("dom-helpers")) {
                    const params = args.path.split("/");
                    const newPath = params[0] + "/cjs/" + params[1];
                    return {
                        path: `https://unpkg.com/${newPath}`,
                        namespace: "a",
                    };
                }
                return {
                    path: `https://unpkg.com/${args.path}`,
                    namespace: "a",
                };
            });
        },
    };
};
