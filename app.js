
function haptic() {
  if (navigator.vibrate) navigator.vibrate(8);
}

const data = {
main:{
"照燒雞肉":{cal:362,protein:27},
"厚切嫩牛":{cal:366,protein:26},
"鮮嫩雞柳":{cal:324,protein:25},
"香烤雞肉":{cal:331,protein:23},
"鮪魚":{cal:507,protein:22},
"義大利經典":{cal:409,protein:22},
"燒烤牛肉":{cal:346,protein:21},
"百味俱樂部":{cal:325,protein:21},
"義大利牛肉丸":{cal:383,protein:20},
"嫩切雞肉":{cal:300,protein:20},
"火腿":{cal:317,protein:19},
"哈燒起司總匯":{cal:321,protein:18},
"蛋沙拉":{cal:421,protein:17},
"墨西哥辣牛":{cal:320,protein:17},
"鷹嘴豆泥餅":{cal:425,protein:16},
"墨西哥手撕豬":{cal:321,protein:16},
"素食蔬菜":{cal:250,protein:10}
},

addon:{
"鮮嫩雞柳":{cal:74,protein:15},
"嫩切雞肉(3片)":{cal:50,protein:10},
"嫩切雞肉(1片)":{cal:17,protein:3},
"香烤雞肉":{cal:81,protein:13},
"照燒雞肉":{cal:112,protein:17},
"百味俱樂部":{cal:75,protein:10},
"厚切嫩牛":{cal:100,protein:13},
"燒烤牛肉(1片/19.5g)":{cal:32,protein:4},
"嫩煎蛋(1片)":{cal:41,protein:5},
"火腿(4片)":{cal:67,protein:8},
"火腿(1片)":{cal:17,protein:2},
"辣豆瓣嫩牛":{cal:157,protein:18},
"燒烤牛肉(3片/59g)":{cal:96,protein:11},
"哈燒起司總匯":{cal:71,protein:8},
"墨西哥辣牛":{cal:70,protein:7},
"培根(1條)":{cal:24,protein:2},
"墨西哥手撕豬":{cal:118,protein:9},
"義大利經典":{cal:159,protein:12},
"義大利牛肉丸":{cal:133,protein:10},
"切絲巧達起司":{cal:55,protein:3.3},
"英式切片起司(2片)":{cal:39,protein:2.3},
"義式辣香腸(1片)":{cal:18,protein:1},
"義式煙燻臘腸(1片)":{cal:24,protein:1},
"鮪魚":{cal:257,protein:12},
"酪梨泥(1球)":{cal:75,protein:1},
"蛋沙拉(1球)":{cal:86,protein:3.3},
"蛋沙拉(2球)":{cal:171,protein:6.5},
"鷹嘴豆泥餅(1顆)":{cal:58,protein:2},
"鷹嘴豆泥餅(3顆)":{cal:175,protein:6}
},

sauce:{
"千島醬":{cal:36.7},
"紅酒醋":{cal:0.3},
"美乃滋":{cal:100},
"甜蔥醬":{cal:33},
"鄉村醬":{cal:74},
"黃芥末":{cal:9},
"義大利油醋醬":{cal:14.8},
"蜂蜜芥末醬":{cal:21},
"墨西哥西南醬":{cal:66},
"橄欖油":{cal:44}
}
}

const mainNameMap = {
  "嫩切雞肉":"Sliced Chicken",
  "照燒雞肉":"Chicken Teriyaki",
  "鮮嫩雞柳":"Chicken Strips",
  "香烤雞肉":"Roasted Chicken Breast",
  "火腿":"Ham",
  "義大利牛肉丸":"Italian Meatballs",
  "燒烤牛肉":"Roast Beef",
  "墨西哥辣牛":"Taco Beef",
  "義大利經典":"Italian B.M.T.",
  "百味俱樂部":"Subway Club",
  "哈燒起司總匯":"Subway Melt",
  "鮪魚":"Tuna",
  "蛋沙拉":"Egg Mayo",
  "素食蔬菜":"Veggie Delight",
  "厚切嫩牛":"Diced Beef",
  "鷹嘴豆泥餅":"Falafel",
  "辣豆瓣嫩牛":"Mala Beef",
  "雙重起司厚牛":"Double Cheese Steak",
  "墨西哥手撕豬":"Mexican Pulled Pork"
}

const sauceNameMap = {
  "墨西哥西南醬":"Chipotle Southwest",
  "黃芥末":"Yellow Mustard",
  "獨家秘方義大利番茄醬":"Marinara",
  "甜蔥醬":"Sweet Onion",
  "蜂蜜芥末醬":"Honey Mustard",
  "美乃滋":"Mayonnaise",
  "橄欖油":"Olive Oil",
  "紅酒醋":"Red Wine Vinegar",
  "義大利油醋醬":"Italian Dressing",
  "千島醬":"Thousand Island",
  "鄉村醬":"Ranch",
  "墨西哥辣椒起司醬":"Jalapeno Cheese Sauce"
}

// 主餐名稱與加料表 key 不同時的對應（用於雙份肉計算）
const doubleMeatMap = {
  "燒烤牛肉": "燒烤牛肉(3片/59g)",
  "嫩切雞肉": "嫩切雞肉(3片)",
  "火腿":     "火腿(4片)",
  "蛋沙拉":   "蛋沙拉(2球)",
  "鷹嘴豆泥餅": "鷹嘴豆泥餅(3顆)",
}

const NO_SAUCE_LABEL = "不加醬 No sauce"
let lastShareText = ""
let copyShareResetTimer = null
let suppressPickerTapUntil = 0
const RECENT_LIMIT = 3
const RECENT_KEYS = {
  main: "recent_main",
  addon: "recent_addon",
  sauce: "recent_sauce"
}
const RECENT_COUNT_KEYS = {
  main: "recent_count_main",
  addon: "recent_count_addon",
  sauce: "recent_count_sauce"
}
const SWIPE_HINT_KEYS = {
  addon: "swipe_hint_seen_addon",
  sauce: "swipe_hint_seen_sauce"
}

function escapeHtml(str){
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function shouldBreakBilingualLine(zh, en){
  if(!zh || !en) return false
  return (zh.length + en.length >= 24) || en.length >= 17
}

function shouldBreakModalBilingualLine(zh, en){
  if(!zh || !en) return false
  return (zh.length + en.length >= 30) || en.length >= 22
}

function setBilingualPickerText(el, zh, en){
  if(!el) return
  if(!en){
    el.classList.remove("picker-field--bilingual-break")
    el.textContent = zh || ""
    return
  }
  if(shouldBreakBilingualLine(zh, en)){
    el.classList.add("picker-field--bilingual-break")
    el.innerHTML = `<span class="picker-zh-line">${escapeHtml(zh)}</span><span class="picker-en-break">${escapeHtml(en)}</span>`
    return
  }
  el.classList.remove("picker-field--bilingual-break")
  el.innerHTML = `<span class="picker-zh-inline">${escapeHtml(zh)}</span> <span class="picker-en-inline">${escapeHtml(en)}</span>`
}

function buildGroups(seedGroups, allItems, extraGroupName = "其他"){
  const groups = {}
  const used = new Set()

  Object.entries(seedGroups).forEach(([group, items])=>{
    const validItems = items.filter(name => allItems.includes(name) && !used.has(name))
    groups[group] = validItems
    validItems.forEach(name => used.add(name))
  })

  const remaining = allItems.filter(name => !used.has(name))
  groups[extraGroupName] = remaining
  return groups
}

function getSelectionHighlightColor(){
  const isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  return isDark ? "rgba(47,168,79,0.22)" : "#edf9f0"
}

function isDarkMode(){
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
}

function formatKcal(value){
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}

function formatProtein(value){
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}

function getPer100KcalText(protein, cal){
  if(!cal) return ""
  return `${((protein / cal) * 100).toFixed(1)}g/100kcal`
}

function setBilingualModalTitle(el, zh, en){
  if(!el) return
  if(!en){
    el.classList.remove("modal-title-break")
    el.textContent = zh || ""
    return
  }
  if(shouldBreakModalBilingualLine(zh, en)){
    el.classList.add("modal-title-break")
    el.innerHTML = `<span class="modal-zh-inline">${escapeHtml(zh)}</span><span class="modal-en-break">${escapeHtml(en)}</span>`
    return
  }
  el.classList.remove("modal-title-break")
  el.innerHTML = `<span class="modal-zh-inline">${escapeHtml(zh)}</span> <span class="modal-en-inline">${escapeHtml(en)}</span>`
}

function createModalMetaWrap(metaContent, options = {}){
  const { showCheck = false, html = false, hasEfficiency = false } = options
  const wrap = document.createElement("div")
  wrap.className = "modal-item-meta-wrap"
  if(hasEfficiency) wrap.classList.add("modal-item-meta-wrap--efficiency")

  const meta = document.createElement("div")
  meta.className = "modal-item-kcal"
  if(hasEfficiency) meta.classList.add("modal-item-kcal--efficiency")
  if(html){
    meta.innerHTML = metaContent
  } else {
    meta.textContent = metaContent
  }

  const check = document.createElement("span")
  check.className = "modal-checkmark"
  check.textContent = "✓"
  if(!showCheck){
    check.style.visibility = "hidden"
  }

  wrap.appendChild(meta)
  wrap.appendChild(check)
  return wrap
}

function getRecentItems(type, validItems = null){
  const key = RECENT_KEYS[type]
  if(!key) return []
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]")
    if(!Array.isArray(parsed)) return []
    const unique = []
    parsed.forEach(item=>{
      if(typeof item !== "string" || !item) return
      if(unique.includes(item)) return
      unique.push(item)
    })
    if(validItems){
      const validSet = validItems instanceof Set ? validItems : new Set(validItems)
      return unique.filter(item => validSet.has(item)).slice(0, RECENT_LIMIT)
    }
    return unique.slice(0, RECENT_LIMIT)
  } catch (_) {
    return []
  }
}

