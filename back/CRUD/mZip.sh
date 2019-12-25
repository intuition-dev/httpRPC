# make new release of example apps
rm *.zip

rm -rf ./loadT/node_modules
rm -rf ./node-srv/node_modules
rm ./node-srv/db/*.db

zip -r ./CRUD.zip ../CRUD
