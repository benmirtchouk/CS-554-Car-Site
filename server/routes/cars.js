const express = require("express");
const router = express.Router();
const { nhtsa } = require("../api");

router.get("/decodeVin/:vin", async function (req, res, next) {
  try {
    const vin = req.params.vin.trim();
    if (vin.length == 0) {
      return res.status(400).json({ error: "vin cannot be empty" });
    }
    const { data, status } = await nhtsa.decodeVin(vin);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `${e}` });
  }
});

router.get("/decodeShortVin/:vin", async function (req, res, next) {
  try {
    const vin = req.params.vin.trim();
    if (vin.length == 0) {
      return res.status(400).json({ error: "vin cannot be empty" });
    }
    const { data, status } = await nhtsa.decodeShortVin(vin);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `${e}` });
  }
});

router.get("/decodeWmi/:wmi", async function (req, res, next) {
  try {
    const wmi = req.params.wmi.trim();
    if (wmi.length == 0) {
      return res.status(400).json({ error: "wmi cannot be empty" });
    }
    const { data, status } = await nhtsa.decodeWmi(wmi);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `${e}` });
  }
});

router.get(
  "/getWMIsForManufacturer/:manufacturerId",
  async function (req, res, next) {
    try {
      let manufacturerId = req.params.manufacturerId;
      try {
        if (manufacturerId.length == 0 || isNaN(manufacturerId))
          throw "bad manufacturerId";
        manufacturerId = parseInt(manufacturerId);
      } catch (e) {
        return res
          .status(400)
          .json({ error: "manufacturerId must be an integer" });
      }

      const { data, status } = await nhtsa.getWMIsForManufacturer(
        manufacturerId
      );
      res.status(status).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `${e}` });
    }
  }
);

router.get("/getAllMakes", async function (req, res, next) {
  try {
    const { data, status } = await nhtsa.getAllMakes();
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `${e}` });
  }
});

router.get("/getParts/:type", async function (req, res, next) {
  try {
    let type = req.params.type;
    try {
      if (type.length == 0 || isNaN(type)) throw "bad type";
      type = parseInt(type);
    } catch (e) {
      return res.status(400).json({ error: "type must be an integer" });
    }

    const { data, status } = await nhtsa.getParts(type);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `${e}` });
  }
});

router.get("/manufacturers/:pageNum", async function (req, res, next) {
  try {
    let pageNum = req.params.pageNum;
    try {
      if (pageNum.length == 0 || isNaN(pageNum)) throw "bad page";
      pageNum = parseInt(pageNum);
    } catch (e) {
      return res.status(400).json({ error: "pageNum must be an integer" });
    }

    const { data, status } = await nhtsa.getManufacturers(pageNum);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `${e}` });
  }
});

router.get(
  "/getManufacturerDetails/:manufacturerId",
  async function (req, res, next) {
    try {
      let manufacturerId = req.params.manufacturerId;
      try {
        if (manufacturerId.length == 0 || isNaN(manufacturerId))
          throw "bad manufacturerId";
        manufacturerId = parseInt(manufacturerId);
      } catch (e) {
        return res
          .status(400)
          .json({ error: "manufacturerId must be an integer" });
      }

      const { data, status } = await nhtsa.getManufacturerDetails(
        manufacturerId
      );
      res.status(status).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `${e}` });
    }
  }
);

router.get(
  "/getMakeForManufacturer/:manufacturerId",
  async function (req, res, next) {
    try {
      let manufacturerId = req.params.manufacturerId;
      try {
        if (manufacturerId.length == 0 || isNaN(manufacturerId))
          throw "bad manufacturerId";
        manufacturerId = parseInt(manufacturerId);
      } catch (e) {
        return res
          .status(400)
          .json({ error: "manufacturerId must be an integer" });
      }

      const { data, status } = await nhtsa.getMakeForManufacturer(
        manufacturerId
      );
      res.status(status).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `${e}` });
    }
  }
);

