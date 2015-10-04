FROM node:4.1.1
MAINTAINER Olivier Guennec <oguennec@gmail.com>

# web application source code
ADD src /src

# web application dependencies managed by Node.js
RUN cd /src; npm install

# Install bower
RUN npm install -g bower

# web application dependencies managed by bower
RUN cd /src; bower install --allow-root

EXPOSE  8089

CMD ["node", "/src/index.js"]
