const express = require('express');
const router = express.Router();
const { nhtsa } = require("../api");

router.get('/decodeVin/:vin', async function (req, res, next) {
  try {
    const vin = req.params.vin.trim();
    if (vin.length == 0) {
      return res.status(400).json({ error: 'vin cannot be empty' });
    }
    const { data, status } = await nhtsa.decodeVin(vin);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/decodeWmi/:wmi', async function (req, res, next) {
  try {
    const wmi = req.params.wmi.trim();
    if (wmi.length == 0) {
      return res.status(400).json({ error: 'wmi cannot be empty' });
    }
    const { data, status } = await nhtsa.decodeWmi(wmi);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/getWMIsForManufacturer/:manufacturerId', async function (req, res, next) {
  try {
    let manufacturerId = req.params.manufacturerId;
    try {
      if (manufacturerId.length == 0 || isNaN(manufacturerId)) throw 'bad manufacturerId';
      manufacturerId = parseInt(manufacturerId);
    } catch (e) {
      return res.status(400).json({ error: 'manufacturerId must be an integer' });
    }

    const { data, status } = await nhtsa.getWMIsForManufacturer(manufacturerId);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/getAllMakes', async function (req, res, next) {
  try {
    const { data, status } = await nhtsa.getAllMakes();
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/getParts/:type', async function (req, res, next) {
  try {
    let type = req.params.type;
    try {
      if (type.length == 0 || isNaN(type)) throw 'bad type';
      type = parseInt(type);
    } catch (e) {
      return res.status(400).json({ error: 'type must be an integer' });
    }

    const { data, status } = await nhtsa.getParts(type);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/manufacturers/:pageNum', async function (req, res, next) {
  try {
    let pageNum = req.params.pageNum;
    try {
      if (pageNum.length == 0 || isNaN(pageNum)) throw 'bad page';
      pageNum = parseInt(pageNum);
    } catch (e) {
      return res.status(400).json({ error: 'pageNum must be an integer' });
    }

    const { data, status } = await nhtsa.getManufacturers(pageNum);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/getManufacturerDetails/:manufacturerId', async function (req, res, next) {
  try {
    let manufacturerId = req.params.manufacturerId;
    try {
      if (manufacturerId.length == 0 || isNaN(manufacturerId)) throw 'bad manufacturerId';
      manufacturerId = parseInt(manufacturerId);
    } catch (e) {
      return res.status(400).json({ error: 'manufacturerId must be an integer' });
    }

    const { data, status } = await nhtsa.getManufacturerDetails(manufacturerId);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/getMakeForManufacturer/:manufacturerId', async function (req, res, next) {
  try {
    let manufacturerId = req.params.manufacturerId;
    try {
      if (manufacturerId.length == 0 || isNaN(manufacturerId)) throw 'bad manufacturerId';
      manufacturerId = parseInt(manufacturerId);
    } catch (e) {
      return res.status(400).json({ error: 'manufacturerId must be an integer' });
    }

    const { data, status } = await nhtsa.getMakeForManufacturer(manufacturerId);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/getModelsForMakeId/:makeId', async function (req, res, next) {
  try {
    let makeId = req.params.makeId;
    try {
      if (makeId.length == 0 || isNaN(makeId)) throw 'bad makeId';
      makeId = parseInt(makeId);
    } catch (e) {
      return res.status(400).json({ error: 'makeId must be an integer' });
    }

    const { data, status } = await nhtsa.getModelsForMakeId(makeId);
    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});


module.exports = router;