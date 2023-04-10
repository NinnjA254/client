import { cancelAcquisition } from "../../api/cancelAcquisition";
import { fetchAcquisitions } from "../../api/fetchAcquisitions";
import { fulfilAcquisition } from "../../api/fulfilAcquisition";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import "./Acquisition.css";

export default function Acquisition({ acquisition, setAcquisitions }) {
  let isFulfilled = acquisition.acquisitionStatus;

  function handleFulfill() {
    //fulfil acquisition upon click
    fulfilAcquisition(acquisition._id).then((response) => {
      console.log(response);
      if (response.status === 200) {
        console.log("fulfilation");
        fetchAcquisitions().then((response) => {
          if (response.status === 200) {
            setAcquisitions(response.data);
          }
          //handle authorisation here
        });
      } else {
        alert(response.message);
        console.log(response.message);
      }
    });
  }

  function handleCancel() {
    // cancel acquisition upon click
    console.log("cancellin");
    cancelAcquisition(acquisition._id).then((response) => {
      if (response.status === 200) {
        fetchAcquisitions().then((response) => {
          if (response.status === 200) {
            setAcquisitions(response.data);
          }
          //handle authorisation here
        });
      } else {
        alert(response.message);
        console.log(response.message);
      }
    });
  }

  const itemsAcquired = acquisition.itemsAcquired.map((item, index) => {
    return (
      <div key={index} id="item-acquired">
        <p>{item.productId.name}</p>
        <p>qty:{item.quantityAcquired}</p>
        <p>Ksh {item.prizePerItem.toLocaleString()}</p>
      </div>
    );
  });
  return (
    <div id="acquisition">
      <div id="acquisition-details">
        <p>{acquisition._id}</p>
        <p>{acquisition.time}</p>
        <p>
          {acquisition.supplierId.firstName +
            " " +
            acquisition.supplierId.lastName}
        </p>
        <StatusIndicator status={isFulfilled} />
      </div>

      <div id="items-acquired-container">
        <h5>Items acquired</h5>
        <div id="items-acquired">
          {itemsAcquired}
          <p id="items-acquired-total-cost">
            total: Ksh {acquisition.totalCost.toLocaleString()}{" "}
          </p>
        </div>
      </div>
      <div id="acquisition-fulfil-cancel-buttons-container">
        <button
          className="acquisition-button"
          onClick={handleFulfill}
          disabled={isFulfilled}
        >
          {!isFulfilled ? "fulfill" : "already fulfilled"}
        </button>
        {!isFulfilled && (
          <button
            className="acquisition-button"
            onClick={handleCancel}
            disabled={isFulfilled}
          >
            cancel
          </button>
        )}
      </div>
    </div>
  );
}
