# tool-chain-config-checker

[![CI][ci-src]][ci-href]

An optionated JS / TS tool chain config cheker

## ✅ Checkers

| Checker                                             | Version                                                                                     | LICENSE                                     |
| --------------------------------------------------- | :------------------------------------------------------------------------------------------ | :------------------------------------------ |
| [tsconfig-checker](packages/tsconfig-checker)       | [![npm version][npm-version-tsconfig-checker-src]][npm-version-tsconfig-checker-href]       | [MIT](packages/tsconfig-checker/LICENSE)    |
| [vite-config-checker](packages/vite-config-checker) | [![npm version][npm-version-vite-config-checker-src]][npm-version-vite-config-checker-href] | [MIT](packages/vite-config-checker/LICENSE) |

## 🙋 Motivations

### As the project grows in size, we need to put restrictions on configurations.

For example, if there are many micro-servcie structured projects in one repository, there are cases where modules are not resolved by the package manager's deps, but by the tool chain's config.

In such cases, if the dependency resolution of the deps is assumed to be compliant with the JS module system, tools such as eslint may not be able to resolve it properly.

## 🙌 Contributing guidelines

If you are interested in contributing to `tool-chain-config-checker`, I highly recommend checking out [the contributing guidelines](/CONTRIBUTING.md) here. You'll find all the relevant information such as [how to make a PR](/CONTRIBUTING.md#pull-request-guidelines), [how to setup development](/CONTRIBUTING.md#development-setup)) etc., there.

## ©️ License

[MIT](https://opensource.org/licenses/MIT)

<!-- Badges -->

[npm-version-tsconfig-checker-src]: https://img.shields.io/npm/v/tsconfig-checker?style=flat
[npm-version-tsconfig-checker-href]: https://npmjs.com/package/tsconfig-checker
[npm-version-vite-config-checker-src]: https://img.shields.io/npm/v/vite-config-checker?style=flat
[npm-version-vite-config-checker-href]: https://npmjs.com/package/vite-config-checker
[ci-src]: https://github.com/kazupon/tool-chain-config-checker/actions/workflows/ci.yml/badge.svg
[ci-href]: https://github.com/kazupon/tool-chain-config-checker/actions/workflows/ci.yml
