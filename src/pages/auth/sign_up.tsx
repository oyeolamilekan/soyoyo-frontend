import { Link } from "react-router-dom";
import { useForm } from "../../hooks";
import { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../api";
import { toast } from "react-toastify";
import { Input } from "../../components/";
import { Button } from "../../components";
import { Form } from "../../components/Form";

export default function SignUp() {

  const { values, onChange, resetValue } = useForm({
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  });

  const { isLoading, mutateAsync } = useMutation(createAccount, {
    cacheTime: Infinity,
    onSuccess({ message }) {
      toast.success(message)
      resetValue();
    },
    onError(err: any) {
      const { message } = err.response?.data;
      toast.error(message);
    },
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password, first_name, last_name } = values
    await mutateAsync({ email, password, first_name, last_name });
  };

  return (
    <div className="h-screen fixed bg-slate-100 w-full">
      <div className="bg-white md:max-w-xl w-[90%]  mx-auto mt-10 shadow shadow-gray-300 rounded px-10 py-8 flex justify-center flex-col">
        <h3 className="text-xl font-semibold space-x-9 text-center mb-8">Create account.</h3>
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
          <Input
            showPassword={false}
            placeHolder="First Name"
            type="text"
            name="first_name"
            onChange={onChange}
            value={values.first_name}
          />
          <Input
            showPassword={true}
            placeHolder="Last Name"
            type="text"
            name="last_name"
            onChange={onChange}
            value={values.last_name}
          />
          <Button loading={isLoading} disabled={isLoading}>
            Create Account
          </Button>
          <p className="mt-5 text-center">
            Have an account? <Link to="/app/sign_in" className="text-blue-300">Sign In</Link>
          </p>
        </Form>
      </div>
    </div>  
  )
}