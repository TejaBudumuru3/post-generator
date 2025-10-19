import axios from "axios";
import { useEffect, useState } from "react"
// import { BACKEND_URL } from "../config";
const BACKEND_URL = "https://post-generator-2nqq.onrender.com"   
function NavBar() {
    const [token, settoken] = useState<CookieListItem | string | null>(null);
    const [Loading, setLoading] = useState(false)
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
                // Handle the fetched data here, for example log it or set state
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


        <nav className="border border-white z-200 flex justify-between top-8 sticky rounded-2xl p-4 items-cente   mx-32">
            <div className="flex justify-center">
                <img
                    src="/AppLogo.png"
                    alt="Logo"
                    className="h-10 w-auto object-contain"
                />
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
                    <button className="hover:text-white  cursor-pointer border  border-b-indigo-200 p-2 rounded-2xl">

                        Get started
                    </button>
                ) : (
                    <div>
                        Profile
                    </div>
                )}

            </div>
        </nav>
    )
}
export default NavBar