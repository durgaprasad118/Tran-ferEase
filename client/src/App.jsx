import { RecoilRoot } from "recoil";
import Layout from "./Layout";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <RecoilRoot>
        <Layout />
        <Toaster
          toastOptions={{
            className: "py-3",
          }}
          expand={true}
          position="top-right"
          richColors
          closeButton
        ></Toaster>
      </RecoilRoot>
    </>
  );
}

export default App;
