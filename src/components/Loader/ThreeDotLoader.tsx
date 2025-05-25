import { ThreeDots } from "react-loader-spinner";

function ThreeDotLoader() {
  return (
    <div className="flex justify-center items-center h-5 w-5">
      <ThreeDots
        visible={true}
        height="24"
        width="24"
        color="#ffffff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default ThreeDotLoader;
