# Database Schema Implementation Plan

## Goal
Design and implement the database schema for the Safety and Health Management System Evaluation System on Supabase.

## User Review Required
> [!IMPORTANT]
> **Table Naming**: I am using `users` in the public schema to store user profiles, linked to `auth.users`.
> **JSONB**: Using `jsonb` for flexible structures like report templates.

## Proposed Changes

### Database Schema (Supabase)

#### [NEW] Table: `users`
Stores user profile information, linked to Supabase Auth.
- `id`: UUID (Primary Key, References `auth.users.id` on delete cascade)
- `email`: Text (Not null)
- `name`: Text
- `role`: Text (Default 'user', Check constraint: 'admin' or 'user')
- `created_at`: Timestamptz (Default now())
- `updated_at`: Timestamptz (Default now())

#### [NEW] Table: `clients`
Stores information about the companies being evaluated.
- `id`: UUID (Primary Key, Default gen_random_uuid())
- `name`: Text (Not null)
- `representative`: Text
- `business_number`: Text
- `address`: Text
- `contact_person`: Text
- `contact_email`: Text
- `created_at`: Timestamptz (Default now())
- `updated_at`: Timestamptz (Default now())

#### [NEW] Table: `assessments`
Stores the header information for each assessment.
- `id`: UUID (Primary Key, Default gen_random_uuid())
- `client_id`: UUID (References `clients.id` on delete cascade)
- `evaluator_id`: UUID (References `users.id` on delete set null)
- `assessment_date`: Date (Default CURRENT_DATE)
- `total_score`: Numeric (Default 0)
- `status`: Text (Default 'draft', Check constraint: 'draft', 'completed', 'archived')
- `summary`: Text
- `created_at`: Timestamptz (Default now())
- `updated_at`: Timestamptz (Default now())

#### [NEW] Table: `assessment_details`
Stores detailed scores and evidence for each assessment item.
- `id`: UUID (Primary Key, Default gen_random_uuid())
- `assessment_id`: UUID (References `assessments.id` on delete cascade)
- `category`: Text (e.g., 'Leadership', 'Worker Participation')
- `item_code`: Text (e.g., 'A-01')
- `score`: Numeric (Default 0)
- `max_score`: Numeric (Default 10)
- `comments`: Text
- `evidence_url`: Text (URL to Supabase Storage)
- `ai_analysis`: Text (AI generated analysis)
- `created_at`: Timestamptz (Default now())

#### [NEW] Table: `ai_settings`
Stores configuration for AI analysis.
- `id`: UUID (Primary Key, Default gen_random_uuid())
- `key`: Text (Unique, e.g., 'default_prompt')
- `value`: Text
- `description`: Text
- `created_at`: Timestamptz (Default now())

#### [NEW] Table: `report_templates`
Stores templates for report generation.
- `id`: UUID (Primary Key, Default gen_random_uuid())
- `name`: Text (Not null)
- `structure`: JSONB (Stores layout and content configuration)
- `is_default`: Boolean (Default false)
- `created_at`: Timestamptz (Default now())

## Verification Plan

### Automated Tests
- Verify table creation by querying `information_schema.tables`.
- Test inserting dummy data into each table to verify constraints and relationships.

### Manual Verification
- Use Supabase Dashboard to inspect the created tables.
