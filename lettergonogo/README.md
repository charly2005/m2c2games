# lettergonogo

This project was generated with the m2c2kit CLI schematics version 0.1.29.

## Development server

Run `npm run serve` from the command line for a development server. Browse to `http://localhost:3000/`. The app will automatically compile and reload when you change source files. If you get an error on the reload, edit `rollup.config.mjs` and increase the delay parameter (unit is milliseconds) in this line:

    livereload({ watch: "build", delay: 250 })

## Debugging

With the file `.vscode/launch.json`, the project has been configured for debugging with Visual Studio Code and Chrome. If the development server is running, debugging in Visual Studio Code is available by pressing `F5` or selecting Run --> Start Debugging

## Production build

Run `npm run build` from the command line to build the project. Build artifacts will be stored in the `dist` directory.

The build process adds hashes to filenames to minimize browser cache issues in deployment. To build without filename hashes, run `npm run build:no-hash`.

To minify the JavaScript files, add `-- --configMinify`, e.g., `npm run build -- --configMinify` or `npm run build:no-hash -- --configMinify`.

## Publishing to npm

The `package.json` file has the property `"private": true`, which prevents accidental publishing to npm. If the assessment is to be published to npm, remove this property.