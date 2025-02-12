# Todo List App

This is a Todo List application built with **Next.js**, **TypeScript**, **Sonner** for
notifications, **Axios** for making HTTP requests, **Tailwind CSS** for styling, and **React Query**
for handling server-side data fetching. The app allows you to create, delete tasks, and features
optimistic updates for seamless interactions.

## Technologies

- **Next.js**: Framework for server-side rendering and static site generation.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Sonner**: Library for displaying notifications.
- **Axios**: HTTP client for making requests to the server.
- **Tailwind CSS**: Utility-first CSS framework for fast UI design.
- **React Query**: Library for fetching, caching, and synchronizing server data.

## Features

1. **Create tasks**:

   - You can add new tasks to your list.
   - New tasks are immediately displayed due to optimistic updates.

2. **Delete tasks**:

   - You can delete tasks from the list.
   - Optimistic updates are used for fast removal without waiting for the server.

3. **Optimistic Updates**:

   - When a task is added or removed, the UI is immediately updated without waiting for a round trip
     to the server.

4. **Notifications**:
   - Notifications are displayed for task creation or deletion using **Sonner**.

## Development Setup

### 1. Clone the repository

`git clone`

### 2.Install dependencies

`npm install`

### 3. Run the app

`npm run dev`
