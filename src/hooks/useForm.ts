import { useEffect, useState } from "react";
import { getProjectNamesFromStorage } from "~src/libs/getProjectNamesFromStorage";
import { setProjectNamesToStorage } from "~src/libs/setProjectNamesToStorage";

type UseForm = {
  projectName: string;
  projectNames: string[];
  onRegister: () => void;
  onInputProjectName: (ProjectName: string) => void;
  onDeleteProjectName: (ProjectName: string) => void;
  onAllDelete: () => void;
  err: string
}

export const useForm = (): UseForm => {
  const [projectName, setProjectName] = useState<string>('')
  const [projectNames, setProjectNames] = useState<string[]>([])
  const [err, setErr] = useState<string>('')

  const onRegister = async () => {
    setErr('')
    const projectNames = await getProjectNamesFromStorage()

    if (projectNames['projectNames'].includes(projectName)) {
      setErr('already registered')
      return
    }

    if (projectName.length > 40) {
      setErr('too long. max 40 characters')
      return
    }

    if (!projectNames['projectNames']) {
      await setProjectNamesToStorage([projectName])
      setProjectNames([projectName])
      setProjectName('')
      return
    }

    await setProjectNamesToStorage([
      projectName,
      ...projectNames['projectNames']
    ])
    const newProjectNames = await getProjectNamesFromStorage()
    setProjectNames(newProjectNames['projectNames'])
    setProjectName('')
  }

  const onInputProjectName = (projectNameProp: string) => {
    setErr('')
    setProjectName(projectNameProp);
    if (projectNames.includes(projectNameProp)) {
      setErr('already registered')
    }
    if (projectNameProp.length > 40) {
      setErr('too long. max 40 characters')
      return
    }
  }

  const onDeleteProjectName = async (projectName: string) => {
    const projectNames = await getProjectNamesFromStorage()
    const filteredProjectNames = projectNames['projectNames']
      .filter((name: string) => name !== projectName)
    await setProjectNamesToStorage(filteredProjectNames)
    const newProjectNames = await getProjectNamesFromStorage()
    setProjectNames(newProjectNames['projectNames'])
  }

  const onAllDelete = async () => {
    await chrome.storage.local.clear()
    await setProjectNamesToStorage([])
    setProjectNames([])
  }

  useEffect(() => {
    (async () => {
      const projectNames = await getProjectNamesFromStorage()
      setProjectNames(projectNames['projectNames'])
    })()
  }, [])

  return {
    projectName,
    projectNames,
    onRegister,
    onInputProjectName,
    onDeleteProjectName,
    onAllDelete,
    err
  }
}