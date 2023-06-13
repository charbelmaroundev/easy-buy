import { Country, State } from "country-state-city";
import { useState } from "react";

const ShippingInfoComponent = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address,
  setAddress,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <div className="container px-0 py-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Shipping Address</h5>

          <form>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="fullName"
                defaultValue={user && user.name}
                required
                className="form-control"
                placeholder="Name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user && user.email}
                required
                className="form-control"
                placeholder="Email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                id="phoneNumber"
                required
                defaultValue={user && user.phoneNumber}
                className="form-control"
                placeholder="Phone Number"
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <select
                  id="country"
                  className="form-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Choose your country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-6">
                <select
                  id="city"
                  className="form-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Choose your City</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                id="address"
                required
                defaultValue={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                placeholder="Address"
              />
            </div>

            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setUserInfo(!userInfo)}
              >
                Choose From saved addresses
              </button>
            </div>

            {userInfo && (
              <div className="mt-5">
                {user &&
                  user.addresses.map((item, index) => {
                    const { _id, country, city, address } = item;
                    return (
                      <div
                        className="d-flex justify-content-between align-items-center"
                        key={index}
                      >
                        <input
                          type="radio"
                          className="form-check-input d-none"
                          name="savedAddress"
                          value={_id}
                          id={`addressRadio${index}`}
                          onClick={() =>
                            setCountry(country) ||
                            setCity(city) ||
                            setAddress(address) ||
                            setSelectedAddress(_id)
                          }
                        />
                        <label
                          htmlFor={`addressRadio${index}`}
                          className="form-check-label w-100"
                        >
                          <div
                            className={`${
                              selectedAddress === _id ? "border-primary" : ""
                            } card mb-2 border rounded`}
                          >
                            <div className="card-body d-flex justify-content-between">
                              <p className="card-title m-0">{country}</p>
                              <p className="card-subtitle text-muted m-0">
                                {city}
                              </p>
                              <p className="card-text">{address}</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    );
                  })}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export { ShippingInfoComponent };
