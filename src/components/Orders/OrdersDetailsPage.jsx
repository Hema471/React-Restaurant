import EmptyOrders from "./EmptyOrdersPage";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { apiClient } from "../../Data/apiclient";
import { useSignal } from "@preact/signals-react";
import { useParams } from "react-router-dom";
const MealsOrdersPage = () => {
  const allData = useSignal([]);
  const queryClient = useQueryClient();
  const { orderId } = useParams();
  // console.log("orderId", orderId); worked
  // Get Order Details
  const q = useQuery({
    queryKey: ["orderDetails"],
    // cacheTime: 600000,
    // onSuccess: onSuccess,
    // onError: onError,
    queryFn: async () => {
      let url = `/getOrderDetails/${orderId}`;
      const result = await apiClient.get(url);
      console.log("hemaaaa", result);
      return result;
    },
  });

  console.log("query data", q.data?.data);
  if (q.isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className="container">
      <h2 className="text-center font-weight-bold my-4">Order Details</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark text-center">
            <tr>
              <th>Order Number</th>
              <th>Restaurant Name</th>
              <th>Meal Name</th>
              <th>Meal Image</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {!q.isError &&
              !q.isLoading &&
              q.data?.data?.meals?.map((order, index) => (
                <tr key={index + order.MealName}>
                  <td>{index + 1}</td>
                  <td>{q.data?.data?.ResName}</td>
                  <td>{order.MealName}</td>
                  <td>
                    <img
                      src={order.MealImg}
                      alt="Meal"
                      className="img-thumbnail"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  </td>
                  <td>{order.Quantity}</td>
                  <td>{order.Price.toFixed(2)} $</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealsOrdersPage;
