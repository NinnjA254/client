import "./Acquisitions.css";

import React, { useEffect, useState } from "react";
import { fetchAcquisitions } from "../../api/fetchAcquisitions";
import CreateAcquisition from "../createAcquisition/CreateAcquisition";
import Acquisition from "../acquisition/Acquisition";
import SearchBar from "../SearchBar/SearchBar";
import { checkLogin } from "../../api/checkLogin";
import { useNavigate } from "react-router-dom";

export default function Acquisitions() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [acquisitions, setAcquisitions] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState({
    idFilter: "",
    statusFilter: "All",
  });
  //console.log(acquisitions)
  //console.log(filter.idFilter === '')
  useEffect(() => {
    checkLogin().then((response) => {
      if (response.data.includes("acquisitions")) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        navigate("/admin");
      }
    });
    fetchAcquisitions().then((response) => {
      if (response.status === 200) {
        setAcquisitions(response.data);
      }
      //handle authorisation here
    });
  }, []);

  function renderAcquisitions() {
    if (acquisitions.length === 0) {
      return <p>There are no acquisitions in the system</p>;
    }
    if (acquisitions.length >= 1) {
      if (filter.idFilter !== "") {
        //filtering by id only when idFilter length is greater than one
        if (filter.idFilter.length < 24) {
          return <p>Invalid Id</p>;
        }
        const foundAcquisition =
          acquisitions.find(
            (acquisition) => acquisition._id === filter.idFilter
          ) || null;
        if (foundAcquisition)
          return (
            <Acquisition
              acquisition={foundAcquisition}
              setAcquisitions={setAcquisitions}
            />
          );
        return <p>Acquisition with that Id does not exist</p>;
      }
      if (filter.idFilter === "") {
        //if idFilter is empty, acquisitions are displayed, filtered by statusFilter
        let filteredAcquisitions = [];
        if (filter.statusFilter === "All") {
          filteredAcquisitions = acquisitions;
        } else if (filter.statusFilter === "Pending") {
          filteredAcquisitions = acquisitions.filter(
            (acquisition) => acquisition.acquisitionStatus === false
          );
        } else if (filter.statusFilter === "Fulfilled") {
          filteredAcquisitions = filteredAcquisitions = acquisitions.filter(
            (acquisition) => acquisition.acquisitionStatus === true
          );
        }
        if (filteredAcquisitions.length === 0)
          return <p>No {`No ${filter.statusFilter} acquisitions found`}</p>;
        return filteredAcquisitions.map((acquisition, index) => (
          <Acquisition
            key={index}
            acquisition={acquisition}
            setAcquisitions={setAcquisitions}
          />
        ));
      }
    }
  }
  if (!authorized) return <p>You are not authorized to view this page</p>;
  return (
    <div id="acquisitions">
      <div id="acquisitions-header-and-search-bar">
        <div id="acquisitions-header">
          <h3>Acquisitions</h3>
          {!showForm && (
            <button
              id="create-acquisition-button"
              onClick={() => setShowForm((prev) => !prev)}
            >
              Create Acquisition
            </button>
          )}
        </div>
        {!showForm ? (
          <SearchBar
            filter={filter}
            setFilter={setFilter}
            displayAllFilters={filter.idFilter === ""}
            placeholder="Find Acquisition by Id"
          />
        ) : (
          <h5 id="create-acquisition-heading">create Acquisition</h5>
        )}
      </div>

      {showForm ? (
        <CreateAcquisition
          setShowForm={setShowForm}
          setAcquisitions={setAcquisitions}
        />
      ) : (
        acquisitions && (
          <ul id="acquisitions-container">{renderAcquisitions()}</ul>
        ) // the conditional && is to make sure acquisitions don't render before they are fetched from the server
      )}
    </div>
  );
}
