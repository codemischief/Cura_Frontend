import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      {/* Add any public layout elements like header, footer, etc. */}
      <Outlet />
    </div>
  );
};

export default PublicLayout;
