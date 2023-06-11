import axios from 'axios';
import { useState, useEffect } from 'react';

const SentimentAnalysis = (props) => {
    const [inputText, setInputText] = useState("");
    const [sentiment, setSentiment] = useState({})
    const [loading, setLoading] = useState(false)
    const [psychologist, setPsychologist] = useState({})

    useEffect(() => {
        document.title = props.title;
    }, []);

    const analyzeSentiment = async () => {
        // Validate input
        setSentiment({})
        if (!inputText) {
            alert('Please enter some text to analyze.');
            return
        }
        const text = {
            text: inputText
        }
        setLoading(true);
        try {
            const res = await axios.post('http://127.0.0.1:8000/sentiment/', text, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
            setLoading(false)
            let data = await JSON.parse(res.data)
            setSentiment(data)
            setPsychologist(data.psychologist_contact)
            // setTimeout(() => {
            //     setSentiment({})
            // }, 5000);

        } catch (error) {
            console.log(error)
        }
        // console.log(sentiment)
    };

    return (
        <div className="mx-auto py-8 bg-black text-white h-[89.9vh] md:h-[90vh]">
            <section className="w-4/5 mx-auto bg-black">
                <h1 className="text-3xl font-bold text-center mb-4">Sentiment Analysis</h1>
                <input
                    type="text"
                    className="border border-gray-300 rounded px-4 py-2 w-full mb-4 text-black"
                    placeholder="Enter your text..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <div className='flex items-center justify-center'>
                    <button className="border border-green-500 hover:scale-110 hover:bg-green-500 text-white rounded px-4 py-2 mb-4" onClick={analyzeSentiment}>Analyze</button>
                </div>
                {loading &&
                    <div className="flex items-center justify-center mt-2">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                }
                {/* <textarea
                    className="border border-gray-300 rounded px-4 py-2 w-full h-40"
                    placeholder="Sentiment analysis result..."
                    value={outputText}
                    readOnly
                /> */}
                <div>
                    {
                        sentiment && sentiment.severity === 'none' ? (
                            <div>
                                <h2 className="text-green-500 text-2xl font-bold tracking-wider">Great news!</h2>
                                <p className='text-sm mt-2'>Your symptoms do not indicate severe distress. Its important to continue taking care of your mental health and seek support if needed.</p>
                            </div>) : sentiment && sentiment.severity === 'severe' ?
                            (<div>
                                <h2 className='text-red-500 text-2xl font-bold tracking-wider'>Keep an eye on your mental health</h2>
                                <p className='text-sm mt-2'>Your symptoms suggest some level of distress. Its recommended to monitor your mental well-being and consider seeking additional support if needed.</p>
                                <div>
                                    <h2 className='text-xl font-bold tracking-wider mt-4'>Cures</h2>
                                    {sentiment.cures && sentiment.cures.map((cure, id) => (
                                        <p className='text-sm mt-2' key={id}>{cure}</p>
                                    ))}
                                </div>
                                <div>
                                    <h2 className='text-xl font-bold tracking-wider mt-4'>Prevention</h2>
                                    {sentiment.prevention && sentiment.prevention.map((prevent, id) => (
                                        <p className='text-sm mt-2' key={id}>{prevent}</p>
                                    ))}
                                </div>
                                <div>
                                    <h2 className='text-xl font-bold tracking-wider mt-4'>Please contact the following psychologist:</h2>
                                    <p className='mt-2 text-sm'><span className='font-bold'>Name</span> : {psychologist && psychologist.name}</p>
                                    <p className='mt-2 text-sm'><span className='font-bold'>Phone </span> : { psychologist && psychologist.phone}</p>
                                    <p className='mt-2 text-sm'><span className='font-bold'>Email </span> : {psychologist && psychologist.email}</p>
                                </div>
                            </div>) :
                            <div>
                            </div>
                    }
                </div>
            </section>
        </div>
    );
};

export default SentimentAnalysis;
