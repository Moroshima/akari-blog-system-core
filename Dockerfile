FROM node:18-slim
LABEL author="Moroshima <2524332942aliez@gmail.com>"
LABEL version="1.0.0-alpha"


ENV NODE_ENV=production
WORKDIR /app
COPY ./dist .

RUN npm install pm2 --global --registry=https://registry.npmmirror.com
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

EXPOSE 8080

ENTRYPOINT ["pm2","start","--name","akari-core","/app/bundle.js","--no-daemon","--log","dist.log"]