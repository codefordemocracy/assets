# Assets

This repository contains the static assets shared across our platform and the toolchains for generating them.

## Tailwind

This folder contains the configuration files for our css framework.

Build the main [cfd.css](https://github.com/codefordemocracy/assets/tree/main/public/css/cfd.css) file using `npx tailwindcss -i tailwind.custom.css -o ../public/css/cfd.css`. Add the `--watch` flag to automatically rebuild when changes are made.

Read more about Tailwind CSS at [https://tailwindcss.com/](https://tailwindcss.com/).

## Public

This folder contains the shared assets hosted through Firebase at [assets.codefordemocracy.org](https://assets.codefordemocracy.org).
