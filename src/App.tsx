import "antd/dist/antd";
import { Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import { NewQuery } from "./pages/NewQuery";
import { NewQueryProvider } from "./hooks/NewQueryContext";
import { QueryResult } from "./pages/QueryResult";
import { Collections } from "./pages/Collections";
import { Settings } from "./pages/Settings";
import { SavedQueries } from "./pages/SavedQueries";
import { Help } from "./pages/Help";
import { LogIn } from "./pages/LogIn";
import { Register } from "./pages/Register";
import { ViewCollection } from "./pages/ViewCollection";
import { MyAccount } from "./pages/MyAccount";

export function App() {
  return (
    <NewQueryProvider>
      <Routes>
        <Route path="/" element={<NewQuery />} />
        <Route path="/query-result" element={<QueryResult />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:key" element={<ViewCollection />} />

        <Route path="/saved-queries" element={<SavedQueries />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />

        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
      <GlobalStyle />
    </NewQueryProvider>
  );
}
