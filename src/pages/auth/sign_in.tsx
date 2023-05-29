import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { useNavigate } from "react-router"
import { toast } from "react-toastify";
import { authenticateAccount } from "../../api";
import { Button } from "../../components";
import { Form } from "../../components/Form";
import { Input } from "../../components/";
import { APPNAME } from "../../config";
import { useForm } from "../../hooks/useForm";
import { useSessionStorage } from "../../hooks/useSession";

export default function SignIn() {
  const navigate = useNavigate()

  const { updateValue } = useSessionStorage(APPNAME);

  const pushToDashboard = () => navigate("/app/business")

  const { values, onChange } = useForm({
    email: "",
    password: "",
  });

  const { isLoading, mutateAsync } = useMutation(authenticateAccount, {
    cacheTime: Infinity,
    onSuccess(data) {
      const { token } = data.data;
      updateValue({ token, userData: data.data });
      pushToDashboard();
      window.location.reload();
    },
    onError(err: any) {
      const { message } = err.response?.data;
      toast.error(message);
    },
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = values
    await mutateAsync({ email, password });
  };

  return (
    <div className="h-screen fixed bg-slate-100 w-full">
      <div className="bg-white md:max-w-xl w-[90%]  mx-auto mt-10 shadow shadow-gray-300 rounded px-10 py-8 flex justify-center flex-col">
        <h3 className="text-xl font-semibold space-x-9 text-center mb-8">Login</h3>
        <Form onSubmit={onSubmit}>
          <Input
            showPassword={false}
            placeHolder="Email"
            type="email"
            name="email"
            onChange={onChange}
            value={values.email}
          />
          <Input
            showPassword={true}
            placeHolder="Password"
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
          <Button loading={isLoading} disabled={isLoading}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  )
}
