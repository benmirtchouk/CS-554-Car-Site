const fs=require("fs");
const path=require("path");
const axios=require("axios");
const { geocode, listings } = require("../../config/mongoCollections");
const mongoConnection = require("../../config/mongoConnection");
const { ObjectId } = require("mongodb");
const { nhtsa } = require("../../../api");
const listingData = require('./used_car_data.json');
const listingMongoOperation = require('../../MongoOperations/listing');
const VehicleListing = require('../../DataModel/Automotive/VehicleListing');
const imageDirectory = "src/tasks/listingSeedImages";

// #MARK:- Data construction operations, does *not* do validation, that is handled in data functions (or programmer validation when bypassed)

const createGeocodedPoint = (longitude, latitude) => {
    return {
        coordinates: [longitude, latitude],
        type: "Point"
    }
}

const get_extension = (url) => {
  let tmp=url;

  // some photos have ? in them - remove this
  tmp.replace(/\?.*/,'');

  const extension = tmp.split(".").pop();

  if (extension.trim()!=='jpeg' && extension.trim()!=='png')
  {
    return false;
  }
  else
  {
    return extension;
  }
}

const getNhtsaPhoto = async (vin, make, model, year) => {
  //console.log(`[getNhtsaPhoto]vin:${vin}, make: ${make}, model: ${model}, year: ${year}`);
  try {
    let {data, status} = await nhtsa.getSafetyVehicleIds(make, model, year);
    //console.log(JSON.stringify(data));
    if (data===undefined || data===null || data.Results===undefined || data.Results===null)          
      return false;

    if (data.Results.length > 0) {
      try {
        let vehicles = await nhtsa.getSafetyData(data.Results[0].VehicleId);
        if (vehicles===undefined || vehicles===null || vehicles.data===undefined || vehicles.data===null)
          return false;

        let photo_url = vehicles.data.Results[0].VehiclePicture;
        //console.log(`NHTSA PHOTO...............${photo_url} for vin: ${vin}`);
        return photo_url;
      }
      catch(e) {
        //console.log(`problem getting nhtsa picture for vin ${vin}`);
	return false;
      }
    }
  }
  catch(e) {
    //console.log(`problem getting nhtsa picture for vin ${vin}`);
	return false;
  }
  return false;
}

async function create_new_file() {
   let data;
   let status;

    try {
        //console.log("Inserting Listings")
	let cnt=0;
        for(const listingRawData of listingData) {
	  let use_nhtsa_photo=false;
	  if (cnt>50000) break;
          // Use the vin to pull the meta data to populate the properties
            let ret = await nhtsa.decodeVin(listingRawData["vin"]);
	    data = ret.data;
	    //console.log(`/n/nLooking at new listing`);
            if (data == null || status > 400) {
	      continue;
            }
	
	    if (data.make===null || data.make==='' || data.model===null || data.model==='' || data.manufacturer===null || data.manufacturer==='')
		continue;
	
	    const newMetaData={
		"make": data.make,
		"model": data.model,
		"manufacturer": data.manufacturer,
		"modelYear": parseInt(data.modelYear),
		"makeId": parseInt(data.makeId),
		"manufacturerId": parseInt(data.manufacturerId),
		"modelId": parseInt(data.modelId),
		"bodyClass": data.bodyClass,
		"doors": data.doors
	    }
	    const vin = listingRawData.vin;
	    if (vin.indexOf("E+")>-1){
		 //console.log(`skipping vin: ${vin}`);
		 continue
	    }
	    const listingData= {
              vin: listingRawData.vin,
              sellerId: listingRawData.sellerId,
              exteriorColor: listingRawData.exteriorColor,
              interiorColor: listingRawData.interiorColor,
              millage: parseInt(listingRawData.millage),
              price: parseFloat(listingRawData.price),
              location:{"type":"Point", "coordinates": (listingRawData.coordinates || []).map(parseFloat)},
              metadata: newMetaData,
              photo: null,
              };
	
	      if (listingRawData.photo!==undefined && listingRawData.photo!==null && listingRawData.photo.trim()!=="")
	      {
	          let ext=get_extension(listingRawData.photo);
	          if (ext!==false)
		  {
		     //write picture to stream.....
		     let photoName=`${vin}.${ext}`;
                     const imagePath = path.resolve(imageDirectory, photoName);
                     // console.log(`Writing photo to: ${imagePath}`);
                     try {
                       const ret = await axios({
                         method: "GET",
                         url: listingRawData.photo,
                         responseType: "stream",
                       });
                       ret.data.pipe(fs.createWriteStream(imagePath));
                       // console.log(`Successfully wrote KRAGGLE ${photoName} to disk(${listingRawData.photo})`);
                       } catch (e) {
                         // set csv_photo to false
                         // console.log(`Problem writing kraggle ${photoName} to disk (${listingRawData.photo})`);
			 // set to false - since failing on calls now
	                 use_nhtsa_photo=false;
	                 //use_nhtsa_photo=true;
                       }
                   }
		   else
		   {
		      // console.log(`setting nhtsa_photo to true`);
		      //use_nhtsa_photo=true;
		      use_nhtsa_photo=false;
		   }
              }
	      else
              {
                // console.log(`setting nhtsa_photo to true....`);
		//use_nhtsa_photo=true;
		use_nhtsa_photo=false;
              }

	      // console.log(`use_nhtsa_photo: ${use_nhtsa_photo}`);
	      if (use_nhtsa_photo===true)
	      {
	        // console.log(`Getting nhtsa_photo.......`);
	        nhtsa_photo = await getNhtsaPhoto(vin, data.make, data.model, data.modelYear);
	        // console.log(`Retrieved nhtsa_photo: ${nhtsa_photo}`);

		if (nhtsa_photo)
		{
	          let ext=get_extension(nhtsa_photo);
	          if (ext!==false)
		  {
		     //write picture to stream.....
		     let photoName=`${vin}.${ext}`;
                     const imagePath = path.resolve(imageDirectory, photoName);
                     try {
                       const ret = await axios({
                         method: "GET",
                         url: nhtsa_photo,
                         responseType: "stream",
                       });
                       ret.data.pipe(fs.createWriteStream(imagePath));
                       // console.log(`Successfully wrote NHTSA ${photoName} to disk(${nhtsa_photo})`);
                       } catch (e) {
                         // set csv_photo to false
                         // console.log(`Problem writing nhtsa ${photoName} to disk`);
                       }
                   }
		}
	      }
	      cnt=cnt+1
	      console.log(`${JSON.stringify(listingData)},`);
        }

    } catch (err) {
        console.error(err);
    } finally {
        //console.log("Connection closed!");
        process.exit(0);
    }
}

create_new_file();
