# make new release of example apps
rm *.zip

find . -type f -name '*.min.js' -delete

rm -rf ./node_modules

zip -r ./CRUD.zip .
