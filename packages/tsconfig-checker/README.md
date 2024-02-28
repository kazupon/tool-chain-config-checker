# tsconfig-checker

> An optionated tsconfig checker

This package provides a tool for checking the validity of TypeScript configuration files (tsconfig.json).

## 🌟 Features

- enable / disable `compilerOptions.paths` option and filters

## 💿 Installation

### Local

```sh
# npm
npm install tsconfig-checker --save-dev

# pnpm
pnpm add --save-dev tsconfig-checker

# bum
bun add --dev tsconfig-checker
```

### Global

```sh
# npm
npm install --global tsconfig-checker

# pnpm
pnpm add --global tsconfig-checker

# bum
bun add --global tsconfig-checker
```

## 🚀 Usage

```
USAGE tsconfig-checker [OPTIONS]

OPTIONS

  --paths="true"    allow 'compilerOptions.paths' option, if you can disable it, specify 'false'
```

### filtering for checking

`paths` option:

```sh
# allow 'path/to/**' key on `compilerOptions.paths`
tsconfig-checker --paths="["/path/to/**"]"
```

## ©️ License

[MIT](https://opensource.org/licenses/MIT)
