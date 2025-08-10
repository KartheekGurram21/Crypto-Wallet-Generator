import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { BlockchainProvider } from "../context/BlockchainContext";

export default function Layout() {

    return (
        <div>
            <Header />
            <BlockchainProvider>
                <Outlet />
            </BlockchainProvider>
            <Footer />
        </div>
    );
}