function saveRecentItem(type, item){
  if(!item) return
  const key = RECENT_KEYS[type]
  const countKey = RECENT_COUNT_KEYS[type]
  if(!key) return
  let counts = {}
  if(countKey){
    try {
      const parsed = JSON.parse(localStorage.getItem(countKey) || "{}")
      if(parsed && typeof parsed === "object" && !Array.isArray(parsed)){
        counts = parsed
      }
    } catch (_) {
      counts = {}
    }
    counts[item] = Number(counts[item] || 0) + 1
    try {
      localStorage.setItem(countKey, JSON.stringify(counts))
    } catch (_) {
      // no-op
    }
    if(counts[item] < 2){
      return
    }
  }
  const next = [item, ...getRecentItems(type).filter(v => v !== item)].slice(0, RECENT_LIMIT)
  try {
    localStorage.setItem(key, JSON.stringify(next))
  } catch (_) {
    // no-op
  }
}

function renderRecentShortcutSection(container, items, getLabel, onPick){
  if(!items || !items.length) return

  const wrapper = document.createElement("div")
  wrapper.className = "modal-recent-shortcuts"

  const hint = document.createElement("div")
  hint.className = "modal-recent-hint"
  hint.textContent = "最近使用 / Last used"
  wrapper.appendChild(hint)

  const row = document.createElement("div")
  row.className = "modal-recent-row"

  items.forEach(item => {
    const btn = document.createElement("button")
    btn.type = "button"
    btn.className = "modal-recent-btn"
    btn.textContent = getLabel(item)
    btn.onclick = (e)=>{
      e.stopPropagation()
      onPick(item)
    }
    row.appendChild(btn)
  })

  wrapper.appendChild(row)
  container.appendChild(wrapper)
}

function compactZhShareName(name){
  return String(name || "").replace(/[（(]([^()（）]+)[)）]/g, "$1")
}

function hasSeenSwipeHint(type){
  const key = SWIPE_HINT_KEYS[type]
  if(!key) return false
  return localStorage.getItem(key) === "1"
}

function markSwipeHintSeen(type){
  const key = SWIPE_HINT_KEYS[type]
  if(!key) return
  try {
    localStorage.setItem(key, "1")
  } catch (_) {
    // no-op
  }
}

function isDesktopHoverMode(){
  return window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches
}

function refreshSwipeValueFlags(){
  document.querySelectorAll(".swipe-row").forEach(row=>{
    let hasValue = false

    if(row.id === "mainPickerRow"){
      hasValue = !!document.getElementById("main")?.value
    } else if(row.id === "sauce1Row"){
      hasValue = !!document.getElementById("sauce1")?.value
    } else if(row.classList.contains("addon-row")){
      hasValue = !!row.querySelector('input[data-role="addon-value"]')?.value
    } else if(row.classList.contains("sauce-row")){
      hasValue = !!row.querySelector('input[data-role="sauce-value"]')?.value
    }

    row.classList.toggle("has-swipe-value", hasValue)
  })
}

function updateSwipeHints(){
  const addonHint = document.getElementById("addonSwipeHint")
  const sauceHint = document.getElementById("sauceSwipeHint")

  if(!addonHint && !sauceHint) return
  if(isDesktopHoverMode()){
    if(addonHint) addonHint.style.display = "none"
    if(sauceHint) sauceHint.style.display = "none"
    return
  }

  const hasAddonRows = document.querySelectorAll("#addonList .addon-row").length > 0
  const hasSauceRows = !!document.getElementById("sauce1")?.value || !!document.querySelector('#sauce2List input[data-role="sauce-value"]')?.value

  if(addonHint){
    addonHint.style.display = (hasAddonRows && !hasSeenSwipeHint("addon")) ? "block" : "none"
  }
  if(sauceHint){
    sauceHint.style.display = (hasSauceRows && !hasSeenSwipeHint("sauce")) ? "block" : "none"
  }
}

function isPickerTapSuppressed(){
  return Date.now() < suppressPickerTapUntil
}

document.addEventListener("touchstart", (e)=>{
  if(e.target.closest(".swipe-row")) return
  closeOtherSwipeRows()
}, { passive: true })

function openSauce1Picker(){
  if(isPickerTapSuppressed()) return
  openSaucePicker("sauce1")
}

function flashPickerSelection(el){
  if(!el) return
  el.classList.remove("picker-select-flash")
  void el.offsetWidth
  el.classList.add("picker-select-flash")
  setTimeout(()=> el.classList.remove("picker-select-flash"), 280)
}

function animatePickerAppear(el){
  if(!el) return
  el.classList.remove("picker-soft-appear")
  void el.offsetWidth
  el.classList.add("picker-soft-appear")
  setTimeout(()=> el.classList.remove("picker-soft-appear"), 260)
}

function animateRowEnter(el){
  if(!el) return
  el.classList.remove("row-enter")
  void el.offsetWidth
  el.classList.add("row-enter")
  setTimeout(()=> el.classList.remove("row-enter"), 300)
}

function maybePeekHint(row, type){
  // Only on touch devices, only once per type
  if(isDesktopHoverMode()) return
  if(hasSeenSwipeHint(type)) return
  // Trigger peek after row enter animation settles
  setTimeout(() => {
    row.classList.add("peek-hint")
    setTimeout(() => {
      row.classList.remove("peek-hint")
      markSwipeHintSeen(type)
      updateSwipeHints()
    }, 1600)
  }, 320)
}

function styleModalCategoryButton(btn, active){
  const dark = isDarkMode()
  btn.style.padding = "8px 12px"
  btn.style.borderRadius = "999px"
  btn.style.border = dark ? "1px solid #3a3a3c" : "1px solid #ddd"
  btn.style.background = active ? "#2fa84f" : (dark ? "#2c2c2e" : "#fff")
  btn.style.color = active ? "#f3fff7" : (dark ? "#f2f2f7" : "#000")
}

function closeSwipeRow(row){
  if(!row) return
  row.classList.remove("swiped")
  const picker = row.querySelector(".picker-field")
  const actionBtn = row.querySelector('[data-role="swipe-action"]')
  if(picker) picker.style.transform = ""
  if(actionBtn){
    actionBtn.style.opacity = ""
    actionBtn.style.width = ""
    actionBtn.style.removeProperty("--clearLabelOpacity")
    actionBtn.style.transform = ""
  }
  refreshSwipeValueFlags()
}

function removeRowWithAnimation(row, onDone){
  if(!row){
    if(onDone) onDone()
    return
  }

  closeSwipeRow(row)
  row.classList.add("removing")

  setTimeout(()=>{
    row.remove()
    if(onDone) onDone()
  }, 360)
}

function closeOtherSwipeRows(exceptRow = null){
  document.querySelectorAll(".swipe-row.swiped").forEach(row=>{
    if(row !== exceptRow) closeSwipeRow(row)
  })
}

function attachSwipeToReveal(row, onSwipeAction, canSwipe){
  if(!row || row.dataset.swipeReady === "1") return
  row.dataset.swipeReady = "1"

  const picker = row.querySelector(".picker-field")
  const actionBtn = row.querySelector('[data-role="swipe-action"]')
  if(!picker || !actionBtn) return
  const hintType = row.dataset.swipeHintType || ""

  let startX = 0
  let startY = 0
  let currentX = 0
  let lastTranslate = 0
  let isSwiping = false
  let pointerDown = false
  let revealWidth = 92
  let maxDrag = 132
  let deleteThreshold = 124
  let minClearWidth = 56
  let settleClearWidth = 84
  let maxClearWidth = 84
  let settleThreshold = 54
  let rowWidth = 0

  const setSwipeVisual = (translateX)=>{
    const next = Math.max(-(rowWidth + 20), Math.min(0, translateX))
    lastTranslate = next
    picker.style.transform = `translateX(${next}px)`
    const drag = Math.abs(next)
    const commitPoint = rowWidth * 0.50

    // Phase 1: 0 → revealWidth: proportional grow
    // Phase 2: revealWidth → commitPoint: continue growing toward full row
    // Phase 3: commitPoint+: snap to full row width (commit state)
    let clearWidth
    const isCommit = drag >= commitPoint
    if(drag <= revealWidth){
      clearWidth = (drag / revealWidth) * settleClearWidth
    } else if(!isCommit){
      const ratio = (drag - revealWidth) / Math.max(1, commitPoint - revealWidth)
      clearWidth = settleClearWidth + ratio * (rowWidth - settleClearWidth)
    } else {
      clearWidth = rowWidth
    }
    clearWidth = Math.max(0, clearWidth)

    const bgOpacity = drag < 14 ? 0 : Math.min(1, (drag - 14) / 22)
    const labelOpacity = drag < 36 ? 0 : Math.min(1, (drag - 36) / 20)

    actionBtn.style.opacity = String(bgOpacity)
    actionBtn.style.width = `${clearWidth}px`
    actionBtn.style.setProperty("--clearLabelOpacity", labelOpacity.toFixed(3))
    actionBtn.style.transform = "translateX(0)"
    actionBtn.classList.toggle("swipe-commit", isCommit)
  }

  const onStart = (clientX, clientY)=>{
    if(typeof canSwipe === "function" && !canSwipe()){
      closeSwipeRow(row)
      return false
    }
    const rect = picker.getBoundingClientRect()
    const rowHeight = Math.max(48, Math.round(rect.height))
    rowWidth = Math.max(220, Math.round(rect.width))
    minClearWidth = Math.max(52, Math.round(rowHeight * 1.03))
    settleClearWidth = Math.max(minClearWidth + 12, Math.round(rowHeight * 1.48))
    maxClearWidth = Math.max(settleClearWidth + 24, Math.min(Math.round(rowWidth * 0.76), Math.round(rowHeight * 4.1)))
    revealWidth = Math.max(settleClearWidth + 10, Math.round(rowHeight * 1.74))
    maxDrag = rowWidth + 20
    deleteThreshold = Math.round(rowWidth * 0.50)   // trigger at 50%
    settleThreshold = Math.max(42, Math.round(revealWidth * 0.56))
    actionBtn.style.height = `${rowHeight}px`

    startX = clientX
    startY = clientY
    currentX = startX
    lastTranslate = row.classList.contains("swiped") ? -revealWidth : 0
    isSwiping = false
    pointerDown = true
    closeOtherSwipeRows(row)
    return true
  }

  const onMove = (clientX, clientY)=>{
    if(!pointerDown) return false
    if(typeof canSwipe === "function" && !canSwipe()){
      closeSwipeRow(row)
      return false
    }
    currentX = clientX
    const currentY = clientY
    const diffX = currentX - startX
    const diffY = currentY - startY

    if(!isSwiping){
      if(Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)){
        isSwiping = true
        row.classList.add("swipe-dragging")
        document.body.classList.add("swipe-dragging")
      } else {
        return false
      }
    }

    const baseOffset = row.classList.contains("swiped") ? -revealWidth : 0
    const next = baseOffset + diffX
    setSwipeVisual(next)
    return true
  }

  const onEnd = ()=>{
    if(!pointerDown) return
    pointerDown = false
    row.classList.remove("swipe-dragging")
    document.body.classList.remove("swipe-dragging")

    if(!isSwiping){
      return
    }

    suppressPickerTapUntil = Date.now() + 280

    const dragDistance = Math.abs(lastTranslate)

    if(dragDistance >= deleteThreshold){
      if(hintType){
        markSwipeHintSeen(hintType)
        updateSwipeHints()
      }
      if(typeof onSwipeAction === "function"){
        onSwipeAction()
      }
      setTimeout(()=> closeSwipeRow(row), 0)
      return
    }

    if(dragDistance >= settleThreshold){
      if(hintType){
        markSwipeHintSeen(hintType)
        updateSwipeHints()
      }
      row.classList.add("swiped")
      setSwipeVisual(-revealWidth)
    } else {
      closeSwipeRow(row)
    }
  }

  row.addEventListener("touchstart", (e)=>{
    onStart(e.touches[0].clientX, e.touches[0].clientY)
  }, { passive: true })

  row.addEventListener("touchmove", (e)=>{
    const moved = onMove(e.touches[0].clientX, e.touches[0].clientY)
    if(moved) e.preventDefault()
  }, { passive: false })

  row.addEventListener("touchend", onEnd)
  row.addEventListener("touchcancel", ()=>{
    pointerDown = false
    row.classList.remove("swipe-dragging")
    document.body.classList.remove("swipe-dragging")
    closeSwipeRow(row)
  })

  row.addEventListener("mousedown", (e)=>{
    if(e.button !== 0) return
    if(e.target.closest('[data-role="swipe-action"]')) return
    const ok = onStart(e.clientX, e.clientY)
    if(ok) e.preventDefault()
  })

  window.addEventListener("mousemove", (e)=>{
    const moved = onMove(e.clientX, e.clientY)
    if(moved) e.preventDefault()
  })

  window.addEventListener("mouseup", ()=>{
    onEnd()
  })

  actionBtn.addEventListener("click", (e)=>{
    e.stopPropagation()
    if(typeof onSwipeAction === "function"){
      onSwipeAction()
    }
    closeSwipeRow(row)
  })
}

