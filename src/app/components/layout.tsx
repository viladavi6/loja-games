import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
                <main className="main-container">{children}</main> 
            <Footer />
        </>
    )
}
