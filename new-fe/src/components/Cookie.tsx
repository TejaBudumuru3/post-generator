import { useEffect } from "react";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const Cookie = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
    useEffect(()=>{
     const handleAuthCallback = async() => {
      const token = searchParams.get('token');
      
      if (!token) {
        console.error('No token received');
        toast.error('Authentication failed: No token received');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }

      try {
        // Store token in localStorage
        await cookieStore.set("token",token)
        
        // Optional: Store in state management (Redux, Zustand, etc.)
        // dispatch(setAuthToken(token));
        
        console.log('✅ Token stored successfully');
        toast.success('Login successful! Redirecting...');
        
        // Redirect to dashboard after 1 second
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
  }, [searchParams, navigate]);

  return (
    <>
    <Toaster position="top-right"/>
    </>
  )
}

export default Cookie