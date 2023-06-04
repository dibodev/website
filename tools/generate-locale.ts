// Necessary module imports.
import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'
import { translate } from '@vitalets/google-translate-api'

// Get current working directory.
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const projectRoot = path.dirname(__dirname)

// Function to translate a JSON file to another language.
async function translateFile (targetLanguage: string) {
  // Define paths to the source and target files.
  const srcPath = path.resolve(projectRoot, './locales/en.json')
  const targetPath = path.resolve(projectRoot, `./locales/${targetLanguage}.json`)

  // Check existence of the source file.
  if (!fs.existsSync(srcPath)) {
    console.log(`Source file ${srcPath} does not exist.`)
    return
  }

  // Read and parse the source file content.
  const srcContent = fs.readFileSync(srcPath, 'utf-8')
  const srcJson = JSON.parse(srcContent)

  // Translate the JSON content.
  const targetJson = await translateJson(srcJson, targetLanguage)

  // Write the translated content to the target file.
  fs.writeFileSync(targetPath, JSON.stringify(targetJson, null, 2))
  console.log(`Translated file is saved to ${targetPath}`)

  // Update the Nuxt configuration to include the new language.
  updateNuxtConfig(targetLanguage)
}

/**
 * Translates the values of a JSON object recursively.
 *
 * If the value is a string, it's translated to the target language.
 * If the value is an object, this function is called recursively.
 * If the value is neither a string nor an object, it's left unchanged.
 *
 * @param obj JSON object to translate.
 * @param targetLanguage ISO 639-1 code of the target language.
 * @returns A new JSON object with translated values.
 */
async function translateJson (obj: any, targetLanguage: string) {
  const result: any = Array.isArray(obj) ? [] : {} // Resulting JSON object.

  // Arrays to store strings and their corresponding keys.
  const strings: string[] = []
  const keys: string[] = []

  // Loop through all keys in the object.
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      // If the value is a string, add it to the strings array,
      // and its key to the keys array.
      strings.push(obj[key])
      keys.push(key)
    } else if (typeof obj[key] === 'object') {
      // If the value is an object, translate it recursively.
      result[key] = await translateJson(obj[key], targetLanguage)
    } else {
      // If the value is neither a string nor an object,
      // just copy it to the result.
      result[key] = obj[key]
    }
  }

  // If there are any strings to translate, translate them all at once.
  if (strings.length > 0) {
    // Join all strings into a single string with "\n" as separator.
    const { text } = await translate(strings.join('\n'), { to: targetLanguage })

    // Split the translation back into individual translations.
    const translations = text.split('\n')

    // Assign each translation to its corresponding key.
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = translations[i]
    }
  }

  return result
}

function space (n: number) {
  return ' '.repeat(n)
}

// Function to update the Nuxt configuration.
function updateNuxtConfig (targetLanguage: string) {
  const nuxtConfigPath = path.resolve(projectRoot, './nuxt.config.ts')

  // Read the Nuxt configuration as a text file.
  let nuxtConfigContent = fs.readFileSync(nuxtConfigPath, 'utf-8')

  // Find the locales configuration line.
  const localesLinePrefix = 'locales: ['
  const localesStartIndex = nuxtConfigContent.indexOf(localesLinePrefix)

  if (localesStartIndex === -1) {
    console.log('Failed to update Nuxt configuration: locales line not found.')
    return
  }

  const localesEndIndex = nuxtConfigContent.indexOf(']', localesStartIndex)
  const localesLine = nuxtConfigContent.substring(localesStartIndex, localesEndIndex + 1)

  // Check if the language is already included.
  const languageIncluded = localesLine.includes(`code: '${targetLanguage}'`)

  if (languageIncluded) {
    console.log(`Language ${targetLanguage} is already included in the Nuxt configuration.`)
    return
  }

  // Add the new language to the locales line.
  const newLocalesLine = localesLine.replace(']', `${space(4)}{ code: '${targetLanguage}', file: '${targetLanguage}.json' }, \n${space(8)}]`)

  // Replace the old locales line with the new one in the configuration content.
  nuxtConfigContent = nuxtConfigContent.replace(localesLine, newLocalesLine)

  // Write the updated configuration back to the file.
  fs.writeFileSync(nuxtConfigPath, nuxtConfigContent)
  console.log(`Nuxt configuration updated to include language ${targetLanguage}.`)
}

// Get target language from command line arguments.
const [targetLanguage] = process.argv.slice(2)
if (!targetLanguage) {
  console.log('Usage: ts-node translate.ts <target-lang>')
  process.exit(1)
}

// Start the translation.
translateFile(targetLanguage).catch(console.error)
