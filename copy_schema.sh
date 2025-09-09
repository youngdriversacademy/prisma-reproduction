#!/bin/bash

# Find all .prisma files recursively
files=$(find . -type f -name "*.prisma")

# Check if any files were found
if [[ -z "$files" ]]; then
  echo "No .prisma files found."
  exit 1
fi

# Concatenate all .prisma files into a single blob
blob=""
for file in $files; do
  blob+="\n// --- BEGIN: $file ---\n"
  blob+="$(cat "$file")"
  blob+="\n// --- END: $file ---\n"
done

# Copy the blob to the clipboard
printf "$blob" | pbcopy

echo "Copied contents of all .prisma files to clipboard."
