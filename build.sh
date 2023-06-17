#!/bin/bash

# Clean previous build
rm -rf dist

# Install dependencies
npm ci

# Create dist directory
mkdir dist

# Copy all necessary files to dist directory
cp -R node_modules dist
cp -R *.js dist
cp -R package*.json dist

# Done
echo "Build complete: dist directory is ready for publishing"
