import React, { useContext, useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Card, Carousel, Form, Tab, Tabs, InputGroup } from "react-bootstrap";
import Slidebutton from "../common/Slidebutton";
import Search from "../common/Search";

function Textanim({ txt = "" }) {
  const [end, setEnd] = useState(0);
  const [dir, setDir] = useState(0);
  const [pause, setPause] = useState(false);
  const L = txt.length;

  useEffect(() => {
    const interval = setInterval(() => {
      if (dir === 0) {
        if (end === L) {
          setPause(true);
          setDir(1);
          setEnd(end - 1);
          setTimeout(() => {
            setPause(false);
          }, 5000);
        } else {
          if (!pause) {
            setEnd(end + 1);
          }
        }
      } else {
        if (end === 0) {
          setDir(0);
          setEnd(end + 1);
        } else {
          if (!pause) {
            setEnd(end - 1);
          }
        }
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [end, pause]);

  return (
    <span className="">
      {txt.slice(0, end + 1)}
      <span> </span>
    </span>
  );
}

function Section({ handleFilter, uniqueLocations = [] }) {
  const currentDate = new Date();
  const [search, setSearch] = useState("title");
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];
  const oneYearAgo = formattedCurrentDate
    .split("-")
    .map((v, idx) => {
      if (idx === 0) {
        return parseInt(v) - 1;
      } else {
        return v;
      }
    })
    .join("-");

  const [filter, setFilter] = useState({
    city: "all",
    start_date: oneYearAgo,
    end_date: formattedCurrentDate,
    filter_by: "date",
    sort_by: "ascending",
  });

  function handleChange(e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  function handleFilterTab(t) {
    setFilter({
      ...filter,
      ["filter_by"]: t,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleFilter(filter);
  }

  const handleSearch = (criteria, searchValue) => {
    handleFilter(filter, { criteria, searchValue});
  }

  const slides = [
    {
      image:
        "https://cdn.pixabay.com/photo/2017/01/14/10/56/people-1979261_1280.jpg",
      text: "Preserving the past",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2284501_1280.jpg",
      text: "Celebrating the present",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/07/02/09/52/meeting-room-828547_1280.jpg",
      text: "and shaping the future",
    },
  ];

  return (
    <>
      <div className="font-bold">
        <div className="min-h-[70vh] max-h-[70vh] relative">
          <Carousel interval={5000} controls={false} fade indicators={false}>
            {slides.map((slide, index) => (
              <Carousel.Item key={index}>
                <Card className="min-h-[60vh]  max-h-[60vh] ">
                  <div className="position-absolute inset-0">
                    <Card.Img
                      className="h-full object-cover"
                      src={slide.image}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50">
                    <div className="flex flex-col max-w-xl border-x border-b border-lime-400 mx-auto text-4xl p-4">
                      {slides.map((slide, i) => (
                        <div
                          key={i}
                          style={{ marginLeft: `${i}em` }}
                          className={`${
                            i % 2 === 0 ? "text-white" : "text-lime-400"
                          }`}
                        >
                          <Textanim txt={slide.text} />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="absolute bottom-0 z-40 right-0 left-0 px-4 mx-auto max-w-[800px]">
            <div>
              <Form className="" onSubmit={handleSubmit}>
                <Card>
                  <div className="py-2 grid gap-2 px-4">
                    <Search handleSearch={handleSearch} />
                  </div>
                  <Tabs
                    defaultActiveKey="filter"
                    id="uncontrolled-tab-example"
                    className="my-3 px-5"
                    justify
                  >
                    <Tab eventKey="filter" title="Filter">
                      <Tabs
                        defaultActiveKey="date"
                        id="uncontrolled-tab-example"
                        className="my-3 px-5"
                        justify
                        onSelect={handleFilterTab}
                      >
                        <Tab eventKey="location" title="Location">
                          <Card.Body>
                            <Form.Select
                              id="location"
                              name="city"
                              className="outline-none p-2"
                              onChange={handleChange}
                              value={filter.city}
                            >
                              <option className="p-2" value="all">
                                Select location
                              </option>
                              {uniqueLocations.map((loc, index) => (
                                <option key={index} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </Form.Select>
                          </Card.Body>
                        </Tab>
                        <Tab eventKey="date" title="Date">
                          <Card.Body>
                            <InputGroup size="" className="mb-4">
                              <InputGroup.Text className="p-2 w-1/4">
                                Start Date
                              </InputGroup.Text>
                              <Form.Control
                                type="date"
                                value={filter.start_date}
                                onChange={handleChange}
                                name="start_date"
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </InputGroup>
                            <InputGroup size="" className="mb-4">
                              <InputGroup.Text className="p-2 w-1/4">
                                End Date
                              </InputGroup.Text>
                              <Form.Control
                                type="date"
                                value={filter.end_date}
                                onChange={handleChange}
                                name="end_date"
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </InputGroup>
                          </Card.Body>
                        </Tab>
                      </Tabs>
                    </Tab>
                    <Tab eventKey="sort" title="Sort">
                      <Card.Body>
                        <InputGroup className="border grid grid-cols-2 gap-4 p-4">
                          <Form.Check
                            type="radio"
                            label="Ascending"
                            name="sort_dir"
                            value="ascending"
                            onChange={handleChange}
                            defaultChecked
                          />
                          <Form.Check
                            type="radio"
                            label="Descending"
                            name="sort_dir"
                            value="descending"
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Card.Body>
                    </Tab>
                  </Tabs>
                  <Card.Footer>
                    <Slidebutton />
                  </Card.Footer>
                </Card>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Section;
