import { Link } from "react-router-dom";

const Sell = () => {

    return (
        <div>
            <div className="container p-5">
                <div className="row">
                    <div className="col-8">
                            <h1>Sell with a partner agent</h1>
                            <p>Zillow helps you sell your home, your way. Easily explore your selling options 
                                below and get personalized market value estimates — we can even help you choose 
                                the best option when youre ready.
                                This experience is currently available in 45 markets across Arizona, Colorado, 
                                Florida, Georgia, Indiana, Kansas, Massachusetts, Michigan, Minnesota, Missouri, 
                                Nevada, New Jersey, New Mexico, New York, North Carolina, Ohio, Oklahoma, Oregon, 
                                South Carolina, Tennessee, Texas, Utah, and Washington DC. Click here to see if 
                                it's available in your city.</p>
                    </div>
                </div>
            </div>
            <div className="container p-5">
                <div className="row">
                    <div className="col-8">
                            <h1>Sell your home yourself</h1>
                            <p> Deciding to sell your home yourself is referred to as for-sale-by-owner (FSBO). 
                                The FSBO process is similar to traditional selling, but without the help of a 
                                real estate agent. In this case, you’re responsible for the home prep, marketing, 
                                showings, and negotiations.</p>
                    </div>

                </div>
                <div className="row">
                    <div className="col-4">
                        <Link to="/sell_home" className="btn btn-primary">
                            Post your home for sale
                        </Link>
                    </div>
                </div>
                <br />
                <div className="row">
                    <a href="#" className="link">Learn more about FSBO</a>
                </div>
                <br />
                <div className="row">
                    <div className="col-4">
                        <h3>Why Sell</h3>
                        <ul>
                            <li>
                                <p>Avoid paying a listing agent commission</p>
                            </li>
                            <li>
                                <p>Advertise your listing for free on Zillow</p>
                            </li>
                            <li>
                                <p>Flexibility and control from start to finish</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-4">
                        <h3>How to Sell</h3>
                        <p>When selling yourself, start with home prep, staging, and hiring a professional 
                            photographer. Once your marketing materials are ready, research comparable homes 
                            to help price your home. Then, list on Zillow. You’ll likely host home showings 
                            or open houses. Then select an offer, negotiate, accept and close.</p>
                    </div>
                </div>
            </div>
            <div className="container text-center p-5">
                <h1>Go to resources for a succesful sale</h1>
            </div>
        </div>
    )
}

export default Sell;