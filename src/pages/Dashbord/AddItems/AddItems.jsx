import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const image_api_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_api_key}`;
const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxios();
  const onSubmit = async (data) => {
    console.log(data);
    //image upload
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      //send menuitem in the database
      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        //show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} Your item has been saved`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <SectionTitle
        heading={"add an item"}
        subHeading={"what's new?"}
      ></SectionTitle>
      <div className="w-full my-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Recipe name?</legend>
              <input
                {...register("name", { required: true })}
                type="text"
                className="input"
                placeholder="Recipe Name"
              />
            </fieldset>
          </div>

          <div className="flex">
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Category</legend>
                <select
                  {...register("category", { required: true })}
                  defaultValue="default"
                  className="select select-bordered w-full  appearance-none"
                >
                  <option disabled={true} defaultValue="default">
                    Chose category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="dessert">Dessert</option>
                  <option value="drinks">Drinks</option>
                </select>
              </fieldset>
            </div>

            <div className="ml-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Price</legend>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  className="input"
                  placeholder="Price"
                />
              </fieldset>
            </div>
          </div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Recipe Details</legend>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea h-24"
              placeholder="Bio"
            ></textarea>
          </fieldset>
          <div>
            <legend className="fieldset-legend">Enter Image</legend>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input"
            />
          </div>

          <button className="btn mt-4 ">
            Add Item <FaUtensils className="ml-4"></FaUtensils>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
