/**
 * @description: 全局类型声明文件
 * @author: Rakuyou
 */
import { Viewer } from "cesium";
declare global {
  interface Window {
    __viewer: Viewer; // 可以根据实际情况替换为更具体的类型
  }
}