# Pulsar CLI Implementation Plan

## Architecture

Following Pulsar's implementation rules:
- ✅ Feature Slice Pattern
- ✅ Prototype-based architecture
- ✅ One item per file
- ✅ No `any` types
- ✅ Comprehensive testing

## Folder Structure

```
pulsar-cli/
├── src/
│   ├── cli.ts                    # Main CLI entry
│   ├── cli.types.ts              # TypeScript interfaces
│   ├── commands/                 # Command implementations
│   │   ├── create/
│   │   │   ├── create-command.ts
│   │   │   ├── create-command.types.ts
│   │   │   ├── templates/
│   │   │   │   ├── basic/
│   │   │   │   ├── full/
│   │   │   │   └── minimal/
│   │   │   └── prototype/
│   │   │       ├── scaffold-project.ts
│   │   │       ├── init-git.ts
│   │   │       └── install-deps.ts
│   │   ├── generate/
│   │   │   ├── generate-command.ts
│   │   │   ├── generate-command.types.ts
│   │   │   ├── templates/
│   │   │   │   ├── component.template.ts
│   │   │   │   ├── store.template.ts
│   │   │   │   └── resource.template.ts
│   │   │   └── prototype/
│   │   │       ├── generate-file.ts
│   │   │       └── render-template.ts
│   │   ├── add/
│   │   │   ├── add-command.ts
│   │   │   ├── add-command.types.ts
│   │   │   ├── integrations/
│   │   │   │   ├── formular.ts
│   │   │   │   ├── tailwind.ts
│   │   │   │   └── router.ts
│   │   │   └── prototype/
│   │   │       ├── install-integration.ts
│   │   │       └── update-config.ts
│   │   └── build/
│   │       ├── build-command.ts
│   │       ├── build-command.types.ts
│   │       └── prototype/
│   │           ├── build-client.ts
│   │           ├── build-ssr.ts
│   │           └── analyze-bundle.ts
│   ├── utils/
│   │   ├── logger.ts             # Colored console output
│   │   ├── file-system.ts        # File operations
│   │   ├── package-manager.ts    # npm/pnpm/yarn detection
│   │   └── spinner.ts            # Loading spinners
│   ├── __tests__/
│   │   ├── create.test.ts
│   │   ├── generate.test.ts
│   │   ├── add.test.ts
│   │   └── build.test.ts
│   └── index.ts                  # Public exports
├── bin/
│   └── pulsar.js                 # Executable entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Implementation Steps

### Phase 1: Core Infrastructure ✅
1. Project setup (package.json, tsconfig.json)
2. CLI entry point with commander
3. Logger utility with chalk
4. File system utilities
5. Package manager detection

### Phase 2: Create Command
1. Interactive prompts with inquirer
2. Template system (basic, full, minimal)
3. Project scaffolding
4. Git initialization
5. Dependency installation

### Phase 3: Generate Command
1. Template engine
2. Component generator
3. Store generator
4. Resource generator
5. Route generator
6. Hook generator

### Phase 4: Add Command
1. Integration registry
2. formular.dev integration
3. Tailwind CSS integration
4. Router integration
5. Config file updates

### Phase 5: Build Command
1. Client build
2. SSR build
3. Bundle analyzer
4. Production optimizations

### Phase 6: Testing
1. Unit tests for all commands
2. Integration tests
3. Template tests
4. Error handling tests

## Template Examples

### Component Template
```typescript
export function {{ComponentName}}() {
  return (
    <div class="{{component-name}}">
      <h1>{{ComponentName}}</h1>
    </div>
  )
}
```

### Store Template
```typescript
import { createStore } from '@pulsar-framework/pulsar.dev'

interface {{StoreName}}State {
  // Add state properties
}

const initialState: {{StoreName}}State = {
  // Initialize state
}

export const {{storeName}} = createStore(
  initialState,
  (state, action) => {
    switch (action.type) {
      default:
        return state
    }
  }
)
```

## Dependencies

**Runtime:**
- `commander` - CLI framework
- `chalk` - Terminal colors
- `inquirer` - Interactive prompts
- `ora` - Spinners
- `fs-extra` - File operations
- `execa` - Process execution

**Dev:**
- `typescript` - Type checking
- `vitest` - Testing
- `@types/*` - Type definitions

## Quality Checklist

- ✅ Follow Feature Slice Pattern
- ✅ Prototype-based architecture
- ✅ One item per file
- ✅ No `any` types
- ✅ Full TypeScript support
- ✅ Comprehensive tests
- ✅ Error handling
- ✅ User-friendly messages
- ✅ Documentation
- ✅ Examples

## Success Criteria

- ✅ All 4 commands implemented
- ✅ Templates for all generators
- ✅ All integrations working
- ✅ 20+ passing tests
- ✅ Complete documentation
- ✅ Production build successful
