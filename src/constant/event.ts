export enum PLAY_EVENT {
  // 播放时间更新事件
  TIMEUPDATE = "TimeUpdate",
  // 声音事件
  SOUNDCHANGE = "SoundChange",
  // 播放速度改变事件
  RATECHANGE = "RateChange",
  // 是否暂停事件
  ISPAUSE = "IsPause",
  // 缓冲事件
  WAITING = "Waiting",
  // 是否可以播放事件
  CANPLAY = "CanPlay",
  // 是否隐藏工具栏
  ISHIDE = "IsHide",
  // 工具栏鼠标点击事件
  MOUSECLICK = "MouseClick",
  // 工具栏是否处于拖拽
  ISDRAG = "IsDrag",
  // 工具栏鼠标移动事件
  MOUSEMOVE = "MouseMove",
  // 工具栏鼠标离开事件
  MOUSELEAVE = "MouseLeave",
  // 工具栏鼠标移入事件
  MOUSEENTER = "MouseEnter",
  // 快进和快退事件
  FORWARD = "Forward",
  // 固定声音改变事件
  FIXEDSOUNDCHANGE = "FixedSoundChange",
  // 弹幕事件
  DANMU = "Danmu",
  // 弹幕透明度事件
  OPACITY = "Opacity",
  // 弹幕显示事件
  DANMUAREA = "DanmuArea",
  // 消息事件
  MESSAGE = "Message",
  // 比例事件
  SCALE = "Scale",
  // 视频循环事件
  LOOP = "Loop",
  // 视频镜像事件
  MIRROR = "Mirror",
}

export default {};
