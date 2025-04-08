# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Running the Project with Docker

To run this project using Docker, follow these steps:

1. **Build the Docker Image**:
   ```bash
   docker-compose build
   ```

2. **Run the Application**:
   ```bash
   docker-compose up
   ```

3. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

### Notes

- Ensure Docker and Docker Compose are installed on your system.
- The application runs on Node.js version `22.13.1` as specified in the Dockerfile.
- The `NODE_ENV` environment variable is set to `production` for optimized performance.
- The application exposes port `3000` for HTTP access.

For further details, refer to the Dockerfile and Docker Compose configuration provided in the project.