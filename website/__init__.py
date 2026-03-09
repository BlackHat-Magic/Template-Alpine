import os

from dotenv import load_dotenv
from quart import Quart
from quart_cors import cors
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()

FLASK_SECRET_KEY = os.getenv("FLASK_SECRET_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")

assert FLASK_SECRET_KEY is not None and FLASK_SECRET_KEY != ""
assert DATABASE_URL is not None and DATABASE_URL != ""

engine = create_async_engine(DATABASE_URL, echo=False)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


def start():
    app = Quart(__name__)

    app = cors(
        app,
        allow_origin=[
            "http://localhost:5000",
        ],
        allow_credentials=True,
        allow_methods=["POST", "GET", "PUT", "DELETE", "OPTIONS", "PATCH"],
    )

    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
    app.config["SECRET_KEY"] = FLASK_SECRET_KEY

    app.async_session = async_session

    @app.before_serving
    async def init_db():
        async with engine.begin() as conn:
            from .models import Base

            await conn.run_sync(Base.metadata.create_all)

    from .views import views

    app.register_blueprint(views, url_prefix="/")

    return app
