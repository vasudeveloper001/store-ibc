import { useDispatch, useSelector } from "react-redux"
import { Link, Route, Switch } from "react-router-dom"
import AccountSection from "../components/UserAccount/AccountSection.component"
import {
  AccountContainer,
  AccountInfo,
  AccountLinks,
} from "../components/UserAccount/Account.styles"
import Card from "../components/Card/Card.component"
import ResetPassword from "../components/UserAccount/ResetPassword.component"
import { useEffect } from "react"
import { getProfile } from "../redux/action-creators/user-action-creator"
import Message from "../components/Messages/Message.component"
import Loader from "../components/Loading/Loading.component"

const Account = ({ location, history }) => {
  const pathname = location.pathname
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loadingProfile, userDetails, errorProfile } = useSelector(
    (state) => state.userProfile
  )
  useEffect(() => {
    if (!userInfo) {
      history.push("/auth/sign-in")
    } else {
      if (!userDetails) {
        dispatch(getProfile("profile"))
      }
    }
  }, [dispatch, userDetails, userInfo, history])
  if (!userInfo) return <Loader />
  if (loadingProfile) return <Loader />
  if (errorProfile)
    return (
      <Message variant="error" width="100%" margin="0 auto">
        {errorProfile}
      </Message>
    )
  return (
    <AccountContainer>
      <aside>
        <AccountInfo>
          <img
            src={userDetails?.image}
            alt={userDetails?.name}
            width="96"
            className="avatar-img"
          />
          <h4 className="avatar-name">{userDetails?.name}</h4>
        </AccountInfo>
        <AccountLinks>
          <ul className="user-lists-menu">
            <li className="user-list-item">
              <Link
                to="/user/account"
                className={`user-link-item ${
                  pathname === "/user/account" ? "active" : ""
                }`}
              >
                My Account
              </Link>
            </li>
            <li className="user-list-item">
              <Link
                to="/user/orders"
                className={`user-link-item ${
                  pathname === "/user/orders" ? "active" : ""
                }`}
              >
                My Orders
              </Link>
            </li>
            <li className="user-list-item">
              <Link
                to="/user/cart"
                className={`user-link-item ${
                  pathname === "/user/cart" ? "active" : ""
                }`}
              >
                My Cart
              </Link>
            </li>
            <li className="user-list-item">
              <Link
                to="/user/wishlist"
                className={`user-link-item ${
                  pathname === "/user/wishlist" ? "active" : ""
                }`}
              >
                My Wishlist
              </Link>
            </li>
            <li className="user-list-item">
              <Link
                to="/user/reset"
                className={`user-link-item ${
                  pathname === "/user/reset" ? "active" : ""
                }`}
              >
                Change Password
              </Link>
            </li>
          </ul>
        </AccountLinks>
      </aside>
      <Card className="dashboard-area">
        <h1 className="dashboard-heading">
          {pathname === "/user/reset"
            ? "Change Password"
            : `My ${pathname.split("/")[2]}`}
        </h1>
        <Switch>
          <Route path="/user/account" component={AccountSection} />
          <Route path="/user/reset" component={ResetPassword} />
        </Switch>
      </Card>
    </AccountContainer>
  )
}

export default Account