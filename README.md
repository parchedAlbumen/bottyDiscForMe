# bottyDiscForMe
A (mostly personal) Discord bot for tracking gym workouts. Built with Discord.js and PostgreSQL, it lets you manage your exercise list, track working weights, and keep your training organized directly from Discord.

## Tech Stack
- **Runtime:** Node.js + TypeScript
- **Discord library:** discord.js v14
- **Database:** PostgreSQL (`pg`)

## Features
- Generate a pre-built upper/lower body exercise template to get started instantly
- Add custom exercises with your own sets, reps, and weight ranges
- Update working weights for upper and lower body exercises via interactive menus
- All data is scoped per Discord user — no one else sees your workouts

## Commands
| Command | Description |
|---|---|
| `/create-template` | Generates a default upper/lower body workout template for your account. Can only be run once per user. |
| `/create-exercise` | Opens a modal to add a custom exercise. You provide the name, a short code, type (upper/lower), sets, and reps. |
| `/update_upper` | Shows a dropdown of your upper body exercises. Select one to update its min/max working weights. |
| `/update_lower` | Shows a dropdown of your lower body exercises. Select one to update its min/max working weights. |
| `/ping` | Checks that the bot is online and responding. |

## Setup
### Prerequisites
- Node.js v18+
- A PostgreSQL database
- A Discord application with a bot token

### Environment Variables
Create a `.env` file in the root of the project:

```env
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_client_id
DATABASE_URL=your_full_postgres_connection_string
DB_HOST=your_db_host
DB_USER=your_db_user
DB_NAME=your_db_name
```

### Install & Run
```bash
npm install

# Register slash commands and stuff with Discord 
npm run deploy

# Start the bot in dev mode (hot reload)
npm run dev
```

## Default Template
Running `/create-template` seeds your account with a full upper/lower exercise list including:

**Upper body:** Barbell Bench Press, Barbell Row, Weighted Pull-Ups, Lat Pulldown, Seated DB Shoulder Press, Incline DB Press, Face Pulls, Lateral Raises, and more.

**Lower body:** Squat, Romanian Deadlift, Stationary Lunges, Leg Extension, Leg Curl, Hip Adductor Machine, Calf Raises.

Each exercise has a short code (e.g. `bbp` for Barbell Bench Press) used to reference it across commands.
