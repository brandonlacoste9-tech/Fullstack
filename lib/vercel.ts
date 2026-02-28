import axios from 'axios'

const VERCEL_API_URL = 'https://api.vercel.com'

export async function createVercelProject(
  projectName: string,
  githubRepo: string,
  envVars?: { key: string; value: string; target: string[] }[]
) {
  try {
    const response = await axios.post(
      `${VERCEL_API_URL}/v9/projects`,
      {
        name: projectName,
        gitRepository: {
          repo: githubRepo,
          type: 'github',
        },
        environmentVariables: envVars || [],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },
      }
    )

    return {
      success: true,
      project: response.data,
    }
  } catch (error) {
    console.error('Error creating Vercel project:', error)
    return {
      success: false,
      error,
    }
  }
}

export async function createDeployment(projectId: string) {
  try {
    const response = await axios.post(
      `${VERCEL_API_URL}/v13/deployments`,
      {
        name: projectId,
        project: projectId,
        target: 'production',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },
      }
    )

    return {
      success: true,
      deployment: response.data,
    }
  } catch (error) {
    console.error('Error creating deployment:', error)
    return {
      success: false,
      error,
    }
  }
}

export async function getDeploymentStatus(deploymentId: string) {
  try {
    const response = await axios.get(
      `${VERCEL_API_URL}/v13/deployments/${deploymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },
      }
    )

    return {
      success: true,
      deployment: response.data,
    }
  } catch (error) {
    console.error('Error getting deployment status:', error)
    return {
      success: false,
      error,
    }
  }
}

export async function setEnvironmentVariables(
  projectId: string,
  envVars: { key: string; value: string; target: string[] }[]
) {
  try {
    const promises = envVars.map((envVar) =>
      axios.post(
        `${VERCEL_API_URL}/v10/projects/${projectId}/env`,
        envVar,
        {
          headers: {
            Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          },
        }
      )
    )

    await Promise.all(promises)

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error setting environment variables:', error)
    return {
      success: false,
      error,
    }
  }
}
