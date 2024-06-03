# Full Stack Application with FastAPI and Next.js

## Introduction

This repository contains the code for a full-stack web application. The backend is powered by FastAPI, a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. The frontend is built with Next.js, a React framework that enables features like server-side rendering and generating static websites for React-based web applications.

Our goal is to make this project easy to set up and run, even for those new to programming or system engineering.

## Main Functions
- Employee Login
- Employee Profile Visualization
- Employees Visualization
- Register new Employees

## Getting Started

To run this project locally, follow these simple steps. No programming knowledge required!

### Prerequisites

- Docker Desktop installed on your machine. Download it from [here](https://www.docker.com/products/docker-desktop) if you haven't already.

### Installation

#### Step 1: Clone the Repository

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the repository.
3. Type the following command and press Enter:

```sh
git clone https://github.com/yourusername/project-repository.git
```

#### Step 2: Run the Application

1. Navigate to the cloned repository directory, and execute the next commands in the command line
2. create the backend image

```sh
# Go to the bakend project directory
cd .\Factored_Backend\

# create docker image
docker build -t factored_fastapi_backend .

# back to root
cd ..
```

3. create the frontend image
```sh
# Go to the frontend directory
cd .\Factored_Frontend\factored_app\

#create docker image
docker build -t factored_nextjs_frontend .

# back to root
cd ../.. 
```
4. execute docker compose
```sh
docker-compose up
```

Wait for the output indicating that the containers are up and running.

## Accessing the Application

- Once the containers are up, open a web browser.
- Go to `http://localhost:3000` to view the Next.js frontend of the application.
- Go to `http://localhost:8000/docs` to interact with the FastAPI backend. Note that some API endpoints may require additional parameters or headers depending on the functionality.

```sh
# Example User Credentials
email: Jhon_Doe@factored.com
password: password
```

## Troubleshooting

If you encounter any issues while trying to run the application, refer to the error messages displayed in your terminal or command prompt. Common issues include:

- Docker not being installed or not running properly.
- Issues with cloning the repository (e.g., network problems).
- Errors during the Docker build process (e.g., missing files or incorrect configurations).
