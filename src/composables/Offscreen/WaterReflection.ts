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

  /**
   * @description 获取镜像相机
   * @param {Cesium.Camera} [camera] Cesium的Camera对象
   * @param {Cesium.Cartesian3} [normal] 法向量
   * @param {Cesium.Cartesian3} [centerPosition] 中心位置数组
   * @returns {Object} 镜像相机对象
   */
  getMirrorCamera(camera: Cesium.Camera, normal: Cesium.Cartesian3, centerPosition: Cesium.Cartesian3) {
    // 计算相机到中心点的向量
    const cameraToCenter = Cesium.Cartesian3.subtract(centerPosition, camera.position, new Cesium.Cartesian3())
    // 计算法线方向的投影长度
    const n = -Cesium.Cartesian3.dot(cameraToCenter, normal)
    // 计算反射位移向量
    const t = Cesium.Cartesian3.multiplyByScalar(normal, 2 * n, new Cesium.Cartesian3())
    // 计算发射相机位置
    const reflectCameraPosition = Cesium.Cartesian3.subtract(camera.position, t, new Cesium.Cartesian3())

    // 计算相机方向在法线方向上的投影
    const ndir = Cesium.Cartesian3.dot(normal, camera.directionWC)
    // 计算方向的反射位移
    const tdir = Cesium.Cartesian3.multiplyByScalar(normal, 2 * ndir, new Cesium.Cartesian3())
    // 计算反射相机方向
    const reflectCameraDirection  = Cesium.Cartesian3.subtract(camera.directionWC, tdir, new Cesium.Cartesian3())
    // 归一化反射方向向量
    Cesium.Cartesian3.normalize(reflectCameraDirection, reflectCameraDirection)

    // 计算相机上方向在法线上的投影
    const nup = Cesium.Cartesian3.dot(normal, camera.upWC)
    // 计算上方向的反射位移
    const tup= Cesium.Cartesian3.multiplyByScalar(normal, 2 * nup, new Cesium.Cartesian3())
    // 计算反射相机的上方向
    const reflectCameraUp = Cesium.Cartesian3.subtract(camera.upWC, tup, new Cesium.Cartesian3())

    // 克隆相机并设置反射参数
    //@ts-expect-error
    const reflectCamera = Cesium.Camera.clone(camera)
    reflectCamera.position = reflectCameraPosition
    reflectCamera.up = reflectCameraUp
    reflectCamera.direction = reflectCameraDirection
    // 计算反射相机的右方向
    reflectCamera.right = Cesium.Cartesian3.cross(reflectCameraUp, reflectCameraDirection, new Cesium.Cartesian3())

    return reflectCamera
  }

  /**
   * @description 计算一组点的中心点位置
   * @param {Array<Cesium.Cartesian3>} [positions] 点位置数组
   * @param {} [height] 水面高度
   * @return {Cesium.Cartesian3} 中心点位置
   */
  calcCenterPoint(positions: Array<Cesium.Cartesian3>, height: number) {
    // 创建一个笛卡尔坐标系下的零向量用于累加
    const total = new Cesium.Cartesian3()

    // 遍历所有点，将他们的坐标累加到total中
    positions.forEach(pos => {
      Cesium.Cartesian3.add(total, pos, total)
    })

    // 计算平均值得到中心点位置
    let centerPosition = Cesium.Cartesian3.multiplyByScalar(total, 1 / positions.length, total)
  }
}

export default WaterReflection;