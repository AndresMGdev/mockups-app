"use client"

import { useInput } from "@/hooks/useInput";

const LoginPage = () => {


  const emailInput = useInput('email');
  const passwordInput = useInput('password');

  return (
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
        <h2 className="card-title">Login</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input {...emailInput} type="email" placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input {...passwordInput} type="password" placeholder="password" className="input input-bordered" required />
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
  )
}
export default LoginPage;
