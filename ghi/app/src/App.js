import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateCustomer from "./CreateCustomer";
import ListCustomers from "./ListCustomers";
import CreateSalesperson from "./CreateSalesperson";
import ListSalespeople from "./ListSalespeople";
import ListSales from "./ListSales";
import RecordNewSale from "./RecordNewSale";
import SalespersonHistory from "./SalespersonHistory";
import ManufacturersList from "./ManufacturersList";
import CreateManufacturer from "./CreateManufacturer";
import AddModel from "./AddModel";
import ListModels from "./ListModels";
import AddAutomobile from "./AddAutomobile";
import ListAutomobiles from "./ListAutomobiles";
import AddTechnician from "./AddTechnician";
import ListTechnicians from "./ListTechnicians";
import AddAppointment from "./AddAppointment";
import ListAppointments from "./ListAppointments";
import ServiceHistory from "./ServiceHistory";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="create-customer/" element={<CreateCustomer />} />
          <Route path="list-customers/" element={<ListCustomers />} />
          <Route path="create-salesperson/" element={<CreateSalesperson />} />
          <Route path="list-salespeople/" element={<ListSalespeople />} />
          <Route path="list-sales/" element={<ListSales />} />
          <Route path="record-new-sale/" element={<RecordNewSale />} />
          <Route path="salesperson-history/" element={<SalespersonHistory />} />
          <Route path="manufacturers/" element={<ManufacturersList />} />
          <Route path="create-manufacturer/" element={<CreateManufacturer />} />
          <Route path="add-model/" element={<AddModel />} />
          <Route path="list-models/" element={<ListModels />} />
          <Route path="add-automobile/" element={<AddAutomobile />} />
          <Route path="list-automobiles/" element={<ListAutomobiles />} />
          <Route path="add-technician/" element={<AddTechnician />} />
          <Route path="list-technicians/" element={<ListTechnicians />} />
          <Route path="add-appointment/" element={<AddAppointment />} />
          <Route path="list-appointments/" element={<ListAppointments />} />
          <Route path="service-history/" element={<ServiceHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
