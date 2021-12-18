# tool to read the csv file - and create a json file of our data with also Seller ID included
import csv  
import json  
  
# convert file from csv to json
def create_json_input(csvInputFile, jsonOutputFile):  

    # creating a dictionary  
    car_data= {}  
    seller_ids=[
            "e3fSvliNdEMcuyLBFDX8RXCoArD2", 
            "BiqLREtmlXRchMPwWBv965v7z9u2",
            "7YnfOiJXqEYvmHwrKHN6RVEC8At2",
            "zzBOX6fDqPYB7SJO4566tljQPQX2", 
            "d6NnmHYgRlTZr6WDH7khncandMr2",
            "gss3MtJM8dbOIPpz4tnmGbfXTuD3",
            "ZR46vGA11Lg2gTrpnvVObxxIrX93",
            "eXacRX9x5dfz3Q5ofQPlDnLnBlo2",
            "01ynPObM48U56oR5E5uKq8LRNbh2",
            "iaeX0NDgDCVc4uei8ZFHeYYWTAd2",
            "z4ZbD5PFJofAXAzprWEHUIxxDhu1",
            "1NaTFiLPTSQNq9TnwtsSOSwSGNu1",
            "4md8Lk6829XVj0xOUXLT6f8TvV43",
            "WzgT0tveS5XsQkn9cpG222Oo3iD3",
            "rZzFad2jfVUTvZIvOpBfg2YlSg12",
            "bs6EfZZzG2USvZl06HjfFNyNBk33",
            "ybLJxN69D2YUK0TcRoXn31FcVeI3",
            "RSr6u3p9WRMn4RiFMHo3VnNUaI33",
            ]

    # reading the data from CSV file  
    cars=[]
    with open(csvInputFile) as csvfile:  
        csvRead = csv.DictReader(csvfile)  

        # Converting rows into dictionary and adding it to data  
        i=0;
        for rows in csvRead:  
            seller_id=seller_ids[i%18]
            mykey=rows["vin"]
            tmp={}
            #tmp = rows
            if (rows["exteriorColor"]==""):
                continue
            tmp["exteriorColor"]=rows["exteriorColor"]
            if (rows["interiorColor"]==""):
                continue
            tmp["interiorColor"]=rows["interiorColor"]
            if (rows["millage"]==""):
                continue
            tmp["millage"]=rows["millage"]
            if (rows["price"]==""):
                continue
            tmp["price"]=rows["price"]
            if (rows["vin"]==""):
                continue
            tmp["vin"]=rows["vin"]
            if (rows["longitude"]=="" or rows["latitude"]==""):
                continue
            tmp["coordinates"]=rows["coordinates"]=[rows["longitude"],rows["latitude"]]
            tmp["sellerId"]=seller_id
            tmp["photo"]=rows["photo"]
            cars.append(tmp)
            i=i+1

    # dumping the data  
    with open(jsonOutputFile, 'w') as jsonfile:  
        jsonfile.write(json.dumps(cars, indent = 4))  

# filenames       
csvInputFile = 'used_car_data.csv'  
jsonOutputFile = 'used_car_data.json'  
                                                                                                                        
# Calling the create_json_input function  
create_json_input(csvInputFile, jsonOutputFile)  
