// Проверяет уникальность slug проектов в src/common/dataArrays/projectsList.ts.
// Запускается как первый шаг `npm run build`, поэтому дублирующийся slug
// роняет сборку с сообщением, указывающим файл и номера строк конфликта.
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const relativePath = 'src/common/dataArrays/projectsList.ts'
const filePath = resolve(root, relativePath)

let source
try {
    source = readFileSync(filePath, 'utf8')
} catch (error) {
    console.error(`[validate-project-slugs] ОШИБКА: не удалось прочитать ${relativePath}: ${error.message}`)
    process.exit(1)
}

// Вырезаем блочные комментарии (с сохранением номеров строк),
// чтобы закомментированный legacy-код не давал ложных срабатываний.
const code = source.replace(/\/\*[\s\S]*?\*\//g, (match) => '\n'.repeat(match.split('\n').length - 1))
const lines = code.split('\n')

const slugPattern = /slug\s*:\s*['"`]([^'"`]+)['"`]/
const slugFormat = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const seen = new Map() // slug -> номер строки первого вхождения
const errors = []

lines.forEach((line, index) => {
    const match = line.match(slugPattern)
    if (!match || match.index === undefined) return
    // Игнорируем совпадения внутри строчных комментариев (// ... slug: '...').
    const commentIndex = line.indexOf('//')
    if (commentIndex !== -1 && commentIndex < match.index) return

    const slug = match[1]
    const lineNumber = index + 1

    if (!slugFormat.test(slug)) {
        errors.push(
            `Некорректный slug "${slug}" (${relativePath}:${lineNumber}). ` +
                `Разрешены только строчные латинские буквы, цифры и дефисы (например, "my-project").`
        )
    }
    if (seen.has(slug)) {
        errors.push(
            `Дублирующийся slug "${slug}" (${relativePath}:${lineNumber}) ` +
                `конфликтует с первым вхождением (${relativePath}:${seen.get(slug)}). ` +
                `Slug проектов должны быть уникальными — они используются в URL /projectPage/:slug.`
        )
    } else {
        seen.set(slug, lineNumber)
    }
})

if (seen.size === 0) {
    console.error(
        `[validate-project-slugs] ОШИБКА: в ${relativePath} не найдено ни одного slug. ` +
            `Каждая запись projectsList должна содержать поле slug.`
    )
    process.exit(1)
}

if (errors.length > 0) {
    console.error(`[validate-project-slugs] ОШИБКА: сборка остановлена, найдено проблем: ${errors.length}`)
    for (const error of errors) {
        console.error(`[validate-project-slugs] - ${error}`)
    }
    process.exit(1)
}

console.log(`[validate-project-slugs] OK: ${seen.size} уникальных slug в ${relativePath}.`)
