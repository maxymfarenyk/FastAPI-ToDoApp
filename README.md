# FastAPI ToDo Application

A modern full-stack web application for task management, built with FastAPI backend and interactive frontend interface.

## 🚀 Features

- **Full-Stack Application** with both backend API and frontend interface
- **REST API** with complete CRUD functionality for tasks
- **Automatic API Documentation** via Swagger UI
- **Data Validation** with Pydantic models

## 🛠 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server
- **SQLAlchemy** (if database is used)

### Frontend
- **HTML/CSS/JavaScript** - Interactive user interface
- **Bootstrap**

## 📋 Prerequisites

- Python 3.8+
- pip for dependency management
- Environment variables (see configuration section)

## ⚙️ Configuration

This application requires environment variables that are not included in the repository for security reasons. Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration (example)
DATABASE_URL=DATABASE_URL=postgresql://postgres:<your-password>@localhost:5432/TodoApplicationDatabase
POSTGRES_DB=TodoApplicationDatabase
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<your-password>
# Security Settings (IMPORTANT: Use strong, unique keys in production!)
SECRET_KEY=your-secret-key-here-minimum-32-characters-long
ALGORITHM=HS256
```
> **Security Warning**: Always use a strong, randomly generated SECRET_KEY in production. You can generate one using:
> ```bash
> python -c "import secrets; print(secrets.token_hex(32))"
> ```

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/maxymfarenyk/FastAPI-ToDoApp.git
cd FastAPI-ToDoApp
```

### 2. Create Virtual Environment

```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables (see Configuration section above).

### 5. Run the Application

```bash
uvicorn ToDoApp.main:app
```

The application will be available at: http://localhost:8000

## 📖 API Documentation

After starting the application, automatic API documentation will be available at:

- **Swagger UI**: http://localhost:8000/docs

## 📸 Screenshots

<img width="1626" height="427" alt="image" src="https://github.com/user-attachments/assets/b253c512-e6e5-476a-b5c6-fb697aa7da65" />
<img width="1658" height="840" alt="image" src="https://github.com/user-attachments/assets/0bdbc8b3-6da6-4ea2-b768-73acab73bbc7" />


## 🎨 Frontend Interface

The application includes a user-friendly frontend interface accessible at the main URL. The frontend provides:

- Registration and Login pages
- CRUD operations for Todos
- Sorting by date, priority, complete/incomplete
- Errors handling

## 📸 Screenshots
| Login | Register |
| ------- | --- |
| <img width="400" alt="image" src="https://github.com/user-attachments/assets/fd3b0455-e386-4604-8037-d0c0cbd1e872" /> | <img width="500" alt="image" src="https://github.com/user-attachments/assets/e0c90547-4618-47a7-8c95-ad4699e7a8f5" /> |

| Home | Edit |
| ------- | --- |
| <img width="500" alt="image" src="https://github.com/user-attachments/assets/00638f09-c8a5-4937-872c-93a565b3413d" /> | <img width="300" alt="image" src="https://github.com/user-attachments/assets/262ea25a-557e-4793-8bc7-90713ba0096b" /> |


## 📁 Project Structure

```
FastAPI-ToDoApp/
│
├── ToDoApp/                  # Main application package
│   ├── alembic/             # Database migrations
│   ├── routers/             # API route handlers
│   ├── static/              # Frontend static files (CSS, JS)
│   ├── templates/           # HTML templates
│   ├── test/                # Test files
│   ├── venv/                # Virtual environment
│   ├── __init__.py          # Package initialization
│   ├── config.py            # Application configuration
│   ├── database.py          # Database setup and connection
│   ├── main.py              # Main FastAPI application
│   ├── models.py            # SQLAlchemy/Pydantic models
├── .dockerignore            # Docker ignore file
├── .env                     # Environment variables (not in repo)
├── .gitignore              # Git ignore file
├── alembic.ini             # Alembic configuration
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Docker image configuration
└── requirements.txt        # Python dependencies
```

## 🐳 Docker Support

Docker support is planned for future releases. The application will be available on DockerHub for easy deployment.

### Coming Soon:
- Docker image on DockerHub
- docker-compose.yml for easy setup
- Container orchestration support

## 🧪 Testing

You can test the API using:

1. **Swagger UI** - Built-in documentation with interactive tests
2. **Frontend Interface** - Direct interaction through the web interface
3. **Unit tests** - Unit tests located in ToDoApp/test (run them all with command "python -m pytest")


### Docker Deployment (Coming Soon)
```bash
# Will be available soon
docker pull maxfarenyk/fastapi-todoapp:latest
docker run -d -p 8000:8000 maxymfarenyk/fastapi-todoapp:latest
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Personal project for educational and portfolio purpose.

## 👨‍💻 Author

**Maksym Farenyk** - [GitHub](https://github.com/maxymfarenyk)

---

⭐ If you found this project helpful, please give it a star!
