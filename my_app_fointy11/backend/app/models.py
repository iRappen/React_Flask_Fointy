from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from flask_login import UserMixin


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    phonenumber = db.Column(db.String(120), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    metin = db.Column(db.Text)


class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    feedback = db.Column(db.Text)
    image_filename = db.Column(db.String(255))
    clientname = db.Column(db.String(50))


class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    feedback = db.Column(db.Text)
    blogname = db.Column(db.Text)


class About(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    feedback = db.Column(db.Text)
    image_filename = db.Column(db.String(255))
    aboutname = db.Column(db.Text)

    def to_dict(self):
        return {
            "id": self.id,
            "feedback": self.feedback,
            "image_filename": self.image_filename,
            "aboutname": self.aboutname,
        }


class Services(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    feedback = db.Column(db.Text)
    image_filename = db.Column(db.String(255))
    servicesname = db.Column(db.Text)


class Subscriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phonenumber = db.Column(db.String(120), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)

    def __repr__(self):
        return f"<Subscriber {self.email}>"
