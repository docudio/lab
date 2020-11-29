const NextI18Next = require('next-i18next').default
// const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

module.exports = new NextI18Next({
  otherLanguages: ['de', 'ja', 'zh-CN', 'es', 'fr', 'ko', 'pt', 'en'],
  locales: ['de', 'ja', 'zh-CN', 'es', 'fr', 'ko', 'pt', 'en'],
  defaultLanguage: 'en',
  ignoreRoutes: ['/_next/', '/static/', '/public/', '/api/', '/blog'],

  localePath: path.resolve('./public/static/locales')
}), { i18n: { locales: ['de', 'ja', 'zh-CN', 'es', 'fr', 'ko', 'pt', 'en'] } }
