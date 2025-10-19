import axios from "axios";
import { useEffect, useState } from "react"
// import { BACKEND_URL } from "../config";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";
function NavBar() {
    const [token, settoken] = useState<CookieListItem | string | null>(null);
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true)
        const fetchToken = async () => {
            const tokenValue = await cookieStore.get('token');
            settoken(tokenValue)

            if (tokenValue && tokenValue.value) {
                const data = await axios.get(`${BACKEND_URL}/user/getDetails`, {
                    headers: {
                        Authorization: `Bearer ${tokenValue.value}`
                    }
                });
                console.log({
                    message: "Data Fetched successfully",
                    data: data
                });
                settoken(data.data)
                setLoading(false)
            }

            return;
        }

        fetchToken();
    }, []);
    return (

        <nav className="sticky   top-2 flex justify-between border border-white rounded-2xl p-4 items-center m-8 mx-32 text-white" >
            <div className="flex justify-center font-bold">
                {/* <img
                    src="https://via.placeholder.com/150x50/4F46E5/ffffff?text=Logo"
                    alt="Logo"
                    className="h-10 w-auto object-contain"
                /> */}
                GenPost
            </div>
            <div className="">
                <ul className="flex felx-col  gap-10">
                    <li>
                        Home

                    </li>
                    <li>
                        Image
                    </li>
                    <li>
                        About us

                    </li>
                </ul>
            </div>
            <div>
                {token ? (
                    <button onClick={() => {
                        navigate("/Login")
                    }} className="hover:text-white  cursor-pointer border  border-b-indigo-200 p-2 rounded-2xl">
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
                                                } catch { }
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