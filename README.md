# @pulsar-framework/cli

Official command-line interface for Pulsar framework.

## Installation

```bash
npm install -g @pulsar-framework/cli
```

## Commands

### `pulsar create <app-name>`

Create a new Pulsar application with interactive setup.

```bash
pulsar create my-app

# With options
pulsar create my-app --template full
pulsar create my-app --no-git
pulsar create my-app --package-manager pnpm
```

**Options:**
- `--template <type>` - Project template (basic, full, minimal)
- `--typescript` - Use TypeScript (default: true)
- `--git` - Initialize git repository (default: true)
- `--package-manager <pm>` - Package manager (npm, pnpm, yarn)

### `pulsar generate <type> <name>`

Generate code from templates.

```bash
pulsar generate component Button
pulsar generate store UserStore
pulsar generate resource UserResource
pulsar generate route /users/:id
```

**Types:**
- `component` - UI component with JSX
- `store` - Redux-style store
- `resource` - Async data resource
- `route` - Router route with component
- `hook` - Custom hook
- `context` - Context provider

**Options:**
- `--path <dir>` - Output directory
- `--typescript` - Generate TypeScript (default: true)
- `--test` - Generate test file

### `pulsar add <integration>`

Add pre-configured integrations.

```bash
pulsar add formular.dev
pulsar add tailwind
pulsar add router
```

**Available integrations:**
- `formular.dev` - Form management library
- `tailwind` - Tailwind CSS setup
- `router` - Pulsar router
- `state` - State management
- `testing` - Testing utilities

### `pulsar build`

Build the application for production.

```bash
pulsar build

# With SSR
pulsar build --ssr

# Development build
pulsar build --dev
```

**Options:**
- `--ssr` - Enable server-side rendering
- `--dev` - Development build
- `--analyze` - Analyze bundle size

## Development

```bash
# Install dependencies
npm install

# Build CLI
npm run build

# Run in development
npm run dev

# Test
npm test
```

## License

MIT
