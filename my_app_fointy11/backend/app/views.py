from flask import render_template, redirect, url_for, request, flash
from app import app, db
from app.models import Client, Blog, About, Services, Contact, User, Subscriber
from sqlalchemy.exc import IntegrityError
from flask import jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user


@app.route("/")
def index():
    clients_data = Client.query.all()
    blogs_data = Blog.query.all()
    abouts_data = About.query.all()
    servis_data = Services.query.all()
    return render_template(
        "index.html",
        blogs=blogs_data,
        about=abouts_data,
        servis=servis_data,
        clients=clients_data,
    )


@app.route("/api/blogs", methods=["GET"])
def get_blogs():
    blogs = Blog.query.all()
    # Blog verilerini JSON formatına dönüştürerek istemciye döndür
    return jsonify(
        [
            {"id": blog.id, "feedback": blog.feedback, "blogname": blog.blogname}
            for blog in blogs
        ]
    )


@app.route("/api/about")
def get_about():
    abouts = About.query.all()
    return jsonify([about.to_dict() for about in abouts])


@app.route("/api/client")
def get_clients():
    clients = Client.query.all()
    client_data = [
        {
            "feedback": client.feedback,
            "image_filename": client.image_filename,
            "clientname": client.clientname,
        }
        for client in clients
    ]
    return jsonify(client_data)


def add_contact(name, phonenumber, email, message):
    try:
        new_contact = Contact(
            name=name, phonenumber=phonenumber, email=email, metin=message
        )
        db.session.add(new_contact)
        db.session.commit()
        flash("Talebiniz alınmıştır. Teşekkür ederiz!", "success")
    except IntegrityError:
        db.session.rollback()
        flash(
            "Bu isim veya telefon numarası zaten kayıtlıdır. Lütfen farklı bir isim veya telefon numarası deneyin.",
            "error",
        )
    except Exception as e:
        db.session.rollback()
        flash("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.", "error")
    finally:
        db.session.close()


@app.route("/api/contact", methods=["POST"])
def api_contact():
    if request.method == "POST":
        contact_data = request.json
        name = contact_data.get("name")
        phonenumber = contact_data.get("phonenumber")
        email = contact_data.get("email")
        message = contact_data.get("message")

        # Veritabanına ekleme işlemini gerçekleştirin
        add_contact(name, phonenumber, email, message)

        # Başarılı yanıt döndürün
        return jsonify({"message": "Success"}), 200
    else:
        # Yanlış istek durumunda hata döndürün
        return jsonify({"error": "Invalid request"}), 400


@app.route("/api/services")
def get_services():
    services = Services.query.all()
    service_data = [
        {"id": service.id, "image_filename": service.image_filename}
        for service in services
    ]
    return jsonify(service_data)


@app.route("/login")
def login():
    return render_template("login.html")


def add_user(username, email, password_hash):
    try:
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            raise IntegrityError("Bu e-posta adresi zaten kullanılıyor.", None, None)

        new_user = User(username=username, email=email, password_hash=password_hash)
        db.session.add(new_user)
        db.session.commit()
        flash("Kullanıcı başarıyla eklendi!", "success")
    except IntegrityError as e:
        db.session.rollback()
        flash(str(e), "error")
    except Exception as e:
        db.session.rollback()
        flash("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.", "error")
    finally:
        db.session.close()


@app.route("/api/register", methods=["POST"])
def api_register():
    if request.method == "POST":
        user_data = request.json
        username = user_data.get("username")
        email = user_data.get("email")
        password_hash = generate_password_hash(user_data.get("password"))

        # Kullanıcı adı veya e-posta adresiyle kayıtlı kullanıcı var mı kontrol et
        existing_user = User.query.filter(
            (User.username == username) | (User.email == email)
        ).first()
        if existing_user:
            # Kullanıcı zaten kayıtlı ise uygun bir hata mesajı döndür
            return (
                jsonify(
                    {"error": "A user with this username or email already exists."}
                ),
                400,
            )

        # Veritabanına kullanıcı ekleme işlemini gerçekleştirin
        add_user(username, email, password_hash)

        # Başarılı yanıt döndürün
        return jsonify({"message": "Başarılı, Girişe Yönlendiriliyorsunuz"}), 200
    else:
        # Yanlış istek durumunda hata döndürün
        return jsonify({"error": "Invalid request"}), 400


@app.route("/api/login", methods=["POST"])
def api_login():
    if request.method == "POST":
        data = request.json
        username = data.get("username")
        password = data.get("password")

        # Kullanıcı adıyla kullanıcıyı bul
        user = User.query.filter_by(username=username).first()

        if not user:
            return jsonify({"error": "Invalid username or password"}), 401

        # Kullanıcının şifresini doğrula
        if not check_password_hash(user.password_hash, password):
            return jsonify({"error": "Invalid username or password"}), 401

        # Kullanıcıyı oturum açık olarak işaretle
        login_user(user)

        # Başarılı giriş mesajını döndür
        return jsonify({"message": "Success"}), 200
    else:
        # Yanlış istek durumunda hata döndür
        return jsonify({"error": "Invalid request"}), 400


@app.route("/logout")
def logout():
    logout_user()
    flash("Başarıyla çıkış yapıldı.", "success")
    return redirect(url_for("login"))


@app.route("/api/subscribe", methods=["POST"])
def subscribe():
    if request.method == "POST":
        subscribe_data = request.json
        email = subscribe_data.get("email")
        phonenumber = subscribe_data.get("phonenumber")

        # Veritabanına ekleme işlemini gerçekleştirin
        try:
            new_subscriber = Subscriber(email=email, phonenumber=phonenumber)
            db.session.add(new_subscriber)
            db.session.commit()
            return jsonify({"message": "Success"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()

    else:
        return jsonify({"error": "Invalid request"}), 400


def add_subscriber(phonenumber, email):
    try:
        new_subscriber = Subscriber(nphonenumber=phonenumber, email=email)
        db.session.add(new_subscriber)
        db.session.commit()
        flash("Talebiniz alınmıştır. Teşekkür ederiz!", "success")
    except IntegrityError:
        db.session.rollback()
        flash(
            "Bu isim veya telefon numarası zaten kayıtlıdır. Lütfen farklı bir isim veya telefon numarası deneyin.",
            "error",
        )
    except Exception as e:
        db.session.rollback()
        flash("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.", "error")
    finally:
        db.session.close()
