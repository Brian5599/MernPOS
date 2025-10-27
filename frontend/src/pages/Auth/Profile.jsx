import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link, Navigate, Outlet } from "react-router";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { useNavigate } from "react-router";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        alert("profile updated successfully");
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  return (
    <div className="container mx-auto p-4 mt-[1rem]">
      <div className="flex justify-center align-center md:flex md: space-x-4">
        <div className="md: w-1/3">
          <h2 className="text-2xl font-semibold mb-[4rem] ">Update Profile</h2>

          <form action="" onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="">USERNAME:</label>
              <input
                type="text"
                className="rounded-md w-full form-input p-4 border"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="">EMAIL:</label>
              <input
                type="email"
                className="rounded-md w-full form-input p-4 border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="">PASSWORD:</label>
              <input
                type="password"
                className="rounded-md w-full form-input p-4 border"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="">CONFIRMPASSWORD:</label>
              <input
                type="password"
                className="rounded-md w-full form-input p-4 border"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-600 text-white rounded-md  p-3 "
              type="submit"
            >
              Update
            </button>
            <Link
              to="/user-orders"
              className="bg-blue-600 text-white rounded-md p-3.5 ml-[14rem] mt-[1rem]"
            >
              My Orders
            </Link>
          </form>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
