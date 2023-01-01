const storage = chrome.storage.local
export const getProjectIdsFromStorage = async () => {
  return await storage.get('projectIds')
}