import useAuth from '../hook/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hook/useAxiosPublic';
import useTheme from '../../theme/hook/useTheme';

const SocialLogin = () => {

  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle()
      const user = data?.user;
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        uid: user?.uid,
        role: 'User',
        image: user?.photoURL,
      };

      const response = await axiosPublic.post("/users", userInfo);
      if (response.data.insertedId) {
        toast.success("Data Save Successful!");
        navigate("/");
      }

      toast.success('Login Successful');
      navigate("/");
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  };

  const { theme } = useTheme();

  return (
    <div className='justify-center items-center space-x-2 cursor-pointer w-80 max-w-screen-lg sm:w-96' >
      <button onClick={handleGoogleSignIn} className={`w-full py-2 rounded-lg border flex gap-2 items-center justify-center mt-6 ${theme === "black" ? "bg-black text-white hover:bg-white hover:text-black border-white": "bg-white hover:text-white text-black hover:bg-black border-black"}`} fullWidth>
        <img src="https://docs.material-tailwind.com/icons/google.svg" alt="google" className="h-4 w-4" />
        Sign in with Google
      </button>
      <div className="my-4 flex items-center gap-2">
        <span className="h-[1px] w-1/2" />
        <p variant="small" color="blue-gray">
          Or
        </p>
        <span className="h-[1px] w-1/2" />
      </div>
    </div>
  );
};

export default SocialLogin;