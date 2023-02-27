import { useParams } from "react-router-dom";

export default function Video() {
  const { id } = useParams();

  return (
    <div>
      <h1>Video Details</h1>
      <h3>ID: {id}</h3>
    </div>
  );
}
