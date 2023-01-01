import { useEffect, useState } from "react";
import { getProjectIdsFromStorage } from "~src/libs/getProjectIdsFromStorage";
import { setProjectIdsToStorage } from "~src/libs/setProjectIdsToStorage";

type OnForm = {
  projectId: string;
  projectIds: string[];
  onRegister: () => void;
  onInputProjectId: (projectId: string) => void;
  onDeleteProjectId: (projectId: string) => void;
  err: string
}

export const onForm = (): OnForm => {
  const [projectId, setProjectId] = useState<string>('')
  const [projectIds, setProjectIds] = useState<string[]>([])
  const [err, setErr] = useState<string>('')

  const onRegister = async () => {
    setErr('')
    const projectIds = await getProjectIdsFromStorage()

    if (projectIds['projectIds'].includes(projectId)) {
      setErr('already registered')
      return
    }

    if (projectId.length > 40) {
      setErr('too long. max 40 characters')
      return
    }

    if (!projectIds['projectIds']) {
      await setProjectIdsToStorage([projectId])
      setProjectIds([projectId])
      setProjectId('')
      return
    }

    await setProjectIdsToStorage([
      projectId,
      ...projectIds['projectIds']
    ])
    const newProjectIds = await getProjectIdsFromStorage()
    setProjectIds(newProjectIds['projectIds'])
    setProjectId('')
  }

  const onInputProjectId = (projectIdProp: string) => {
    setErr('')
    setProjectId(projectIdProp);
    if (projectIds.includes(projectIdProp)) {
      setErr('already registered')
    }
    if (projectIdProp.length > 40) {
      setErr('too long. max 40 characters')
      return
    }
  }

  const onDeleteProjectId = async (projectId: string) => {
    const projectIds = await getProjectIdsFromStorage()
    const filteredProjectIds = projectIds['projectIds']
      .filter((name: string) => name !== projectId)
    await setProjectIdsToStorage(filteredProjectIds)
    const newProjectIds = await getProjectIdsFromStorage()
    setProjectIds(newProjectIds['projectIds'])
  }

  useEffect(() => {
    (async () => {
      const projectIds = await getProjectIdsFromStorage()
      setProjectIds(projectIds['projectIds'])
    })()
  }, [])

  return {
    projectId,
    projectIds,
    onRegister,
    onInputProjectId,
    onDeleteProjectId,
    err
  }
}