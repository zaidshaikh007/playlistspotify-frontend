import React from 'react';
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../services/formschema/FormSchema.ts"
import { userLogin } from "../services/ApiServices.ts"
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const objForm = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginSchema)
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try{
      let userData = await userLogin(data.email, data.password)
      localStorage.setItem("token", userData.data.data);
      objForm.reset();
      toast.success("Login Successfull");
      setTimeout(() => {
        navigate("/dashboard");
      }, 200);
    }catch(e){
      console.log(e);
      toast.error("Invalid Credential");
    }
  }

  return (
    <FormProvider {...objForm}>
      <div className="login">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={objForm.handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm/6 font-medium text-gray-900">Email address</label>
                <div className="mt-2">
                  <input type="email" id="email" {...objForm.register("email")} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                {
                  objForm.formState.errors["email"]?.message &&
                  <span className="text-red-600 text-xl">{objForm.formState.errors["email"]?.message}</span>
                }
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                </div>
                <div className="mt-2">
                  <input type="password" {...objForm.register("password")} id="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                {
                  objForm.formState.errors["password"]?.message &&
                  <span className="text-red-600 text-xl">{objForm.formState.errors["password"]?.message}</span>
                }
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?
              <Link className="font-semibold text-indigo-600 hover:text-indigo-500" to="/signup">Register Here</Link>
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default Login;