router.get("/getModelsForMakeId/:makeId", async function (req, res, next) {
  try {
    let makeId = req.params.makeId;
    try {
      if (makeId.length == 0 || isNaN(makeId)) throw "bad makeId";
      makeId = parseInt(makeId);
    } catch (e) {
      return res.status(400).json({ error: "makeId must be an integer" });
    }

    const { data, status } = await nhtsa.getModelsForMakeId(makeId);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `${e}` });
  }
});

router.get(
  "/safety/recalls/:make/:model/:year",
  async function (req, res, next) {
    try {
      let make = req.params.make;
      let model = req.params.model;
      let year = req.params.year;
      try {
        if (year.length == 0 || isNaN(year)) throw "bad year";
      } catch (e) {
        return res.status(400).json({ error: "year must be an integer" });
      }

      const { data, status } = await nhtsa.getRecallData(make, model, year);
      res.status(status).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `${e}` });
    }
  }
);

router.get(
  "/safety/getMakesForModelYear/:year",
  async function (req, res, next) {
    try {
      let year = req.params.year;
      try {
        if (year.length == 0 || isNaN(year)) throw "bad year";
      } catch (e) {
        return res.status(400).json({ error: "year must be an integer" });
      }

      const { data, status } = await nhtsa.getSafetyMakesForModelYear(year);
      res.status(status).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `${e}` });
    }
  }
);

router.get(
  "/safety/getModelsForMakeModelYear/:make/:year",
  async function (req, res, next) {
    try {
      let year = req.params.year;
      let make = req.params.make;
      try {
        if (year.length == 0 || isNaN(year)) throw "bad year";
      } catch (e) {
        return res.status(400).json({ error: "year must be an integer" });
      }

      const { data, status } = await nhtsa.getSafetyModelsForMakeModelYear(
        make,
        year
      );
      res.status(status).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `${e}` });
    }
  }
);

router.get(
  "/safety/report/:make/:model/:year",
  async function (req, res, next) {
    try {
      let make = req.params.make;
      let model = req.params.model;
      let year = req.params.year;
      const all_data = [];

      try {
        if (year.length == 0 || isNaN(year)) throw "bad year";
      } catch (e) {
        return res.status(400).json({ error: "year must be an integer" });
      }

      // get the vehicle ids first from the safety api
      const { data, status } = await nhtsa.getSafetyVehicleIds(
        make,
        model,
        year
      );

      if (data===null || data.Results==undefined || data.Results==null)
          return res.status(404).json({ error: `Data Not Found` });

      for (let i = 0; i < data.Results.length; i++) {
        let vehicles = await nhtsa.getSafetyData(data.Results[i].VehicleId);
        vehicles.data.Results.map((vehicle) => {
          vehicle.Id = data.Results[i].VehicleId;
          vehicle.Description = data.Results[i].VehicleDescription;
          all_data.push(vehicle);
        });
      }
      res.status(200).json(all_data);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `${e}` });
    }
  }
);

router.get("/picture/:make/:model/:year", async function (req, res, next) {
  try {
    let make = req.params.make;
    let model = req.params.model;
    let year = req.params.year;
    let picture;

    try {
      if (year.length == 0 || isNaN(year)) throw "bad year";
    } catch (e) {
      return res.status(400).json({ error: "year must be an integer" });
    }

    // get picture for a given make/model/year
    const { data, status } = await nhtsa.getSafetyVehicleIds(make, model, year);
    if (data===null || data.Results==undefined || data.Results==null)
          return res.status(404).json({ error: `Data Not Found` });

    if (data.Results.length > 0) {
      let vehicles = await nhtsa.getSafetyData(data.Results[0].VehicleId);
      picture = vehicles.data.Results[0].VehiclePicture;
    }

    res.status(200).json(picture);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `${e}` });
  }
});

module.exports = router;
