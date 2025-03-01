# Architecture Decision Record

## GraphQL Codegen
**Path:** `codegen.ts` (at the project root)
We centralize configuration for generating TypeScript types and React Apollo hooks in this file, ensuring consistent type definitions and simpler maintenance.

---

# GitHub Templates Overview

This project uses **GitHub Issue and Pull Request Templates** in the `.github/ISSUE_TEMPLATE/` folder to standardize and streamline collaboration.

- **bug_report.md**: Structured format for reporting bugs
- **feature_request.md**: Guidelines for proposing new features
- **task.md**: Template for general tasks or chores
- **config.yml**: Defines which templates are available by default
- **PULL_REQUEST_TEMPLATE.md**: Standardizes PR submissions to improve review efficiency


# TestGraphQL Component Documentation

**File:** `src/features/tasks/pages/TestGraphQL.tsx`

**Purpose:**
This component demonstrates our Apollo Client integration by fetching and displaying tasks from the GraphQL backend. It serves as a test page to validate that our GraphQL queries and data handling are working as expected.


# Zod Schemas and Type Inferences for Tasks

**File:** `src/features/tasks/shared/schemas.ts`

## Overview
This file centralizes Zod schema definitions and type inferences for tasks. It ensures data validation consistency and type safety across the application by defining schemas for task statuses, priorities, and the overall task object.


- **taskFilterPropsSchema**
  - **Purpose:** Defines the shape of props for task filtering components.
  - **Fields:**
    - `selectedStatuses`: Array of task statuses.
    - `toggleStatus`: Function to toggle a status filter.
    - `selectedPriorities`: Array of task priorities.
    - `togglePriority`: Function to toggle a priority filter.
    - `toggleAll`: Function to toggle all filters at once.
    - `isAllSelected`: Boolean indicating if all filters are selected.

- **priorityCheckboxPropsSchema**
  - **Purpose:** Defines the props for a priority checkbox component.
  - **Fields:**
    - `priority`: A task priority.
    - `selectedPriorities`: Array of selected priorities.
    - `togglePriority`: Function to toggle the selection of a priority.
    - `label`: Optional string for the checkbox label.

## Derived Data

- **defaultLabels**
  - **Purpose:** Generates a mapping from each priority value to a capitalized label.
  - **Usage:** Provides user-friendly labels for displaying task priorities.

etc...


# Snackbar Component & State Management Overview

- **Snackbar Component** (`src/shared/components/Snackbar/Snackbar.tsx`):
  Displays notifications using Ionic's toast, retrieving the current message and type from a custom hook.

- **useSnackbar Hook** (`src/shared/hooks/useSnackbar.ts`):
  Manages snackbar logic and error display by interfacing with a Zustand store, providing functions to set, clear, and show error messages.

- **Zustand Store** (`src/shared/store/useSnackbarStore.ts`):
  Maintains the snackbar state (message and type) and offers methods for updating or clearing this state.

- **Integration in App** (`src/App.tsx`):
  The Snackbar component is integrated at the application level to ensure notifications are available globally.

- **handleError Function** (`src/shared/utils/handleError.ts`):
  - Centralizes error processing by distinguishing between different error types.
  - For **ApolloError**, it aggregates GraphQL error messages or falls back to a default message.
  - For **ZodError**, it formats validation errors into a concise message.
  - For standard **Error** instances, it returns the error message.
  - Provides a generic fallback message for unknown error types.


# String Utilities Overview

- **File:** `src/shared/utils/stringUtils.ts`
- **Purpose:** Provides utilities to consistently capitalize words in strings.
- **Key Features:**
  - **Recursive Type (`CapitalizeWords`):** A TypeScript type that recursively capitalizes each word in a string literal at compile time.
  - **`capitalizeWords` Function:** Converts an input string to lower case, splits it into words, capitalizes the first letter of each, and rejoins them, returning a value matching the recursive type.


# Theme Hook Overview

**File:** `src/theme/hooks/useTheme.ts`

**Purpose:**
Provides a custom hook, `useTheme`, to manage the application's theme (dark/light). It determines the initial theme by checking local storage or the document's class, updates the DOM accordingly, and persists the user's preference.

**Observation:**
On Ubuntu Linux, if the system is set to dark mode, switching to light mode is not possible. However, when the OS is in light mode, you can toggle between dark and light themes.

