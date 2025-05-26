# YouTube Transcript Summarizer

A Chrome extension that summarizes YouTube video transcripts using a custom prompt. Built with React and TypeScript.

## Features

- Summarizes YouTube video transcripts with a single click
- Customizable prompt for summary generation
- Copy summary to clipboard
- Error handling and retry support

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Google Chrome](https://www.google.com/chrome/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/yt-transcript.git
   cd yt-transcript
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

### Development

2. **Build the extension:**
   ```sh
   npm run build

   ```

3. **Load the extension in Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `dist` or `build` directory generated after running the build command

4. **Usage:**
   - Open any YouTube video
   - Click the extension icon
   - Click "Get Summary" to generate a summary of the video transcript

### File Structure

- `src/components/ChatComponent/ChatComponent.tsx`: Main chat and summary UI logic
- `src/components/ui/`: Reusable UI components
- `src/background/`: Chrome extension background scripts

### Notes

- This extension only works on YouTube video pages (`/watch?v=...`).
- Make sure to grant the necessary permissions in `manifest.json` for tabs and storage.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)