;(function () {
  const apiUrl = 'https://analytics.dibodev.com/projects'

  function createProject(callback = null) {
    console.log('createProject')
    const data = { domain: `createProject${Math.random()}` }

    const xhr = new XMLHttpRequest()
    xhr.open('POST', apiUrl, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        if (callback) {
          callback(response)
        }
      }
    }
    xhr.send(JSON.stringify(data))
  }

  async function onLeave(eventName) {
    console.log('onLeave')
    const data = { domain: `p-${eventName}-${Math.random()}` }
    const headers = { type: 'application/json' }
    const blob = new Blob([JSON.stringify(data)], headers)
    let eventIsSent = false

    if (navigator.sendBeacon && Blob.prototype.isPrototypeOf(blob)) {
      console.log('sendBeacon')
      const beaconSent = navigator.sendBeacon(apiUrl, blob)

      if (!beaconSent) {
        console.log('!beaconSent')
        try {
            createProject()
            eventIsSent = true
        } catch {
          console.warn('sendBeacon failed')
        }
      } else {
        eventIsSent = true
      }
    }

    if (!eventIsSent && window.fetch) {
      console.log('fetch')
      await fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        keepalive: true,
      })
    }

    if (!eventIsSent) {
        console.log('else')
        // Si ni fetch ni sendBeacon ne sont disponibles, utilisez XMLHttpRequest
        createProject()
    }
  }

  const pushStateEvent = new Event('pushstate')

  window.addEventListener('pushstate', () => onLeave('pushstate'))

  // Modification de history.pushState pour déclencher un événement à chaque fois qu'il est appelé
  const originalPushState = history.pushState
  history.pushState = function () {
    originalPushState.apply(this, arguments)
    window.dispatchEvent(pushStateEvent)
  }

  // Écoute des événements popstate pour détecter les navigations via la barre d'URL ou le bouton retour
  window.addEventListener('popstate', () => onLeave('popstate'))

  // Écoute des événements beforeunload pour détecter lorsque l'utilisateur quitte la page
  window.addEventListener('beforeunload', () => onLeave('beforeunload'))
})()
