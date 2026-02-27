#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')

const targets = [
  '01-javascript/02-language-fundamentals/README.md',
  '01-javascript/03-dom-and-browser/README.md',
  '01-javascript/04-asynchronous-javascript/README.md',
  '01-javascript/05-oop-and-modules/README.md',
  '01-javascript/06-data-structures-algorithms/README.md',
  '01-javascript/07-mini-projects/README.md',
  '01-javascript/08-interview-prep/README.md',
  '01-javascript/09-advanced-javascript-concepts/README.md',
  '01-javascript/10-oop-in-javascript/README.md',
  '01-javascript/11-browser-apis/README.md',
  '01-javascript/12-performance-and-optimization/README.md',
  '02-react/01-react-router-task-manager/README.md',
  '02-react/05-react-testing-task-manager/README.md',
  '02-react/06-react-core-concepts/README.md',
  '02-react/07-react-hooks-deep-dive/README.md',
  '02-react/08-state-management-patterns/README.md',
  '02-react/09-forms-validation/README.md',
  '02-react/10-api-integration/README.md',
  '02-react/11-performance-and-optimization/README.md',
  '02-react/12-testing-guide/README.md',
  '02-react/13-system-design-and-deployment/README.md',
  '02-react/14-advanced-react-patterns/README.md',
  '02-react/15-advanced-react-concepts/README.md',
  '02-react/16-production-level-skills/README.md',
  '03-bonus-industry-skills/README.md',
]

const requiredExactHeadings = ['## Overview', '## Expected Outcome']
const requiredOneOf = [
  '## What You Learn',
  '## Topics Covered',
  '## Topics',
]

const failures = []

for (const relativeFile of targets) {
  const absoluteFile = path.join(repoRoot, relativeFile)

  if (!fs.existsSync(absoluteFile)) {
    failures.push(`${relativeFile}: file is missing`)
    continue
  }

  const content = fs.readFileSync(absoluteFile, 'utf8')

  for (const heading of requiredExactHeadings) {
    if (!content.includes(heading)) {
      failures.push(`${relativeFile}: missing heading \"${heading}\"`)
    }
  }

  const hasAnyTopicHeading = requiredOneOf.some((heading) => content.includes(heading))
  if (!hasAnyTopicHeading) {
    failures.push(
      `${relativeFile}: missing topic heading (expected one of: ${requiredOneOf.join(', ')})`,
    )
  }
}

if (failures.length > 0) {
  console.error('README structure check failed:\n')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('README structure check passed for all targeted module READMEs.')
