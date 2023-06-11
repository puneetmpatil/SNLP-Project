import { useEffect } from "react";
import Carousel from "../Carousel";
import features from "../../data/features";

function Home(props) {
    useEffect(() => {
        document.title = props.title
    }, [])
    return (
        <div className="bg-black min-h-[90vh]">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mb-8">
                <div className="w-5/6 mx-auto">
                    <h2 className="text-4xl text-center font-bold text-white mb-8 uppercase">Welcome to MindEase Chatbot</h2>
                    <p className="text-white mb-8">
                        Get the support you need for better mental health. Our chatbot provides a safe space to discuss your thoughts and emotions. We offer non-judgmental conversations, personalized recommendations, and valuable resources. Start your journey to well-being today.
                    </p>
                    <div className="flex justify-center">
                        <button className="px-8 py-4 text-white border hover:bg-white hover:text-black rounded-lg font-bold uppercase hover:scale-110">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-5/6 mx-auto mb-8">
                <Carousel features={features} />
            </div>
            <footer className="bg-black text-white py-4 bottom-0 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center">&copy; 2023 Mental Health Chatbot. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
