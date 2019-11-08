import PleaseSignIn from "../components/PleaseSignIn";
import UserAccount from "../components/UserAccount";

const UserAccountPage = props => (
  <div>
    <PleaseSignIn>
      <UserAccount />
    </PleaseSignIn>
  </div>
);

export default UserAccountPage;
