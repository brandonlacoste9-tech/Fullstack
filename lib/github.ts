import { Octokit } from '@octokit/rest'

export function getOctokit(accessToken?: string) {
  return new Octokit({
    auth: accessToken || process.env.GITHUB_ACCESS_TOKEN,
  })
}

export async function createRepository(
  octokit: Octokit,
  name: string,
  description?: string,
  isPrivate = true
) {
  try {
    const { data: repo } = await octokit.repos.createForAuthenticatedUser({
      name,
      description,
      private: isPrivate,
      auto_init: true,
    })

    return {
      success: true,
      repo,
    }
  } catch (error) {
    console.error('Error creating repository:', error)
    return {
      success: false,
      error,
    }
  }
}

export async function pushCode(
  octokit: Octokit,
  owner: string,
  repo: string,
  files: { path: string; content: string }[],
  commitMessage: string
) {
  try {
    // Get the latest commit SHA
    const { data: ref } = await octokit.git.getRef({
      owner,
      repo,
      ref: 'heads/main',
    })

    const latestCommitSha = ref.object.sha

    // Get the tree SHA
    const { data: commit } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: latestCommitSha,
    })

    const baseTreeSha = commit.tree.sha

    // Create blobs for each file
    const blobs = await Promise.all(
      files.map(async (file) => {
        const { data: blob } = await octokit.git.createBlob({
          owner,
          repo,
          content: Buffer.from(file.content).toString('base64'),
          encoding: 'base64',
        })
        return {
          path: file.path,
          mode: '100644' as const,
          type: 'blob' as const,
          sha: blob.sha,
        }
      })
    )

    // Create new tree
    const { data: newTree } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree: blobs,
    })

    // Create new commit
    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo,
      message: commitMessage,
      tree: newTree.sha,
      parents: [latestCommitSha],
    })

    // Update reference
    await octokit.git.updateRef({
      owner,
      repo,
      ref: 'heads/main',
      sha: newCommit.sha,
    })

    return {
      success: true,
      commitSha: newCommit.sha,
    }
  } catch (error) {
    console.error('Error pushing code:', error)
    return {
      success: false,
      error,
    }
  }
}

export async function createPullRequest(
  octokit: Octokit,
  owner: string,
  repo: string,
  title: string,
  head: string,
  base: string,
  body?: string
) {
  try {
    const { data: pr } = await octokit.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
      body,
    })

    return {
      success: true,
      pr,
    }
  } catch (error) {
    console.error('Error creating pull request:', error)
    return {
      success: false,
      error,
    }
  }
}
