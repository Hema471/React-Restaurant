import { useState } from "react";
import ResPageBox from "./ResPageBox";
import "./ResPageBox.scss";
import "./ResPage.scss";
import Slider from "./Slider";
import Header from "./Header";
import Card from "../Card/Card";
import img1 from "../../utils/meals-img/item-1.jpeg";
import img8 from "../../utils/meals-img/item-8.jpeg";
import Footer from "./Footer";
import { useQuery } from "react-query";
import { apiClient } from "../../Data/apiclient";
import { Col, Container } from "reactstrap";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdCard } from "react-icons/io";
import { Link } from "react-router-dom";
import Tabs from "./new/Tabs";
import MainCards from "./new/MainCards";
import Eltest from "./New folder/Eltest";
import Filters from './Filters';
import AddRestaurantButton from "./AddRestaurantButton";
import { UserData } from "../../Globals";

export default function ResPage() {
  const q = useQuery({
    queryKey: [],

    queryFn: async () => {
      let url = "/getAllresturant";

      var ret = await apiClient.get(url);
      console.log('restaurants',ret.data)

      return ret;
    },
  });
  if (q.isLoading) {
    return <>Loading</>;
  }


  if(q.data)
  return (
    <>
    <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            ".vue-star-rating-star[data-v-34cbeed1]{display:inline-block}.vue-star-rating-pointer[data-v-34cbeed1]{cursor:pointer}.vue-star-rating[data-v-34cbeed1]{display:flex;align-items:center}.vue-star-rating-inline[data-v-34cbeed1]{display:inline-flex}.vue-star-rating-rating-text[data-v-34cbeed1]{margin-top:7px;margin-left:7px}.vue-star-rating-rtl[data-v-34cbeed1]{direction:rtl}.vue-star-rating-rtl .vue-star-rating-rating-text[data-v-34cbeed1]{margin-right:10px;direction:rtl}",
        }}
      />
    <section>
      <Slider />
      <Container style={{ width: "85%" }}>
        {/* <div className="bg-danger">
          <Header />
        </div> */}
        {/* Old Cards */}
        {/* <div className="row">
          {!q.isLoading &&
            q.data?.data.map((data, index) => (
              <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
                <Link to={`/restaurant/${data._id}/${data.ResName}`}>
                  <Card
                    title={data.ResName}
                    img={img8}
                    stars1={Math.round(data.rating)}
                    mealImg={img1}
                    reviewsNum={data.comment_num}
                    resName={data.ResName}
                    fav={false}
                  />
                </Link>
              </div>
            ))}
        </div> */}
      </Container>
      {/* NavBar & Loader*/}
      {/* <MainCards /> */}
      <div className="mt-5">
      <div id="app" className="">
          <div id="page-content" className="page-content">
            <div className="container d-flex">
              {UserData.value.role == "ADMIN" && <div><AddRestaurantButton /></div>}
              <Filters />
              
              <div className="row">
                <div className="col-header col-xs-16">
                  <h2 className="col-title inline-block">
                    Restaurants
                    <p style={{ display: "inline", fontSize: "17px" }}>
                      ( 1074 )
                    </p>
                  </h2>
                </div>
                <div
                  id="rest-list-col"
                  className="delivery-rest-list col-sm-13 col-xs-16"
                >
                  <div className="col-body">
                    <div className="row">
                      {!q.isLoading && q.data?.data?.map((data, index) => {
                        return (
                          <ResCard
                            key={index}
                            id={data._id}
                            name={data.ResName}
                          />
                        );
                      
                      })}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
    </>
  );
}






