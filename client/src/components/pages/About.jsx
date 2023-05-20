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
        <div>
            <div>
                <Card className="justify-center flex mx-auto mt-2 text-center" sx={{ maxWidth: 500 }} style={{ border: "none", boxShadow: "none" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" >
                            Who we are
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            We are designers, developers and testers. We provide best design solutions to our clients. Working perfectly with our clients.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col md:flex-row">
                {
                    data.map(element => {
                        return (
                            <Card sx={{ maxWidth: 500 }} className="mx-auto mt-4" style={{ border: "none", boxShadow: "none" }} key={element.key}>
                                <CardMedia
                                    component="img"
                                    alt={element.alt}
                                    height="140"
                                    image={element.src}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {element.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {element.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default About