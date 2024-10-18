FROM jbarlow83/ocrmypdf

RUN apt update

RUN apt -y install qpdf
RUN qpdf --version

RUN apt -y install nodejs
RUN node -v
RUN apt -y install npm

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

RUN chmod 777 /usr/src/app/entrypoint.sh

RUN which node

EXPOSE 8080
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]