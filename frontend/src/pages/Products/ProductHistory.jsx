import { useSelector, useDispatch } from "react-redux";
import { clearHistory } from "../../redux/features/history/historySlice";

const ProductHistory = () => {
  const { items } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  return (
    <div className="p-4 border rounded w-64 ml-[20rem]">
      <h2 className="font-bold mb-3">History</h2>
      {items.length === 0 ? (
        <p>No history yet</p>
      ) : (
        <ul>
          {items.map((p) => (
            <div className="flex" key={p._id}>
              <img src={p.image} alt="" className="w-40 h-50 rounded" />
              <div>
                <p>{p.name}</p>
              </div>
            </div>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <button
          onClick={() => dispatch(clearHistory())}
          className="mt-2 text-red-500"
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default ProductHistory;
