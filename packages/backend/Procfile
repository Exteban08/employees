lerna bootstrap --scope="backend" --include-dependencies
lerna run build --scope="backend" --include-dependencies --stream

release: npx prisma db seed
release: npx prisma migrate deploy
