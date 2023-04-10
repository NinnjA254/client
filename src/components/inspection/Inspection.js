import { fetchInspections } from "../../api/fetchInspections";
import "./Inspection.css";

export default function Inspection({ inspection }) {
  const itemsDamaged = inspection.itemsDamaged.map((item, index) => {
    return (
      <div key={index} id="item-damaged">
        <p>{item.productId.name}</p>
        <p>qty:{item.itemsDamaged}</p>
      </div>
    );
  });
  return (
    <div id="inspection">
      <div id="inspection-details">
        <p>{inspection._id}</p>
        <p>{inspection.time}</p>
        <p>report</p>
      </div>

      <div id="items-damaged-container">
        <h5>Items damaged</h5>
        <div id="items-damaged">
          {itemsDamaged.length > 0 ? (
            itemsDamaged
          ) : (
            <p>No items were damaged</p>
          )}
        </div>
        <p style={{ fontWeight: "400", fontSize: "1rem", marginTop: "1rem" }}>
          {inspection.report}
        </p>
      </div>
    </div>
  );
}
