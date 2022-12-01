import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Job from "./Job";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
const CompanySearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const baseEndpoint = "https://strive-jobs-api.herokuapp.com/jobs?company=";
  const work = useSelector((state) => state.work.content);
  const dispatch = useDispatch();

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const response = await fetch(baseEndpoint + params.companyName);
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <center>
        <Button variant="success" onClick={() => navigate("/")}>
          <h1>GO TO THE HOME PAGE</h1>
        </Button>
      </center>
      <Row className="mt-4">
        <Col>
          {work.map((jobData, i) => (
            <div id="flex-row">
              <Job
                key={jobData._id}
                data={jobData}
                delete="Delete item from the list"
              />
              <Button
                className="mx-0 mt-3 p-3"
                variant="danger"
                onClick={() => {
                  dispatch({
                    type: "REMOVE-FROM-FAVOURITE-JOB",
                    payload: i,
                  });
                }}
              >
                <FaTrash />
              </Button>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
