import React, { useEffect, useState } from "react";
import { fetchInspections } from "../../api/fetchInspections";
import { checkLogin } from "../../api/checkLogin";
import CreateInspection from "../createInspection/CreateInspection";
import Inspection from "../inspection/Inspection";
import "./Inspections.css";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

export default function Inspections() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [inspections, setInspections] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState({
    // add a date filter later?
    idFilter: "",
  });
  //console.log(inspections)
  //console.log(filter.idFilter === '')
  useEffect(() => {
    checkLogin().then((response) => {
      if (response.data.includes("inspections")) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        navigate("/admin");
      }
    });
    fetchInspections().then((response) => {
      if (response.status === 200) {
        setInspections(response.data);
      }
      //handle authorisation here
    });
  }, []);

  function renderInspections() {
    if (inspections.length === 0) {
      return <p>There are no inspections in the system</p>;
    }
    if (inspections.length >= 1) {
      if (filter.idFilter !== "") {
        //filtering by id only when idFilter length is greater than one
        if (filter.idFilter.length < 24) {
          return <p>Invalid Id</p>;
        }
        const foundInspection =
          inspections.find(
            (inspection) => inspection._id === filter.idFilter
          ) || null;
        if (foundInspection) return <Inspection inspection={foundInspection} />;
        return <p>Inspection with that Id does not exist</p>;
      }
      if (filter.idFilter === "") {
        //if idFilter is empty, inspections are displayed, filtered by statusFilter
        let filteredInspections = [];
        //add a date filter below
        if (true) {
          filteredInspections = inspections;
        }
        return filteredInspections.map((inspection, index) => (
          <Inspection key={index} inspection={inspection} />
        ));
      }
    }
  }
  if (!authorized) return <p>You are not authorized to view this page</p>;
  return (
    <div id="inspections">
      <div id="inspections-header-and-search-bar">
        <div id="inspections-header">
          <h3>Inspections</h3>
          {!showForm && (
            <button
              id="create-inspection-button"
              onClick={() => setShowForm((prev) => !prev)}
            >
              CreateInspection
            </button>
          )}
        </div>
        {!showForm ? (
          <SearchBar
            filter={filter}
            setFilter={setFilter}
            displayAllFilters={false}
            placeholder="Find Inspection by Id"
          />
        ) : (
          <h5 id="create-inspection-heading">create Inspection</h5>
        )}
      </div>

      {showForm ? (
        <CreateInspection
          setShowForm={setShowForm}
          setInspections={setInspections}
        />
      ) : (
        inspections && <ul id="inspections-container">{renderInspections()}</ul> // the conditional && is to make sure inspections don't render before they are fetched from the server
      )}
    </div>
  );
}
