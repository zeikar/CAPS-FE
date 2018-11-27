FROM node:10.9-slim

RUN apt-get -y update \
	&& apt-get install -y git

RUN yarn global add @vue/cli -g
RUN yarn global add @vue/cli-service-global -g

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get autoremove -y \
    && apt-get autoclean -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Or just use EXPORT 8080
EXPOSE 8080

# switch to npm if you chose it as package manager
CMD ["vue", "serve"]