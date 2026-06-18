# Task Management Dashboard

This is my submission for the Frontend Engineering Assessment. It's a responsive task management UI built with Angular.

## Setup Instructions

Make sure you have Node.js and the Angular CLI installed.

1. Clone the repo and navigate into the project folder.
2. Run `npm install` to get the dependencies.
3. Run `npm start` to spin up the dev server. It will be available at `http://localhost:4200/`.
4. If you want to build for production, just run `npm run build`.

## Architecture Decisions

I went with a modern Angular approach (v17+) using standalone components so I wouldn't have to deal with NgModules.

For state management, I used a mix of RxJS and Angular Signals. The `TaskService` holds the main state in a `BehaviorSubject`, which keeps the API calls and data logic out of the UI components. Then, in the `Dashboard` component, I sync that data into a Signal. This made it really easy to use a `computed()` signal for the filtering logic—it automatically updates the UI whenever the search text or status dropdown changes, which saves me from having to manually manage change detection or worry about the UI getting out of sync.

I also used strictly typed Reactive Forms (`nonNullable.group`) for the "Add Task" feature so the data shape is guaranteed to match my `CreateTaskDTO` interface before it even hits the service. For the stats calculation, I used a single array `reduce` pass instead of chaining a bunch of filters together to keep it fast.

## Design System & UI

I decided not to use a heavy component library like Angular Material or Bootstrap. Instead, I built everything from scratch using standard SCSS. 

**Why custom SCSS?**
I wanted full control over the look and feel. It keeps the bundle size small and let me create a cleaner, more modern dark-mode UI without having to fight a framework's default styles or worry about overriding heavy external stylesheets.

**Components:**
Everything you see (the cards, the stats widgets, the forms, the inputs) is 100% custom-built. No third-party UI libraries were used. I set up some CSS variables for colors and spacing to keep things consistent, and used standard media queries (flexbox/grid) to make sure the layout responds properly on mobile, tablet, and desktop.

## Time Spent
I spent roughly 3 hours on this:
- **1 hour:** UI layout and writing the custom SCSS.
- **1 hour:** Core logic, setting up the Reactive Forms, and wiring up the mock API.
- **1 hour:** Refactoring to use Signals for the filters, fixing TypeScript warnings, and general cleanup.


