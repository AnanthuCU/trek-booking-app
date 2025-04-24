"use client";

import { Provider } from "react-redux";
import { store } from "@/store"; // Ensure correct path alias
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div className="mainContainer">
            <div className="navbarContainer">
              <Navbar />
            </div>

            <div className="childrenContainer">
              <main>{children}</main>
            </div>

            <div className="footerContainer">
              <Footer />
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
