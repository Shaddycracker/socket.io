import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
const Navbar = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    return (
        <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-around' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '1rem' }}>
                <li ><Link style={{ margin: 0, color: '#333' }} to="/dashboard">Home</Link></li>
                <li ><Link style={{ margin: 0, color: '#333' }} to="/about">About</Link></li>
                <li ></li>
                <li ></li>
                {
                    user ? (
                        <>
                            <li>user:Incognito</li>
                            <li ><button style={{ margin: 0, color: '#333' }} onClick={() => { localStorage.clear(); setUser(null); navigate('/') }}>Logout</button></li>
                        </>
                    ) : (
                        <li ><Link style={{ margin: 0, color: '#333' }} to="/login">Login</Link></li>
                    )
                }
            </ul>
        </nav>
    )
}
export default Navbar