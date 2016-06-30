[![BuildStatus](https://travis-ci.org/oguennec/eean-docker-compose.svg?branch=master)](https://travis-ci.org/oguennec/eean-docker-compose)

# Demo application : Search Open Recipes
## E.E.A.N. stack running on [docker] containers orchestrated by [docker-compose]

The E.E.A.N. stack is made of :
   - [ElasticSearch]
   - [Express]
   - [AngularJS]
   - [Node.js]

Front-end using :
   - [Angular directive for Elastic]

## Pre-requisite to install and run this application :
The following software must be available on the host running the application (linux, Windows, iOS) :
   * docker
   * docker-compose

Tested with docker 1.9.1 and docker-compose 1.5.2
> Ports 8089 9200 9300 must be available on the host.

## Installation
```sh
$ git clone https://github.com/oguennec/eean-docker-compose
$ cd eean-docker-compose 
$ docker-compose build
$ docker-compose up -d
```

## Load data in ElasticSearch
```sh
$ cd es/data ; curl -XPOST localhost:9200/_bulk --data-binary @"openrecipes.2000rows.json"
```
>openrecipes.2000rows.json contains 2000 recipes from the [OpenRecipes] project.

+## Create a mapping type named query in ElasticSearch to store queries
+```sh
+$ curl -XPOST localhost:9200/openrecipes/query/1/_create -d '{"label": "dummy doc to create type"}'                 
+$ curl -XDELETE localhost:9200/openrecipes/query/1   
+```

## Browse Search Open Recipes
http://localhost:8089

List docker containers running : eeandockercompose_es_1 (ElasticSeach) and eeandockercompose_web_1 (EEAN Stack)
```sh
$ docker ps
```

## Development tips
* You can develop on the docker host
```sh
$ cd web/src/public
```
> The above directory is mounted inside the web container.

> Any change in this directory (from docker host) is available inside the running container.

> No need to enter inside the docker container to modify the web application.

* The non-source tree dependencies (nodeJS or bower) are downloaded from inside the web container and not available on the docker host.

* To update these server or client dependencies:
   - modify package.json or bower.json on the docker host
   - copy the modified file(s) into the running container
   - run bower install (or update) inside the running container through a gulp task
```sh
$ docker cp bower.json eeandockercomposedev_web_1:/src/bower.json
$ docker exec eeandockercompose_web_1 npm run gulp bower-install
```

* Build a new web image and replace the running web container:
```sh
$ docker-compose build web
$ docker-compose up -d web
```
* Test javascript with Jasmine in Phantomjs by starting Karma like this
```sh
$ docker exec eeandockercompose_web_1 karma start
```

* Marvel plugin is a web interface to ElasticSearch
  - http://localhost:9200/_plugin/marvel/sense/index.html
  - Plugin to activate in  Elastic container (see es/Dockerfile)

[docker]: <https://www.docker.com>
[docker-compose]: <https://docs.docker.com/compose>
[Node.js]: <https://nodejs.org/en/>
[Express]: <http://expressjs.com>
[AngularJS]: <https://angularjs.org>
[Angular directive for Elastic]: <https://github.com/dncrews/angular-elastic-builder>
[Material Design for Bootstrap]: <http://fezvrasta.github.io/bootstrap-material-design/bootstrap-elements.html>
[Angular directive for json pretty display]: https://github.com/darul75/ng-prettyjson
[ElasticSearch]: <https://www.elastic.co/products/elasticsearch>
[OpenRecipes]: <https://github.com/fictivekin/openrecipes>

> This project is licensed under the terms of the MIT license.
