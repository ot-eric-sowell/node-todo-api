# Node Todo API

This is a test API to use in the docker development labs.

## You can test the API with the following (if you have curl):

To get the items:

`curl http://localhost:4000/items`

To add an item:

`curl -XPOST -d "text=buy steak" http://localhost:4000/item`

To delete an item:

`curl -XDELETE http://localhost:4000/item/0085c7e0-fbfb-11e7-82cb-bd70a1eb1c6a`

## Docker

You can create a docker image from this with the following command (assuming you have docker setup):

`docker build -t node-todo-api .`

You can run the docker container with this command.

`docker run -p 7500:7002 node-todo-api`
