# Setup Guide - Running with npm and Docker

## Option 1: Using Docker Compose (Recommended)

### 1. Start PostgreSQL with Docker
```bash
# Start only the PostgreSQL service
docker-compose up postgres -d
```

### 2. Set up your environment variables
Create a `.env` file in your project root:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=saransh
DB_NAME=kgp_connect

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Email Configuration (for NextAuth)
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@example.com
```

### 3. Set up the database
```bash
npm run db:setup
```

### 4. Start the development server
```bash
npm run dev
```

## Option 2: Using Docker Compose for everything

### 1. Set up your environment variables (same as above)

### 2. Start everything with Docker Compose
```bash
docker-compose up
```

This will:
- Start PostgreSQL
- Set up the database schema
- Start the Next.js development server

## Option 3: Using a Cloud Database

### 1. Set up a PostgreSQL database on a cloud service:
- **Supabase** (free tier available)
- **Neon** (free tier available)
- **Railway** (free tier available)
- **PlanetScale** (free tier available)

### 2. Get your connection string and set it in `.env`:
```env
DATABASE_URL=postgresql://username:password@host:port/database
```

### 3. Set up the database
```bash
npm run db:setup
```

### 4. Start the development server
```bash
npm run dev
```

## Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running
- Check your environment variables
- Verify the database exists

### Permission Issues
- If using Docker, make sure Docker is running
- Check that the ports are not already in use

### Schema Setup Issues
- The setup script will ignore errors for existing objects
- Check the console output for any specific errors

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `saransh` |
| `DB_NAME` | Database name | `kgp_connect` |
| `DATABASE_URL` | Full connection string (alternative) | - |
| `NEXTAUTH_SECRET` | NextAuth secret key | Required |
| `NEXTAUTH_URL` | NextAuth URL | `http://localhost:3000` |
| `EMAIL_SERVER` | SMTP server for emails | Required |
| `EMAIL_FROM` | From email address | Required |

## Quick Start Commands

```bash
# 1. Start PostgreSQL
docker-compose up postgres -d

# 2. Set up database
npm run db:setup

# 3. Start development server
npm run dev
```

Your application should now be running at `http://localhost:3000` with a fully functional PostgreSQL database! 