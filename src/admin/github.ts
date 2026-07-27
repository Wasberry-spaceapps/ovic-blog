/**
 * GitHub API Integration for Ovic Bookstore Admin
 */

const REPO_OWNER = 'Wasberry-spaceapps';
const REPO_NAME = 'ovic-blog';

function getHeaders() {
  const token = localStorage.getItem('github_pat');
  return {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28'
  };
}

export async function getFileSha(path: string): Promise<string | null> {
  const token = localStorage.getItem('github_pat');
  if (!token) return null; // Mock mode if no token

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
      headers: getHeaders()
    });
    
    if (res.status === 404) return null; // File doesn't exist yet
    if (!res.ok) throw new Error(`GitHub API error: ${res.statusText}`);
    
    const data = await res.json();
    return data.sha;
  } catch (error) {
    console.error('Error fetching file SHA:', error);
    return null;
  }
}

export async function getFileContent(path: string): Promise<string | null> {
  const token = localStorage.getItem('github_pat');
  if (!token) return null; // Mock mode if no token

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
      headers: getHeaders()
    });
    
    if (res.status === 404) return null; // File doesn't exist yet
    if (!res.ok) throw new Error(`GitHub API error: ${res.statusText}`);
    
    const data = await res.json();
    // Safely decode base64 utf-8
    const binaryStr = atob(data.content);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (error) {
    console.error('Error fetching file content:', error);
    return null;
  }
}

export async function commitFile(path: string, content: string, message: string): Promise<boolean> {
  const token = localStorage.getItem('github_pat');
  
  if (!token) {
    // MOCK MODE for local testing without PAT
    console.log(`[MOCK GITHUB COMMIT] Path: ${path}`);
    console.log(`[MOCK GITHUB COMMIT] Message: ${message}`);
    console.log(`[MOCK GITHUB COMMIT] Content preview: ${content.substring(0, 100)}...`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }

  try {
    const sha = await getFileSha(path);
    
    // Convert content to base64 (handling utf-8 safely)
    const utf8Bytes = new TextEncoder().encode(content);
    const base64Content = btoa(String.fromCharCode(...utf8Bytes));

    const body: any = {
      message,
      content: base64Content,
    };
    
    if (sha) {
      body.sha = sha;
    }

    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Failed to commit: ${err.message}`);
    }

    return true;
  } catch (error) {
    console.error('Error committing file:', error);
    throw error;
  }
}

export async function deleteFile(path: string, message: string): Promise<boolean> {
  const token = localStorage.getItem('github_pat');
  
  if (!token) {
    // MOCK MODE
    console.log(`[MOCK GITHUB DELETE] Path: ${path}`);
    console.log(`[MOCK GITHUB DELETE] Message: ${message}`);
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }

  try {
    const sha = await getFileSha(path);
    if (!sha) return true; // Already gone or doesn't exist

    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify({
        message,
        sha
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Failed to delete: ${err.message}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}
