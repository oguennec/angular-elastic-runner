FROM node:4.1.1
MAINTAINER Olivier Guennec <oguennec@gmail.com>

# web application source code
ADD src /src

# npm behind proxy

# web application dependencies managed by Node.js
RUN cd /src; npm install

# Install bower
RUN npm install -g bower karma-cli phantomjs

# web application dependencies managed by bower
RUN cd /src; bower install --allow-root

RUN useradd -ms /bin/bash node

RUN chown -R node:node /src

USER node

ENV HOME /src/

EXPOSE  8089

WORKDIR /src

CMD ["node", "index.js"]
