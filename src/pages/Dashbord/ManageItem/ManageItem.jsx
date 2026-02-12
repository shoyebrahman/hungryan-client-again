import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageItem = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxios();
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
      }
    });
  };
  return (
    <div>
      <SectionTitle
        heading={"Manage All Item"}
        subHeading={"Hurry Up"}
      ></SectionTitle>

      <div>
        <div className="overflow-x-auto w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={item._id}>
                  <td> {index + 1} </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{item.name}</td>
                  <td className=""> ${item.price} </td>
                  <td>
                    <Link to={`/dashbord/updateitem/${item._id}`}>
                      <button className="btn bg-green-400 hover:bg-orange-400 btn-sm text-white">
                        <FaEdit></FaEdit>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-ghost btn-lg text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItem;
