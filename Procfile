lerna bootstrap --scope="backend" --include-dependencies
lerna run build --scope="backend" --include-dependencies --stream

release: npx prisma migrate deploy
release: npx prisma db seed
