import React from 'react'

const Login = () => {
  return (
    <div>
        <div className="container">
            <div className="col-md-6">
                <h2 className="text-center my-4">Login</h2>
                <form method="post" className="login-form">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Login