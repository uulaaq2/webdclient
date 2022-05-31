import config from 'config'

function pageInitial(pageInfo) {  
  const pages = pageInfo.pageName.split('.')
  let page = config.urls

  for (let i=0; i < pages.length; i++ ) {
    page = page[pages[i]]
  }

  document.title = page.name + ' | ' + config.app.name
}

export default pageInitial