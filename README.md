# Elysia API Mock Server

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Elysia](https://img.shields.io/badge/Elysia-JS-23c4e7?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

[中文文档](./README_zh.md)

A lightweight API mock server built with **Bun** and **Elysia**, designed to streamline frontend development by providing flexible data mocking capabilities.

## Features

- 🚀 **Quick Setup**: Get your mock server running in seconds.
- 🔄 **Full HTTP Support**: Supports GET, POST, PUT, PATCH, DELETE.
- 🌐 **CORS Support**: Configurable Cross-Origin Resource Sharing.
- 📝 **Easy Configuration**: Simple TypeScript files for defining APIs and data.
- 🔥 **Hot Reloading**: Instant updates during development.

## Quick Start

### Prerequisites

Ensure you have [Bun](https://bun.sh/docs/installation) installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

Install dependencies:

```bash
bun install
```

### Development

Start the development server:

```bash
bun run dev
```

The server will start at `http://localhost:2025` with hot reloading enabled.

## Configuration

### API Definitions

Define your API endpoints in [src/mock/apis.ts](src/mock/apis.ts):

```typescript
export const apis: APIItem[] = [
  {
    method: "get",
    path: "/user/:userId",
    data: mock1, // Reference to data in data.ts
  },
];
```

### Mock Data

Define your mock data in [src/mock/data.ts](src/mock/data.ts):

```typescript
export const mock1 = {
  name: "neo_liu",
  age: 18,
  desc: "hello world",
  userId: "123456",
  role: "admin"
};
```

### CORS Configuration

CORS is enabled by default. To customize the allowed origin, set the `CORS_ORIGIN` environment variable in a `.env` or `.env.local` file:

```env
CORS_ORIGIN=https://yourdomain.com
```

Or set it directly when running:

```bash
CORS_ORIGIN=https://yourdomain.com bun run dev
```

## Cross-Origin Solutions

If you encounter CORS issues or want to proxy requests from your existing application without changing code, you can use browser extensions like **XSwitch** or **Proxy SwitchyOmega**.

### Using XSwitch

1.  Install the XSwitch extension.
2.  Add a rule to proxy specific paths to `http://localhost:2025`.

**Example Configuration:**

```json
{
  "proxy": [
    {
      "match": "https://api.example.com/mock/(.*)",
      "action": "redirect",
      "url": "http://localhost:2025/$1"
    }
  ]
}
```

This will redirect requests from `https://api.example.com/mock/*` to your local mock server.

## Project Structure

```
src/
├── index.ts         # Server entry point
├── mock/
│   ├── apis.ts      # API route definitions
│   └── data.ts      # Mock data storage
└── types.ts         # TypeScript interfaces
```

## Usage Example

Test your mock endpoint:

```bash
curl http://localhost:2025/user/123456
```

**Response:**

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