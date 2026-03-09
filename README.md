<div align="center">

# Template Alpine

A template for web projects using Alpine.js and Quart

</div>

## Overview

Template for web projects using Alpine.js for frontend reactivity and Quart (async Flask) for the backend.

### Stack

- **Frontend**: Alpine.js, Tailwind CSS v4
- **Backend**: Quart, SQLAlchemy (async)
- **Database**: PostgreSQL (async via psycopg)

## Quickstart

1. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```

2. Install Python dependencies:
   ```bash
   uv sync
   ```

3. Install Node.js dependencies and build CSS:
   ```bash
   npm install
   npm run build
   ```

4. Run the development server:
   ```bash
   python app.py
   ```

## Development

- `npm run dev` - Watch and rebuild CSS on changes
- `npm run build` - Build minified CSS for production

## Project Structure

```
├── website/
│   ├── __init__.py      # Quart app factory
│   ├── views.py         # Route handlers
│   ├── models.py        # SQLAlchemy models
│   ├── templates/       # Jinja2 templates
│   │   ├── index.html
│   │   └── components/
│   │       └── _layout.html
│   └── static/
│       ├── css/
│       │   └── input.css    # Tailwind source
│       └── js/
│           └── app.js       # Alpine.js components
├── app.py               # Entry point
├── pyproject.toml       # Python dependencies
├── package.json         # Node.js dependencies
├── tailwind.config.js   # Tailwind configuration
└── Dockerfile           # Production Docker build
```
