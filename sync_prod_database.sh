# Connect to production database
# export DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMDFKWUtBVDVERjNNUFNaQVZTRTkyVlFBRkgiLCJ0ZW5hbnRfaWQiOiJhMDkxZDI3ZDg2NTU5NjI5MjI1YThiZDBkOTg4ZjRjZThhYzgzYzBmMGQxYzc3MTA5ZjNjYzVmMTE0MjRlYjQ0IiwiaW50ZXJuYWxfc2VjcmV0IjoiNmU5OTA1YmMtZDgxYi00MzA3LWFkMTMtMzA3ZDNjNzc5OTM0In0.iE4jgg3jtg2jtnP7h7cGm3WNm3KhNtPXTBQCfNYhGyg"

# # Reset production database (deletes all data)
# npx prisma migrate reset --force

# Or if you prefer to do it manually:
# npx prisma db push --force-reset


# Now this works
bunx prisma migrate deploy