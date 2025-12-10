# PWG Post Management System

A full-stack web application for managing posts with user authentication, role-based access control, and CRUD operations.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Features](#features)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Project structure](#project-structure)
- [Design specifications](#design-specifications)
  - [Layout](#layout)
  - [Colors](#colors)
  - [Typography](#typography)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the application](#running-the-application)

## Overview

### The challenge

Build a post management system with the following requirements:

**Authentication & Authorization:**

- User registration and login with JWT token-based authentication
- Role-based access control (Admin and User roles)
- Protected routes requiring authentication

**Post Management:**

- Create, read, update, and delete posts
- Add tags to posts for categorization
- View individual post details
- Pagination for post listings

**Admin Features:**

- View statistics dashboard (Total Accounts, Total Posts, My Posts)
- Full CRUD operations on all posts

**User Features:**

- Create and manage their own posts
- View all published posts
- Edit and delete only their own posts

**UI/UX Requirements:**

- Responsive design for mobile and desktop
- Form validation with error handling
- Success/error notifications
- Loading states for async operations
- Modal dialogs for forms and confirmations

### Features

Users can:

- ✅ Register a new account with username, email, password, and role selection
- ✅ Login with email and password
- ✅ View posts with pagination (9 posts per page)
- ✅ Create new posts with title, content, and tags
- ✅ Edit existing posts
- ✅ Delete posts with confirmation
- ✅ View detailed post content
- ✅ Filter posts by tags
- ✅ Admin users can view statistics dashboard
- ✅ Responsive design works on all device sizes
- ✅ Form validation with real-time error messages
- ✅ See success/error notifications for all actions

### Links

- Solution URL: [GitHub Repository](https://github.com/KC900201/post_management_system)
- Live Site URL: [Add deployment URL here]

## My process

### Built with

- **Frontend Framework**: [React 19.2.0](https://reactjs.org/) - Latest React with improved performance
- **Language**: [TypeScript 5.9.3](https://www.typescriptlang.org/) - For type safety and better developer experience
- **Build Tool**: [Vite 7.2.4](https://vitejs.dev/) - Fast development server and build tool
- **Styling**: [Tailwind CSS v4.1.17](https://tailwindcss.com/) - Utility-first CSS framework with new @theme directive
- **Routing**: [React Router DOM 7.10.1](https://reactrouter.com/) - Client-side routing
- **Form Handling**: [Formik 2.4.9](https://formik.org/) - Form state management and validation
- **Validation**: [Yup 1.7.1](https://github.com/jquense/yup) - Schema-based form validation
- **State Management**:
  - [React Context API](https://react.dev/reference/react/createContext) - For authentication state
  - [TanStack Query 5.90.12](https://tanstack.com/query) - Server state management and caching
- **HTTP Client**: [Axios 1.13.2](https://axios-http.com/) - Promise-based HTTP client
- **UI Components**:
  - [Radix UI](https://www.radix-ui.com/) - Accessible, unstyled component primitives
  - [Lucide React 0.556.0](https://lucide.dev/) - Icon library
  - [Sonner 2.0.7](https://sonner.emilkowal.ski/) - Toast notifications
- **Utilities**:
  - [clsx 2.1.1](https://github.com/lukeed/clsx) - Conditional className utility
  - [tailwind-merge 3.4.0](https://github.com/dcastil/tailwind-merge) - Merge Tailwind classes
  - [class-variance-authority 0.7.1](https://cva.style/) - Component variant utilities

### Project Structure

```
src/
├── components/
│   ├── atoms/           # Basic UI building blocks
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── TextArea.tsx
│   │   ├── Label.tsx
│   │   ├── Tag.tsx
│   │   ├── Link.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── SuccessIcon.tsx
│   ├── molecules/       # Composite components
│   │   ├── FormField.tsx
│   │   ├── TextAreaField.tsx
│   │   ├── SelectField.tsx
│   │   ├── TagInput.tsx
│   │   ├── PostCard.tsx
│   │   ├── StatCard.tsx
│   │   └── Pagination.tsx
│   ├── organisms/       # Complex component sections
│   │   ├── Header.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── PostFormModal.tsx
│   │   ├── DeletePostModal.tsx
│   │   ├── SuccessModal.tsx
│   │   └── ProtectedRoute.tsx
│   ├── templates/       # Page layouts
│   │   ├── AuthTemplate.tsx
│   │   └── DashboardTemplate.tsx
│   ├── pages/          # Full page components
│   │   ├── IndexPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── PostListPage.tsx
│   │   ├── ViewPostPage.tsx
│   │   └── NotFoundPage.tsx
│   └── ui/             # Radix UI components
│       ├── button.tsx
│       ├── select.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── tooltip.tsx
│       └── sonner.tsx
├── contexts/
│   └── AuthContext.tsx  # Authentication context provider
├── hooks/
│   └── use-toast.ts     # Toast notification hook
├── lib/
│   ├── api.ts           # API service layer with mock data
│   ├── auth.ts          # Authentication utilities
│   └── utils.ts         # Utility functions (cn, etc.)
├── App.tsx              # Main application component with routing
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind configuration
```

**Architecture Pattern**: Atomic Design

- **Atoms**: Smallest reusable components (Button, Input, etc.)
- **Molecules**: Simple combinations of atoms (FormField, PostCard)
- **Organisms**: Complex UI sections (Header, Forms, Modals)
- **Templates**: Page layouts (AuthTemplate, DashboardTemplate)
- **Pages**: Complete pages with business logic

## Design specifications

### Layout

The application is designed to be fully responsive across all devices:

- **Mobile**: 375px - 768px (Single column layout, stacked cards)
- **Tablet**: 768px - 1024px (2-column grid for post cards)
- **Desktop**: 1024px+ (3-column grid for post cards, max-width constraints)

**Key Layout Features:**

- Mobile-first approach with progressive enhancement
- Flexible grid system using Tailwind's responsive utilities
- Maximum content width of 1400px (6xl) for optimal readability
- Consistent spacing and padding across breakpoints
- Touch-friendly UI elements (48px minimum tap targets on mobile)

**Page Layouts:**

- **Auth Pages** (Login/Register): Centered card layout with max-width 28rem
- **Dashboard**: Full-width header with constrained content area
- **Post List**: Grid layout (1-2-3 columns based on screen size)
- **View Post**: Single column with max-width 64rem for readability

### Colors

The application uses a warm, professional color palette:

#### Primary Colors

- **Primary Orange**: `#f8b959` - Main brand color for buttons, links, and accents
- **Light Peach**: `#fdeacd` - Secondary color for backgrounds and hover states
- **White**: `#ffffff` - Card backgrounds and clean surfaces

#### Semantic Colors

- **Destructive Red**: `#f95a50` - Delete buttons, error states
- **Success Green**: `#d9f7cf` - Success messages, edit buttons
- **Pink Rose**: `#E6A5A1` - Statistics card background

#### Neutral Colors

- **Background**: `#e8e8e8` - Page background (light gray)
- **Foreground**: `#2d2d2d` - Primary text color (dark gray)
- **Muted**: `#757575` - Secondary text, muted content

#### Implementation

Colors are defined using Tailwind v4's `@theme` directive with oklch color space:

```css
@theme {
  /* Primary colors */
  --color-primary: oklch(from #f8b959 l c h);
  --color-primary-foreground: oklch(0.15 0 0);
  --color-primary-light: oklch(from #fdeacd l c h);

  /* Semantic colors */
  --color-destructive: oklch(from #f95a50 l c h);
  --color-success: oklch(from #d9f7cf l c h);

  /* UI elements */
  --color-border: oklch(from #f8b959 l c h);
  --color-card: oklch(from #ffffff l c h);
}
```

#### Color Usage

- **Buttons**: Primary orange (#f8b959) with white text
- **Inputs**: Orange border (#f8b959) on focus
- **Tags**: Light peach background (#fdeacd)
- **Cards**: White background (#ffffff) with subtle shadows
- **Statistics**: Colored backgrounds (pink, green, peach) with dark text

### Typography

#### Font Family

- **Primary**: System font stack - `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Rationale**: Native system fonts provide the best performance and familiar UX for each platform

#### Font Weights

- **Regular**: 400 - Used for body text, labels, and general content
- **Medium**: 500 - Used for button text and subtle emphasis
- **Semibold**: 600 - Used for card headings and section titles
- **Bold**: 700 - Used for page headings and important emphasis

#### Font Sizes

Responsive typography using Tailwind's default scale:

- **Headings**:
  - H1 (Page Title): `text-2xl` (1.5rem) on mobile, `text-3xl` (1.875rem) on desktop
  - H2 (Section/Modal Title): `text-xl` (1.25rem) on mobile, `text-2xl` (1.5rem) on desktop
  - H3 (Card Title): `text-lg` (1.125rem)
- **Body Text**:
  - Regular: `text-base` (1rem / 16px)
  - Small: `text-sm` (0.875rem / 14px) - Used for labels, dates, tags
  - Extra Small: `text-xs` (0.75rem / 12px) - Used for tags and metadata

#### Line Height

- **Headings**: `leading-tight` (1.25) for better visual hierarchy
- **Body**: Default `leading-normal` (1.5) for optimal readability
- **Relaxed**: `leading-relaxed` (1.625) for long-form content in post views

#### Text Colors

- **Primary Text**: `text-foreground` - Dark gray (#2d2d2d)
- **Secondary Text**: `text-muted-foreground` - Medium gray for less emphasis
- **Accent Text**: `text-primary` - Orange for links and highlights
- **Error Text**: `text-destructive` - Red for validation errors

Implementation:

```css
@layer base {
  body {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif;
    color: hsl(0 0% 15%);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/KC900201/post_management_system.git
cd post_management_system
```

2. Install dependencies:

```bash
npm install
```

3. Verify installation:

```bash
npm list
```

### Running the Application

1. **Development Mode** (with hot reload):

```bash
npm run dev
```

The application will start at `http://localhost:5173`

2. **Build for Production**:

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder

3. **Preview Production Build**:

```bash
npm run preview
```

4. **Lint Code**:

```bash
npm run lint
```

### Default Test Credentials

The application uses mock authentication. Use these credentials to test:

**Admin Account:**

- Email: `admin@yahoo.com`
- Password: `password123`
- Access: Can view statistics, manage all posts

**User Account:**

- Email: `user@yahoo.com`
- Password: `password123`
- Access: Can create and manage own posts only

### Project Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Type-check with TypeScript and build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
