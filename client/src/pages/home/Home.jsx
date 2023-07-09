import Featured from "../../componenets/featured/Featured"
import FeaturedProperties from "../../componenets/featuredProperties/FeaturedProperties"
import Footer from "../../componenets/footer/Footer"
import Header from "../../componenets/header/Header"
import MailList from "../../componenets/mailList/MailList"
import Navbar from "../../componenets/navbar/Navbar"
import PropertyList from "../../componenets/propertyList/PropertyList"
import "./home.css"

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">Browse by property type</h1>
                <PropertyList />
                <h1 className="homeTitle">Homes guests love</h1>
                <FeaturedProperties />
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default Home;