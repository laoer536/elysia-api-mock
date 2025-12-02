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

You typically only need to focus on two files:
- [src/mock-apis.ts](./src/mock-apis.ts) - Define API endpoint information
- [src/api-data.ts](./src/api-data.ts) - Define mock data for the APIs

APIs are automatically registered based on the configurations in these files.

In [mock-apis.ts](./src/mock-apis.ts), define the API endpoint information:
```typescript
export const mockApis: APIItem[] = [
  {
    method: "get",
    path: "/user/:userId",
    data: mock1, // Reference to mock data defined in api-data.ts
  },
];
```

In [api-data.ts](./src/api-data.ts), define the corresponding mock data:
```typescript
export const mock1 = {
  name: "neo_liu",
  age: 18,
  desc: "hello world",
  userId: "123456",
};
```

## CORS Configuration

CORS is enabled by default. You can customize the allowed origins by setting the `CROS_ORIGIN` environment variable.

We recommend configuring environment variables using a `.env` or `.env.local` file:

```
CROS_ORIGIN=https://yourdomain.com
```

Start the development server with:

```bash
bun run dev
```

Alternatively, you can set the environment variable directly in your shell:

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

Example XSwitch configurations:

#### Basic Configuration
```json
{
  "proxy": [
    {
      "match": "https://your-api-domain.com/mock/*",
      "action": "redirect",
      "url": "http://localhost:2025/$1"
    }
  ]
}
```

#### Regex Pattern Matching
```json
{
  "proxy": [
    {
      "match": "https://your-api-domain.com/mock/api/(.*)",
      "action": "redirect",
      "url": "http://localhost:2025/$1"
    }
  ]
}
```

#### Multiple API Endpoints
```json
{
  "proxy": [
    {
      "match": "https://your-api-domain.com/mock/user/(.*)",
      "action": "redirect",
      "url": "http://localhost:2025/user/$1"
    },
    {
      "match": "https://your-api-domain.com/mock/products/(.*)",
      "action": "redirect",
      "url": "http://localhost:2025/products/$1"
    }
  ]
}
```

#### Advanced Regex with Parameters
```json
{
  "proxy": [
    {
      "match": "https://your-api-domain.com/mock/(v\\d+)/(.*)",
      "action": "redirect",
      "url": "http://localhost:2025/$2?version=$1"
    }
  ]
}
```

#### Axios Request Examples

With the XSwitch configurations above, you can make requests using axios like this:

```javascript
// Basic request
const userData = await axios.get('/mock/user/123456');

// Request with parameters
const productData = await axios.get('/mock/products/789');

// Request with versioning
const versionedData = await axios.get('/mock/v1/users/list');

// POST request example
const newUser = await axios.post('/mock/user', {
  name: 'John Doe',
  age: 30
});
```

These requests will be automatically proxied to your local mock server at `http://localhost:2025` when using the XSwitch plugin with the configurations above.

## Project Structure

```
src/
├── index.ts         # Application entry point
├── mock-apis.ts     # API route configuration
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