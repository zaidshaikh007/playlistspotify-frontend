import React from 'react';
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../services/formschema/FormSchema.ts"
import { userRegister } from "../services/ApiServices.ts"
import { Link } from "react-router";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
 
  const objForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      createPassword: '',
      confirmPassword: ''
    },
    resolver: yupResolver(registrationSchema)
  });

  const navigate = useNavigate();

  const onSubmit = async(data: any) => {
    try{
      let userData = await userRegister(data.firstName, data.lastName, data.email, data.createPassword, data.mobile);
      objForm.reset();
      toast.success("Registration Successfull");
      navigate("/login");
    }catch(e){
      console.log(e);
      toast.error("Registered Failed. Try Again.");
    }
  }

  return (
    <FormProvider {...objForm}>
      <div className="login">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign Up</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={objForm.handleSubmit(onSubmit)}>
              
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm/6 font-medium text-gray-900">First Name</label>
                </div>
                <div className="mt-2">
                  <input type="text" {...objForm.register("firstName")} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                {
                  objForm.formState.errors["firstName"]?.message &&
                  <span className="text-red-600 text-sm">{objForm.formState.errors["firstName"]?.message}</span>
                }
              </div>

              <div>
                <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-900">Last Name</label>
                </div>
                <div className="mt-2">
                  <input type="text" id="email" {...objForm.register("lastName")} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                {
                  objForm.formState.errors["email"]?.message &&
                  <span className="text-red-600 text-sm">{objForm.formState.errors["lastName"]?.message}</span>
                }
              </div>

              <div>
                <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-900">Email address</label>
                </div>
                <div className="mt-2">
                  <input type="email" id="email" {...objForm.register("email")} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                {
                  objForm.formState.errors["email"]?.message &&
                  <span className="text-red-600 text-sm">{objForm.formState.errors["email"]?.message}</span>
                }
              </div>

              <div>
                <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-900">Mobile No</label>
                </div>
                <div className="mt-2">
                  <input type="number" id="email" {...objForm.register("mobile")} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                {
                  objForm.formState.errors["mobile"]?.message &&
                  <span className="text-red-600 text-sm">{objForm.formState.errors["mobile"]?.message}</span>
                }
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                </div>
                <div className="mt-2">
                  <input type="password" {...objForm.register("createPassword")} id="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                {
                  objForm.formState.errors["createPassword"]?.message &&
                  <span className="text-red-600 text-sm">{objForm.formState.errors["createPassword"]?.message}</span>
                }
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                 </div>
                <div className="mt-2">
                  <input type="password" {...objForm.register("confirmPassword")} id="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                {
                  objForm.formState.errors["confirmPassword"]?.message &&
                  <span className="text-red-600 text-sm">{objForm.formState.errors["confirmPassword"]?.message}</span>
                }
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already Registered? 
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500"> Login Here</Link>
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default Registration;