import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BtnBrakKonta from "../components/BtnBrakKonta";
import SignInForm from "../components/SignInForm";
const Sign_in = () => {

	return (
		<div className="background">
			<div >
				<Header />
			</div>
			<div className="row mx-auto w-100">
				<div className=" col-12 mx-auto text-center">
						<SignInForm></SignInForm>
				</div>
			</div>
			<div className="blank"></div>
			<Footer />
		</div>
	);
};

export default Sign_in;
