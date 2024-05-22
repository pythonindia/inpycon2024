import os
import requests

REPO_OWNER = "pythonindia"
REPO_NAME = "inpycon2024"
API_URL = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contributors"

def get_contributors():
    response = requests.get(API_URL)
    response.raise_for_status()
    return response.json()

def get_contributor_details(username):
    url = f"https://api.github.com/users/{username}"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

def update_readme(contributors):
    readme_path = "./README.md"
    with open(readme_path, "r") as file:
        readme_content = file.read()

    start_marker = "<!-- CONTRIBUTORS_START -->"
    end_marker = "<!-- CONTRIBUTORS_END -->"
    start = readme_content.index(start_marker) + len(start_marker)
    end = readme_content.index(end_marker)

    rows_per_column = 6
    new_contributors_section = "<table>\n  <tr>"
    for i, contributor in enumerate(contributors):
        contributor_details = get_contributor_details(contributor['login'])
        name = contributor_details['name'] or contributor_details['login']
        avatar_url = contributor_details['avatar_url']
        html_url = contributor_details['html_url']

        new_contributors_section += f"""\n    <td align="center"><a href="{html_url}"><img src="{avatar_url}" width="100px" alt="{name}"/><br /><sub><b>{name}</b></sub></a></td>"""

        if (i + 1) % rows_per_column == 0:
            new_contributors_section += "\n  </tr>\n  <tr>"

    # Close the last table row
    new_contributors_section += "\n  </tr>\n</table>"
    new_readme_content = f"{readme_content[:start]}\n{new_contributors_section}\n{readme_content[end:]}"

    with open(readme_path, "w") as file:
        file.write(new_readme_content)

def main():
    contributors = get_contributors()
    update_readme(contributors)

if __name__ == "__main__":
    main()