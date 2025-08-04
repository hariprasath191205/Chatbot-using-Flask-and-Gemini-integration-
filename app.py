from flask import Flask, request, jsonify 
from flask_cors import CORS 
import os
from dotenv import load_dotenv 
from google import generativeai as genai

load_dotenv()  # Load API key from .env file

API_KEY = os.getenv("MY_API_KEY")
genai.configure(api_key=API_KEY)

app = Flask(__name__)
CORS(app)  # Allow frontend to access this API

model = genai.GenerativeModel("gemini-2.0-flash")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    try:
        response = model.generate_content(user_message)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5050)

