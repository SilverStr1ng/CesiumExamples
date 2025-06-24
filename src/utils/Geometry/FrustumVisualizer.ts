import * as Cesium from 'cesium'

interface FrustumVisualizerOptions {
  aspectRatio?: number // 视锥体的宽高比
  fov?: number // 视锥体的视场角
}

/**
 * @description 视锥体定义
 * @param {Object} [viewer] Cesium的Viewer
 * @param {Object} [options] 视锥体配置
 * @param {number} [options.aspectRatio=1.0] 视锥体的宽高比
 * @param {number} [options.fov=Cesium.Math.toRadians(60.0)] 视锥体的视场角
 */
class FrustumVisualizer {
  [key: string]: any // 允许动态添加属性
  public viewer: Cesium.Viewer
  public primitive: Cesium.Primitive | null // 用于存储视锥体图元
  constructor(viewer: Cesium.Viewer, options: FrustumVisualizerOptions = {}) {
    this.viewer = viewer
    this.primitive = null
    this.outlinePrimitive = null // 添加边缘线图元

    // 默认配置
    this.options = {
      aspectRatio: options.aspectRatio || 1.0,
      fov: options.fov || Cesium.Math.toRadians(60.0)
    }
  }
}

export default FrustumVisualizer