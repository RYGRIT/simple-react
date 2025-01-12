## 描述

快速创建一个 monorepo 项目，使用 [pnpm](https://pnpm.io/zh-CN/) 作为包管理工具，支持 [commitlint](https://commitlint.js.org/)、[prettier](https://prettier.io/)、[eslint](https://eslint.org/)。

## 搭建步骤

### 初始化项目

```sh
pnpm init
# 等价于
npm init -y
# 在当前工作空间中安装本地子项目依赖，以在 core 包中安装 shared 包举例
pnpm add shared --filter core -w
```

> 注意：不加 -w 的话，会去官方仓库下载依赖

### typescript 配置

```sh
# 安装依赖
pnpm add typescript -D -w
# 初始化 tsconfig.json 文件
pnpm tsc --init
```

修改 `tsconfig.json` 文件：

```json
{
  "compilerOptions": {
    /* Projects */
    "composite": true,
    /* Language and Environment */
    "target": "es2016",
    "lib": ["ESNext", "DOM"],
    "jsx": "preserve",
    /* Modules */
    "module": "ESNext",
    "rootDir": ".",
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "*": ["packages/*/src"]
    },
    "types": ["node"],
    "resolveJsonModule": true,
    /* Javascript Support */
    /* Emit */
    "sourceMap": false,
    /* Interop Constraints */
    "isolatedDeclarations": true,
    "esModuleInterop": true,
    // 设置此选项后，如果程序尝试使用与磁盘上的大小写不同的大小写包含文件，TypeScript 将发出错误。
    // 默认值：true
    "forceConsistentCasingInFileNames": true,
    /* Type Checking */
    "strict": true,
    /* Completeness */
    "skipLibCheck": true
  },
  "include": ["packages/*/src"]
}
```

### eslint 配置

```sh
# 创建配置文件
pnpm create @eslint/config@latest
# 安装依赖
pnpm install globals @eslint/js typescript-eslint -D -w
```

#### 修改 `eslint.config.mjs` 文件

```js
import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,
  {
    files: ['packages/**/*.{js?(x),ts?(x),mjs,cjs}'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prettier/prettier': 'off',
      // typescript-eslint
      '@typescript-eslint/no-explicit-any': 'off',
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
);
```

> Note: If you need to override some rules, place the rules configuration last.

> 注意事项：如果需要覆盖某些规则，请将规则配置放在最后。

### prettier 配置

```sh
# 安装依赖
pnpm add -D eslint-plugin-prettier eslint-config-prettier -w
# --save-exact 缩写 -E，意思：保存确切的版本
pnpm add -D --save-exact prettier -w
```

#### 创建一个名为 `.prettierrc` 的文件

```json
{
  "singleQuote": true,
  "endOfLine": "auto"
}
```

#### 修改 `eslint.config.mjs` 文件

```js
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [prettierRecommended];
```

### husky 配置

husky 是一个 git hooks 工具，可以在 git hooks 中运行脚本。

```sh
# 安装依赖
pnpm add -D husky -w
# 初始化 husky
pnpm exec husky init
```

### lint-staged 配置

```sh
# 安装依赖
pnpm add -D lint-staged -w # requires further setup
```

在 `package.json` 文件中添加以下配置：

```json
{
  "lint-staged": {
    "*.{js?(x), ts?(x)}": ["eslint --fix", "prettier --write"]
  }
}
```

修改 `.husky/pre-commit` 文件：

```sh
pnpm lint-staged
```

### commitlint 配置

```sh
# 安装依赖
pnpm add -D @commitlint/cli @commitlint/config-conventional -w

# 创建配置文件
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

修改 `.husky/commit-msg` 文件：

```sh
echo "pnpm dlx commitlint --edit `$1" > .husky/commit-msg
```
