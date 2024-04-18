import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Cart } from "../../Globals";
import { useMutation } from "react-query";
import { apiClient } from "../../Data/apiclient";
import EmptyOrders from "./../Orders/EmptyOrdersPage";
export default function CartBody() {
  // Create Order
  const m = useMutation({
    mutationKey: ["createOrder"],
    // cacheTime: 600000,
    // onSuccess: onSuccess,
    // onError: onError,
    mutationFn: async (params) => {
      console.log("trying to load");
      let url = "/createOrder";
      console.log("posting to ", url);
      return await apiClient.post(url, Cart.value);
    },
  });

  async function createOrder() {
    const result = await m.mutateAsync();
    console.log(result);
  }

  console.log("carttttttttt", Cart.value.meals);

  if (Cart.value.meals.length == 0) {
    return <EmptyOrders />;
  } else
    return (
      <section
        // key={index}
        className="shopping-cart-container"
        style={{ transform: "scale(0.80)" }}
      >
        <div className="products-container">
          <h3 className="title">My Products</h3>
          <div className="box-container">
            {Cart.value.meals.map((meal, index) => (
              <div className="box" key={index}>
                <FaTimes className="fas fa-times" />
                {console.log("meal data", meal)}
                {/* // meal.mealImg || */}
                <img src={meal.mealImg} alt="meal-img" />
                <div className="content">
                  {/* meal.name || */}
                  <h3>{meal.name}</h3>
                  <span> quantity : </span>
                  {/* meal.quantity || */}
                  <input type="number" defaultValue={1} />
                  <br />
                  <span> price : </span>
                  {/* meal.price || */}
                  <span className="price"> {meal.price} </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-total">
          <h3 className="title"> cart total </h3>
          <div className="box">
            <h3 className="subtotal">
              subtotal : <span>$200</span>
            </h3>
            <h3 className="total">
              total : <span>$200</span>
            </h3>
            <Link
              to="/myorders"
              className="btn"
              onClick={() => {
                createOrder();
              }}
            >
              Buy
            </Link>
          </div>
        </div>
      </section>
    );
}
