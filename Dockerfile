FROM node:14.15.4-slim

# usuario padra do container - root
RUN apt update && apt install -y --no-install-recommends \
    git \
    ca-certificates \
    default-jre

USER node

WORKDIR /home/node/app

CMD ["sh", "-c", "npm install && tail -f /dev/null"]k