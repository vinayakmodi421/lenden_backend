# Lenden Backend

Lenden Backend is a TypeScript API server built with Express. It provides API
routes for authentication, chat, messages, notifications, and expenses, with
Socket.IO for real-time communication. It uses MySQL through Sequelize and
Redis for socket-related features.

## Requirements

- Node.js and npm
- MySQL
- Redis running at `localhost:6379`

## Setup

Run these commands from the `lenden_backend` directory:

```bash
npm install
```

Create a MySQL database (the default name is `lenden_db`) and add a `.env` file
to this directory:

```dotenv
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=lenden_db
DB_USER=root
DB_PASSWORD=your_mysql_password
ACCESS_TOKEN_SECRET=replace_with_a_secure_secret
REFRESH_TOKEN_SECRET=replace_with_a_secure_secret
EMAIL_USER=your_email_address
EMAIL_APP_PASSWORD=your_email_app_password
```

The email settings are needed for email features. Keep secrets in `.env`; do not
commit that file.

## Run

Start the server in watch mode:

```bash
npm start
```

The server listens on port `5000` by default (or the port set in `PORT`). The
root route (`/`) returns a server-connected status response. API routes are
mounted under `/api`.

## Git commands

Run Git commands from this project directory. If this project has not been
cloned yet, clone its repository first:

```bash
git clone <repository-url>
cd lenden_backend
```

Check the current branch and working tree:

```bash
git status
git branch
```

Stage and commit changes:

```bash
git add .
git commit -m "Describe your changes"
```

Sync with the remote and push the current branch:

```bash
git pull
git push
```
