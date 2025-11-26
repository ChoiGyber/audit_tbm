# Database Configuration Guide

## Local Development (.env.local)

Create a file `web/.env.local` with:

```bash
DATABASE_URL="postgresql://audit_user:your_password@localhost:5432/audit_db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Production Server (.env.production)

On the server at `/var/www/audit/web/.env.production`:

```bash
DATABASE_URL="postgresql://audit_user:your_password@localhost:5432/audit_db"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## PostgreSQL Setup Commands

Run these on the server:

```bash
# 1. Access PostgreSQL
sudo -u postgres psql

# 2. Create database and user
CREATE DATABASE audit_db;
CREATE USER audit_user WITH PASSWORD 'choose_strong_password_here';
GRANT ALL PRIVILEGES ON DATABASE audit_db TO audit_user;
\q

# 3. Test connection
psql -U audit_user -d audit_db -h localhost
```

## Update Deployment Script

The deploy.yml should also set up environment variables on the server.
