# We Want Waste - Skip Hire Booking Application

A modern, responsive web application for booking skip hire services built with React, TypeScript, and Tailwind CSS.

##  Overview

This application provides a streamlined multi-step booking process for skip hire services, allowing users to select appropriate skip sizes based on their location and requirements. The current implementation focuses on the "Select Skip" step of a 6-step booking journey.

##  Architecture & Approach

### Technical Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks (useState, useEffect)

### Design Philosophy

**Production-Ready Excellence**
- Focus on user experience and visual polish
- Comprehensive error handling and loading states
- Responsive design covering mobile, tablet, and desktop viewports

**Modern UI/UX Principles**
- Gradient backgrounds and subtle animations
- Micro-interactions and hover states
- Progressive disclosure to manage complexity
- Clear visual hierarchy and consistent spacing

**Accessibility & Usability**
- High contrast ratios for readability
- Responsive breakpoints for all device sizes
- Clear visual feedback for user actions
- Intuitive navigation and step indicators

##  Key Features

### Multi-Step Progress Tracking
- Visual progress indicator with 6 distinct steps
- Current step highlighting with animated transitions
- Responsive step display (full on desktop, dots on mobile)
- Completed step indicators with checkmarks

### Skip Selection Interface
- Dynamic loading of skip options from API
- Visual skip cards with pricing and specifications
- Clear selection states with visual feedback
- Special indicators for restrictions (e.g., "Private Land Only")
- Hover effects and smooth transitions

### Responsive Design System
- Mobile-first approach with progressive enhancement
- Tailored layouts for different screen sizes
- Consistent 8px spacing system
- Comprehensive color palette with multiple shades

### Data Management
- RESTful API integration for skip data
- Error handling with user-friendly messages
- Loading states with spinner animations
- Type-safe data models with TypeScript interfaces

## Responsive Breakpoints

- **Mobile**: < 768px - Simplified layout with stacked elements
- **Tablet**: 768px - 1024px - Balanced grid layouts
- **Desktop**: > 1024px - Full-featured multi-column layouts

## Design System

### Color Palette
- **Primary**: Blue gradient (blue-600 to indigo-600)
- **Secondary**: Emerald green for success states
- **Accent**: Amber/orange for warnings
- **Neutral**: Slate colors for text and backgrounds
- **Interactive**: Hover states with elevated shadows

### Typography
- Clear hierarchy with appropriate font weights
- 150% line spacing for body text
- 120% line spacing for headings
- Maximum of 3 font weights for consistency

### Components
- Rounded corners (xl/2xl) for modern appearance
- Subtle shadows and backdrop blur effects
- Gradient overlays and visual depth
- Consistent button styles with state variations

## API Integration

### Skip Data Endpoint
```
GET https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

### Data Model
The application expects skip data with the following structure. This model is defined in the model directory:
- `id`: Unique identifier
- `size`: Skip size in yards
- `price_before_vat`: Base price
- `vat`: VAT amount
- `hire_period_days`: Rental duration
- `area`: Service location
- `allowed_on_road`: Road placement permission
- `allows_heavy_waste`: Heavy waste acceptance
- `forbidden`: Availability status

##  Error Handling

### Loading States
- Spinner animation with descriptive text
- Prevents user interaction during data fetching
- Consistent loading UI across the application

### Error Management
- User-friendly error messages
- Retry functionality for failed requests
- Fallback UI for empty data states
- Console logging for debugging

##  User Experience Features

### Visual Feedback
- Selected state highlighting with checkmarks
- Hover effects on interactive elements
- Smooth transitions and animations
- Clear pricing display with VAT breakdown

### Accessibility
- Screen reader friendly markup
- Keyboard navigation support
- High contrast color combinations
- Descriptive alt text for images

### Performance
- Efficient re-renders with proper state management
- Optimized images and assets
- Fast build times with Vite
- Minimal bundle size with tree shaking

##  State Management

The application uses React's built-in state management:
- `skips`: Array of available skip options
- `loading`: Loading state for API requests
- `error`: Error state with user messages
- `selectedSkip`: Currently selected skip ID


##  Development

### Getting Started
```bash
npm install
npm run dev
```

##  Code Quality

- TypeScript for type safety
- ESLint configuration for code consistency
- Modular component architecture
- Clear separation of concerns
- Comprehensive error boundaries

