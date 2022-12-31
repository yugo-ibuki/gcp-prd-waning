const storage = chrome.storage.local
export const setProjectNamesToStorage = async (projectNames: string[])
  : Promise<void> => {
  await storage.set({ projectNames: projectNames })
}