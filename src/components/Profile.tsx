import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();

  return (
    <div>
      <h1>User Profile</h1>
      <h3>ID: {id}</h3>
    </div>
  );
}
