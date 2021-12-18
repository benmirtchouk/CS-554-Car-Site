/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Badge,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import {
  getSafetyReport,
  getSafetyMakesForModelYear,
  getSafetyModelsForMakeModelYear,
} from "../../data/nhtsa";
import Loading from "../Loading";
import ListError from "../ListError";
import Car from "./Car";

const Safety = (props) => {
  /// Use nil safe coercion.
  // eslint-disable-next-line react/destructuring-assignment
  const passedState = props?.location?.state ?? {};

  const [cdata, setData] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [year, setYear] = useState(passedState?.year);
  const [cardQuery, setCardQuery] = useState(false);
  const [make, setMake] = useState(passedState?.make);
  const [model, setModel] = useState(passedState?.model);
  const [apiError, setApiError] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedChartStat, setSelectedChartStat] = useState(undefined);

  // set the years to a set number
  const years = [];
  for (let yr = 2021; yr > 1989; yr -= 1) {
    years.push(yr);
  }

  async function getData() {
    setLoading(true);
    await getSafetyReport(make, model, year)
      .then((result) => {
        if (result.status !== 200) {
          setApiError(true);
          console.log(
            `Errors Found on return API Call, status: ${result.status}`
          );
          setErrorCode(`*****API Problem*****`);
          setErrorMessage(
            `Errors Found on return API Call, status: ${result.status}`
          );
        } else {
          if (result.data.length < 1) {
            setApiError(true);
            console.log(`No Data Found`);
            setErrorCode(`****404****`);
            setErrorMessage(`No data found `);
          } else {
            setApiError(false);
            setCardQuery(true);
            setData(result.data);
          }
          setLoading(false);
        }
      })
      .catch((e) => {
        setData(undefined);
        setApiError(true);
        setErrorCode(`********API Problem***********`);
        setErrorMessage(`Car API Problem: ${e}`);
        console.log(e);
      });
  }

  useEffect(() => {
    if (!(year && model && make)) {
      return;
    }

    getData();

    // Ignore the deps as this effect runs one
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, model, make]);

  const handleYearSelect = async (iYear) => {
    setYear(iYear);
    setMake(undefined);
    setModel(undefined);
    setCardQuery(false);
    setLoading(true);
    await getSafetyMakesForModelYear(iYear)
      .then((result) => {
        if (result.status !== 200) {
          setApiError(true);
          console.log(`Errors Found on return API Call: ${result.status}`);
          setErrorCode(`*****API Problem*****`);
          setErrorMessage(`Errors Found on return API Call: ${result.status}`);
        } else {
          if (result.data.length < 1) {
            setApiError(true);
            console.log(`No Data Found`);
            setErrorCode(`****404****`);
            setErrorMessage(`No Make data found `);
          } else {
            setApiError(false);
            const allMakes = [];
            result.data.Results.map((item) => allMakes.push(item.Make));
            setMakes(allMakes);
          }
          setLoading(false);
        }
      })
      .catch((e) => {
        setData(undefined);
        setApiError(true);
        setErrorCode(`********API Problem***********`);
        setErrorMessage(`Car API Problem: ${e}`);
        console.log(e);
      });
  };

  const handleMakeSelect = async (iMake) => {
    setMake(iMake);
    setModel(undefined);
    setCardQuery(false);
    setLoading(true);
    await getSafetyModelsForMakeModelYear(iMake, year)
      .then((result) => {
        if (result.status !== 200) {
          setApiError(true);
          console.log(`Errors Found on return API Call: ${result.status}`);
          setErrorCode(`*****API Problem*****`);
          setErrorMessage(`Errors Found on return API Call: ${result.status}`);
        } else {
          if (result.data.length < 1) {
            setApiError(true);
            console.log(`No Data Found`);
            setErrorCode(`****404****`);
            setErrorMessage(`No Model data found `);
          } else {
            setApiError(false);
            const allModels = [];
            console.log(result);
            result.data.Results.map((item) => allModels.push(item.Model));
            setModels(allModels);
          }
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setData(undefined);
        setApiError(true);
        setErrorCode(`********API Problem***********`);
        setErrorMessage(`Car API Problem: ${e}`);
        console.log(`${errorCode}, ${errorMessage}`);
        console.log(e);
      });
  };

  const handleModelSelect = async (iModel) => {
    setCardQuery(false);
    setModel(iModel);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // if (!year || year.length < 1) alert("ModelYear must be selected");
    // if (!make || make.length < 1) alert("Make must be selected");
    // if (!model || model.length < 1) alert("Model must be selected");

    if (year && make && model) getData();
  };

  if (apiError) {
    return <ListError info={{ errorCode, errorMessage }} />;
  }

  if (loading) {
    return <Loading />;
  }

  let extendedCarHeader = false;
  if (year && model && make) extendedCarHeader = true;

  return (
    <div key="safety" className="main_layout">
      <div className="mainbody">
        <Container>
          <h1 className="sum-header">
            <Badge>Car Safety</Badge> {make}, {model}, {year}
          </h1>
          <form onSubmit={submitHandler}>
            <ButtonGroup className="subnav">
              <DropdownButton
                as={ButtonGroup}
                title={year ? year : "Model Year"}
                id="years-dropdown"
                variant="secondary"
                disabled={year && year.length <= 1}
                onSelect={handleYearSelect}
              >
                {years.map((yr) => (
                  <Dropdown.Item key={yr} eventKey={yr}>
                    {yr}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton
                as={ButtonGroup}
                variant="secondary"
                title={make ? make : "Make"}
                id="make-dropdown"
                disabled={make && make.length <= 1}
                onSelect={handleMakeSelect}
              >
                {makes.map((val) => (
                  <Dropdown.Item key={val} eventKey={val}>
                    {val}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton
                variant="secondary"
                as={ButtonGroup}
                title={model ? model : "Models"}
                id="models-dropdown"
                onSelect={handleModelSelect}
                disabled={models && models.length <= 1}
              >
                {models.map((val1) => (
                  <Dropdown.Item key={val1} eventKey={val1}>
                    {val1}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <Button variant="primary" type="submit">
                Query Stats
              </Button>
            </ButtonGroup>
          </form>
          {
            cdata.map((item, indx) => {
              const keyVal = `car-${indx}-${item.Id}`;
              const keyVal1 = `Kcar-${indx}-${item.Id}`;
              return (
                <div key={keyVal1}>
                  {extendedCarHeader && cardQuery && (
                    <Car key={keyVal} info={{ item }} />
                  )}
                </div>
              );
            })
          }
        </Container>
        <select onChange={(e) => setSelectedChartStat(e.target.value)}>
          <option value="ModelYear">ModelYear</option>
          <option value="ComplaintsCount">ComplaintsCount</option>
          <option value="RecallsCount">RecallsCount</option>
          <option value="InvestigationCount">InvestigationCount</option>
          <option value="OverallRating">OverallRating</option>
          <option value="OverallFrontCrashRating">
            OverallFrontCrashRating
          </option>
          <option value="CrashPassengersideRating">
            CrashPassengersideRating
          </option>
          <option value="OverallSideCrashRating">OverallSideCrashRating</option>
          <option value="OverallSideCrashRating">OverallSideCrashRating</option>
          <option value="SideCrashDriversideRating">
            SideCrashDriversideRating
          </option>
          <option value="SideCrashPassengersideRating">
            SideCrashPassengersideRating
          </option>
          <option value="SideCrashPassengersideRating">
            SideCrashPassengersideRating
          </option>
          <option value="RolloverRating">RolloverRating</option>
          <option value="RolloverRating2">RolloverRating2</option>
          <option value="RolloverPossiblity">RolloverPossiblity</option>
          <option value="RolloverPossiblity2">RolloverPossiblity2</option>
          <option value="SidePoleCrashRating">SidePoleCrashRating</option>
        </select>
        {selectedChartStat !== undefined && (
          <BarChart
            width={600}
            height={300}
            data={cdata.map((car) => ({
              name: car.Description,
              uv: car?.[selectedChartStat],
            }))}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="uv" barSize={30} fill="#8884d8" />
          </BarChart>
        )}
      </div>
    </div>
  );
};

export default Safety;
