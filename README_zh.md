# Elysia API 模拟服务器

[English Document](./README.md) | [GitHub 地址](https://github.com/laoer536/elysia-api-mock)

一个使用 Bun 和 Elysia 构建的轻量级 API 模拟服务器，用于前端开发期间的数据模拟。

## 技术栈

- [Bun](https://bun.sh/) - JavaScript/TypeScript 运行时
- [Elysia](https://elysiajs.com/) - 基于 Bun 构建的快速、灵活的 Web 框架
- TypeScript - 提供类型安全

## 功能特性

- 快速设置和运行 API 模拟服务
- 支持所有 HTTP 方法（GET、POST、PUT、PATCH、DELETE）
- CORS 支持（可通过环境变量配置）
- 简单易用的数据配置方式
- 热重载开发模式

## 快速开始

### 先决条件

确保已安装 [Bun](https://bun.sh/docs/installation)：

```bash
curl -fsSL https://bun.sh/install | bash
```

### 安装依赖

```bash
bun install
```

### 启动开发服务器

```bash
bun run dev
```

服务器将在 `http://localhost:2025` 上运行，并支持热重载。

## 配置 API 模拟数据

1. 在 [api-data.ts](./src/api-data.ts) 文件中定义你的模拟数据：
   ```typescript
   export const mock1 = {
     name: "neo_liu",
     age: 18,
     desc: "hello world",
     userId: "123456",
   };
   ```

2. 在 [mock-data.ts](./src/mock-data.ts) 文件中配置 API 路由：
   ```typescript
   export const mockApis: APIItem[] = [
     {
       method: "get",
       path: "/user/:userId",
       data: mock1,
     },
   ];
   ```

## CORS 配置

默认情况下，CORS 已启用。可以通过设置 `CROS_ORIGIN` 环境变量来自定义允许的源：

```bash
CROS_ORIGIN=https://yourdomain.com bun run dev
```

或者在 shell 中设置：

```bash
export CROS_ORIGIN=https://yourdomain.com
bun run dev
```

## 跨域解决方案

为了解决开发过程中的跨域问题，可以使用浏览器插件如 XSwitch 或 Proxy SwitchyOmega 将请求代理到本地模拟服务器。

### 使用 XSwitch 插件

1. 在浏览器中安装 XSwitch 插件
2. 配置规则将 API 请求代理到 `http://localhost:2025`
3. 在开发过程中启用该规则

XSwitch 配置示例：
```json
{
  "proxy": [
    {
      "match": "https://your-api-domain.com/*",
      "action": "redirect",
      "url": "http://localhost:2025/$1"
    }
  ]
}
```

## 项目结构

```
src/
├── index.ts         # 应用入口点
├── mock-data.ts     # API 路由配置
├── api-data.ts      # 模拟数据定义
└── types.ts         # TypeScript 类型定义
```

## 使用示例

启动服务器后，你可以通过以下方式访问模拟 API：

```bash
curl http://localhost:2025/user/123456
```

响应数据：
```json
{
  "code": "SUCCESS",
  "msg": "This is the mock data response.",
  "data": {
    "name": "neo_liu",
    "age": 18,
    "desc": "hello world",
    "userId": "123456"
  }
}
```

## 许可证

[MIT](LICENSE)