import "./App.css";
import { Grid, Row, Col } from "rsuite";

const Table = (props) => {

  console.log(props)

  return (
    <div className="table">
      
      <Grid>
            <Row className="row">
            <Col className="column">Code</Col>
            <Col className="column">Country</Col>
            <Col className="column">Capital</Col>
            <Col className="column">Currency</Col>
            </Row>
          {props.data.countries.map((country) => (
            <Row className="row">
            <Col className="column">{country.code}</Col>
            <Col className="column">{country.name}</Col>
            <Col className="column">{country.capital}</Col>
            <Col className="column">{country.currency}</Col>
            </Row>
          ))}
      </Grid>
    </div>
  );
};

export default Table;
