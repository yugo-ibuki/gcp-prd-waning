export {}
(() => {
  let count = 0
  const tick = setInterval(async () => {
    const btn = document.querySelector('[data-prober=cloud-console-core-functions-project-switcher]')
    count++
    if (btn) {
      const projectName = btn.textContent.trim()
      const names = await chrome.storage.local.get('projectNames')
      if (!names['projectNames']) {
        clearInterval(tick)
        return
      }
      const projectNames = names['projectNames']
      const projectCount = projectNames.includes(projectName)
      if (projectCount >= 1) {
        const header =
          document.querySelector('.cfc-platform-bar-blue.cfc-platform-bar-container') as HTMLDivElement
        if (header != null) {
          header.style.backgroundColor = '#ff0000'
        }
      }
      clearInterval(tick)
    }
    if (count > 50) {
      clearInterval(tick)
    }
  }, 200)
})()
