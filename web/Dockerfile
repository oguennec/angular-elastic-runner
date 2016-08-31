FROM node:4.1.1
MAINTAINER Olivier Guennec <oguennec@gmail.com>

# add package.json before application src directory
ADD src/package.json /tmp/package.json

# npm behind proxy

# install server side dependencies (nodeJS) with npm
RUN cd /tmp; npm install

# global npm installations
RUN npm install -g bower karma-cli nodemon

# add bower.json and .bowerrc before application src directory
ADD src/bower.json /tmp/bower.json
ADD src/.bowerrc /tmp/.bowerrc

# install client side dependencies with bower
RUN cd /tmp; bower install --allow-root

# create symbolic links rather than copying dir containg npm and bower dependencies to application src location - image size optimisation
#RUN mkdir -p /src/public-lib/lib && cp -a /tmp/node_modules /src && cp -a /tmp/public-lib/lib /src/public-lib/lib
RUN mkdir -p /src/public-lib/lib && ln -s /tmp/node_modules /src/node_modules && ln -s /tmp/public-lib/lib /src/public-lib/lib

# web application source code
ADD src /src

RUN useradd -ms /bin/bash node

RUN chown -R node:node /src

USER node

ENV HOME /src/

EXPOSE  8089

WORKDIR /src

#CMD ["node", "server.js"]
CMD ["nodemon", "server.js"]
