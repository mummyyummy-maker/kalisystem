# AI Development Rules for `dyad-vue-template`

This document outlines the technology stack and specific library usage guidelines for the `dyad-vue-template` application. Adhering to these rules will help maintain consistency, improve collaboration, and ensure the AI assistant can effectively understand and modify the codebase.

## Tech Stack Overview

The application is built using the following core technologies:

- **Framework**: Vue 3
- **Language**: TypeScript
- **UI Components**: Shadcn/UI Vue components
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Forms**: VueUse for form handling
- **Notifications/Toasts**: Sonner
- **Charts**: Vue Chart.js
- **Routing**: Vue Router

## Library Usage Guidelines

To ensure consistency and leverage the chosen stack effectively, please follow these rules:

1. **UI Components**:
   - **Primary Choice**: Always prioritize using components from the `src/components/ui/` directory (Shadcn/UI Vue components).
   - **Custom Components**: If a required component is not available in Shadcn/UI, create a new component in `src/components/` following Shadcn/UI's composition patterns.
   - **Avoid**: Introducing new, third-party UI component libraries without discussion.

2. **Styling**:
   - **Primary Choice**: Exclusively use Tailwind CSS utility classes for all styling.
   - **Global Styles**: Reserve `src/assets/styles/globals.css` for base Tailwind directives, global CSS variable definitions, and minimal base styling. Avoid adding component-specific styles here.
   - **CSS-in-JS**: Do not use CSS-in-JS libraries (e.g., Styled Components, Emotion).

3. **State Management**:
   - **Primary Choice**: Use Pinia for state management.
   - **Local State**: Use Vue's `ref` and `reactive` for component-level state.
   - **Complex Global State**: For state shared between multiple components, prefer Pinia stores.

4. **Forms**:
   - **Management**: Use VueUse for form logic (state, validation, submission).
   - **Validation**: Use Zod for schema-based validation with VueUse.

5. **Routing**:
   - **Primary Choice**: Utilize Vue Router for routing.
   - **File Structure**: Keep routes in `src/router/index.ts`.

6. **Notifications/Toasts**:
   - **Primary Choice**: Use the `Sonner` component (from `src/components/ui/sonner.ts`) for all toast notifications.

7. **Charts & Data Visualization**:
   - **Primary Choice**: Use `vue-chartjs` and its associated components (e.g., `src/components/ui/chart.ts`) for displaying charts.

8. **Utility Functions**:
   - **Location**: General-purpose helper functions should be placed in `src/lib/utils.ts`.
   - **Quality**: Ensure functions are well-typed and serve a clear, reusable purpose.

9. **Custom Composables**:
   - **Location**: Custom Vue composables should be placed in the `src/composables/` directory (e.g., `src/composables/use-mobile.ts`).

10. **TypeScript**:
    - **Primary Choice**: Write all new code in TypeScript.
    - **Quality**: Strive for strong typing and leverage TypeScript's features to improve code quality and maintainability. Avoid using `any` where possible.

11. **Vue 3 Composition API**:
    - **Primary Choice**: Use the Composition API with `<script setup>` syntax for better type inference and organization.
    - **Props and Emits**: Define props with type definitions and defaults using `defineProps`. Use `defineEmits` for component events.
    - **Reactivity**: Use `ref`, `reactive`, and `computed` for reactive state management.
    - **Side Effects**: Use `watch` for side effects.
    - **Dependency Injection**: Use `provide` and `inject` for deep component communication.

12. **Component Naming**:
    - **Convention**: Use PascalCase for component filenames and component names.
    - **Example**: `TodoItem.vue`

By following these guidelines, we can build a more robust, maintainable, and consistent application.
