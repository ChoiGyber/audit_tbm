# Environment Variables Setup Guide

## Local Development

Create `web/.env.local` with the following:

```bash
# Database
DATABASE_URL="postgresql://audit_user:your_password@localhost:5432/audit_db"

# NextAuth
AUTH_SECRET="generate-random-secret-key-here"
AUTH_URL="http://localhost:3000"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Production Server

Create `web/.env.production` on the server with:

```bash
# Database
DATABASE_URL="postgresql://audit_user:your_password@localhost:5432/audit_db"

# NextAuth (IMPORTANT: Generate a secure random string)
AUTH_SECRET="production-secret-key-change-this"
AUTH_URL="https://your-domain.com"

# Next.js
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"
```

## Generating AUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Or use Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
