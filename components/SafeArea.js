import { useMousePosition } from '@/hooks/useMousePosition'

/**
 * 安全区域组件 - 基于 Linear 的解决方案
 * 在鼠标光标和子菜单之间创建三角形安全区域，
 * 让用户可以沿对角线移动鼠标而不触发菜单关闭
 * 
 * @param {Object} props
 * @param {React.RefObject} props.subMenuRef - 子菜单的引用
 * @returns {JSX.Element}
 */
export default function SafeArea({ subMenuRef }) {
  const [mouseX, mouseY] = useMousePosition()

  if (!subMenuRef?.current) {
    return null
  }

  // 获取子菜单的位置和尺寸
  const { x = 0, y = 0, height = 0, width = 0 } = subMenuRef.current.getBoundingClientRect() || {}

  // 计算三角形的位置和形状
  const positions = { x, y, height, width, mouseX, mouseY }

  // 计算三角形的 CSS 属性
  const getRight = (pos) => {
    return Math.max(0, window.innerWidth - pos.x - pos.width)
  }

  const getLeft = (pos) => {
    return Math.max(0, Math.min(pos.x, pos.mouseX))
  }

  const getWidth = (pos) => {
    return Math.abs(pos.x + pos.width - Math.min(pos.x, pos.mouseX))
  }

  const getClipPath = (pos) => {
    // 计算三角形的三个顶点
    const mouseRelativeX = pos.mouseX - Math.min(pos.x, pos.mouseX)
    const topY = Math.max(0, pos.y - pos.mouseY)
    const bottomY = topY + pos.height
    const rightX = pos.x + pos.width - Math.min(pos.x, pos.mouseX)

    // 使用 polygon 创建三角形 clip-path
    // 三个点：鼠标位置，子菜单左上角，子菜单左下角
    return `polygon(${mouseRelativeX}px ${Math.abs(topY)}px, ${rightX}px 0px, ${rightX}px ${bottomY}px)`
  }

  // 如果鼠标在子菜单右侧，不需要安全区域
  if (mouseX > x + width) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: Math.min(y, mouseY),
        height: Math.max(height, Math.abs(y - mouseY)),
        right: getRight(positions),
        left: getLeft(positions),
        width: getWidth(positions),
        clipPath: getClipPath(positions),
        backgroundColor: 'transparent', // 开发时可以设置为半透明颜色来调试
        pointerEvents: 'none',
        zIndex: 25 // 在主菜单和子菜单之间
      }}
    />
  )
}

