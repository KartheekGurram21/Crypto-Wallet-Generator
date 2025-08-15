import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Layout() {
    const location = useLocation();

    useEffect(() => {
        const headerEl = document.getElementById("site-header");
        if (headerEl) {
            headerEl.scrollIntoView({ behavior: "smooth" });
        }
    }, [location.pathname]);

    return (
        <div>
            <Header id="site-header" />
            <Outlet />
            <Footer />
        </div>
    );
}