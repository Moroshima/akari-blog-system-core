# Akari Core

一个无聊、无趣、且无用的博客小项目后端部分

## 配置

在运行该项目前需要先对部分内容进行配置

```bash
code ./config/index.ts
```

```typescript
const config = {
  grecaptcha_secret: "your google captcha secret key",
};

export default config;
```

## 开发

运行（以开发模式）

```bash
pnpm run dev
```

构建（产物位于 `/build` 目录下）

```bash
pnpm run build
```

打包（产物位于 `/dist` 目录下）

```bash
pnpm run pack:prod
```

打包为 docker image

```bash
docker image build --tag akari-core .
```

运行 docker container

```bash
docker run -p 8080:8080 --name akari-demo -d akari-core
```

## 注意事项

本项目以依赖最小化原则（虽然是开发依赖）做出了如下取舍：

- 项目在开发环境下运行使用了 nodemon + ts-node 的解决方案，并非最佳实践，用 ts-node-dev 替换可以提高开发时代码热更新转译速度
- 在打包产物时没有直接使用 webpack ts-loader module 介入编译，而是通过 tsc 对代码进行转译后再经由 webpack 进行打包

其他可能需要注意的事项：

- 本项目版本号格式为 `Major.Minor.Patch[-Suffix]`
- pm2 在 docker 中运行时必须以 --no-daemon 模式在前台直接运行，否则容器会执行完命令后自动退出
- `Dockerfile` 文件可以为 `.Dockerfile` 结尾
