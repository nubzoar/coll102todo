#!/bin/bash

########## VARIABLES
REMINDMEIMAGE=atomney/remindme
REMINDMENAME=remindme
DBIMAGE=mongo
DBCONTAINERNAME=remindme-db
PORT=80


########## INSTALL
if [ "$1" = "--install" ]; then
        docker run -d --name $DBCONTAINERNAME $DBIMAGE
        docker run -d --name $REMINDMENAME --link $DBCONTAINERNAME:mongo -p $PORT:3000 $REMINDMEIMAGE
fi


########## START
if [ "$1" = "--start" ]; then
        docker start $DBCONTAINERNAME
        docker start $REMINDMENAME
fi

########## STOP
if [ "$1" = "--stop" ]; then
        docker stop $DBCONTAINERNAME
        docker stop $REMINDMENAME
fi

########## REMOVE
if [ "$1" = "--remove" ]; then
        docker stop $DBCONTAINERNAME
        docker stop $REMINDMENAME
        docker rm $DBCONTAINERNAME
        docker rm $REMINDMENAME
fi

########## REINSTALL
if [ "$1" = "--reinstall" ]; then
        $0 --remove
        $0 --install
fi

########## BUILD
if [ "$1" = "--build" ]; then
        docker build -t $REMINDMEIMAGE .
fi
