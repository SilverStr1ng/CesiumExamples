import * as Cesium from 'cesium'

/**
 * @description 水面反射效果
 * @param {Object} [viewer] Cesium的Viewer
 * @param {Object} [options] 水面反射配置
 */

interface WaterReflectionOptions {
  positions?: Array<[number]> // 水面位置数组
  waterColor?: string // 水面颜色
  frequency?: number // 水面波动频率
  animationSpeed?: number // 水面动画速度
  amplitude?: number // 水面波动幅度
  specularIntensity?: number // 水面光谱高度
  fresnelParams?: Array<number> // Fresnel参数
  models?: Array<any> // 需要反射的模型数组
  height?: number // 水面高度
}

class WaterReflection {
  [key: string]: any // 类型签名
  public viewer: Cesium.Viewer
  public options: WaterReflectionOptions
  private clipPlaneCollections: Array<any> // 用于存储裁剪平面集合

  constructor(viewer: Cesium.Viewer, options: WaterReflectionOptions = {}) {
    this.viewer = viewer
    this.options = Object.assign({
      positions: [],
      waterColor: 'rgba(45, 95, 146, 1.0)',
      frequency: 2000,
      animationSpeed: 0.01,
      amplitude: 0.1,
      specularIntensity: 0.5,
      fresnelParams: [0.8, 1.0, 5],
      models: [],
      height: 0,
    }, options)

    this.clipPlaneCollections = [] // 初始化裁剪平面集合数组，用于存储水下模型的裁剪平面

    this.init()
  }

  init() {
    this.createWaterPlane()
    this.bindEvents()
  }
}

export default WaterReflection;