FROM node:22-alpine AS assets

WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY website/ ./website

RUN npm run build

FROM python:3.13-slim

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends curl gcc libpq-dev python3-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pyproject.toml ./
RUN pip install --no-cache-dir uv
RUN uv sync

COPY . .
COPY --from=assets /build/website/static/css/style.css ./website/static/css/style.css

EXPOSE 8000

CMD ["uv", "run", "python", "-m", "hypercorn", "-b", "0.0.0.0:8000", "app:app"]
