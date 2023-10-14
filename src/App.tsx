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
import { AuthProvider } from "./contexts/auth";
import useAuth from "./hooks/useAuth";

const Private = ({ Item }: any) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <Item /> : <LogIn />;
};

export function App() {
  return (
    <AuthProvider>
      <NewQueryProvider>
        <Routes>
          <Route path="/" element={<Private Item={NewQuery} />} />
          <Route path="/new-query" element={<Private Item={NewQuery} />} />
          <Route path="/query-result" element={<Private Item={QueryResult} />} />
          <Route path="/collections" element={<Private Item={Collections} />} />
          <Route path="/collections/:key" element={<Private Item={ViewCollection} />} />

          <Route path="/saved-queries" element={<Private Item={SavedQueries} />} />
          <Route path="/settings" element={<Private Item={Settings} />} />
          <Route path="/help" element={<Private Item={Help} />} />

          <Route path="/my-account" element={<Private Item={MyAccount} />} />

          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <GlobalStyle />
      </NewQueryProvider>
    </AuthProvider>
  );
}
