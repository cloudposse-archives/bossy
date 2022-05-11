FROM public.ecr.aws/lambda/nodejs:16

# add app
COPY dist/apps/bossy/main.js ${LAMBDA_TASK_ROOT}
COPY dist/apps/bossy/main.js.map ${LAMBDA_TASK_ROOT}
COPY dist/apps/bossy/package.json ${LAMBDA_TASK_ROOT}

# install app dependencies
RUN npm install --production

ENV NODE_ENV=production

# start app
CMD [ "main.handler" ]