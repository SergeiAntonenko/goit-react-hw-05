import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <Link to={"/"}>Go Home</Link>
      <div>Page not found</div>
    </>
  );
};

export default NotFoundPage;
