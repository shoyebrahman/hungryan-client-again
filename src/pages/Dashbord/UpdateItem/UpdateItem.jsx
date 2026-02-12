import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const image_api_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_api_key}`;

const UpdateItem = () => {
  const { name, category, recipe, price, _id } = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxios();
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
    try {
      let imageUrl;

      // 1️⃣ Upload image ONLY if user selected one
      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const imgRes = await axiosPublic.post(image_hosting_api, formData);

        if (imgRes.data.success) {
          imageUrl = imgRes.data.data.display_url;
        }
      }

      // 2️⃣ Build update object dynamically
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
      };

      // 3️⃣ Add image ONLY if new image exists
      if (imageUrl) {
        menuItem.image = imageUrl;
      }

      // 4️⃣ Update database
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);

      if (menuRes.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Item updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div>
      <SectionTitle
        heading={"update item"}
        subHeading={"refresh item"}
      ></SectionTitle>
      <div>
        <div className="w-full my-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Recipe name?</legend>
                <input
                  {...register("name")}
                  defaultValue={name}
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
                    {...register("category")}
                    defaultValue={category}
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
                    {...register("price")}
                    defaultValue={price}
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
                {...register("recipe")}
                defaultValue={recipe}
                className="textarea h-24"
                placeholder="Bio"
              ></textarea>
            </fieldset>
            <div>
              <legend className="fieldset-legend">Enter Image</legend>
              <input
                {...register("image")}
                type="file"
                className="file-input"
              />
            </div>

            <button className="btn mt-4 ">update item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
