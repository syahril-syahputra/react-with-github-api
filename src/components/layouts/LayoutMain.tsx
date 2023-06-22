import { ReactNode } from "react";
import Header from "@/components/base/Header";
import Footer from "../base/Footer";

interface PropsChild {
    children: ReactNode;
}
export default function LayoutMain(props: PropsChild) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="container py-4 flex-1">{props.children}</div>
            <Footer />
        </div>
    );
}
