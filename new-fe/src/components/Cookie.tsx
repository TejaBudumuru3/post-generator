import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cookie = () => {
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const token = await cookieStore.get('token');
        console.log(token);

        if (!token || !token.value) {
          console.error('No token received');
          toast.error('Authentication failed: No token received');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          return;
        }

        await cookieStore.set("token", token.value);

        // Optional: Store in state management (Redux, Zustand, etc.)
        // dispatch(setAuthToken(token));
        console.log(token);
        console.log('✅ Token stored successfully');
        toast.success('Login successful! Redirecting...');

        setTimeout(() => {
          navigate('/home');
        }, 1000);

      } catch (error) {
        console.error('Error storing token:', error);
        toast.error('Failed to complete authentication');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <>
      <Toaster position="top-right" />
    </>
  )
}

export default Cookie