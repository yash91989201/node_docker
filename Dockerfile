FROM node:hydrogen-alpine3.16
WORKDIR /server
COPY package.json .
RUN npm install -g typescript
# run a bash script to install only production dependencies
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install;\
    else npm install --omit=dev; \
    fi
COPY . .
# specify environment variables
ENV PORT=3000
EXPOSE $PORT 

CMD npm run dev
# RUN is used to execute a command while the image is being built.
# CMD executes a command while the container is being built.