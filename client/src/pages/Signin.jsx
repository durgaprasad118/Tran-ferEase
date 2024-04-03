import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import {
  Button,
  Input,
  MainHeading,
  Subheading,
  WarningComponent,
} from "../components/index.js";
import { tokenAtom } from "../store/atoms.js";
import { useForm } from "react-hook-form";
const Signin = () => {
  const { register, handleSubmit, reset } = useForm();
  const setToken = useSetRecoilState(tokenAtom);
  const navigate = useNavigate();
  async function submitHandler(data) {
    try {
      const response = await axios.post(
        "http://localhost:3089/api/v1/user/signin",
        data,
      );
      reset();
      const { success, token, message } = response.data;
      if (success && token) {
        localStorage.setItem("token", token);
        setToken(token);
        toast.success(message);
        navigate("/dash");
      } else {
        toast.error(message);
        reset();
      }
    } catch (error) {
      reset();
      toast.error(error.response.data.message);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-sm mx-auto flex flex-col justify-center h-screen  "
    >
      <div className="md:border md:p-4 md:border-gray-300 rounded-lg box-border p-2">
        <MainHeading text={"Sign In"} />
        <Subheading text={"Accesss your account here"} />
        <Input
          register={register}
          type="email"
          placeholder="xyz@gmail.com"
          label="username"
        />
        <Input
          register={register}
          type="password"
          placeholder="*****"
          label="password"
        />
        <Button type="submit" stretch={true}>
          Sign In
        </Button>
        <WarningComponent
          to={"/signup"}
          buttonText="Sign up"
          label="Don't have an account?"
        />
      </div>
    </form>
  );
};

export default Signin;
