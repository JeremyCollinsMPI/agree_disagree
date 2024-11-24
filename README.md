Instructions to Run
Prerequisites
Install Node.js (v16 or higher) and npm.
Install Docker if you wish to deploy the application using Docker.
Development Mode
Clone the repository:

bash
Copy code
git clone <repository-url> vue-app
cd vue-app
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run serve
Open the app in your browser at http://localhost:8080.

Production Mode (With Docker)
Build the Docker image:

bash
Copy code
docker build -t vue-app .
Run the Docker container:

bash
Copy code
docker run -d -p 8080:80 vue-app
Access the app in your browser at http://localhost:8080.