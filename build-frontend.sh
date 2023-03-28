#!/usr/bin/env sh

# abort on errors
set -e

cd ui

# build
npm run build

# navigate into the build output directory
mv dist/*  ../public