# PROMPTS.md - AI Coding Prompts Used

This document contains the actual prompts used during development with honest notes on what worked and what needed adjustment.

---

## Prompt 1: Initial Project Setup

**Prompt:**
```
Create a React + Vite + TypeScript project for a car dealership website. Install Tailwind CSS, Framer Motion, and Lucide icons. Set up the basic folder structure with components, data, and hooks directories.
```

**Result:** ✅ Worked first try. Clean project scaffold created with all dependencies.

---

## Prompt 2: Hero Section Design

**Prompt:**
```
Build a futuristic hero section for an electric car company. Include:
- Large gradient headline with "The Future of Intelligent Driving"
- Stats display showing 520km range, 2.8s acceleration, 5-star safety
- Two CTA buttons: "Explore Models" and "Watch Film"
- Animated floating car image
- Dark theme with cyan/blue accents
```

**Result:** ⚠️ Partially worked. Had to adjust the car image source and add custom animations for the floating effect. Initial design was too generic, so I added glow effects and better typography.

---

## Prompt 3: Car Models Grid

**Prompt:**
```
Create a responsive grid of 6 car models with:
- Card design showing image, name, type badge, specs
- Price display
- Hover effects with lift animation
- Filter functionality (by type: SUV, sedan, sports, electric)
- Modal popup for car details
```

**Result:** ⚠️ Worked but needed refinement. The filter logic wasn't clearing properly, so I added state reset on new filters. Modal animation timing needed adjustment.

---

## Prompt 4: AI Assistant Widget

**Prompt:**
```
Build a floating AI chat assistant for the website that:
- Appears as a bot icon in bottom-right corner
- Opens a chat panel with message history
- Has text input and voice input (microphone button)
- Processes natural language queries using regex patterns
- Navigates the page based on queries
- Filters car results, changes currency, pre-fills forms
```

**Result:** ⚠️ Complex implementation. Required multiple iterations:
1. First version only scrolled, didn't change content
2. Added state management for filters
3. Voice input required browser API handling with fallback
4. Pattern matching needed refinement for better matching

---

## Prompt 5: Spec Comparison Table

**Prompt:**
```
Create a comparison table for cars with:
- Select up to 3 cars to compare
- Side-by-side spec columns (range, power, acceleration, price)
- Highlight best values automatically
- Responsive design for mobile
- Smooth animations when changing selection
```

**Result:** ✅ Worked well. Added `motion.layout` from Framer Motion for smooth transitions. The "best value" highlighting logic required a custom comparison function.

---

## Prompt 6: Currency Toggle

**Prompt:**
```
Add currency conversion for car prices:
- Toggle between INR (₹) and USD ($)
- INR shows as "X.XX Lakhs"
- USD shows as "$XX,XXX"
- Smooth transition when switching
- Persists in component state
```

**Result:** ✅ Worked first try. Simple state toggle with formatPrice function handling the conversion (using fixed 83 INR = 1 USD rate).

---

## Prompt 7: Test Drive Booking Form

**Prompt:**
```
Build a test drive booking form with:
- Fields: name, email, phone, city (dropdown), model interest (dropdown), preferred date, time slots
- Pre-fill capability from AI assistant
- Form validation
- Success state animation
- Dark theme matching the rest of the site
```

**Result:** ⚠️ Pre-fill from AI wasn't working initially. Fixed by ensuring the form data state was properly passed from parent component. Date picker required custom styling for dark theme.

---

## Prompt 8: Navigation Component

**Prompt:**
```
Create a floating navigation bar that:
- Stays at top of viewport with glass blur effect
- Shows current section highlighted
- Has mobile hamburger menu
- Smooth scrolls to sections
- Collapses gracefully on scroll
```

**Result:** ✅ Worked well. Used Intersection Observer pattern to track active section. Mobile menu needed AnimatePresence for smooth open/close.

---

## Prompt 9: Animations and Transitions

**Prompt:**
```
Add smooth animations throughout the site:
- Staggered entrance animations for grids
- Section highlight when AI navigates
- Car card hover effects
- Navigation transitions
- Use Framer Motion for all animations
```

**Result:** ⚠️ Performance concerns with too many animated elements. Reduced motion complexity and used `viewport={{ once: true }}` to only animate on first view.

---

## Prompt 10: Final Polish

**Prompt:**
```
Polish the complete site:
- Add custom scrollbar styling
- Improve focus states for accessibility
- Add selection color matching theme
- Optimize images
- Add loading skeleton for images
```

**Result:** ⚠️ Partially worked. Loading skeletons required a custom component. Had to add proper TypeScript types throughout.

---

## Key Learnings

1. **Be specific about state management**: AI needs clear instructions on where state lives
2. **Start simple, iterate**: Complex features need multiple refinement passes
3. **Test edge cases**: Form validation, empty states, voice input fallbacks
4. **Performance matters**: Too many Framer Motion elements caused jank
5. **TypeScript is worth it**: Catches errors early, improves code quality
