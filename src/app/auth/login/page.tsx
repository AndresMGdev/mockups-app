'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from '@/components/Modal';

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('authUser') || '{}');
    if (userData && userData.email) {
      router.push('/product');
    }
  }, [router]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const userDataJson = localStorage.getItem(data.email);
    console.log(userDataJson);
  
    if (userDataJson) {
      const userData = JSON.parse(userDataJson);
  
      if (userData.password === data.password) {
        const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
        modal.showModal();
  
        setTimeout(() => {
          const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
          modal.close();
          console.log(userData.name + " You Are Successfully Logged In");
          localStorage.setItem('authUser', JSON.stringify(userData));
          router.push('/');
        }, 1500);
      } else {
        console.log("Email or Password is not matching with our record 2");
      }
    } else {
      console.log("Email or Password is not matching with our record 1");
    }
  };
  

  return (
    <>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="card-title">Login</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
              {errors.email && <span className="text-red-500">Email is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              {errors.password && <span className="text-red-500">Password is required</span>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>

      <Modal
        id="my_modal_5"
        title="You have logged in successfully!"
      />
    </>
  )
}
export default LoginPage;
