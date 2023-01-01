const storage = chrome.storage.local
export const setProjectIdsToStorage = async (projectIds: string[])
  : Promise<void> => {
  await storage.set({ projectIds: projectIds })
}