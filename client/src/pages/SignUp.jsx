import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Button,
  Input,
  MainHeading,
  Subheading,
  WarningComponent,
} from "../components/index.js";
import { useForm } from "react-hook-form";
const SignUp = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  async function submitHandler(data) {
    try {
      const response = await axios.post(
        "http://localhost:3089/api/v1/user/signup",
        data,
      );
      reset();
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        navigate("/signin");
      } else {
        toast.error(message);
      }
    } catch (error) {
      reset();
      toast.error(error.response.data.message);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-sm mx-auto flex flex-col justify-center h-screen "
    >
      <div className="md:border md:p-4 md:border-gray-300 rounded-lg box-border p-2">
        <MainHeading text={"Sign Up"} />
        <Subheading text={"create your account here"} />
        <Input
          register={register}
          type="text"
          placeholder="firstName"
          label="firstName"
        />
        <Input
          register={register}
          type="text"
          placeholder="lastName"
          label="lastName"
        />
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
        <Button stretch={true} type="submit">
          Create Account
        </Button>
        <WarningComponent
          to={"/signin"}
          buttonText="Sign in"
          label="Already have an account?"
        />
      </div>
    </form>
  );
};

export default SignUp;
