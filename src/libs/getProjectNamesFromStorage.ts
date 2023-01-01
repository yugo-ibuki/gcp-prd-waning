const storage = chrome.storage.local
export const getProjectNamesFromStorage = async () => {
  return await storage.get('projectNames')
}