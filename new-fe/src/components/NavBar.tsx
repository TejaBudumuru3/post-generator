import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

function navBar() {
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


        <nav className=" realtive flex justify-between border border-b-black rounded-2xl p-4 items-cente m-8  mx-32">
            <div className="flex justify-center">
                <img
                    src="https://via.placeholder.com/150x50/4F46E5/ffffff?text=Logo"
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
export default navBar