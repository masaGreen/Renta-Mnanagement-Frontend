import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UnitsList from "./components/units/UnitsList"
import RegisterUnit from "./components/units/RegisterUnit"
import UpdateStatus from "./components/units/UpdateStatus"
import Units from "./pages/Units"
import Dashboard from "./components/Dashboard"
import TenantsList from "./components/tenants/TenantsList"
import RegisterTenant from "./components/tenants/RegisterTenant"
import UpdatePaymentStatus from "./components/tenants/UpdatePaymentStatus"
import Tenants from "./pages/Tenants"
import UtilitiesList from "./components/utilities/UtilitieList"
import RegisterUtlitity from "./components/utilities/RegisterUtility"
import Utilities from "./pages/Utilities"
import Notfound from "./pages/Notfound"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Downloads from "./pages/Downloads"
import Landing from "./pages/Landing"
import UserApproval from "./pages/UserApproval"
import AdminPanel from "./components/Users/AdminPanel"
import ChangePassword from "./components/Users/ChangePassword"
import Users from "./components/Users/Users"
import { useAppContext } from "./contextApi/AppContext"





function App() {
  const { auth } = useAppContext()
  const userRole = localStorage.getItem("role")
  return (

    <div className=" bg-gray-200 relative ">

      <Routes>
        <Route path={"/signup"} element={<Signup />}></Route>
        <Route path={"/login"} element={<Login />}></Route>

        <Route path={"/"} element={auth ? <Home /> : <Login />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Landing />} />
            <Route path="/adminPanel" element={userRole === "ADMIN" ? <AdminPanel /> : <ChangePassword />}>
              <Route path="" element={<Users />} />
              <Route path="approveUser" element={<UserApproval />} />
              <Route path="changePassword" element={<ChangePassword />} />
            </Route>
            <Route path="downloads" element={<Downloads />} />
            <Route path="units" element={<Units />}>
              <Route path="" element={<UnitsList />} />
              <Route path="registerunit" element={<RegisterUnit />} />
              <Route path="updatestatus" element={<UpdateStatus />}></Route>
            </Route>
            <Route path="tenants" element={<Tenants />}>
              <Route path="" element={<TenantsList />}></Route>
              <Route path="registertenant" element={<RegisterTenant />}></Route>
              <Route path="updatepaymentstatus" element={<UpdatePaymentStatus />}></Route>
            </Route>
            <Route path="utilities" element={<Utilities />}>
              <Route path="" element={<UtilitiesList />}></Route>
              <Route path="registerutility" element={<RegisterUtlitity />}></Route>
            </Route>


          </Route>

        </Route>
        <Route path="*" element={<Notfound />} />

      </Routes>

    </div>


  )
}

export default App
