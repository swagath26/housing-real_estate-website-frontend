import { Link } from "react-router-dom";

const Sell = () => {

    return (
        <div>
            <div className="container px-5 pt-5 pb-3">
                <div className="row">
                    <div className="col-xl-8">
                            <h1 className="pb-3">Sell with a partner agent</h1>
                            <p>Housing helps you sell your home, your way. Easily explore your selling options 
                                below and get personalized market value estimates — we can even help you choose 
                                the best option when youre ready. <br /><br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat tristique 
                                ipsum, non efficitur massa viverra et. Phasellus id lectus id nibh rhoncus varius. 
                                Duis interdum urna orci, non aliquam neque consectetur non. Maecenas sed velit neque. 
                                Phasellus suscipit efficitur volutpat. Duis blandit elit et maximus egestas. 
                                Suspendisse hendrerit, libero ut laoreet congue, lorem turpis aliquet enim, a 
                                vehicula arcu augue ut elit. Phasellus accumsan diam enim, in ullamcorper ante 
                                facilisis eu. Nullam faucibus dictum egestas.</p>
                    </div>
                </div>
            </div>
            <div className="container p-5">
                <div className="row">
                    <div className="col-xl-8">
                            <h1 className="pb-3">Sell your home yourself</h1>
                            <p> Deciding to sell your home yourself is referred to as for-sale-by-owner (FSBO). 
                                The FSBO process is similar to traditional selling, but without the help of a 
                                real estate agent. In this case, you’re responsible for the home prep, marketing, 
                                showings, and negotiations.</p>
                    </div>

                </div>
                <div className="row">
                    <div className="col-8">
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
                <div className="row mt-3">
                    <div className="col-xxl-4 col-md-6 py-2">
                        <h3 className="mb-4">Why Sell</h3>
                        <ul>
                            <li>
                                <p>Avoid paying a listing agent commission</p>
                            </li>
                            <li>
                                <p>Advertise your listing for free on Housing</p>
                            </li>
                            <li>
                                <p>Flexibility and control from start to finish</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xxl-4 col-md-6 py-2">
                        <h3 className="mb-3">How to Sell</h3>
                        <p>When selling yourself, start with home prep, staging, and hiring a professional 
                            photographer. Once your marketing materials are ready, research comparable homes 
                            to help price your home. Then, list on Housing. You’ll likely host home showings 
                            or open houses. Then select an offer, negotiate, accept and close.</p>
                    </div>
                </div>
            </div>
            <div className="container text-center p-5">
                <h1 className="pb-5">Frequently Asked Questions</h1>
                <div className="accordion" id="faq-accordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                                When selling my house, where should I begin?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                Start your home selling process by gathering information and considering your options. 
                                After choosing a selling path that works best for you, take the first step; contact an 
                                iBuyer, a real estate agent or begin home prep.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                How long does it take to sell a house?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                On average, homes in the U.S. spend about one month on the market before going under contract, 
                                and another month or more to close. In 2020, the average time to sell a home was 55-70 days from 
                                list to close.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                What home seller mistakes should I avoid?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                Common mistakes when selling a house include overpricing, poor sale timing, incomplete home 
                                repairs, unprofessional marketing photography and forgetting to factor in all of the closing 
                                costs as a seller. Learn more about your likely home sale net proceeds.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sell;