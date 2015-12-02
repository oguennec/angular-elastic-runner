# Demo application : Search Open Recipes
## E.E.A.N. stack running on [docker] containers orchestrated by [docker-compose]

The E.E.A.N. stack is made of :
   - [ElasticSearch]
   - [Express]
   - [AngularJS]
   - [Node.js]

Front-end using :
   - [Material Design for Bootstrap]
   - [Angular directive for json pretty display]

## Pre-requisite to install and run this application :
The following software must be available on the host running the application (linux, Windows, iOS) :
   * docker
   * docker-compose

Tested with docker 1.6.2 and docker-compose 1.3.2
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

## Browse Search Open Recipes
The responsive web application is then available on http://localhost:8089

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

> Any change in this directory is available inside the running container.

> No need to enter inside the docker container to modify the web application


* To take into account modification of node.js or bower.js, rebuild the containers
```sh
$ docker-compose stop
$ docker-compose rm web
$ docker-compose build
$ docker-compose up -d
```
> Node.js or bower dependencies are not available outside the web container.

* Enter inside the web container to start karma or run npm or bower commands
```sh
$ docker-enter eeandockercompose_web_1
$ cd /src
$ karma start
```

* Marvel plugin is a web interface to in ElasticSearch
http://localhost:9200/_plugin/marvel/sense/index.html

[docker]: <https://www.docker.com>
[docker-compose]: <https://docs.docker.com/compose>
[Node.js]: <https://nodejs.org/en/>
[Express]: <http://expressjs.com>
[AngularJS]: <https://angularjs.org>
[Material Design for Bootstrap]: <http://fezvrasta.github.io/bootstrap-material-design/bootstrap-elements.html>
[Angular directive for json pretty display]: https://github.com/darul75/ng-prettyjson
[ElasticSearch]: <https://www.elastic.co/products/elasticsearch>
[OpenRecipes]: <https://github.com/fictivekin/openrecipes>

> This project is licensed under the terms of the MIT license.
