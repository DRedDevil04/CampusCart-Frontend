import Profile from "../components/Profile";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
const ProfilePage = ({onOpen,isOpen,onClose,btnRef}) => {
  return (
    <>
    <Header onOpen={onOpen} />
    <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    <Profile />
    </>
  )
}

export default ProfilePage