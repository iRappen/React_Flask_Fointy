from flask import Flask,render_template , request , redirect , url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_admin import Admin
from os import path
from flask_babel import Babel
from flask_cors import CORS


# Uygulama ve Veritabanı Yapılandırması
app = Flask(__name__)
CORS(app)
babel = Babel(app)
basedir = path.abspath(path.dirname(__file__))
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + path.join(basedir, 'site.db')

# Uygulama Eklentileri
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login_manager = LoginManager(app)
login_manager.init_app(app)

# Model ve View İçe Aktarmaları
from app import app, db
from app.models import User,Contact,Subscriber

from app import views, models
from app.models import User

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))