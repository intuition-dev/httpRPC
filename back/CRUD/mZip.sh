# make new release of example apps
rm *.zip

rm -rf ./loadT/node_modules
rm -rf ./node-srv/node_modules

zip -r ./CRUD.zip .
zip -r ./CMS.zip ./examples/CMS
