import React, { useState } from "react";
import { useSelector } from "react-redux";

import { HeaderComponent } from "../components/Layout";
import {
  ProfileContentComponent,
  ProfileSideBarComponent,
} from "../components/Profile";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <>
      <HeaderComponent activeHeading={4} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-1 col-md-3 p-0">
            <ProfileSideBarComponent active={active} setActive={setActive} />
          </div>
          <div className="col-9 p-0">
            <ProfileContentComponent active={active} />
          </div>
        </div>
      </div>
    </>
  );
};

export { ProfilePage };
