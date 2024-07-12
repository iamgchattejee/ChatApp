import SearchInput from "./SearchInput";
import Conversations  from "./Conversations";
import { LogoutButton } from "./LogoutButton";
import { useAuthContext } from "../context/AuthContext";
export const Sidebar = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="border-r border-slate-500 p-5 flex flex-col">
      <span className='pl-4 pb-4 text-start sm:text-lg md:text-xl text-gray-200 font-semibold'>Welcome 👋 {authUser.fullName} ❄</span>{" "}
      <SearchInput/>
      <div className="divider"> </div>
      <Conversations />
      <LogoutButton/>
    </div> 
  );
};
