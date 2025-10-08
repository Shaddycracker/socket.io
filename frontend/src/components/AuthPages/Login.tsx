const Login = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <h4> Click Button to Login </h4>
            <button onClick={() => {
                localStorage.setItem("user", "true");
                window.location.href = "/dashboard";
            }}> Login </button>
        </div>
    )
}
export default Login