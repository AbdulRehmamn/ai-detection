# AI Text Detector

A client-side tool for analyzing text to determine if it was likely written by an AI language model or a human.

## Features

- Real-time text analysis for AI content detection
- Measures multiple text characteristics:
  - Sentence structure variation
  - Word choice diversity
  - Text complexity
  - Pattern recognition
- Simple, intuitive user interface
- Client-side processing (no data sent to servers)
- Responsive design for all devices

## Technical Implementation

This tool uses a simplified set of heuristics to estimate whether text was AI-generated:

1. **Sentence variation analysis**: Examines the variety in sentence length and structure
2. **Uncommon word detection**: Checks for the presence of less common vocabulary words
3. **Text length considerations**: Longer texts provide more data points for analysis
4. **Randomization**: A small random factor is included to simulate the imperfect nature of detection

## How to Use

1. Paste text (at least one paragraph) into the text area
2. Click "Detect AI"
3. View the analysis results and probability meter

## Disclaimer

This is a demonstration tool with simplified heuristics. While it can provide insights, it should not be considered a definitive AI content detector. In a production environment, a more sophisticated model would integrate with ML APIs and include additional analysis factors.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite

## Development

```
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## License

MIT
