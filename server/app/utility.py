import json
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Preprocess the text

# Read the data from the file into a dictionary
with open('D:/Coding/Project/PUSHED ON GITHUB/SNLP-Project/server/app/data.json', 'r') as f:
    faqs = json.load(f)


def preprocess_text(text):
    # Tokenize the text into sentences and words
    sentences = sent_tokenize(text)
    words = [word_tokenize(sentence) for sentence in sentences]

    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    filtered_words = [[word for word in sentence if word.lower() not in stop_words]
                      for sentence in words]

    # Lemmatize the words
    lemmatizer = WordNetLemmatizer()
    lemmatized_words = [[lemmatizer.lemmatize(
        word.lower()) for word in sentence] for sentence in filtered_words]

    # Flatten the list of words
    flattened_words = [
        word for sentence in lemmatized_words for word in sentence]

    # Return the preprocessed text as a string
    return ' '.join(flattened_words)



# Preprocess the FAQs
preprocessed_faqs = {preprocess_text(
    question): answer for question, answer in faqs.items()}

# Create a TF-IDF vectorizer
vectorizer = TfidfVectorizer()

# Fit and transform the preprocessed FAQs
faq_vectors = vectorizer.fit_transform(list(preprocessed_faqs.keys()))

# Function to get the most relevant answer


def get_most_relevant_answer(user_query):
    # Preprocess the user query
    preprocessed_query = preprocess_text(user_query)

    # Vectorize the preprocessed query
    query_vector = vectorizer.transform([preprocessed_query])

    # Calculate cosine similarity between the query vector and FAQ vectors
    similarity_scores = cosine_similarity(query_vector, faq_vectors).flatten()

    # Get the index of the most similar FAQ
    most_similar_index = similarity_scores.argmax()

    # Get the corresponding answer
    answer = list(preprocessed_faqs.values())[most_similar_index]

    return answer


def getResponse(request):
    response = get_most_relevant_answer(request)
    return response
