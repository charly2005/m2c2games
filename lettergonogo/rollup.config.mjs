import esbuild, { minify } from "rollup-plugin-esbuild";
import nodeResolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import {
  copyAssets,
  hashM2c2kitAssets,
  makeM2c2kitServiceWorker,
} from "@m2c2kit/build-helpers";

export default (commandLineArgs) => {
  const isDebug = commandLineArgs.configServe ? true : false;
  const isProduction = commandLineArgs.configProd ? true : false;
const port = commandLineArgs.configPort || 3000;  

  let outputFolder = "build";
  if (isProduction) {
    outputFolder = "dist";
  }

  const finalConfig = [
    {
      input: "./src/index.ts",
      output: [
        {
          file: `./${outputFolder}/index.js`,
          format: "es",
          sourcemap: isDebug,
          sourcemapExcludeSources: true
        },
      ],
      plugins: [
        nodeResolve(),
        esbuild({
          sourceMap: isDebug && true,
        }),
        commandLineArgs.configMinify && minify(),        
        copyAssets({ id: "lettergonogo", outputFolder }),        
        isProduction &&
          !commandLineArgs.configNoHash &&
          hashM2c2kitAssets(outputFolder),
        commandLineArgs.configProd &&
        !commandLineArgs.configNoHash &&
        commandLineArgs.configServiceWorker &&
        makeM2c2kitServiceWorker(outputFolder, ["data.html", "data.js"]),          
        isDebug &&
          serve({
            /**
             * Start development server and automatically open browser with
             *   npm run serve -- --configOpen
             * However, to debug and hit breakpoints, you must launch
             * the browser through vs code.
             */
            open: commandLineArgs.configOpen && true,
            verbose: true,
            contentBase: [`./${outputFolder}`],
            historyApiFallback: true,
            host: "localhost",
            port: port,
          }),
        isDebug &&
          /**
           * Try a shorter delay for quicker reloads, but increase it if
           * the browser reloads before the new build is fully ready.
           */
          livereload({ watch: "build", delay: 250 }),
      ],
    },
  ];
  return finalConfig;
};
