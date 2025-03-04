# Project Structure

## Overview

This application follows a feature-based folder structure for better scalability and organization. Each main feature (e.g., `tasks`) has its own directory containing:
- **Components**: UI elements and widgets
- **Pages**: Top-level screens or views
- **Store**: Zustand store or related state for that feature
- **Queries**: GraphQL queries and mutations specific to that feature

## Shared Modules

### `/shared/hooks`
Reusable custom React hooks, such as `useTheme`, `useMobile`, or other cross-cutting concerns.

### `/shared/store`
A global Zustand store or any other global state managers.

### `/shared/utils`
Utility functions or classes that are not feature-specific (e.g., error handling, string manipulation).

## Theming

The `/theme` folder contains:
- `variables.css` or SCSS files for Ionic theming
- `useTheme.ts` hook for dynamic theming in React

## i18n

We use `i18next` for handling multiple languages. Configuration can be found in a file like `i18n.ts` or `i18n/index.ts`.

- **Translations**: Typically stored in `public/locales` or a similar structure.
- **Usage**: Wrap components in `I18nextProvider` (often in `App.tsx`) and use the `useTranslation` hook in child components.

## GraphQL & Apollo

- **Apollo Client**: Configured in `src/lib/apolloClient.ts`.
- **GraphQL Codegen**: The `codegen.ts` config defines how we generate TypeScript types and React Apollo hooks from `.graphql` documents.
- **Queries & Mutations**: Placed in feature folders (e.g., `features/tasks/queries.ts`).

## State Management

### TanStack React Query
Used for caching server-state from the GraphQL API. Queries and mutations that involve server data typically go through React Query’s `useQuery` and `useMutation` hooks (auto-generated by Apollo or manually set up).

### Zustand
For local or UI-centric state (e.g., toggling modals, ephemeral data), we use Zustand in each feature or in `/shared/store`.

## Testing

- **Unit Testing**: Vitest is configured to test components, hooks, and utilities.
- **E2E Testing**: Cypress is set up to run end-to-end tests for the Ionic/React application.
- **Storybook**: Useful for developing and testing components in isolation. Located in `.storybook/`.

## Best Practices

- Leverage **Zod** for input validation (both client and server) to maintain a single source of truth for data schemas.
- Keep an eye on performance optimizations in React by using React Query’s caching strategies and memoization where appropriate.
- Ensure consistent code style using **ESLint** and **Prettier**.
