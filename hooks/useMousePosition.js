import { useState, useEffect } from 'react'

/**
 * 自定义 Hook 用于跟踪鼠标位置
 * 灵感来自 Linear 的悬停菜单实现
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    document.addEventListener('mousemove', updateMousePosition)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return [mousePosition.x, mousePosition.y]
}

