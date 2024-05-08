import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";

function RichText({ body, handleBody}) {
  return (
    <div className="form-group">
      <ReactQuill
        value={body}
        placeholder="Write some amazing content..."
        onChange={handleBody}
      />
    </div>
  )
}

export default RichText