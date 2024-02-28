# vite-config-checker"

> An optionated vite config checker

This package provides a tool for checking the validity of Vite configuration files (vite.config.\*).

## 🌟 Features

- enable / disable `resolve.alias` option and filters

## 💿 Installation

### Local

```sh
# npm
npm install vite-config-checker --save-dev

# pnpm
pnpm add --save-dev vite-config-checker

# bum
bun add --dev vite-config-checker
```

### Global

```sh
# npm
npm install --global vite-config-checker

# pnpm
pnpm add --global vite-config-checker

# bum
bun add --global vite-config-checker
```

## 🚀 Usage

```sh
vite-config-checker --help

USAGE vite-config-checker [OPTIONS]

OPTIONS

  --alias="true"    allow 'resolve.alias' option, if you can disable it, specify 'false'
    -c, --config    vite config file path
```

### filtering for checking

`paths` option:

```sh
# allow 'path/to/foo.js' key on `resolve.alias`
vite-config-checker --alias="["/path/to/foo.js"]"
```

### configration

You can specify vite configration, example `vitest.config.ts`:

```sh
vite-config-checker -c vitest.config.ts
```

## ©️ License

[MIT](https://opensource.org/licenses/MIT)