const mainSeedGroups = {
  "牛肉系": ["厚切嫩牛","燒烤牛肉","墨西哥辣牛","義大利牛肉丸"],
  "雞肉系": ["照燒雞肉","鮮嫩雞柳","香烤雞肉","嫩切雞肉"],
  "豬肉冷切系": ["火腿","百味俱樂部","義大利經典","哈燒起司總匯","墨西哥手撕豬"],
  "海鮮蛋素食": ["鮪魚","蛋沙拉","鷹嘴豆泥餅","素食蔬菜"]
}

const addonSeedGroups = {
  "起司蛋配料": ["切絲巧達起司","英式切片起司(2片)","嫩煎蛋(1片)","酪梨泥(1球)","蛋沙拉(1球)","蛋沙拉(2球)"],
  "雞肉": ["鮮嫩雞柳","嫩切雞肉(3片)","嫩切雞肉(1片)","香烤雞肉","照燒雞肉"],
  "牛肉": ["厚切嫩牛","燒烤牛肉(3片/59g)","燒烤牛肉(1片/19.5g)","墨西哥辣牛","辣豆瓣嫩牛","義大利牛肉丸"],
  "豬肉冷切": ["火腿(4片)","火腿(1片)","墨西哥手撕豬","義大利經典","百味俱樂部","哈燒起司總匯","義式辣香腸(1片)","義式煙燻臘腸(1片)","培根(1條)"],
  "海鮮素食": ["鮪魚","鷹嘴豆泥餅(1顆)","鷹嘴豆泥餅(3顆)"]
}

let mainGroups = {}
let mainActiveGroup = ""

function updateMainPickerLabel(){
  const value = document.getElementById("main").value
  const picker = document.getElementById("mainPicker")
  if(!picker) return

  if(!value){
    picker.textContent = "選擇主餐"
    picker.classList.remove("picker-field--bilingual-break")
    picker.classList.add("picker-field--placeholder")
    picker.classList.add("picker-field--plus")
    picker.classList.remove("picker-field-with-minus")
    updateSectionClearButtons()
    return
  }

  const en = mainNameMap[value] || ""
  setBilingualPickerText(picker, value, en)
  picker.classList.remove("picker-field--placeholder")
  picker.classList.remove("picker-field--plus")
  picker.classList.remove("picker-field-with-minus")
  updateSectionClearButtons()
}

function clearMainSection(){
  const mainSelect = document.getElementById("main")
  if(!mainSelect) return
  mainSelect.value = ""
  document.getElementById("double").checked = false
  updateMainPickerLabel()
  refreshSwipeValueFlags()
  animatePickerAppear(document.getElementById("mainPicker"))
  calc()
}

function ensureMainSwipeAction(){
  const row = document.getElementById("mainPickerRow")
  if(!row || row.dataset.clearReady === "1") return
  row.dataset.clearReady = "1"
  row.classList.add("swipe-row")
  row.dataset.swipeHintType = "main"

  const actionBtn = document.createElement("button")
  actionBtn.type = "button"
  actionBtn.dataset.role = "swipe-action"
  actionBtn.className = "swipe-clear-btn"
  actionBtn.textContent = "Clear"
  row.appendChild(actionBtn)

  attachSwipeToReveal(row, ()=>{
    clearMainSection()
  }, ()=> !!document.getElementById("main")?.value)
}

function openMainPicker(defaultGroup = ""){
  if(isPickerTapSuppressed()) return
  const modal = document.getElementById("mainModal")
  const catEl = document.getElementById("mainModalCategories")
  const itemsEl = document.getElementById("mainItems")
  const searchEl = document.getElementById("mainSearch")

  if(!modal || !catEl || !itemsEl) return

  modal.style.display = "block"
  catEl.innerHTML = ""
  itemsEl.innerHTML = ""
  if(searchEl) searchEl.value = ""

  const groupNames = Object.keys(mainGroups).filter(g => (mainGroups[g] || []).length > 0)
  if(!groupNames.length) return

  const selectedGroup = defaultGroup && groupNames.includes(defaultGroup)
    ? defaultGroup
    : (groupNames.includes(mainActiveGroup) ? mainActiveGroup : groupNames[0])
  mainActiveGroup = selectedGroup

  groupNames.forEach((g)=>{
    const btn = document.createElement("button")
    btn.textContent = g
    styleModalCategoryButton(btn, g===selectedGroup)

    btn.onclick = ()=>{
      mainActiveGroup = g
      document.querySelectorAll("#mainModalCategories button").forEach(b=>styleModalCategoryButton(b,false))
      styleModalCategoryButton(btn,true)
      renderMainItems(g)
    }

    catEl.appendChild(btn)
  })

  renderMainItems(selectedGroup)

  modal.onclick = (e)=>{
    if(e.target.id==="mainModal") modal.style.display="none"
  }
}

