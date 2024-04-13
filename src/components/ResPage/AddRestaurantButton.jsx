import { Form } from "react-bootstrap";
import AddIcon from "../../Icons/AddIcon";
import CustomModal from "../Prototypes/CustomModal";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSignal } from "@preact/signals-react";
import LeafletMap from "./../Map/LeafletMap";
import { Button } from "reactstrap";
import { convertBase64 } from "../../Globals";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../Data/apiclient";

export default function AddRestaurantButton() {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const queryClient = useQueryClient();
  const ShowSignal = useSignal();
  const currentLocation = useSignal();
  const showMap = useSignal(false);
  const showCategoryInput = useSignal(false);
  const myMapBtn = useSignal(true);
  const myCategoryBtn = useSignal(true);

  function handleMap() {
    showMap.value = !showMap.value;
    myMapBtn.value = !myMapBtn.value;
  }
  function handleCategory() {
    showCategoryInput.value = !showCategoryInput.value;
    myCategoryBtn.value = !myCategoryBtn.value;
  }

  const m = useMutation({
    mutationKey: [],
    // cacheTime: 600000,
    // onSuccess: onSuccess,
    // onError: onError,
    mutationFn: async (params) => {
      console.log("trying to load");
      let url = "/Addresturant";
      console.log("posting to ", url);
      return await apiClient.post(url, params);
    },
  });

  async function submit(data) {
    // console.log("submit! ADD RESTAURANT", data);
    let resImg64;
    let resBanner64;
    data.location = currentLocation.value;
    if (data.resImg[0]) resImg64 = await convertBase64(data.resImg[0]);
    if (data.resBanner[0]) resBanner64 = await convertBase64(data.resBanner[0]);

    if (resImg64) data.resImg = resImg64;
    if (resBanner64) data.resBanner = resBanner64;

    console.log("NEW DATA", data);

    const ret = await m.mutateAsync(data);
    //Handle add restaurant logic herea

    if (ret) {
      ShowSignal.value = false;
      queryClient.invalidateQueries(["getAllresturant"]);
      queryClient.refetchQueries(["getAllresturant"]);
      reset();
    }
  }

  return (
    <>
      <CustomModal
        ButtonText={<AddIcon />}
        Show={ShowSignal}
        Header={"Add new restaurant"}
        submit={() => {
          !m.isLoading && handleSubmit(submit)();
        }}
        onCancel={() => {
          ShowSignal.value = false;
        }}
      >
        <>
          <Form>
            <Row>
              <Col sm={12}>
                <Form.Group className="mb-2 mb-sm-0">
                  <Form.Label>Search user</Form.Label>
                  <Form.Control
                    type="text"
                    name="search-user"
                    placeholder="Search User"
                    {...register("search-user", {
                      // required: "Please enter user name to search",
                    })}
                  />
                  <span className="error" style={{ color: "red" }}>
                    {errors["search-user"] && errors["search-user"].message}
                  </span>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-2 mb-sm-0">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ResName"
                    placeholder="Restaurant Name"
                    {...register("ResName", {
                      required: "Please add restaurant name",
                    })}
                  />
                  <span className="error" style={{ color: "red" }}>
                    {errors["ResName"] && errors["ResName"].message}
                  </span>
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={null}
                    {...register("Category", {
                      required: "Please select a category",
                    })}
                  >
                    <option disabled>Please Select ...</option>
                    <option value="American">American</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Desserts">Desserts</option>
                  </Form.Select>
                  <span className="error" style={{ color: "red" }}>
                    {errors["Category"] && errors["Category"].message}
                  </span>
                </Form.Group>
              </Col>
              {/* category btn */}
              <div className="col-sm-12 col-md-3 d-flex justify-content-center align-items-end">
                <Button
                  className={`${
                    myCategoryBtn.value
                      ? "bg-primary  w-100 mt-3"
                      : "bg-danger w-100 mt-3"
                  }`}
                  onClick={handleCategory}
                >
                  {myCategoryBtn.value
                    ? "Add new category"
                    : "Add new category"}
                </Button>
              </div>
              {showCategoryInput.value && (
                <Col sm={10} className="d-flex justify-content-center">
                  <Form.Control
                    className="mt-3 mb-3 bg-warning"
                    type="text"
                    placeholder="Add new category"
                  />
                </Col>
              )}
              {showCategoryInput.value && (
                <div className="form-group col-sm-12 col-md-2 d-flex justify-content-center align-items-end">
                  <Button className="w-100">Submit</Button>
                </div>
              )}
              <Col sm={6}>
                <Form.Group className="mb-2 mb-sm-0">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="resImg"
                    placeholder="Restaurant Image "
                    {...register("resImg", {
                      required: "Please add restaurant Image",
                    })}
                  />
                  <span className="error" style={{ color: "red" }}>
                    {errors["resImg"] && errors["resImg"].message}
                  </span>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-2 mb-sm-0">
                  <Form.Label>Banner</Form.Label>
                  <Form.Control
                    type="file"
                    name="resBanner"
                    placeholder="Restaurant Banner"
                    {...register("resBanner", {
                      required: "Please add restaurant Banner",
                    })}
                  />
                  <span className="error" style={{ color: "red" }}>
                    {errors["resBanner"] && errors["resBanner"].message}
                  </span>
                </Form.Group>
              </Col>
              <div className="form-group col-md-10">
                <label htmlFor="location">Location</label>
                <input
                  {...register("location", {
                    minLength: {
                      value: 3,
                      message: "Location must have at least 3 characters",
                    },
                  })}
                  type="text"
                  className="form-control"
                  id="location"
                  value={currentLocation}
                  placeholder="Location"
                />
                {errors.location && (
                  <span className="text-danger font-weight-bold">
                    {errors.location.message}
                  </span>
                )}
              </div>
              {/* map btn */}
              <div className="form-group col-sm-12 col-md-2 d-flex justify-content-center align-items-end">
                <Button
                  className={`${
                    myMapBtn.value ? "bg-primary  w-100" : " bg-danger w-100"
                  }`}
                  onClick={handleMap}
                >
                  {myMapBtn.value ? "Open Map" : "Close Map"}
                </Button>
              </div>
              {showMap.value == true && (
                <Col sm={12}>
                  <div>
                    <LeafletMap currentLocation={currentLocation} />
                  </div>
                </Col>
              )}
            </Row>
          </Form>
        </>
      </CustomModal>
    </>
  );
}
