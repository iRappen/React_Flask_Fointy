from flask import render_template , jsonify
from app import app
from app.models import Client
from app.models import Project
from app.models import About
from app.models import Services
from app.models import Contact
from routes import *

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/testimonial')
def get_services():
    testimonial = testimonial.query.all()
    return jsonify([testimonial.to_dict() for testimonial in testimonial])

@app.route('/api/client')
def get_about():
    client = Client.query.all()
    return jsonify([client.to_dict() for client in client])

@app.route('/api/project')
def get_about():
    project = Project.query.all()
    return jsonify([project.to_dict() for project in project])

@app.route('/api/about')
def get_about():
    abouts = About.query.all()
    return jsonify([about.to_dict() for about in abouts])


@app.route('/api/contact')
def get_contacts():
    contacts = Contact.query.all()
    return jsonify([contact.to_dict() for contact in contacts])

@app.route('/api/services')
def get_services():
    services = Services.query.all()
    return jsonify([service.to_dict() for service in services])

@app.route('/api/register')
def get_register():
    register = Services.query.all()
    return jsonify([register.to_dict() for register in register])

@app.route('/api/login')
def get_login():
    login = Services.query.all()
    return jsonify([login.to_dict() for login in login])



