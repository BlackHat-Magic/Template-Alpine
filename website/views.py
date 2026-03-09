from quart import Blueprint, render_template

views = Blueprint("views", __name__)


@views.route("/", methods=["GET"])
async def home():
    return await render_template("index.html")
