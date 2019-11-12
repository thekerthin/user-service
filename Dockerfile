FROM node:10

WORKDIR /app

# servie config
# COPY dist/ dist/
COPY src/ src/
COPY package.json yarn.lock .env.example tsconfig.json tslint.json nodemon.json ./
RUN yarn

# dependencies
RUN yarn global add lerna
RUN git clone https://github.com/thekerthin/kerthin-miscellaneous.git && \
  cd kerthin-miscellaneous && \
  yarn && \
  lerna bootstrap && \
  lerna run build && \
  lerna exec yarn link

# link dependencies
RUN yarn link "@kerthin/cqrs" && \
  yarn link "@kerthin/utils" && \
  yarn link "@kerthin/logger" && \
  yarn link "@kerthin/bus"

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start-prod"]
