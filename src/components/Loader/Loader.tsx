import { LineWave } from "react-loader-spinner";
function Loader() {
  return (
    <div className="flex h-screen justify-center items-center w-screen">
      <LineWave
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  );
}

export default Loader;
