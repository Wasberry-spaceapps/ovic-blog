# Ovic Bookstore Admin Setup

The Ovic Bookstore admin panel (`/admin`) allows you to edit content and write posts directly from your browser. 
Since this blog has no backend database, all content is saved directly to your GitHub repository as markdown and JSON files.

To allow the admin panel to save your changes, you need to provide it with a **GitHub Personal Access Token (PAT)**.

## How to Generate a Fine-Grained GitHub PAT

1. Go to your GitHub Settings > Developer Settings > Personal Access Tokens > Fine-grained tokens (or visit [this link](https://github.com/settings/personal-access-tokens/new)).
2. Click **Generate new token**.
3. **Token name**: Give it a recognizable name (e.g., `Ovic Bookstore Admin Panel`).
4. **Expiration**: Set this to whatever you prefer (GitHub allows up to 1 year).
5. **Repository access**: Select **Only select repositories** and pick the repository where this blog is hosted.
6. **Permissions**: Under **Repository permissions**, find **Contents** and set it to **Read and write**.
7. Click **Generate token** at the bottom of the page.
8. **Copy the token** immediately (it looks like `github_pat_...`). You won't be able to see it again!

## How to Connect the Admin Panel

1. Run the blog locally or visit your live site and append `/admin` to the URL.
2. In the Admin Panel, click on the **Settings** tab.
3. Paste the token you generated into the GitHub PAT field and click **Save Settings**.
4. That's it! Your admin panel is now connected and can publish changes directly to your repository.

*Note: Your token is securely stored only in your browser's local storage. The site owner using the Post Manager and Content Console day-to-day never sees or needs this token after it is set up once.*