function ResCard({id,name}){

  return(<>
  
  <Link to={`/restaurant/${id}/${name}`} className="restaurant-card restaurant-delivery-card col-md-5 col-sm-8 col-xs-16">
      <div className="card-inner">
        <img
          src="https://s3-eu-west-1.amazonaws.com/elmenusv5-stg/Normal/92edf264-8a29-4efb-997a-ca2fdf9b3a92.jpg"
          alt=""
          style={{ width: "100%" }}
        />
        <div className="card-content clickable-item">
          <a className="clickable-anchor" />
          <div>
            <div className="pull-right flip">
              <div
                data-v-34cbeed1=""
                className="vue-star-rating vue-star-rating-inline"
              >
                <div data-v-34cbeed1="" className="vue-star-rating">
                  {/* Star 1 */}
                  <span
                    data-v-34cbeed1=""
                    className="vue-star-rating-star"
                    style={{ marginRight: 0 }}
                  >
                    <svg
                      data-v-21f5376e=""
                      data-v-34cbeed1=""
                      height={14}
                      width={14}
                      viewBox="0 0 14 14"
                      className="vue-star-rating-star"
                      step={10}
                    >
                      <linearGradient
                        data-v-21f5376e=""
                        id="obch1e"
                        x1={0}
                        x2="100%"
                        y1={0}
                        y2={0}
                      >
                        <stop
                          data-v-21f5376e=""
                          offset="100%"
                          stopColor="#faad1d"
                        />
                        <stop
                          data-v-21f5376e=""
                          offset="100%"
                          stopColor="#d8d8d8"
                        />
                      </linearGradient>
                      <filter
                        data-v-21f5376e=""
                        id="dz1rih"
                        height="130%"
                        width="130%"
                        filterUnits="userSpaceOnUse"
                      >
                        <feGaussianBlur
                          data-v-21f5376e=""
                          stdDeviation={0}
                          result="coloredBlur"
                        />
                        <feMerge data-v-21f5376e="">
                          <feMergeNode data-v-21f5376e="" in="coloredBlur" />
                          <feMergeNode data-v-21f5376e="" in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#obch1e)"
                        stroke="#fff"
                        filter="url(#dz1rih)"
                      />
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#obch1e)"
                        stroke="#999"
                        strokeWidth={0}
                        strokeLinejoin="miter"
                      />
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#obch1e)"
                      />
                    </svg>
                  </span>
                  {/* Star 2 */}
                  <span
                    data-v-34cbeed1=""
                    className="vue-star-rating-star"
                    style={{ marginRight: 0 }}
                  >
                    <svg
                      data-v-21f5376e=""
                      data-v-34cbeed1=""
                      height={14}
                      width={14}
                      viewBox="0 0 14 14"
                      className="vue-star-rating-star"
                      step={10}
                    >
                      <linearGradient
                        data-v-21f5376e=""
                        id="ceakv6j"
                        x1={0}
                        x2="100%"
                        y1={0}
                        y2={0}
                      >
                        <stop
                          data-v-21f5376e=""
                          offset="100%"
                          stopColor="#faad1d"
                        />
                        <stop
                          data-v-21f5376e=""
                          offset="100%"
                          stopColor="#d8d8d8"
                        />
                      </linearGradient>
                      <filter
                        data-v-21f5376e=""
                        id="zicnqo"
                        height="130%"
                        width="130%"
                        filterUnits="userSpaceOnUse"
                      >
                        <feGaussianBlur
                          data-v-21f5376e=""
                          stdDeviation={0}
                          result="coloredBlur"
                        />
                        <feMerge data-v-21f5376e="">
                          <feMergeNode data-v-21f5376e="" in="coloredBlur" />
                          <feMergeNode data-v-21f5376e="" in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#ceakv6j)"
                        stroke="#fff"
                        filter="url(#zicnqo)"
                      />
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#ceakv6j)"
                        stroke="#999"
                        strokeWidth={0}
                        strokeLinejoin="miter"
                      />
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#ceakv6j)"
                      />
                    </svg>
                  </span>
                  {/* Star 3 */}
                  <span
                    data-v-34cbeed1=""
                    className="vue-star-rating-star"
                    style={{ marginRight: 0 }}
                  >
                    <svg
                      data-v-21f5376e=""
                      data-v-34cbeed1=""
                      height={14}
                      width={14}
                      viewBox="0 0 14 14"
                      className="vue-star-rating-star"
                      step={10}
                    >
                      <linearGradient
                        data-v-21f5376e=""
                        id="tyk07n"
                        x1={0}
                        x2="100%"
                        y1={0}
                        y2={0}
                      >
                        <stop
                          data-v-21f5376e=""
                          offset="100%"
                          stopColor="#faad1d"
                        />
                        <stop
                          data-v-21f5376e=""
                          offset="100%"
                          stopColor="#d8d8d8"
                        />
                      </linearGradient>
                      <filter
                        data-v-21f5376e=""
                        id="s2i7rr"
                        height="130%"
                        width="130%"
                        filterUnits="userSpaceOnUse"
                      >
                        <feGaussianBlur
                          data-v-21f5376e=""
                          stdDeviation={0}
                          result="coloredBlur"
                        />
                        <feMerge data-v-21f5376e="">
                          <feMergeNode data-v-21f5376e="" in="coloredBlur" />
                          <feMergeNode data-v-21f5376e="" in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#tyk07n)"
                        stroke="#fff"
                        filter="url(#s2i7rr)"
                      />
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#tyk07n)"
                        stroke="#999"
                        strokeWidth={0}
                        strokeLinejoin="miter"
                      />
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#tyk07n)"
                      />
                    </svg>
                  </span>
                  {/* Star 4 */}
                  <span
                    data-v-34cbeed1=""
                    className="vue-star-rating-star"
                    style={{ marginRight: 0 }}
                  >
                    <svg
                      data-v-21f5376e=""
                      data-v-34cbeed1=""
                      height={14}
                      width={14}
                      viewBox="0 0 14 14"
                      className="vue-star-rating-star"
                      step={10}
                    >
                      <linearGradient
                        data-v-21f5376e=""
                        id="pxzd3"
                        x1={0}
                        x2="100%"
                        y1={0}
                        y2={0}
                      >
                        <stop
                          data-v-21f5376e=""
                          offset="100%"
                          stopColor="#faad1d"
                        />
                        <stop
                          data-v-21f5376e=""
                          offset="100%"
                          stopColor="#d8d8d8"
                        />
                      </linearGradient>
                      <filter
                        data-v-21f5376e=""
                        id="dk9hs"
                        height="130%"
                        width="130%"
                        filterUnits="userSpaceOnUse"
                      >
                        <feGaussianBlur
                          data-v-21f5376e=""
                          stdDeviation={0}
                          result="coloredBlur"
                        />
                        <feMerge data-v-21f5376e="">
                          <feMergeNode data-v-21f5376e="" in="coloredBlur" />
                          <feMergeNode data-v-21f5376e="" in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#pxzd3)"
                        stroke="#fff"
                        filter="url(#dk9hs)"
                      />
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#pxzd3)"
                        stroke="#999"
                        strokeWidth={0}
                        strokeLinejoin="miter"
                      />
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#pxzd3)"
                      />
                    </svg>
                  </span>
                  {/* Star 5 */}
                  <span
                    data-v-34cbeed1=""
                    className="vue-star-rating-star"
                    style={{ marginRight: 0 }}
                  >
                    <svg
                      data-v-21f5376e=""
                      data-v-34cbeed1=""
                      height={14}
                      width={14}
                      viewBox="0 0 14 14"
                      className="vue-star-rating-star"
                      step={10}
                    >
                      <linearGradient
                        data-v-21f5376e=""
                        id="z8j06b"
                        x1={0}
                        x2="100%"
                        y1={0}
                        y2={0}
                      >
                        <stop
                          data-v-21f5376e=""
                          offset="30%"
                          stopColor="#faad1d"
                        />
                        <stop
                          data-v-21f5376e=""
                          offset="30%"
                          stopColor="#d8d8d8"
                        />
                      </linearGradient>
                      <filter
                        data-v-21f5376e=""
                        id="sntkak"
                        height="130%"
                        width="130%"
                        filterUnits="userSpaceOnUse"
                      >
                        <feGaussianBlur
                          data-v-21f5376e=""
                          stdDeviation={0}
                          result="coloredBlur"
                        />
                        <feMerge data-v-21f5376e="">
                          <feMergeNode data-v-21f5376e="" in="coloredBlur" />
                          <feMergeNode data-v-21f5376e="" in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#z8j06b)"
                        stroke="#fff"
                        filter="url(#sntkak)"
                      />
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#z8j06b)"
                        stroke="#999"
                        strokeWidth={0}
                        strokeLinejoin="miter"
                      />
                      <polygon
                        data-v-21f5376e=""
                        points="6.363636363636363,0.7070707070707071,2.121212121212121,14,12.727272727272727,5.515151515151515,0,5.515151515151515,10.606060606060606,14"
                        fill="url(#z8j06b)"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <span className="reviews-count">(1593)</span>
            </div>
          </div>
          <div className="rest-logo image-ratio ratio-square radius">
            <div className="ratio-content image-loading image-loaded">
              <img
                alt="restaurant.data.name"
                className="b-lazy"
                data-src="https://s3-eu-west-1.amazonaws.com/elmenusv5-stg/Thumbnail/15ecd61e-51fe-44be-9e09-46d6d6cd1f9e.jpg"
                src="https://s3-eu-west-1.amazonaws.com/elmenusv5-stg/Thumbnail/15ecd61e-51fe-44be-9e09-46d6d6cd1f9e.jpg"
                lazy="loaded"
              />
            </div>
          </div>
          <div className="main-data">
            <h3 className="card-title">
                {name}
            </h3>
            <ul className="cuisines-list h-dots-list truncate p-0 ">
              <li className="list-item ">American</li>
            </ul>
            <span title="staticContent.filters.onlinePayment">
              <span className="icon online-payment-icon">
                <IoMdCard />
              </span>
            </span>
          </div>
        </div>
        <div className="card-footer clickable-item">
          <span>
            <span className="icon">
              <TbTruckDelivery />
            </span>
            60 mins
          </span>
        </div>
      </div>
    </Link>
  
  </>)
}

