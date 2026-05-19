# ViaScholar

ViaScholar is a Chrome extension built to help underrepresented students find, track, and apply for scholarships more effectively. The project was originally built with San Antonio youth in mind, communities that often lack the guidance and resources to navigate the scholarship application process. The name Via reflects a pathway or road, symbolizing the journey these students take toward higher education. Our mascot is an alebrije, a vibrant Mexican folk art creature that represents the diverse communities we built this for.

## The Problem
Scholarship applications are scattered across dozens of websites, deadlines get missed, and students from underrepresented backgrounds often have no support system to help them through the process. ViaScholar centralizes that experience directly in the browser where students are already doing their research.

## Features
- Track scholarship applications with persistent storage across sessions
- AI-powered essay feedback using the OpenAI GPT-4 API
- Clean popup interface with full tab view option
- Data persists using Chrome's built-in Storage API with no account required

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- AI Integration: OpenAI GPT-4 API with structured prompt engineering
- Storage: Chrome Extension Storage API
- Build Tool: Vite
- Manifest: Chrome Extension Manifest V3

## How It Works
The user opens the extension and adds scholarships they are tracking. Data is saved locally through Chrome's Storage API so nothing disappears between sessions. For essay feedback, the user pastes their essay into the extension, which sends it to an Express backend that calls the GPT-4 API with a structured system prompt. GPT-4 returns feedback broken into four sections: Overview, Strengths, Weaknesses, and Grammar Notes.

## My Role
I led the UI/UX design in Figma, creating wireframes and interactive flows before writing a single line of code. I then built the frontend in HTML, CSS, and JavaScript, translating those prototypes into the final interface.

## Background
Built during Summer 2025 as a passion project to give back to the communities that shaped us.