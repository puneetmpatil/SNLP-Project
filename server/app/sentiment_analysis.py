from transformers import pipeline
import json

def calculate_sentiment_score(text):
    classifier = pipeline('sentiment-analysis')
    result = classifier(text)
    print(result)
    sentiment_score = result[0]['score']
    label = result[0]['label']

    if label == 'NEGATIVE':
        sentiment_score = -sentiment_score

    result = analyze_sentiment_score(sentiment_score)
    # print(result)
    return result

def analyze_sentiment_score(sentiment_score):
    depression_threshold = -0.5  # Define the threshold for depression
    severe_threshold = -0.8  # Define the threshold for severe depression

    analysis_result = {
        "severity": None,
        "cures": [],
        "prevention": [],
        "psychologist_contact": None
    }

    if sentiment_score <= depression_threshold:
        if sentiment_score <= severe_threshold:
            analysis_result["severity"] = "severe"
            analysis_result["cures"] = ["Seek professional help from a psychologist or psychiatrist.",
                                        "Consider therapy or counseling sessions.",
                                        "Engage in regular physical exercise."]
            analysis_result["prevention"] = ["Maintain a balanced diet and get enough sleep."]
            analysis_result["psychologist_contact"] = {
                "name": "John Doe",
                "phone": "XXX-XXXXXXX",
                "email": "john.doe@example.com"
            }
        else:
            analysis_result["severity"] = "moderate"
            analysis_result["cures"] = ["Talk to a trusted friend or family member about your feelings.",
                                        "Practice self-care activities such as meditation or journaling."]
            analysis_result["prevention"] = ["Maintain a balanced diet and get enough sleep."]
            analysis_result["psychologist_contact"] = {
                "name": "Jane Smith",
                "phone": "XXX-XXXXXXX",
                "email": "jane.smith@example.com"
            }
    else:
        analysis_result["severity"] = "none"

    return json.dumps(analysis_result)