FROM public.ecr.aws/lambda/nodejs:14

# install and cache app dependencies
RUN npm install -g yarn
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# add app
COPY ./dist/apps/bossy/main.js ${LAMBDA_TASK_ROOT}

# add config
RUN mkdir -p ${LAMBDA_TASK_ROOT}/config
COPY ./config/ ${LAMBDA_TASK_ROOT}/config/

ENV NODE_ENV=production

# start app
CMD [ "main.handler" ]