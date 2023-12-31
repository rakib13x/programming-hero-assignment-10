import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AmdHero from "../../BrandHero/AmdHero";
import Footer from "../../Footer/Footer";

const AmdProductCard = ({ amd, setAmds, amds }) => {
  const { _id, name, image, brand, type, price, description, rating } = amd;
  const navigate = useNavigate();
  const handleAmdDetails = () => {
    navigate(`/amd-product-details/${amd._id}`);
  };
  const handleDelete = (_id) => {
    console.log("Deleting item with _id:", _id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://server-ip4el90bd-rakib13x-gmailcom.vercel.app/amd/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("Delete response:", data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              console.log("Item deleted successfully");

              // Filter out the deleted item and update state
              const remaining = amds.filter((amd) => amd._id !== _id);
              console.log("Remaining items:", remaining);
              setAmds(remaining);
            }
          });
      }
    });
  };

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 justify-center ">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={image} alt="Product" className="object-contain" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>
              {description.substring(0, 80)}{" "}
              <span className="text-red-500 font-bold">read more...</span>
            </p>

            <div className="card-actions justify-center">
              <button
                className="btn btn-active bg-green-600 text-white"
                onClick={handleAmdDetails}
              >
                Details
              </button>
              <Link to={`/updateAmd/${_id}`}>
                <button className="btn bg-green-600 text-white">Edit</button>
              </Link>
              <button
                className="btn bg-green-600 text-white"
                onClick={() => handleDelete(_id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmdProductCard;
