#!/usr/bin/env bash

cd ./getCategory/
zip -r exports.zip ./*
cd ../getEvents/
zip -r exports.zip ./*
cd ../getPacks/
zip -r exports.zip ./*
cd ../getEventsFromAWS/
zip -r exports.zip ./*