// const resData = [
//   {
//     id: "res1",
//     resName: "Restaurant 1",
//     title: "buttermilk pancakes",

//     image:
//       "http://image.shutterstock.com/z/stock-vector-food-restaurant-logo-icon-264413183.jpg",
//     minCharge: "5.00 LE",
//     rating: "3",
//     titlMC: "foodCirclesMenuCat",
//     url_menucat:
//       "https://gist.github.com/omar94hamza/95723a43bb97f21567c99948c31dc7aa/raw/d09556d7f9591c9ac36d499a48c82d0012589a03/foodcirclesmenucat.json",
//     type: ["Chicken", "Meat"],
//     stars: 4,
//     fav: true,
//     mealImg: img1,
//     reviewsNum: 443,
//   },
//   {
//     id: "res2",
//     title: "diner double",
//     resName: "Restaurant 2",
//     image:
//       "http://image.shutterstock.com/z/stock-vector-food-restaurant-logo-icon-264413183.jpg",
//     minCharge: "10.00 LE",
//     rating: "4",
//     titlMC: "kfc",
//     url_menucat:
//       "https://gist.github.com/omar94hamza/5915e318a11a40f7a70e440804431e45/raw/9dfee086fc5f6734c7306c17e5fa97e3683df2d8/kfc.json",
//     type: ["Fast Food", "Chicken", "Sandwiches"],
//     stars: 3,
//     mealImg: img2,
//     reviewsNum: 1024,
//   },
//   {
//     id: "res3",
//     title: "godzilla milkshake",
//     resName: "Restaurant 3",
//     image:
//       "http://image.shutterstock.com/z/stock-vector-food-restaurant-logo-icon-264413183.jpg",
//     minCharge: "6.00 LE",
//     rating: "3",
//     titlMC: "dinwaredinesout",
//     url_menucat:
//       "https://gist.github.com/omar94hamza/00f1be36672b4b12cc3125cc5fb4dc90/raw/c6e6c32835d60ab030258b9c051e73a42aea58b6/dinwaredinesout.json",
//     type: ["Burgers", "Fast Food"],
//     stars: 5,
//     mealImg: img3,
//     reviewsNum: 326,
//   },
//   {
//     id: "res4",
//     title: "country delight",
//     resName: "Restaurant 4",
//     image:
//       "http://image.shutterstock.com/z/stock-vector-food-restaurant-logo-icon-264413183.jpg",
//     minCharge: "Free",
//     rating: "5",
//     titlMC: "windmills",
//     url_menucat:
//       "https://gist.github.com/omar94hamza/e01f92414a77f555fcd45255a961a9ba/raw/17ddf8c4e84e5d854084d06e5d8bfeec9bffa79d/windmills.json",
//     type: ["Grilled", "Oriental", "Sandwiches"],
//     stars: 2,
//     mealImg: img4,
//     reviewsNum: 547,
//   },
//   {
//     id: "res5",
//     title: "egg attack",
//     resName: "Restaurant 5",
//     image:
//       "http://image.shutterstock.com/z/stock-vector-food-restaurant-logo-icon-264413183.jpg",
//     minCharge: "7.00 LE",
//     rating: "2",
//     fav: true,
//     titlMC: "burgerking",
//     url_menucat:
//       "https://gist.github.com/omar94hamza/c1e7a0220547235c515e3b073bb4e7ff/raw/e122811cf463a8f47d90a5aa7407cc3998dbb21b/burgerking.json",
//     type: ["Burgers", "Fast Food"],
//     stars: 5,
//     mealImg: img5,
//     reviewsNum: 107,
//   },
//   {
//     id: "res6",
//     title: "oreo dream",
//     resName: "Restaurant 6",
//     image:
//       "http://image.shutterstock.com/z/stock-vector-food-restaurant-logo-icon-264413183.jpg",
//     minCharge: "16.00 LE",
//     rating: "4",
//     titlMC: "restaurant",
//     url_menucat:
//       "https://gist.github.com/omar94hamza/9725b018f68150d3e50d9c33ec8a3e93/raw/728fddef7356572f9bb8e7608909b542983d8fd3/restaurant.json",
//     type: ["Pizza"],
//     stars: 1,
//     mealImg: img6,
//     reviewsNum: 367,
//   },
//   {
//     id: "res7",
//     title: "bacon overflow",
//     resName: "Restaurant 7",
//     image:
//       "http://image.shutterstock.com/z/stock-vector-food-restaurant-logo-icon-264413183.jpg",
//     minCharge: "9 LE",
//     rating: "4",
//     titlMC: "restaurant",
//     url_menucat:
//       "https://gist.github.com/omar94hamza/9725b018f68150d3e50d9c33ec8a3e93/raw/728fddef7356572f9bb8e7608909b542983d8fd3/restaurant.json",
//     type: ["Pizza"],
//     stars: 1,
//     mealImg: img7,
//     reviewsNum: 1258,
//   },
//   {
//     id: "res8",
//     title: "american classic",
//     resName: "Restaurant 8",
//     image:
//       "http://image.shutterstock.com/z/stock-vector-food-restaurant-logo-icon-264413183.jpg",
//     minCharge: "22.00 LE",
//     rating: "4",
//     titlMC: "restaurant",
//     url_menucat:
//       "https://gist.github.com/omar94hamza/9725b018f68150d3e50d9c33ec8a3e93/raw/728fddef7356572f9bb8e7608909b542983d8fd3/restaurant.json",
//     type: ["Pizza"],
//     stars: 4,
//     mealImg: img8,
//     reviewsNum: 435,
//   },
//   {
//     id: "res9",
//     title: "quarantine buddy",
//     resName: "Restaurant 9",
//     image:
//       "http://image.shutterstock.com/z/stock-vector-food-restaurant-logo-icon-264413183.jpg",
//     minCharge: "38.00 LE",
//     rating: "4",
//     titlMC: "restaurant",
//     url_menucat:
//       "https://gist.github.com/omar94hamza/9725b018f68150d3e50d9c33ec8a3e93/raw/728fddef7356572f9bb8e7608909b542983d8fd3/restaurant.json",
//     type: ["Pizza"],
//     stars: 3,
//     fav: true,
//     mealImg: img9,
//     reviewsNum: 241,
//   },
// ];
