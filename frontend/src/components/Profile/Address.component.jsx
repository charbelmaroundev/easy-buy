import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatUserAddress, deleteUserAddress } from "../../redux/actions/user";
import { Country, State } from "country-state-city";

const AddressComponent = () => {
  const [open, setOpen] = useState(true);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(updatUserAddress(country, city, address));
      setOpen(false);
      setCountry("");
      setAddress("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="container p-0 ps-4">
      {open && (
        <div className="">
          <div className="bg-white">
            <h2 className="text-center mb-4">New Address</h2>
            <div className="w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="">
                  <div className="mb-2">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Country</option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <select
                      disabled={!country}
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="form-select"
                    >
                      <option disabled value="">
                        City
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <input
                      type="address"
                      className="form-control"
                      required
                      value={address}
                      placeholder="Address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  {/* Other input fields */}
                  <div className="mb-2">
                    <button
                      type="submit"
                      className="btn btn-primary mt-2 w-100"
                      required
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        {user.addresses && user.addresses.length > 0 ? (
          user.addresses.map((item, index) => (
            <div className="card mb-2" key={index}>
              <div className="card-body px-3 py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className=" h5 font-weight-bold mb-0">{item.city}</h3>

                  <p className=" ext-muted mb-1">{`${item.country}`}</p>
                  <p className=" text-muted mb-0">{`${item.address}`}</p>
                  <div className="">
                    <AiOutlineDelete
                      className="px-1 cursor-pointer"
                      onClick={() => handleDelete(item)}
                      size={25}
                      color="red"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center mt-8">
            You do not have any saved addresses!
          </h5>
        )}
      </div>
    </div>
  );
};

export { AddressComponent };
