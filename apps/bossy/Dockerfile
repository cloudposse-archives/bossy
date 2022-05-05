FROM public.ecr.aws/lambda/nodejs:14

# add app
COPY dist/apps/bossy/main.js ${LAMBDA_TASK_ROOT}
COPY dist/apps/bossy/main.js.map ${LAMBDA_TASK_ROOT}
COPY dist/apps/bossy/package.json ${LAMBDA_TASK_ROOT}

# install app dependencies
RUN npm install --production

# add config
RUN mkdir -p ${LAMBDA_TASK_ROOT}/config
COPY apps/bossy/config/ ${LAMBDA_TASK_ROOT}/config/

ENV NODE_ENV=production

# start app
CMD [ "main.handler" ]