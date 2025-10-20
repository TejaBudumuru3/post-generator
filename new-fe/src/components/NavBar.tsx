import axios from "axios";
import { useEffect, useState } from "react"
// import { BACKEND_URL } from "../config";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function NavBar() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const fetchToken = async () => {
            setLoading(true);
            try {
                const tokenValue = typeof cookieStore !== "undefined" ? await cookieStore.get('token') : null;

                if (tokenValue && tokenValue.value) {
                    try {
                        await axios.get(`${BACKEND_URL}/user/getDetails`, {
                            headers: {
                                Authorization: `Bearer ${tokenValue.value}`
                            }
                        });
                        if (isMounted) {
                            setIsAuthenticated(true);
                            console.log({ message: "Data fetched successfully" });
                        }
                    } catch (e) {
                        console.error(e);
                        if (isMounted) setIsAuthenticated(false);
                    }
                } else {
                    if (isMounted) setIsAuthenticated(false);
                }
            } catch (err) {
                console.error(`server error from Navbar ${err}`);
                if (isMounted) setIsAuthenticated(false);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchToken();
        return () => {
            isMounted = false;
        };
    }, []);

    return (

        <nav className="sticky top-2 flex justify-between rounded-2xl p-4 items-center sm:m-4 mx-4 sm:mx-8 lg:mx-32 text-white z-1000 bg-blue bg-blend-saturation bg-transparent backdrop-blur">
            <div className="flex justify-center font-extrabold ">
                PostGen
            </div>
            <div className="hidden lg:block">
                <ul className="flex gap-10 font-bold">
                    <li>Home</li>
                    <li>Features</li>
                    <li>About Us</li>
                </ul>
            </div>
            <div>
                {loading ? (
                    <span className="inline-block px-4 py-2 rounded-2xl opacity-70 animate-pulse">Loading...</span>
                ) : !isAuthenticated ? (
                    <button onClick={() => {
                        navigate("/Login")
                    }} className="hover:text-white cursor-pointer border border-b-indigo-200 p-2 rounded-2xl font-bold">
                        Get started
                    </button>
                ) : (
                    <div className="border border-amber-50 px-4 rounded-xl">
                        <div className="relative group inline-block">
                            <button
                                type="button"
                                className="px-3 py-2 rounded-lg hover:bg-white/10"
                            >
                                Profile
                            </button>

                            <div className="absolute right-0 top-full w-44 rounded-xl border border-white/20 bg-gray-900/90 backdrop-blur shadow-lg hidden group-hover:block group-focus-within:block z-50">
                                <ul className="py-2 text-sm">
                                    <li>
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-white/10 text-red-300"
                                            onMouseDown={async () => {
                                                try {
                                                    await cookieStore.delete("token");
                                                    toast.success("Logout Succesfull")
                                                } catch { }
                                                setIsAuthenticated(false);
                                                navigate("/Login");
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
export default NavBar