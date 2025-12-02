# Elysia API Mock Server

[中文文档](./README_zh.md)

A lightweight API mock server built with Bun and Elysia for mocking data during frontend development.

## Tech Stack

- [Bun](https://bun.sh/) - JavaScript/TypeScript runtime
- [Elysia](https://elysiajs.com/) - Fast and flexible web framework built on Bun
- TypeScript - For type safety

## Features

- Quick setup and run API mock service
- Support for all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- CORS support (configurable via environment variables)
- Simple data configuration
- Hot reloading development mode

## Quick Start

### Prerequisites

Make sure you have [Bun](https://bun.sh/docs/installation) installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Install Dependencies

```bash
bun install
```

### Start Development Server

```bash
bun run dev
```

The server will run on `http://localhost:2025` with hot reloading enabled.

## Configure API Mock Data

1. Define your mock data in [api-data.ts](./src/api-data.ts):
   ```typescript
   export const mock1 = {
     name: "neo_liu",
     age: 18,
     desc: "hello world",
     userId: "123456",
   };
   ```

2. Configure API routes in [mock-data.ts](./src/mock-data.ts):
   ```typescript
   export const mockApis: APIItem[] = [
     {
       method: "get",
       path: "/user/:userId",
       data: mock1,
     },
   ];
   ```

## CORS Configuration

CORS is enabled by default. You can customize the allowed origins by setting the `CROS_ORIGIN` environment variable:

```bash
CROS_ORIGIN=https://yourdomain.com bun run dev
```

Alternatively, you can set it in your shell:

```bash
export CROS_ORIGIN=https://yourdomain.com
bun run dev
```

## Cross-Origin Solutions

To solve cross-origin issues during development, you can use browser extensions like XSwitch or Proxy SwitchyOmega to proxy requests to the local mock server.

### Using XSwitch Plugin

1. Install the XSwitch plugin in your browser
2. Configure a rule to proxy your API requests to `http://localhost:2025`
3. Enable the rule during development

Example XSwitch configuration:
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

## Project Structure

```
src/
├── index.ts         # Application entry point
├── mock-data.ts     # API route configuration
├── api-data.ts      # Mock data definition
└── types.ts         # TypeScript type definitions
```

## Usage Example

After starting the server, you can access the mock API:

```bash
curl http://localhost:2025/user/123456
```

Response data:
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

## License

[MIT](LICENSE)