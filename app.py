import os
import requests
from dotenv import load_dotenv
from google import genai

# Load variables from .env
load_dotenv()

# Read API key
API_KEY = os.getenv("GEMINI_API_KEY")
print(API_KEY)
if API_KEY is None:
    raise ValueError(
        "GEMINI_API_KEY not found.\n"
        "Please create a .env file and add:\n"
        "GEMINI_API_KEY=YOUR_API_KEY"
    )

client = genai.Client(api_key=API_KEY)

# Fetch README

def fetch_readme(repo_url):
    """
    Fetches the README from a GitHub repository.
    Tries common README filenames on both main and master branches.
    """

    base = repo_url.replace(
        "https://github.com/",
        "https://raw.githubusercontent.com/"
    )

    branches = ["main", "master"]
    filenames = [
        "README.md",
        "readme.md",
        "README.rst",
        "README.txt"
    ]

    for branch in branches:
        for filename in filenames:
            url = f"{base}/{branch}/{filename}"

            try:
                response = requests.get(url, timeout=10)

                if response.status_code == 200:
                    return response.text

            except requests.RequestException:
                continue

    return None


# Summarize README

def summarize_repo(readme_text):
    """
    Sends the README to Gemini and returns a summary.
    """

    prompt = f"""
You are an expert software engineer.

Read the following GitHub README and provide:

1. A one-sentence summary (5-second explanation).
2. The project's tech stack as bullet points.
3. Three beginner-friendly ways to contribute.
4. Who this project is best suited for.

README:

{readme_text}
"""

    try:
        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt
        )

        return response.text

    except Exception as e:
        return f"Gemini API Error:\n{e}"
# Main Program
def main():

    repo_url = input("Enter GitHub repository URL:\n> ").strip()

    print("\nFetching README...\n")

    readme = fetch_readme(repo_url)

    if not readme:
        print("README not found.")
        return

    print("README found!")
    print("\nGenerating summary...\n")
    print("-" * 60)

    summary = summarize_repo(readme)

    print(summary)


if __name__ == "__main__":
    main()