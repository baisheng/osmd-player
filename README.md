# 🎵 我们的合奏 OSMD Audio player

## Build

```
yarn build
```

## Apps

### The Score
我们的合奏 h5 端

**Live demo:** https://test.picker.cc/ <br/>

```
yarn install
yarn serve
yarn build
```

### 原生调用
原生调H5，都不需要参数
1，开始播放  startPlay
2，暂停播放  pausePlay
3，结束播放  endPlay
H5调原生
1，切换模式  changeModel  需要参数“model”  1是欣赏模式；2是评分模式
2，停止播放  endPlay  不需要参数

### 改光标颜色问题
等 0.9.3

### ISSUE
**Hide measures that includes invisible notes.**
https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/issues/913

### 一些资源
https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/issues/393
**关于 cursor 换颜色的问题，要等0.9.3 版本**
https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/discussions/961
**osmd-options**
https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/wiki/Getting-Started#osmd-options
https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/1c49122b4bf2c38380e7c291451e02ccdffa0b2c/src/OpenSheetMusicDisplay/OSMDOptions.ts
