#!/bin/bash

# Check if a directory is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <directory_path>"
    exit 1
fi

DIR="$1"

# Check if the directory exists
if [ ! -d "$DIR" ]; then
    echo "Error: '$DIR' is not a directory."
    exit 1
fi

# Find all files, concatenate them, and copy to clipboard
find "$DIR" -type f -exec cat {} + | pbcopy

echo "Contents of all files in '$DIR' have been copied to the clipboard."
