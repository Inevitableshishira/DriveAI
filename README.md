# DriveAI - AI-Navigated Car Dealership Website

![DriveAI](https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&h=600&fit=crop)

**Live URL**: https://driveai-jet.vercel.app

An AI-powered car dealership website featuring an intelligent assistant that navigates the page and modifies content based on user queries.

## Features

### AI Assistant Capabilities
The persistent AI assistant can handle the following query types:

| Query Type | Example Phrasings | Action |
|------------|-------------------|--------|
| **Filter by Type** | "Show me SUVs", "I want an electric car" | Filters car grid by vehicle type |
| **Filter by Price** | "Show cars under 20 lakhs", "Budget is 15 lakhs" | Filters cars by maximum price |
| **Compare Models** | "Compare your top models", "Show Velox vs Aurora" | Scrolls to comparison with selected cars |
| **Book Test Drive** | "Book a test drive for Saturday in Kochi", "I want to test drive the Velox" | Pre-fills booking form |
| **Family Recommendation** | "Best car for family of five", "Need something for kids" | Highlights recommended car |
| **Currency Toggle** | "Show prices in dollars", "Convert to USD" | Switches pricing currency |

### Website Sections
- **Hero**: Animated landing with key stats and CTA
- **Models**: 6 car models with filtering, highlighting, and details modal
- **Features**: AI-powered features showcase
- **Comparison**: Side-by-side spec comparison (up to 3 cars)
- **Pricing**: Currency toggle with full pricing breakdown
- **Booking**: Test drive form with pre-fill capability
- **Contact**: Contact form and company information

## Tech Stack

| Technology | Choice | Rationale |
|------------|--------|-----------|
| **Framework** | React 18 + Vite | Fast dev server, optimized builds |
| **Styling** | Tailwind CSS v4 | Utility-first, modern CSS features |
| **Animation** | Framer Motion | Declarative animations, gestures |
| **Icons** | Lucide React | Consistent, tree-shakeable icons |
| **Deployment** | Vercel | Free tier, edge network, zero config |

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/driveai.git
cd driveai

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AIAssistant.tsx    # Chat widget with NLP handling
│   ├── Navigation.tsx     # Floating nav with scroll tracking
│   ├── Hero.tsx           # Animated hero section
│   ├── Models.tsx         # Car grid with filtering
│   ├── Features.tsx       # Feature showcase
│   ├── Comparison.tsx      # Spec comparison table
│   ├── Pricing.tsx        # Currency toggle
│   ├── Booking.tsx        # Test drive form
│   └── Contact.tsx         # Contact form + Footer
├── data/
│   └── cars.ts            # Car data and formatters
├── App.tsx                 # Main app with state management
├── index.css              # Tailwind + custom styles
└── main.tsx               # Entry point
```

## AI Assistant Architecture

The assistant uses a pattern-matching NLP approach:

1. **Query Parsing**: Regex patterns match user intent
2. **Parameter Extraction**: Groups like `(\d+) lakh` extract values
3. **State Updates**: Direct React state manipulation
4. **Navigation**: Smooth scroll to relevant section
5. **Visual Feedback**: Highlighting, filtering, form pre-fill

### Extending Query Handlers

Add new patterns in `AIAssistant.tsx`:

```typescript
{
  patterns: [/your pattern/i],
  action: 'your-action',
  getParams: (query) => ({ /* extract params */ })
}
```

## What I'd Build Next (With Another Week)

1. **Real AI Integration**: Connect to Claude/OpenAI for natural conversations
2. **User Accounts**: Save preferences and booking history
3. **3D Car Viewer**: Interactive WebGL car configurator
4. **Live Chat**: Human handoff with support team
5. **Analytics Dashboard**: Track popular queries and conversions
6. **Multi-language Support**: Hindi, regional languages
7. **AR Test Drive**: WebXR for at-home car visualization

## License

MIT License - feel free to use for portfolio or learning.
