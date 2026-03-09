import logging

from logging.handlers import RotatingFileHandler
from pathlib import Path

from website import start

app = start()

if not app.debug:
    if not Path("./logs").exists():
        Path("./logs").mkdir()
    if not Path("./logs/app.log").is_file():
        with open("./logs/app.log", "wb") as f:
            pass
    file_handler = RotatingFileHandler(
        "logs/app.log",
        maxBytes=1024 * 1024 * 16,
        backupCount=100,
    )
    file_handler.setFormatter(
        logging.Formatter(
            "%(asctime)s %(levelname)s: %(message)s[in %(pathname)s:%(lineno)d]"
        )
    )
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
