import { useQuery } from "react-query";
import { apiClient } from "../../Data/apiclient";
import LocationDotIcon from "../../Icons/LocationDotIcon";
import Stars from "../Stars/Stars";
import { Row, Col } from "react-bootstrap";
import CommentBox from "./CommentBox";
import { useParams } from "react-router-dom";
import { UserData } from "../../Globals";
import AddMealButton from "./AddMealButton";
import ReviewsCard from "./../Reviews/ReviewsCard";
import { Link } from "react-router-dom";
import MealCard from "./MealCard";
import ChooseUs from "./ChooseUs";
import Footer from "../Footer/Footer";
import DineMeLogo from "../../images/DineMeLogo.png";
import MealFilters from "./MealFilters";
import CookingLoader from "../Loaders/CookingLoader";

export default function SelectResPage() {
  const { resID, resName } = useParams();
  console.log("resID", resID);

  const q1 = useQuery({
    queryKey: ["rest" + resID],
    cacheTime: 60000,
    // staleTime: 60000,
    queryFn: async () => {
      let url = `/getResturantWithMeals/${resID}`;
      const ret = await apiClient.get(url);
      console.log("Returned Mealsssss", ret);
      return ret;
    },
  });

  console.log("query data", q1.data?.data.restaurant.ownerId);

  if (q1.isLoading) return <CookingLoader />;
  else
    return (
      <>
        <div className="select-res-page">
          <div id="page-content restaurant-container" className="page-content">
            <div className="restaurant-cover active-on-menu-tab  menu-tab-activated">
              {/* Banner Img */}
              <img
                loading="lazy"
                src={q1.data?.data?.restaurant?.ResBanner}
                alt="cover photo"
              />
            </div>

            <div className="container">
              <Row className="section separator restaurant-details-section active-on-menu-tab  menu-tab-activated">
                <Col sm={12} className="section-header">
                  <div className="restaurant-image-container">
                    <div className="restaurant-image image-ratio ratio-square">
                      {/* Res Image */}
                      <img
                        loading="lazy"
                        src={q1.data?.data?.restaurant?.ResImg || DineMeLogo}
                        alt={q1.data?.data?.restaurant?.ResName}
                        className="v-center"
                      />
                    </div>
                  </div>

                  <div className="resturant-info-container">
                    <div className="header-content-container">
                      <div className="content">
                        <div className="resturant-name">
                          <h1 className="title">
                            {q1.data?.data?.restaurant?.ResName}

                            {(UserData.value.role === "ADMIN" ||
                              (UserData.value.role === "owner" &&
                                UserData.value.id ===
                                  q1.data?.data?.restaurant?.ownerId)) && (
                              <Link
                                className="badge badge-primary"
                                style={{ color: "white", fontSize: "0.45em" }}
                                to={`/RestaurantDashboard/${resID}`}
                              >
                                Statistics
                              </Link>
                            )}
                          </h1>
                        </div>
                        <div className="subheader">
                          <div className="tags-rate-container">
                            <div className="rate-container">
                              <div className="rest-rate">
                                <div
                                  className="vue-star-rating"
                                  style={{
                                    transform: "scale(0.5)",
                                    marginLeft: "-45px",
                                    marginBottom: "35px",
                                    // marginTop: "-10px",
                                  }}
                                >
                                  <Stars
                                    stars1={q1.data?.data?.restaurant?.rating}
                                  />
                                </div>
                              </div>
                            </div>
                            <ul
                              className="cuisines-list h-dots-list"
                              style={{ marginTop: "8px" }}
                            >
                              <li
                                className="list-item"
                                style={{
                                  marginTop: "-23px",
                                }}
                              ></li>
                            </ul>
                          </div>
                          <div
                            className="info-item"
                            style={{ margin: "-10px -5px" }}
                          >
                            <span className="info-icon">
                              <svg viewBox="0 0 15 20">
                                <LocationDotIcon />
                              </svg>
                            </span>
                            <p className="info-value">
                              {q1.data?.data?.restaurant?.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Hema Here */}

              {(UserData.value.role === "ADMIN" ||
                (UserData.value.role === "owner" &&
                  UserData.value.id ===
                    q1.data?.data?.restaurant?.ownerId)) && (
                <div className="mt-4">
                  <AddMealButton Resid={resID} />
                </div>
              )}

              {/* <div style={{ transform: "scale(0.85)" }}>
                <MealFilters />
              </div> */}

              <div>
                <Row>
                  {!q1.isLoading &&
                    q1.data?.data?.meals?.map((item, index) => (
                      <Col
                        sm={12}
                        md={6}
                        lg={4}
                        xl={3}
                        key={index + item}
                        style={{ transform: "scale(0.90)" }}
                      >
                        <MealCard
                          key={index}
                          id={item._id}
                          name={item.MealName}
                          price={item.Price}
                          desc={item.Description}
                          rating={item.rating}
                          mealImg={item.MealImg}
                          resID={resID}
                          resName={resName}
                          ownerID={q1.data?.data?.restaurant?.ownerId}
                          MealComments={item.MealComments}
                        />
                      </Col>
                    ))}
                </Row>
              </div>
              {/* style={{ transform: "scale(0.9)" }} */}
              <div>
                <CommentBox query={q1} resID={resID} />
              </div>

              <Row>
                {!q1.isLoading &&
                  q1.data?.data?.resComments?.map((item, index) => (
                    <Col sm={12} md={6} lg={4} xl={3} key={index}>
                      <ReviewsCard
                        key={item.id}
                        name={item.user.name}
                        stars={item.commentSentmint[2] * 5}
                        emotion={item.commentSentmint[1]}
                        comment={item.Comment}
                        date={item.createdAt}
                        image={
                          item.user.userImg ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PyKYrBKAWWy6YCbQzWQcwIRqH8wYMPluIZiMpV1w0NYSbocTZz0ICWFkLcXhaMyvCwQ&usqp=CAU"
                        }
                      />
                    </Col>
                  ))}
              </Row>
            </div>
          </div>
        </div>
        <div style={{ transform: "scale(0.90)" }}>
          <ChooseUs resName={q1.data?.data?.restaurant?.ResName} />
        </div>
        <Footer />
      </>
    );
}
