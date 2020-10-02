#!/bin/bash
echo "Please list a version..."
read VERSION

echo "Deleting dist"
rm -rf dist/*

echo "reinstalling node modules"
rm -rf node_modules/*
yarn install

echo "rebuilding app..."
yarn build

echo "building docker container"
docker build -t jskyjohnson/redditcl:$VERSION .

echo "pushing to dockerhub..."
docker push jskyjohnson/redditcl:$VERSION

echo "sending to server..."
ssh root@64.227.13.208 "docker pull jskyjohnson/redditcl:$VERSION && docker tag jsky/johnson:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"