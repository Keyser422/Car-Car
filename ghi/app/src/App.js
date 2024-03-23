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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
