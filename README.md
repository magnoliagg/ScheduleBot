# ScheduleBot

A simple scheduling bot to help manage daily tasks and events.

## Features
- Add/remove schedule events
- View schedule list in chronological order
- Simple and clean web interface
- SQLite database for persistent storage

## Tech Stack
- Node.js
- Express.js
- SQLite3
- HTML/CSS/JavaScript (Vanilla)

## Setup
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm start
```

## Usage
Open browser and go to `http://localhost:3000`

## API Endpoints
- `GET /api/schedules` - Get all schedules
- `POST /api/schedules` - Add new schedule
- `DELETE /api/schedules/:id` - Delete schedule by ID

## Development
For development with auto-restart:
```bash
npm run dev
```