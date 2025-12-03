# Elysia API 接口数据模拟服务器

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Elysia](https://img.shields.io/badge/Elysia-JS-23c4e7?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

[English Document](./README.md) | [GitHub 地址](https://github.com/laoer536/elysia-api-mock)

一个基于 **Bun** 和 **Elysia** 构建的轻量级 API 模拟服务器，专为前端开发设计，提供简单灵活的数据模拟方案。

## 功能特性

- 🚀 **快速启动**: 秒级启动 API 模拟服务。
- 🔄 **全方法支持**: 支持 GET, POST, PUT, PATCH, DELETE 等所有 HTTP 方法。
- 🌐 **CORS 支持**: 可配置跨域资源共享，轻松对接前端应用。
- 📝 **配置简单**: 使用 TypeScript 文件定义接口和数据，类型安全且易于维护。
- 🔥 **热重载**: 开发过程中修改配置即时生效，无需重启。

## 快速开始

### 环境准备

确保您已安装 [Bun](https://bun.sh/docs/installation)：

```bash
curl -fsSL https://bun.sh/install | bash
```

### 安装依赖

```bash
bun install
```

### 启动服务

```bash
bun run dev
```

服务将在 `http://localhost:2025` 启动，并开启热重载功能。

## 配置指南

### 定义 API 接口

在 [src/mock/apis.ts](src/mock/apis.ts) 中定义您的 API 路由信息：

```typescript
export const apis: APIItem[] = [
  {
    method: "get",
    path: "/user/:userId",
    data: mock1, // 引用 data.ts 中的数据
  },
];
```

### 定义模拟数据

在 [src/mock/data.ts](src/mock/data.ts) 中定义具体的模拟数据内容：

```typescript
export const mock1 = {
  name: "neo_liu",
  age: 18,
  desc: "hello world",
  userId: "123456",
};
```

### CORS 跨域配置

默认情况下 CORS 已启用。您可以通过环境变量 `CORS_ORIGIN` 自定义允许的源。

推荐在 `.env` 或 `.env.local` 文件中配置：

```env
CORS_ORIGIN=https://yourdomain.com
```

或者在启动时直接设置：

```bash
CORS_ORIGIN=https://yourdomain.com bun run dev
```

## 跨域解决方案

在开发过程中，如果您不想修改前端代码来指向 mock 服务器，可以使用浏览器插件（如 **XSwitch** 或 **Proxy SwitchyOmega**）将特定请求代理到本地。

### 使用 XSwitch 插件

1.  安装 XSwitch 插件。
2.  添加规则，将目标 API 请求代理到 `http://localhost:2025`。

**配置示例：**

```json
{
  "proxy": [
    {
      "match": "https://api.yourdomain.com/mock/(.*)",
      "action": "redirect",
      "url": "http://localhost:2025/$1"
    }
  ]
}
```

## 项目结构

```
src/
├── index.ts         # 应用入口文件
├── mock/
│   ├── apis.ts      # API 路由配置
│   └── data.ts      # 模拟数据源
└── types.ts         # TypeScript 类型定义
```

## 调用示例

启动服务后，使用 curl 测试接口：

```bash
curl http://localhost:2025/user/123456
```

**响应结果：**

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