function renderMainItems(group){
  const itemsEl = document.getElementById("mainItems")
  const searchEl = document.getElementById("mainSearch")
  itemsEl.innerHTML = ""
  const selectedMain = document.getElementById("main").value
  const query = searchEl ? searchEl.value.trim().toLowerCase() : ""

  const searchPool = query
    ? Object.keys(data.main)
    : (mainGroups[group] || [])

  const sortedNames = [...searchPool]
    .filter(name => !!data.main[name])
    .filter(name => {
      if(!query) return true
      const en = mainNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
    .sort((a,b)=> data.main[b].cal - data.main[a].cal)

  const recentMainNames = getRecentItems("main", Object.keys(data.main))
    .filter(name => {
      if(!query) return true
      const en = mainNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
  const showRecentShortcuts = !query && recentMainNames.length > 0

  const renderMainItem = (name)=>{
    if(!data.main[name]) return;

    const div = document.createElement("div")
    div.style.padding = "12px"
    div.style.borderBottom = "1px solid #eee"
    div.style.cursor = "pointer"
    div.style.display = "flex"
    div.style.justifyContent = "space-between"
    div.style.alignItems = "center"

    const en = mainNameMap[name] || ""
    const textWrap = document.createElement("div")
    textWrap.className = "modal-item-title"
    setBilingualModalTitle(textWrap, name, en)
    textWrap.style.paddingRight = "10px"

    const efficiency = ((data.main[name].protein / data.main[name].cal) * 100).toFixed(1)
    const rightWrap = createModalMetaWrap(
      `${data.main[name].cal} kcal<br><span class="item-efficiency">${efficiency}g/100kcal</span>`,
      { showCheck: name === selectedMain, html: true, hasEfficiency: true }
    )

    div.appendChild(textWrap)
    div.appendChild(rightWrap)

    const isCurrentSelected = name === selectedMain
    if(isCurrentSelected){
      div.style.opacity = "0.45"
      div.style.cursor = "not-allowed"
    }

    div.onclick = ()=>{
      if(isCurrentSelected) return
      const mainSelect = document.getElementById("main")
      mainSelect.value = name
      saveRecentItem("main", name)
      updateMainPickerLabel()
      flashPickerSelection(document.getElementById("mainPicker"))
      document.getElementById("mainModal").style.display="none"
      calc()
    }

    itemsEl.appendChild(div)
  }

  if(!showRecentShortcuts && !sortedNames.length){
    const empty = document.createElement("div")
    empty.style.padding = "14px 12px"
    empty.style.fontSize = "13px"
    empty.style.color = "#8e8e93"
    empty.textContent = query ? "找不到符合的口味 No matching flavor" : "此分類目前沒有項目"
    itemsEl.appendChild(empty)
    return
  }

  if(showRecentShortcuts){
    renderRecentShortcutSection(
      itemsEl,
      recentMainNames,
      (name)=> name,
      (name)=>{
        const mainSelect = document.getElementById("main")
        mainSelect.value = name
        saveRecentItem("main", name)
        updateMainPickerLabel()
        flashPickerSelection(document.getElementById("mainPicker"))
        document.getElementById("mainModal").style.display="none"
        calc()
      }
    )
  }

  sortedNames.forEach(renderMainItem)
}

const addonNameMap = {
  "嫩切雞肉(3片)":"Chicken Sliced (3 slices)",
  "嫩切雞肉(1片)":"Chicken Sliced (1 slice)",
  "照燒雞肉":"Chicken Teriyaki",
  "鮮嫩雞柳":"Chicken Strips",
  "香烤雞肉":"Oven Roasted Chicken Breast",
  "厚切嫩牛":"Diced Beef",
  "火腿(4片)":"Ham (4 slices)",
  "火腿(1片)":"Ham (1 slice)",
  "培根(1條)":"Bacon (1 strip)",
  "義大利牛肉丸":"Italian Meatballs",
  "燒烤牛肉(3片/59g)":"Roast Beef (3 slices)",
  "燒烤牛肉(1片/19.5g)":"Roast Beef (1 slice)",
  "墨西哥辣牛":"Taco Beef",
  "義大利經典":"Italian B.M.T.",
  "百味俱樂部":"Subway Club",
  "義式煙燻臘腸(1片)":"Salami",
  "義式辣香腸(1片)":"Pepperoni",
  "哈燒起司總匯":"Subway Melt",
  "鮪魚":"Tuna",
  "蛋沙拉(2球)":"Egg Mayo (2 scoops)",
  "蛋沙拉(1球)":"Egg Mayo (1 scoop)",
  "嫩煎蛋(1片)":"Egg Patty",
  "酪梨泥(1球)":"Avocado",
  "英式切片起司(2片)":"Old English Cheese (2 slices)",
  "英式切片起司(1片)":"Old English Cheese (1 slice)",
  "切絲巧達起司":"Shredded Cheddar Cheese",
  "鷹嘴豆泥餅(3顆)":"Falafel (3 pieces)",
  "鷹嘴豆泥餅(1顆)":"Falafel (1 piece)",
  "辣豆瓣嫩牛":"Mala Beef",
  "墨西哥手撕豬":"Mexican Pulled Pork"
}

const addonGroups = buildGroups(addonSeedGroups, Object.keys(data.addon), "其他")

let addonActiveGroup = Object.keys(addonGroups)[0] || ""
let addonPickerTargetRow = null
let addonPickerTargetHidden = null
let copyToastTimer = null

function getSelectedAddonValues(ignoreSelect = null){
  const values = []
  document.querySelectorAll("#addonList .addon-row").forEach(row => {
    const hidden = row.querySelector('input[data-role="addon-value"]')
    if(hidden === ignoreSelect) return
    if(hidden && hidden.value) values.push(hidden.value)
  })
  return values
}

function isAddonDuplicate(name, ignoreSelect = null){
  if(!name) return false
  return getSelectedAddonValues(ignoreSelect).includes(name)
}

function openAddonPicker(defaultGroup = "", targetRow = null){
  addonPickerTargetRow = targetRow
  addonPickerTargetHidden = targetRow ? targetRow.querySelector('input[data-role="addon-value"]') : null

  const modal = document.getElementById("addonModal")
  const catEl = document.getElementById("addonModalCategories")
  const itemsEl = document.getElementById("addonItems")
  const searchEl = document.getElementById("addonSearch")

  modal.style.display = "block"
  catEl.innerHTML = ""
  itemsEl.innerHTML = ""
  if(searchEl) searchEl.value = ""

  const groupNames = Object.keys(addonGroups).filter(g => (addonGroups[g] || []).length > 0)
  if(!groupNames.length) return
  const selectedGroup = defaultGroup && groupNames.includes(defaultGroup)
    ? defaultGroup
    : (groupNames.includes(addonActiveGroup) ? addonActiveGroup : groupNames[0])
  addonActiveGroup = selectedGroup

  groupNames.forEach((g)=>{
    const btn = document.createElement("button")
    btn.textContent = g
    styleModalCategoryButton(btn, g===selectedGroup)

    btn.onclick = ()=>{
      addonActiveGroup = g
      document.querySelectorAll("#addonModalCategories button").forEach(b=>styleModalCategoryButton(b,false))
      styleModalCategoryButton(btn,true)
      renderAddonItems(g)
    }

    catEl.appendChild(btn)
  })

  renderAddonItems(selectedGroup)

  modal.onclick = (e)=>{
    if(e.target.id==="addonModal") modal.style.display="none"
  }
}

function renderAddonItems(group){
  const itemsEl = document.getElementById("addonItems")
  const searchEl = document.getElementById("addonSearch")
  itemsEl.innerHTML = ""
  const selected = new Set(getSelectedAddonValues())
  const editingCurrentValue = addonPickerTargetHidden ? addonPickerTargetHidden.value : ""
  const query = searchEl ? searchEl.value.trim().toLowerCase() : ""
  const searchPool = query
    ? Object.keys(data.addon)
    : (addonGroups[group] || []).filter(name => !!data.addon[name])

  const recentAddonNames = getRecentItems("addon", Object.keys(data.addon))
    .filter(name => {
      if(!query) return true
      const en = addonNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
  const showRecentShortcuts = !query && recentAddonNames.length > 0

  const sortedAddonNames = [...searchPool]
    .filter(name => {
      if(!query) return true
      const en = addonNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
    .sort((a,b)=> data.addon[b].cal - data.addon[a].cal)

  if(!showRecentShortcuts && !sortedAddonNames.length){
    const empty = document.createElement("div")
    empty.style.padding = "14px 12px"
    empty.style.fontSize = "13px"
    empty.style.color = "#8e8e93"
    empty.textContent = query ? "找不到符合的加料 No matching add-ons" : "此分類目前沒有項目"
    itemsEl.appendChild(empty)
    return
  }

  const renderAddonItem = (name)=>{
    if(!data.addon[name]) return;

    const div = document.createElement("div")
    div.style.padding = "12px"
    div.style.borderBottom = "1px solid #eee"
    div.style.cursor = "pointer"
    div.style.display = "flex"
    div.style.justifyContent = "space-between"
    div.style.alignItems = "center"

    const en = addonNameMap[name] || ""
    const textWrap = document.createElement("div")
    textWrap.className = "modal-item-title"
    setBilingualModalTitle(textWrap, name, en)
    textWrap.style.paddingRight = "10px"

    const efficiency = getPer100KcalText(data.addon[name].protein, data.addon[name].cal)
    const rightWrap = createModalMetaWrap(
      `${data.addon[name].cal} kcal<br><span class="item-efficiency">${efficiency}</span>`,
      {
        showCheck: selected.has(name) || (!!editingCurrentValue && name === editingCurrentValue),
        html: true,
        hasEfficiency: true
      }
    )

    div.appendChild(textWrap)
    const alreadySelected = selected.has(name)
    const isCurrentEditingValue = !!editingCurrentValue && name === editingCurrentValue
    div.appendChild(rightWrap)
    if(alreadySelected || isCurrentEditingValue){
      div.style.opacity = "0.45"
      div.style.cursor = "not-allowed"
    }

    div.onclick = ()=>{
      if(alreadySelected || isCurrentEditingValue) return
      if(addonPickerTargetRow){
        setAddonValue(addonPickerTargetRow, name)
        saveRecentItem("addon", name)
        flashPickerSelection(addonPickerTargetRow.querySelector(".picker-field"))
        document.getElementById("addonModal").style.display = "none"
        calc()
        return
      }
      const added = addAddon(name)
      if(!added) return
      saveRecentItem("addon", name)
      document.getElementById("addonModal").style.display = "none"
    }
    itemsEl.appendChild(div)
  }

  if(showRecentShortcuts){
    renderRecentShortcutSection(
      itemsEl,
      recentAddonNames,
      (name)=> name,
      (name)=>{
        if(addonPickerTargetRow){
          setAddonValue(addonPickerTargetRow, name)
          saveRecentItem("addon", name)
          flashPickerSelection(addonPickerTargetRow.querySelector(".picker-field"))
          document.getElementById("addonModal").style.display = "none"
          calc()
          return
        }
        const added = addAddon(name)
        if(!added) return
        saveRecentItem("addon", name)
        document.getElementById("addonModal").style.display = "none"
      }
    )
  }

  sortedAddonNames.forEach(renderAddonItem)
}

function openQuickSearch(){
  const modal = document.getElementById("quickSearchModal")
  const input = document.getElementById("quickSearchInput")
  if(!modal || !input) return
  modal.style.display = "block"
  input.value = ""
  renderQuickSearchItems()
  setTimeout(()=> input.focus(), 10)
  modal.onclick = (e)=>{
    if(e.target.id === "quickSearchModal") closeQuickSearch()
  }
}

function closeQuickSearch(){
  const modal = document.getElementById("quickSearchModal")
  if(modal) modal.style.display = "none"
}

function renderQuickSearchItems(){
  const input = document.getElementById("quickSearchInput")
  const itemsEl = document.getElementById("quickSearchItems")
  if(!input || !itemsEl) return

  const query = input.value.trim().toLowerCase()
  itemsEl.innerHTML = ""

  if(!query){
    const hint = document.createElement("div")
    hint.style.padding = "14px 12px"
    hint.style.fontSize = "13px"
    hint.style.color = "#8e8e93"
    hint.textContent = "輸入關鍵字以搜尋口味、加料、醬料"
    itemsEl.appendChild(hint)
    return
  }

  const selectedMain = document.getElementById("main").value
  const selectedAddon = new Set(getSelectedAddonValues())
  const sauce1Value = document.getElementById("sauce1").value
  const sauce2ValueInput = document.querySelector('#sauce2List input[data-role="sauce-value"]')
  const sauce2Value = sauce2ValueInput ? sauce2ValueInput.value : ""
  const selectedSauce = new Set([sauce1Value, sauce2Value].filter(Boolean))

  const mainMatches = Object.keys(data.main)
    .filter(name => {
      const en = mainNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
    .sort((a,b)=> data.main[b].cal - data.main[a].cal)

  const addonMatches = Object.keys(data.addon)
    .filter(name => {
      const en = addonNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
    .sort((a,b)=> data.addon[b].cal - data.addon[a].cal)

  const sauceMatches = Object.keys(data.sauce)
    .filter(name => {
      const en = sauceNameMap[name] || ""
      return `${name} ${en}`.toLowerCase().includes(query)
    })
    .sort((a,b)=> data.sauce[b].cal - data.sauce[a].cal)

  if(!mainMatches.length && !addonMatches.length && !sauceMatches.length){
    const empty = document.createElement("div")
    empty.style.padding = "14px 12px"
    empty.style.fontSize = "13px"
    empty.style.color = "#8e8e93"
    empty.textContent = "找不到符合項目 No matching items"
    itemsEl.appendChild(empty)
    return
  }

  const renderSectionTitle = (text)=>{
    const title = document.createElement("div")
    title.style.padding = "10px 12px 6px"
    title.style.fontSize = "11px"
    title.style.fontWeight = "700"
    title.style.letterSpacing = "0.25px"
    title.style.color = "var(--kcal-muted)"
    title.textContent = text
    itemsEl.appendChild(title)
  }

  const renderMainItem = (name)=>{
    const row = document.createElement("div")
    row.style.padding = "12px"
    row.style.borderBottom = "1px solid #eee"
    row.style.cursor = "pointer"
    row.style.display = "flex"
    row.style.justifyContent = "space-between"
    row.style.alignItems = "center"

    const en = mainNameMap[name] || ""
    const left = document.createElement("div")
    left.className = "modal-item-title"
    setBilingualModalTitle(left, name, en)
    left.style.paddingRight = "10px"

    const rightWrap = createModalMetaWrap(`${data.main[name].cal} kcal`, {
      showCheck: name === selectedMain
    })

    if(name === selectedMain){
      row.style.opacity = "0.45"
      row.style.cursor = "not-allowed"
      row.appendChild(left)
      row.appendChild(rightWrap)
    } else {
      row.appendChild(left)
      row.appendChild(rightWrap)
      row.onclick = ()=>{
        const mainSelect = document.getElementById("main")
        mainSelect.value = name
        saveRecentItem("main", name)
        updateMainPickerLabel()
        flashPickerSelection(document.getElementById("mainPicker"))
        closeQuickSearch()
        calc()
      }
    }

    itemsEl.appendChild(row)
  }

  const renderAddonItem = (name)=>{
    const row = document.createElement("div")
    row.style.padding = "12px"
    row.style.borderBottom = "1px solid #eee"
    row.style.cursor = "pointer"
    row.style.display = "flex"
    row.style.justifyContent = "space-between"
    row.style.alignItems = "center"

    const en = addonNameMap[name] || ""
    const left = document.createElement("div")
    left.className = "modal-item-title"
    setBilingualModalTitle(left, name, en)
    left.style.paddingRight = "10px"

    const efficiency = getPer100KcalText(data.addon[name].protein, data.addon[name].cal)
    const rightWrap = createModalMetaWrap(
      `${data.addon[name].cal} kcal<br><span class="item-efficiency">${efficiency}</span>`,
      {
        showCheck: selectedAddon.has(name),
        html: true,
        hasEfficiency: true
      }
    )

    if(selectedAddon.has(name)){
      row.style.opacity = "0.45"
      row.style.cursor = "not-allowed"
      row.appendChild(left)
      row.appendChild(rightWrap)
    } else {
      row.appendChild(left)
      row.appendChild(rightWrap)
      row.onclick = ()=>{
        const added = addAddon(name)
        if(!added) return
        saveRecentItem("addon", name)
        closeQuickSearch()
      }
    }

    itemsEl.appendChild(row)
  }

  const renderSauceItem = (name)=>{
    const row = document.createElement("div")
    row.style.padding = "12px"
    row.style.borderBottom = "1px solid #eee"
    row.style.cursor = "pointer"
    row.style.display = "flex"
    row.style.justifyContent = "space-between"
    row.style.alignItems = "center"

    const en = sauceNameMap[name] || ""
    const left = document.createElement("div")
    left.className = "modal-item-title"
    setBilingualModalTitle(left, name, en)
    left.style.paddingRight = "10px"

    const rightWrap = createModalMetaWrap(`${data.sauce[name].cal} kcal`, {
      showCheck: selectedSauce.has(name)
    })

    if(selectedSauce.has(name)){
      row.style.opacity = "0.45"
      row.style.cursor = "not-allowed"
      row.appendChild(left)
      row.appendChild(rightWrap)
    } else {
      row.appendChild(left)
      row.appendChild(rightWrap)
      row.onclick = ()=>{
        const sauce1El = document.getElementById("sauce1")
        const currentSauce1 = sauce1El ? sauce1El.value : ""
        const currentSauce2Input = document.querySelector('#sauce2List input[data-role="sauce-value"]')
        const currentSauce2 = currentSauce2Input ? currentSauce2Input.value : ""

        if(!currentSauce1){
          sauce1El.value = name
          updateSaucePickerLabel("sauce1")
          flashPickerSelection(document.getElementById("sauce1Picker"))
        } else if(!currentSauce2){
          const list = document.getElementById("sauce2List")
          let sauce2Row = list ? list.querySelector(".sauce-row") : null
          if(!sauce2Row && list){
            sauce2Row = createSauceSelect()
            list.appendChild(sauce2Row)
            animateRowEnter(sauce2Row)
            maybePeekHint(sauce2Row, "sauce")
          }
          const hidden = sauce2Row ? sauce2Row.querySelector('input[data-role="sauce-value"]') : null
          if(hidden) hidden.value = name
          updateSaucePickerLabel("sauce2")
          const display = sauce2Row ? sauce2Row.querySelector('[data-role="sauce-display"]') : null
          flashPickerSelection(display)
        } else {
          const sauce2Row = document.querySelector("#sauce2List .sauce-row")
          const hidden = sauce2Row ? sauce2Row.querySelector('input[data-role="sauce-value"]') : null
          if(hidden) hidden.value = name
          updateSaucePickerLabel("sauce2")
          const display = sauce2Row ? sauce2Row.querySelector('[data-role="sauce-display"]') : null
          flashPickerSelection(display)
        }

        saveRecentItem("sauce", name)
        updateSauce2Visibility()
        closeQuickSearch()
        calc()
      }
    }

    itemsEl.appendChild(row)
  }

  if(mainMatches.length){
    renderSectionTitle("口味 Flavor")
    mainMatches.forEach(renderMainItem)
  }

  if(addonMatches.length){
    renderSectionTitle("加料 Add-ons")
    addonMatches.forEach(renderAddonItem)
  }

  if(sauceMatches.length){
    renderSectionTitle("醬料 Sauce")
    sauceMatches.forEach(renderSauceItem)
  }
}

function init(){
let main = document.getElementById("main")
main.innerHTML = '<option value="">請選擇</option>'

// --- main category buttons ---
mainGroups = buildGroups(mainSeedGroups, Object.keys(data.main), "其他")
mainActiveGroup = Object.keys(mainGroups).find(g => (mainGroups[g] || []).length > 0) || ""

Object.keys(data.main).forEach(name=>{
  let en = mainNameMap[name] || ""
  const label = en ? `${name} ${en}` : name;
  main.innerHTML += `<option value="${name}">${label}</option>`;
})

main.value = ""
updateMainPickerLabel()

const doubleToggle = document.getElementById("double")
if(doubleToggle && doubleToggle.dataset.bound !== "1"){
  doubleToggle.dataset.bound = "1"
  doubleToggle.addEventListener("change", ()=>{
    calc()
  })
}

document.getElementById("sauce1").value = ""
updateSaucePickerLabel("sauce1")
updateSauce2Visibility()

updateAddonUI()
ensureMainSwipeAction()
ensureSauce1SwipeAction()
refreshSwipeValueFlags()
updateSwipeHints()

calc()
}

function createAddonSelect(removable = true){
  const wrapper = document.createElement("div")
  wrapper.className = "addon-row"
  wrapper.classList.add("swipe-row")
  wrapper.dataset.swipeHintType = "addon"

  wrapper.style.display = "block"
  wrapper.style.marginTop = "8px"
  wrapper.style.position = "relative"
  wrapper.style.overflow = "visible"

  const display = document.createElement("div")
  display.className = "picker-field picker-field-fill picker-field--placeholder"
  display.textContent = "尚未選擇加料"
  display.onclick = (e)=>{
    e.stopPropagation()
    if(isPickerTapSuppressed()) return
    openAddonPicker(addonActiveGroup, wrapper)
  }

  const hiddenValue = document.createElement("input")
  hiddenValue.type = "hidden"
  hiddenValue.dataset.role = "addon-value"
  hiddenValue.value = ""

  wrapper.appendChild(display)
  wrapper.appendChild(hiddenValue)

  if(removable){
    wrapper.dataset.removable = "1"
    const actionBtn = document.createElement("button")
    actionBtn.type = "button"
    actionBtn.dataset.role = "swipe-action"
    actionBtn.className = "swipe-clear-btn"
    actionBtn.textContent = "Clear"
    wrapper.appendChild(actionBtn)
    attachSwipeToReveal(wrapper, ()=>{
      removeRowWithAnimation(wrapper, ()=>{
        updateAddonUI()
        calc()
      })
    }, ()=>{
      const hidden = wrapper.querySelector('input[data-role="addon-value"]')
      return !!(hidden && hidden.value)
    })
  }

  return wrapper
}

function setAddonValue(wrapper, value){
  const hidden = wrapper.querySelector('input[data-role="addon-value"]')
  const display = wrapper.firstElementChild
  if(!hidden || !display) return
  hidden.value = value || ""
  if(!value){
    display.textContent = "選擇加料"
    display.classList.add("picker-field--placeholder")
    return
  }
  const en = addonNameMap[value] || ""
  setBilingualPickerText(display, value, en)
  display.classList.remove("picker-field--placeholder")
  refreshSwipeValueFlags()
}

function addAddon(defaultValue = ""){
  haptic();
  const container = document.getElementById("addonList")
  if(!defaultValue){
    openAddonPicker(addonActiveGroup)
    return false
  }
  if(isAddonDuplicate(defaultValue)){
    return false
  }

  // Always allow remove (first add-on is now removable)
  const wrapper = createAddonSelect(true)
  setAddonValue(wrapper, defaultValue)

  container.appendChild(wrapper)
  updateAddonRowSpacing()
  animateRowEnter(wrapper)
  flashPickerSelection(wrapper.querySelector(".picker-field"))
  // First addon ever — show peek hint so user discovers swipe-to-delete
  const addonRows = document.querySelectorAll("#addonList .addon-row")
  if(addonRows.length === 1) maybePeekHint(wrapper, "addon")
  updateAddonUI()
  calc()
  return true
}

function updateAddonRowSpacing(){
  const rows = document.querySelectorAll("#addonList .addon-row")
  rows.forEach((row, idx)=>{
    row.style.marginTop = idx === 0 ? "6px" : "8px"
  })
}

function updateAddonUI(){
  const count = document.querySelectorAll("#addonList .addon-row").length
  const label = document.getElementById("addonLabel")
  const emptyPicker = document.getElementById("addonEmptyPicker")
  label.textContent = `Add-ons (${count})`
  if(emptyPicker){
    emptyPicker.style.display = "flex"
    emptyPicker.style.marginTop = count === 0 ? "6px" : "8px"
    emptyPicker.textContent = count === 0 ? "加入加料" : "再加一項"
    emptyPicker.classList.toggle("picker-field--placeholder", count === 0)
    emptyPicker.classList.add("picker-field--plus")
  }
  updateAddonRowSpacing()
  updateSectionClearButtons()
  refreshSwipeValueFlags()
  updateSwipeHints()
}

function getSauceDisplayText(value){
  if(!value) return "選擇醬料"
  const en = sauceNameMap[value] || ""
  return en ? `${value} ${en}` : value
}

function updateSauce2Visibility(){
  const sauce1Value = document.getElementById("sauce1").value
  const list = document.getElementById("sauce2List")
  const emptyPicker = document.getElementById("sauce2EmptyPicker")
  if(!list || !emptyPicker) return
  const wasVisible = emptyPicker.style.display !== "none"

  if(!sauce1Value){
    list.innerHTML = ""
    emptyPicker.style.display = "none"
    updateSectionClearButtons()
    refreshSwipeValueFlags()
    updateSwipeHints()
    return
  }

  const hasSecondSauceRow = list.children.length > 0
  const shouldShowPlus = !hasSecondSauceRow
  emptyPicker.style.display = shouldShowPlus ? "flex" : "none"
  if(shouldShowPlus && !wasVisible){
    animatePickerAppear(emptyPicker)
  }
  updateSectionClearButtons()
  refreshSwipeValueFlags()
  updateSwipeHints()
}

function updateSaucePickerLabel(target = "sauce1"){
  if(target === "sauce1"){
    const picker = document.getElementById("sauce1Picker")
    const value = document.getElementById("sauce1").value
    if(!picker) return
    if(!value){
      picker.textContent = getSauceDisplayText(value)
      picker.classList.remove("picker-field--bilingual-break")
      picker.classList.add("picker-field--placeholder")
      picker.classList.add("picker-field--plus")
      picker.classList.remove("picker-field-with-minus")
    } else {
      const en = sauceNameMap[value] || ""
      setBilingualPickerText(picker, value, en)
      picker.classList.remove("picker-field--placeholder")
      picker.classList.remove("picker-field--plus")
      picker.classList.remove("picker-field-with-minus")
    }
    updateSauce2Visibility()
    refreshSwipeValueFlags()
    return
  }

  const row = document.querySelector("#sauce2List .sauce-row")
  if(!row) return
  const hidden = row.querySelector('input[data-role="sauce-value"]')
  const display = row.querySelector('[data-role="sauce-display"]')
  const value = hidden ? hidden.value : ""
  if(display){
    if(!value){
      display.textContent = "選擇第二種醬"
      display.classList.remove("picker-field--bilingual-break")
      display.classList.add("picker-field--placeholder")
      display.classList.add("picker-field--plus")
      display.classList.remove("picker-field-with-minus")
    } else {
      const en = sauceNameMap[value] || ""
      setBilingualPickerText(display, value, en)
      display.classList.remove("picker-field--placeholder")
      display.classList.remove("picker-field--plus")
      display.classList.remove("picker-field-with-minus")
    }
  }
  updateSectionClearButtons()
  refreshSwipeValueFlags()
  updateSwipeHints()
}


function openSaucePicker(target = "sauce1"){
  const modal = document.getElementById("sauceModal")
  if(!modal) return

  saucePickerTarget = target
  modal.style.display = "block"
  renderSauceItems()

  modal.onclick = (e)=>{
    if(e.target.id === "sauceModal") modal.style.display = "none"
  }
}

function renderSauceItems(){
  const itemsEl = document.getElementById("sauceItems")
  if(!itemsEl) return

  itemsEl.innerHTML = ""

  const target = saucePickerTarget

  const sauce1Value = document.getElementById("sauce1").value
  const sauce2ValueInput = document.querySelector('#sauce2List input[data-role="sauce-value"]')
  const sauce2Value = sauce2ValueInput ? sauce2ValueInput.value : ""
  const selectedValue = target === "sauce1" ? sauce1Value : sauce2Value
  const otherSauceValue = target === "sauce2" ? sauce1Value : sauce2Value
  const isBlocked = (name)=> !!otherSauceValue && name === otherSauceValue && name !== selectedValue
  const sortedSauceNames = Object.keys(data.sauce)
    .sort((a,b)=> data.sauce[b].cal - data.sauce[a].cal)
  const recentSauceNames = getRecentItems("sauce", sortedSauceNames)
    .filter(name => !isBlocked(name))
  const showRecentShortcuts = recentSauceNames.length > 0

  if(!showRecentShortcuts && !sortedSauceNames.length){
    const empty = document.createElement("div")
    empty.style.padding = "14px 12px"
    empty.style.fontSize = "13px"
    empty.style.color = "#8e8e93"
    empty.textContent = "目前沒有可選醬料"
    itemsEl.appendChild(empty)
    return
  }
  const renderSauceItem = (name)=>{
    const div = document.createElement("div")
    div.style.padding = "12px"
    div.style.borderBottom = "1px solid #eee"
    div.style.cursor = "pointer"
    div.style.display = "flex"
    div.style.justifyContent = "space-between"
    div.style.alignItems = "center"
    const en = sauceNameMap[name] || ""
    const textWrap = document.createElement("div")
    textWrap.className = "modal-item-title"
    setBilingualModalTitle(textWrap, name, en)
    textWrap.style.paddingRight = "10px"
    const rightWrap = createModalMetaWrap(`${data.sauce[name].cal} kcal`, {
      showCheck: name === selectedValue
    })
    div.appendChild(textWrap)
    div.appendChild(rightWrap)

    if(isBlocked(name) || name === selectedValue){
      div.style.opacity = "0.45"
      div.style.cursor = "not-allowed"
    }

    div.onclick = ()=>{
      if(isBlocked(name) || name === selectedValue) return
      if(target === "sauce1"){
        document.getElementById("sauce1").value = name
      } else {
        const row = document.querySelector("#sauce2List .sauce-row")
        const hidden = row ? row.querySelector('input[data-role="sauce-value"]') : null
        if(hidden) hidden.value = name
      }
      saveRecentItem("sauce", name)
      updateSaucePickerLabel(target)
      flashPickerSelection(
        target === "sauce1"
          ? document.getElementById("sauce1Picker")
          : document.querySelector("#sauce2List .sauce-row [data-role='sauce-display']")
      )
      document.getElementById("sauceModal").style.display = "none"
      calc()
    }

    itemsEl.appendChild(div)
  }

  if(showRecentShortcuts){
    renderRecentShortcutSection(
      itemsEl,
      recentSauceNames,
      (name)=> name,
      (name)=>{
        if(isBlocked(name)) return
        if(target === "sauce1"){
          document.getElementById("sauce1").value = name
        } else {
          const row = document.querySelector("#sauce2List .sauce-row")
          const hidden = row ? row.querySelector('input[data-role="sauce-value"]') : null
          if(hidden) hidden.value = name
        }
        saveRecentItem("sauce", name)
        updateSaucePickerLabel(target)
        flashPickerSelection(
          target === "sauce1"
            ? document.getElementById("sauce1Picker")
            : document.querySelector("#sauce2List .sauce-row [data-role='sauce-display']")
        )
        document.getElementById("sauceModal").style.display = "none"
        calc()
      }
    )
  }

  sortedSauceNames.forEach(renderSauceItem)
}

function createSauceSelect(){
  const wrapper = document.createElement("div")
  wrapper.className = "sauce-row"
  wrapper.classList.add("swipe-row")
  wrapper.dataset.swipeHintType = "sauce"
  wrapper.onclick = ()=>{
    if(isPickerTapSuppressed()) return
    openSaucePicker("sauce2")
  }

  wrapper.style.display = "block"
  wrapper.style.marginTop = "8px"
  wrapper.style.position = "relative"

  const display = document.createElement("div")
  display.dataset.role = "sauce-display"
  display.className = "picker-field picker-field-fill picker-field--placeholder picker-field--plus"
  display.textContent = "選擇第二種醬"
  display.onclick = (e)=>{
    e.stopPropagation()
    if(isPickerTapSuppressed()) return
    openSaucePicker("sauce2")
  }

  const hiddenValue = document.createElement("input")
  hiddenValue.type = "hidden"
  hiddenValue.dataset.role = "sauce-value"
  hiddenValue.value = ""

  wrapper.appendChild(display)
  wrapper.appendChild(hiddenValue)
  const actionBtn = document.createElement("button")
  actionBtn.type = "button"
  actionBtn.dataset.role = "swipe-action"
  actionBtn.className = "swipe-clear-btn"
  actionBtn.textContent = "Clear"
  wrapper.appendChild(actionBtn)
  attachSwipeToReveal(wrapper, ()=>{
    removeRowWithAnimation(wrapper, ()=>{
      updateSauce2Visibility()
      calc()
    })
  }, ()=> !!hiddenValue.value)

  return wrapper
}

function addSauce2Internal(){
  const container = document.getElementById("sauce2List")
  const existingRow = container.querySelector(".sauce-row")
  if(existingRow){
    if(existingRow.classList.contains("removing")){
      setTimeout(()=> addSauce2Internal(), 200)
    }
    return
  }

  const item = createSauceSelect()
  container.appendChild(item)
  animateRowEnter(item)
  updateSauce2Visibility()

  openSaucePicker("sauce2")
}

function addSauce2(){
  if(isPickerTapSuppressed()) return
  addSauce2Internal()
}

function clearSauceSection(){
  const sauce1 = document.getElementById("sauce1")
  if(!sauce1) return

  const sauce2List = document.getElementById("sauce2List")
  sauce1.value = ""
  if(sauce2List) sauce2List.innerHTML = ""
  updateSaucePickerLabel("sauce1")
  refreshSwipeValueFlags()
  updateSwipeHints()
  animatePickerAppear(document.getElementById("sauce1Picker"))
  calc()
}

function clearSauce1Single(){
  const sauce1 = document.getElementById("sauce1")
  if(!sauce1) return
  const sauce2ValueInput = document.querySelector('#sauce2List input[data-role="sauce-value"]')
  const sauce2Value = sauce2ValueInput ? sauce2ValueInput.value : ""
  const sauce2List = document.getElementById("sauce2List")
  if(sauce2Value){
    sauce1.value = sauce2Value
  } else {
    sauce1.value = ""
  }
  if(sauce2List) sauce2List.innerHTML = ""
  updateSaucePickerLabel("sauce1")
  refreshSwipeValueFlags()
  updateSwipeHints()
  calc()
}

function ensureSauce1SwipeAction(){
  const row = document.getElementById("sauce1Row")
  if(!row || row.dataset.clearReady === "1") return
  row.dataset.clearReady = "1"
  row.classList.add("swipe-row")
  row.dataset.swipeHintType = "sauce"

  const actionBtn = document.createElement("button")
  actionBtn.type = "button"
  actionBtn.dataset.role = "swipe-action"
  actionBtn.className = "swipe-clear-btn"
  actionBtn.textContent = "Clear"
  row.appendChild(actionBtn)

  attachSwipeToReveal(row, ()=>{
    clearSauce1Single()
  }, ()=> !!document.getElementById("sauce1").value)
}

function clearAddonSection(){
  const addonList = document.getElementById("addonList")
  if(addonList) addonList.innerHTML = ""
  updateAddonUI()
  refreshSwipeValueFlags()
  updateSwipeHints()
  calc()
}

function updateSectionClearButtons(){
  const mainClearBtn = document.getElementById("mainClearBtn")
  const addonClearBtn = document.getElementById("addonClearBtn")
  const sauceClearBtn = document.getElementById("sauceClearBtn")
  const hasMain = !!document.getElementById("main").value
  const hasAddon = document.querySelectorAll("#addonList .addon-row").length > 0
  const hasSauce1 = !!document.getElementById("sauce1").value
  const hasSauce2 = !!document.querySelector('#sauce2List input[data-role="sauce-value"]')?.value

  if(mainClearBtn) mainClearBtn.style.visibility = hasMain ? "visible" : "hidden"
  if(addonClearBtn) addonClearBtn.style.visibility = hasAddon ? "visible" : "hidden"
  if(sauceClearBtn) sauceClearBtn.style.visibility = (hasSauce1 || hasSauce2) ? "visible" : "hidden"
  refreshSwipeValueFlags()
}

let lastCal = 0;
let lastProtein = 0;
let resultEnabled = false;
let resultMode = "";
let resultDetailsExpanded = false;
let lastMainForFeedback = "";
let saucePickerTarget = "sauce1"

function animateNumber(el, start, end, decimals=1, duration=300) {
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = start + (end - start) * progress;
    el.textContent = value.toFixed(decimals);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function showResultHint(){
  const resultEl = document.getElementById("result")
  if(resultMode !== "hint"){
    resultEl.innerHTML = `<div style="font-size:14px;line-height:1.4;color:#8e8e93;font-weight:500;letter-spacing:0.01em;">可選擇醬料，或留空不加醬 Sauce is optional</div>`
    resultMode = "hint"
  }
}

function showResultStats(summaryText, breakdownHtml){
  const resultEl = document.getElementById("result")
  if(resultMode !== "stats"){
    resultEl.innerHTML =
`<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
  <div style="font-size:20px;line-height:1.15;font-weight:600;">🔥 <span id="calVal">0.0</span> kcal</div>
  <button id="copyShareBtn" class="result-copy-btn" type="button" aria-label="複製結果 Copy result" title="複製結果 Copy result" onclick="copyResultSummary()">
    <span class="copy-icon-stack" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M12.5 2.5h5.2L22 6.8v10.1c0 1.44-1.16 2.6-2.6 2.6h-4.7v-2.2h4.3c.44 0 .8-.36.8-.8V8.3h-3.7c-.88 0-1.6-.72-1.6-1.6V3.9h-2c-.44 0-.8.36-.8.8v1.1h-2.2V5.1c0-1.43 1.17-2.6 2.6-2.6Z"/>
        <path fill="currentColor" d="M6.2 6.5h6.9L17 10.4v9.5c0 1.44-1.16 2.6-2.6 2.6H6.2A2.6 2.6 0 0 1 3.6 20V9.1c0-1.43 1.17-2.6 2.6-2.6Zm5.7 2.2v2.7c0 .88.72 1.6 1.6 1.6h2.3L11.9 8.7Z"/>
      </svg>
    </span>
    <span class="copy-icon-check" aria-hidden="true">✓</span>
  </button>
</div>
<div style="font-size:26px;line-height:1.12;color:#34c759;font-weight:700;margin-top:8px;"><span id="proVal">0</span> g protein</div>
<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px;">
  <div id="summaryLine" style="font-size:12px;color:#6e6e73;line-height:1.45;letter-spacing:0.01em;flex:1;"></div>
  <button id="detailToggleBtn" class="result-detail-btn" type="button" aria-label="詳細 Details" title="詳細 Details" aria-expanded="false" onclick="toggleResultDetails()">
    <span class="result-detail-icon">⌄</span>
  </button>
</div>
<div id="breakdownWrap" style="display:none;">
  <div id="breakdownLine" style="margin-top:10px;font-size:13px;color:#8e8e93;line-height:1.56;letter-spacing:0.01em;"></div>
</div>`
    resultMode = "stats"
    resultDetailsExpanded = false
  }

  const summaryEl = document.getElementById("summaryLine")
  const breakdownEl = document.getElementById("breakdownLine")
  const detailBtn = document.getElementById("detailToggleBtn")
  const breakdownWrap = document.getElementById("breakdownWrap")
  if(summaryEl) summaryEl.textContent = summaryText
  if(breakdownEl) breakdownEl.innerHTML = breakdownHtml
  if(detailBtn){
    detailBtn.classList.toggle("expanded", resultDetailsExpanded)
    detailBtn.setAttribute("aria-expanded", resultDetailsExpanded ? "true" : "false")
  }
  if(breakdownWrap) breakdownWrap.style.display = resultDetailsExpanded ? "block" : "none"
}

function toggleResultDetails(){
  resultDetailsExpanded = !resultDetailsExpanded
  const detailBtn = document.getElementById("detailToggleBtn")
  const breakdownWrap = document.getElementById("breakdownWrap")
  if(detailBtn){
    detailBtn.classList.toggle("expanded", resultDetailsExpanded)
    detailBtn.setAttribute("aria-expanded", resultDetailsExpanded ? "true" : "false")
  }
  if(breakdownWrap) breakdownWrap.style.display = resultDetailsExpanded ? "block" : "none"
}

function bindResultCardTap(){
  const resultEl = document.getElementById("result")
  if(!resultEl || resultEl.dataset.tapBound === "1") return
  resultEl.dataset.tapBound = "1"

  resultEl.addEventListener("click", (e)=>{
    if(resultMode !== "stats") return
    if(e.target.closest("#copyShareBtn")) return
    toggleResultDetails()
  })
}

function triggerResultPop(){
  const resultEl = document.getElementById("result")
  if(!resultEl) return
  resultEl.classList.remove("pop")
  void resultEl.offsetWidth
  resultEl.classList.add("pop")
}

function showCopyToast(text){
  let toast = document.getElementById("copyToast")
  if(!toast){
    toast = document.createElement("div")
    toast.id = "copyToast"
    toast.className = "copy-toast"
    document.body.appendChild(toast)
  }
  toast.textContent = text
  toast.classList.add("show")
  if(copyToastTimer) clearTimeout(copyToastTimer)
  copyToastTimer = setTimeout(()=>{
    toast.classList.remove("show")
  }, 1200)
}

function copyResultSummary(){
  if(!lastShareText) return

  const btn = document.getElementById("copyShareBtn")
  const setCopiedLabel = ()=>{
    if(!btn) return
    btn.classList.add("copied")
    if(copyShareResetTimer) clearTimeout(copyShareResetTimer)
    copyShareResetTimer = setTimeout(()=>{
      btn.classList.remove("copied")
    }, 1200)
  }

  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(lastShareText).then(setCopiedLabel).catch(()=>{})
    return
  }

  const ta = document.createElement("textarea")
  ta.value = lastShareText
  ta.style.position = "fixed"
  ta.style.opacity = "0"
  document.body.appendChild(ta)
  ta.focus()
  ta.select()
  try {
    document.execCommand("copy")
    setCopiedLabel()
  } catch (_) {
    // no-op
  }
  document.body.removeChild(ta)
}

function calc(){
let total = {cal:0, protein:0}
let breakdown = []
const resultEl = document.getElementById("result")

let main = document.getElementById("main").value
if(!main){
  resultEnabled = false
  resultMode = ""
  resultDetailsExpanded = false
  lastMainForFeedback = ""
  lastCal = 0
  lastProtein = 0
  if(resultEl){
    resultEl.classList.remove("active")
    resultEl.classList.remove("pop")
    resultEl.style.opacity = "0"
    resultEl.style.visibility = "hidden"
  }
  return
}

if(main && data.main[main]){
  total.cal += data.main[main].cal
  total.protein += data.main[main].protein
  breakdown.push(`${main}: ${data.main[main].cal} kcal`)
}

if(document.getElementById("double").checked && main){
  const doubleMeatKey = doubleMeatMap[main] || main
  const doubleMeatData = data.addon[doubleMeatKey]
  if(doubleMeatData){
    total.cal += doubleMeatData.cal
    total.protein += doubleMeatData.protein
    breakdown.push(`雙份肉 ${main}: ${doubleMeatData.cal} kcal`)
  }
}

const addonRows = document.querySelectorAll("#addonList .addon-row")
const selectedAddonNames = []

addonRows.forEach(row=>{
  const hidden = row.querySelector('input[data-role="addon-value"]')
  let name = hidden ? hidden.value : ""
  if(name && data.addon[name]){
    selectedAddonNames.push(name)
    total.cal += data.addon[name].cal
    total.protein += data.addon[name].protein
    breakdown.push(`${name}: ${data.addon[name].cal} kcal`)
  }
})

let sauce1 = document.getElementById("sauce1").value
const sauce2ValueInput = document.querySelector('#sauce2List input[data-role="sauce-value"]')
let sauce2 = sauce2ValueInput ? sauce2ValueInput.value : ""
const sauce2Visible = !!sauce2ValueInput

if(sauce1 && sauce2Visible && sauce2){
  // both sauces → each half
  total.cal += data.sauce[sauce1].cal / 2
  total.cal += data.sauce[sauce2].cal / 2
  breakdown.push(`${sauce1}: ${data.sauce[sauce1].cal / 2} kcal`)
  breakdown.push(`${sauce2}: ${data.sauce[sauce2].cal / 2} kcal`)
} else if(sauce1){
  total.cal += data.sauce[sauce1].cal
  breakdown.push(`${sauce1}: ${data.sauce[sauce1].cal} kcal`)
}

const selectedSauceCount = (sauce1 ? 1 : 0) + (sauce2 ? 1 : 0)
const isDoubleMeat = document.getElementById("double").checked
const mainPortions = isDoubleMeat ? 2 : 1
const summaryText = `主餐 ${mainPortions} 份 + 加料 ${selectedAddonNames.length} 份 + 醬料 ${selectedSauceCount} 種`
showResultStats(summaryText, breakdown.join("<br>"))
const mainChanged = main !== lastMainForFeedback

const sauceShareText = []
if(sauce1) sauceShareText.push(getSauceDisplayText(sauce1))
if(sauce2) sauceShareText.push(getSauceDisplayText(sauce2))
if(!sauceShareText.length) sauceShareText.push("不加醬 No sauce")

const zhMainBase = `6吋${main}${isDoubleMeat ? "雙份肉" : ""}`
const zhAddon = selectedAddonNames.map(compactZhShareName).join(" + ")
const zhMainWithAddon = zhAddon ? `${zhMainBase} + ${zhAddon}` : zhMainBase
const zhSauce = sauce1
  ? [sauce1, sauce2].filter(Boolean).join(" + ")
  : "不加醬"

const mainEn = mainNameMap[main] || main
const enAddon = selectedAddonNames
  .map(name => addonNameMap[name] || name)
  .join(" + ")
const enMainWithAddon = `${`6" ${mainEn}`}${isDoubleMeat ? " double meat" : ""}${enAddon ? ` + ${enAddon}` : ""}`
const enSauce = sauce1
  ? [sauce1, sauce2].filter(Boolean).map(name => sauceNameMap[name] || name).join(" + ")
  : "No sauce"

const metricLine = `${formatKcal(total.cal)} kcal | ${formatProtein(total.protein)} g`
const zhShareLine = `${zhMainWithAddon} | ${zhSauce}`
const enShareLine = `${enMainWithAddon} | ${enSauce}`

lastShareText =
`${metricLine}
${zhShareLine}
${enShareLine}`

const calEl = document.getElementById("calVal")
const proEl = document.getElementById("proVal")

const calDecimals = (Math.round(total.cal * 10) % 10 === 0) ? 0 : 1
animateNumber(calEl, lastCal, total.cal, calDecimals)
animateNumber(proEl, lastProtein, total.protein, 0)

lastCal = total.cal
lastProtein = total.protein
lastMainForFeedback = main

  resultEnabled = true

  // Ensure result is visible when calculated
  resultEl.style.visibility = "visible"
  resultEl.classList.add("active")
  setTimeout(() => resultEl.classList.remove("active"), 600)
  if(mainChanged){
    triggerResultPop()
    if (navigator.vibrate) navigator.vibrate(5)
  }
  updateResultVisibility()
}

function attachSwipeToDismiss(panel, closeFn) {
  if (!panel || panel.dataset.swipeDismissReady === "1") return
  panel.dataset.swipeDismissReady = "1"

  const grabberWrap = panel.querySelector(".sheet-grabber-wrap")
  const itemsEl = panel.querySelector(".modal-items")
  const THRESHOLD = 88, VELOCITY = 0.42

  // Each drag sequence is fully self-contained — touchmove/touchend are
  // captured on document so iOS cannot intercept them mid-gesture.
  function startDrag(startClientY) {
    let currentY = startClientY
    let startTime = Date.now()
    let isDragging = false

    panel.style.transition = "none"

    function onMove(e) {
      currentY = e.touches[0].clientY
      const dy = currentY - startClientY
      if (!isDragging) {
        if (dy > 6)       isDragging = true
        else if (dy < -4) { finish(); return }
        else              return
      }
      if (isDragging) e.preventDefault()
      panel.style.transform = `translateY(${Math.max(0, dy)}px)`
    }

    function finish() {
      document.removeEventListener("touchmove", onMove)
      document.removeEventListener("touchend",  finish)
      document.removeEventListener("touchcancel", finish)
      const dy  = currentY - startClientY
      const vel = dy / Math.max(1, Date.now() - startTime)
      panel.style.transition = "transform 0.26s cubic-bezier(.22,.61,.36,1)"
      if (isDragging && (dy > THRESHOLD || vel > VELOCITY)) {
        panel.style.transform = "translateY(110%)"
        setTimeout(() => { panel.style.transform = ""; panel.style.transition = ""; closeFn() }, 260)
      } else {
        panel.style.transform = ""
        setTimeout(() => { panel.style.transition = "" }, 260)
      }
    }

    document.addEventListener("touchmove",   onMove,  { passive: false })
    document.addEventListener("touchend",    finish)
    document.addEventListener("touchcancel", finish)
  }

  // ── Grabber: passive:false so e.preventDefault() is allowed ──
  if (grabberWrap) {
    grabberWrap.addEventListener("touchstart", (e) => {
      e.preventDefault()
      startDrag(e.touches[0].clientY)
    }, { passive: false })

    // Desktop mouse drag
    grabberWrap.addEventListener("mousedown", (e) => {
      e.preventDefault()
      const sy = e.clientY
      let cy = e.clientY
      panel.style.transition = "none"
      const mm = (ev) => { cy = ev.clientY; const dy = cy - sy; if (dy > 0) panel.style.transform = `translateY(${dy}px)` }
      const mu = () => {
        document.removeEventListener("mousemove", mm)
        document.removeEventListener("mouseup",   mu)
        const dy = cy - sy
        panel.style.transition = "transform 0.26s cubic-bezier(.22,.61,.36,1)"
        if (dy > THRESHOLD) {
          panel.style.transform = "translateY(110%)"
          setTimeout(() => { panel.style.transform = ""; panel.style.transition = ""; closeFn() }, 260)
        } else {
          panel.style.transform = ""
          setTimeout(() => { panel.style.transition = "" }, 260)
        }
      }
      document.addEventListener("mousemove", mm)
      document.addEventListener("mouseup",   mu)
    })
  }

  // ── Items area: trigger when already scrolled to top ──
  if (itemsEl) {
    itemsEl.addEventListener("touchstart", (e) => {
      if (itemsEl.scrollTop === 0) startDrag(e.touches[0].clientY)
    }, { passive: true })
  }
}

function initSwipeToDismiss() {
  const configs = [
    { panelId: "mainModal",       closeFn: () => document.getElementById("mainModal").style.display = "none" },
    { panelId: "addonModal",      closeFn: () => document.getElementById("addonModal").style.display = "none" },
    { panelId: "sauceModal",      closeFn: () => document.getElementById("sauceModal").style.display = "none" },
    { panelId: "quickSearchModal",closeFn: () => closeQuickSearch() },
  ]
  configs.forEach(({ panelId, closeFn }) => {
    const panel = document.querySelector(`#${panelId} .sheet-panel`)
    attachSwipeToDismiss(panel, closeFn)
  })
}

init()
bindResultCardTap()
updateSectionClearButtons()
ensureSauce1SwipeAction()
initSwipeToDismiss()

function updateResultVisibility(){
  const resultEl = document.getElementById("result")
  const shell = document.querySelector(".app-shell")

  if(!resultEnabled){
    resultEl.style.opacity = "0"
    resultEl.style.visibility = "hidden"
    resultEl.style.pointerEvents = "none"
    shell?.classList.remove("has-result")
    return
  }

  resultEl.style.opacity = "1"
  resultEl.style.visibility = "visible"
  resultEl.style.pointerEvents = "auto"
  shell?.classList.add("has-result")
}


window.addEventListener("scroll", () => {
  const logo = document.querySelector(".logo")
  const y = window.scrollY

  updateResultVisibility()

  if(y > 10){
    logo.style.transform = "scale(0.95)"
    logo.style.opacity = "0.9"
  } else {
    logo.style.transform = "scale(1)"
    logo.style.opacity = "1"
  }
})

function resetAll(){
  document.body.classList.add("resetting")
  setTimeout(()=> document.body.classList.remove("resetting"), 360)
  const resetBtn = document.querySelector(".reset-btn")
  if(resetBtn){
    resetBtn.classList.remove("animating")
    void resetBtn.offsetWidth
    resetBtn.classList.add("animating")
  }

  const main = document.getElementById("main")
  main.value = ""
  updateMainPickerLabel()

  document.getElementById("double").checked = false
  document.getElementById("addonList").innerHTML = ""
  addonActiveGroup = Object.keys(addonGroups)[0] || ""

  const sauce1 = document.getElementById("sauce1")
  sauce1.value = ""
  updateSaucePickerLabel("sauce1")
  updateSauce2Visibility()
  const sauce2List = document.getElementById("sauce2List")
  sauce2List.innerHTML = ""
  updateSauce2Visibility()

  lastCal = 0
  lastProtein = 0
  resultMode = ""
  resultDetailsExpanded = false
  lastMainForFeedback = ""

  const addonModal = document.getElementById("addonModal")
  const mainModal = document.getElementById("mainModal")
  const sauceModal = document.getElementById("sauceModal")
  const quickSearchModal = document.getElementById("quickSearchModal")
  if(addonModal) addonModal.style.display = "none"
  if(mainModal) mainModal.style.display = "none"
  if(sauceModal) sauceModal.style.display = "none"
  if(quickSearchModal) quickSearchModal.style.display = "none"

  updateAddonUI()
  updateSectionClearButtons()
  calc()
}
