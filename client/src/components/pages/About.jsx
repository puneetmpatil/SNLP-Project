import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import data from "../../data/AboutData.json"

function About(props) {
    useEffect(() => {
        document.title = props.title
    }, [])

    return (
        <div className="bg-black text-white py-9">
            <div className="bg-black text-white">
                <div className="justify-center flex mx-auto w-4/5 md:w-1/3">
                    <div className="mb-3">
                        <h2 className="text-3xl md:text-2xl py-3 uppercase tracking-widest font-serif font-extrabold md:text-center">
                            Who we are
                        </h2>
                        <div className="text-sm tracking-widest">
                            We are designers, developers and testers. We provide best design solutions to our clients. Working perfectly with our clients.
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row mx-auto w-4/5 gap-8">
                {
                    data.map(element => {
                        return (
                            <div className="mx-auto mt-4 w-[9/10] md:w-1/2 bg-white text-black" key={element.key}>
                                <img src={element.src} alt={element.alt} className="w-full md:h-80"/>
                                <section className="p-6">
                                    <h5 className="font-bold text-2xl pb-3 font-serif">
                                        {element.title}
                                    </h5>
                                    <p className="font-serif text-sm">
                                        {element.description}
                                    </p>
                                </section>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default About