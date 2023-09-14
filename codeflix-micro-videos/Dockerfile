FROM node:20.5.1-slim


USER node

WORKDIR /home/node/app

CMD ["tail", "-f" ,"/dev/null"]
# This tells Docker to execute node app.js when the container starts up.

# You can override the CMD instruction when you run the container using the docker run command by specifying additional arguments: docker run <image> node another-app.js


# ENTRYPOINT
# The ENTRYPOINT instruction is similar to CMD but slightly more restrictive. It specifies the executable that will be run when the container starts and it's not easily overridden at runtime. This makes the container behave more like a standalone executable.

# For example:

# Dockerfile
# Copy code
# ENTRYPOINT ["node"]
# With this ENTRYPOINT, when you run the container, it will behave as if you're running the node command. Additional command-line arguments passed with docker run will be appended to this ENTRYPOINT.

# bash
# Copy code
# docker run <image> app.js
# This effectively runs node app.js inside the container.