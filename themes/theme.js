import BLOG, { LAYOUT_MAPPINGS } from '@/blog.config'
import * as ThemeComponents from '@theme-components'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { getQueryParam, getQueryVariable, isBrowser } from '../lib/utils'

// 不再需要从运行时配置读取 THEMES
// export const { THEMES = [] } = getConfig()?.publicRuntimeConfig || {}
export const THEMES = [BLOG.THEME] // 只包含默认主题

/**
 * 获取主题配置 (简化：始终返回默认主题配置)
 * @returns {object} 主题配置对象
 */
export const getThemeConfig = async () => {
  // 始终返回默认主题（heo）的配置
  return ThemeComponents?.THEME_CONFIG
}

/**
 * 加载全局布局 (简化：始终返回默认主题布局)
 * @param {*} theme - 参数保留但不再使用
 * @returns
 */
export const getBaseLayoutByTheme = theme => {
  const LayoutBase = ThemeComponents['LayoutBase']
  // 始终返回默认主题的 LayoutBase
  return LayoutBase
}

/**
 * 动态获取布局 (简化：始终使用默认主题布局)
 * @param {*} props
 */
export const DynamicLayout = props => {
  const { layoutName } = props
  // 始终从默认主题获取布局组件
  const SelectedLayout = ThemeComponents[layoutName] || ThemeComponents.LayoutSlug
  return <SelectedLayout {...props} />
}

/**
 * 加载主题文件 (简化：始终返回默认主题组件)
 * @param {*} layoutName
 * @param {*} theme - 参数保留但不再使用
 * @returns
 */
export const getLayoutByTheme = ({ layoutName, theme }) => {
  // 始终从默认主题获取布局组件
  const LayoutComponents = ThemeComponents[layoutName] || ThemeComponents.LayoutSlug
  // 不再需要动态 import 其他主题
  // setTimeout(fixThemeDOM, 100) // fixThemeDOM 可能也不再需要
  return LayoutComponents
}

/**
 * 根据路径 获取对应的layout名称
 * @param {*} path
 * @returns
 */
const getLayoutNameByPath = path => {
  // 这个函数可能仍然需要，取决于布局映射是否还使用
  const layoutName = LAYOUT_MAPPINGS[path] || 'LayoutSlug'
  return layoutName
}

/**
 * 切换主题时的特殊处理 (简化或移除，因为不再支持切换)
 */
const fixThemeDOM = () => {
  // 这个函数可能不再需要，因为强制使用单一主题
  // if (isBrowser) { ... }
};

/**
 * 初始化主题 , 优先级 query > cookies > systemPrefer
 * @param isDarkMode
 * @param updateDarkMode 更改主题ChangeState函数
 * @description 读取cookie中存的用户主题
 */
export const initDarkMode = (updateDarkMode, defaultDarkMode) => {
  // 查看用户设备浏览器是否深色模型
  let newDarkMode = isPreferDark()

  // 查看localStorage中用户记录的是否深色模式
  const userDarkMode = loadDarkModeFromLocalStorage()
  if (userDarkMode) {
    newDarkMode = userDarkMode === 'dark' || userDarkMode === 'true'
    saveDarkModeToLocalStorage(newDarkMode) // 用户手动的才保存
  }

  // 如果站点强制设置默认深色，则优先级改过用
  if (defaultDarkMode === 'true') {
    newDarkMode = true
  }

  // url查询条件中是否深色模式 (此逻辑可能也需要移除，因为不再支持主题切换)
  // const queryMode = getQueryVariable('mode')
  // if (queryMode) {
  //   newDarkMode = queryMode === 'dark'
  // }

  updateDarkMode(newDarkMode)
  document
    .getElementsByTagName('html')[0]
    .setAttribute('class', newDarkMode ? 'dark' : 'light')
}

/**
 * 是否优先深色模式， 根据系统深色模式以及当前时间判断
 * @returns {*}
 */
export function isPreferDark() {
  if (BLOG.APPEARANCE === 'dark') {
    return true
  }
  if (BLOG.APPEARANCE === 'auto') {
    // 系统深色模式或时间是夜间时，强行置为夜间模式
    const date = new Date()
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    return (
      prefersDarkMode ||
      (BLOG.APPEARANCE_DARK_TIME &&
        (date.getHours() >= BLOG.APPEARANCE_DARK_TIME[0] ||
          date.getHours() < BLOG.APPEARANCE_DARK_TIME[1]))
    )
  }
  return false
}

/**
 * 读取深色模式
 * @returns {*}
 */
export const loadDarkModeFromLocalStorage = () => {
  return localStorage.getItem('darkMode')
}

/**
 * 保存深色模式
 * @param newTheme
 */
export const saveDarkModeToLocalStorage = newTheme => {
  localStorage.setItem('darkMode', newTheme)
}
