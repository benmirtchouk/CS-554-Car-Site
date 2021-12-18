# seed directory
This directory contains files/data to populate the mongo database with car listings and pictures.  To populate all the seed data, cd to the "src" directory of the server - and type:  npm run seed.  The seed script will unpack all tar files and run the seed program to populate the mongo database.

## listingSeedImages
This diretorycontains a tar file of car pictures used with car listings

## seed_files
This directory contains a tar file of car listing seed data.

## accountSeed.json
This is a seed data of account data.  It will be populated into mongo when the seed script is run.

## raw_car_data
This directory contains a csv file from kaggle of used car data. About 15K entries of this data were used for seed data.   The python script was used to convert csv data to json Carigs Car listing data.   Then a create_seed_files program was used to create the actual mongo seed data.

## to load mongo with seed data
cd to the src director of the server and run: npm run seed
