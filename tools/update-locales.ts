import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'
import * as childProcess from 'child_process'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const projectRoot = path.dirname(__dirname)
const localesPath = path.resolve(projectRoot, './locales')

function updateAllLocales () {
  // Read the contents of the locales directory.
  const files = fs.readdirSync(localesPath)

  // Filter to only include .json files.
  const jsonFiles = files.filter(file => file.endsWith('.json'))

  // For each .json file, extract the language code and run the translation script.
  for (const file of jsonFiles) {
    const langCode = path.basename(file, '.json')

    // Skip the English locale as it's the source.
    if (langCode === 'en') { continue }

    console.log(`Updating locale: ${langCode}`)

    // Run the translation script.
    // Note: This assumes that your `package.json` includes a script named "generate:locale" that runs the translation script.
    // If your script has a different name, replace "generate:locale" with the actual name.
    childProcess.execSync(`npm run generate:locale ${langCode}`, { stdio: 'inherit' })
  }

  console.log('All locales updated.')
}

updateAllLocales()
