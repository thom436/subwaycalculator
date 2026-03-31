
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
"義式煙燻臘腸(1片)":{cal:20,protein:1},
"鮪魚":{cal:257,protein:12},
"酪梨泥(1球)":{cal:24,protein:1},
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

const mainSeedGroups = {
  "雞肉系": ["照燒雞肉","鮮嫩雞柳","香烤雞肉","嫩切雞肉"],
  "牛肉系": ["厚切嫩牛","燒烤牛肉","墨西哥辣牛","義大利牛肉丸"],
  "豬肉冷切系": ["火腿","百味俱樂部","義大利經典","哈燒起司總匯","墨西哥手撕豬"],
  "海鮮蛋素食": ["鮪魚","蛋沙拉","鷹嘴豆泥餅","素食蔬菜"]
}

const addonSeedGroups = {
  "雞肉": ["鮮嫩雞柳","嫩切雞肉(3片)","嫩切雞肉(1片)","香烤雞肉","照燒雞肉"],
  "牛肉": ["厚切嫩牛","燒烤牛肉(3片/59g)","燒烤牛肉(1片/19.5g)","墨西哥辣牛","辣豆瓣嫩牛","義大利牛肉丸"],
  "豬肉冷切": ["火腿(4片)","火腿(1片)","墨西哥手撕豬","義大利經典","百味俱樂部","哈燒起司總匯","義式辣香腸(1片)","義式煙燻臘腸(1片)","培根(1條)"],
  "起司蛋配料": ["切絲巧達起司","英式切片起司(2片)","嫩煎蛋(1片)","酪梨泥(1球)","蛋沙拉(1球)","蛋沙拉(2球)"],
  "海鮮素食": ["鮪魚","鷹嘴豆泥餅(1顆)","鷹嘴豆泥餅(3顆)"]
}

let mainGroups = {}
let mainActiveGroup = ""

function updateMainPickerLabel(){
  const value = document.getElementById("main").value
  const picker = document.getElementById("mainPicker")
  if(!picker) return

  if(!value){
    picker.textContent = "尚未選擇口味 · Choose flavor"
    picker.style.color = "#8e8e93"
    return
  }

  const en = mainNameMap[value] || ""
  const cal = data.main[value] ? data.main[value].cal : null
  const baseLabel = en ? `${value} ${en}` : value
  picker.textContent = cal !== null ? `${baseLabel} · ${cal} kcal` : baseLabel
  picker.style.color = "#000"
}

function openMainPicker(defaultGroup = ""){
  const modal = document.getElementById("mainModal")
  const catEl = document.getElementById("mainModalCategories")
  const itemsEl = document.getElementById("mainItems")

  if(!modal || !catEl || !itemsEl) return

  modal.style.display = "block"
  catEl.innerHTML = ""
  itemsEl.innerHTML = ""

  const groupNames = Object.keys(mainGroups).filter(g => (mainGroups[g] || []).length > 0)
  if(!groupNames.length) return

  const selectedGroup = defaultGroup && groupNames.includes(defaultGroup)
    ? defaultGroup
    : (groupNames.includes(mainActiveGroup) ? mainActiveGroup : groupNames[0])
  mainActiveGroup = selectedGroup

  groupNames.forEach((g)=>{
    const btn = document.createElement("button")
    btn.textContent = g
    btn.style.padding = "8px 12px"
    btn.style.borderRadius = "999px"
    btn.style.border = "1px solid #ddd"
    btn.style.background = g===selectedGroup ? "#34c759" : "#fff"
    btn.style.color = g===selectedGroup ? "#fff" : "#000"

    btn.onclick = ()=>{
      mainActiveGroup = g
      document.querySelectorAll("#mainModalCategories button").forEach(b=>{
        b.style.background="#fff"
        b.style.color="#000"
      })
      btn.style.background="#34c759"
      btn.style.color="#fff"
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
  itemsEl.innerHTML = ""

  const sortedNames = [...(mainGroups[group] || [])]
    .filter(name => !!data.main[name])
    .sort((a,b)=> data.main[a].cal - data.main[b].cal)

  sortedNames.forEach(name=>{
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
    textWrap.textContent = en ? `${name} ${en}` : name
    textWrap.style.paddingRight = "10px"

    const meta = document.createElement("div")
    meta.textContent = `${data.main[name].cal} kcal`
    meta.style.fontSize = "12px"
    meta.style.color = "#8e8e93"
    meta.style.whiteSpace = "nowrap"

    div.appendChild(textWrap)
    div.appendChild(meta)

    div.onclick = ()=>{
      const mainSelect = document.getElementById("main")
      mainSelect.value = name
      updateMainPickerLabel()
      document.getElementById("mainModal").style.display="none"
      calc()
    }

    itemsEl.appendChild(div)
  })
}

const addonNameMap = {
  "嫩切雞肉(3片)":"Chicken Sliced (3 slices)",
  "嫩切雞肉(1片)":"Chicken Sliced (1 slice)",
  "照燒雞肉":"Chicken Teriyaki",
  "鮮嫩雞柳":"Chicken Strips",
  "香烤雞肉":"Oven Roasted Chicken Breast",
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

  modal.style.display = "block"
  catEl.innerHTML = ""
  itemsEl.innerHTML = ""

  const groupNames = Object.keys(addonGroups).filter(g => (addonGroups[g] || []).length > 0)
  if(!groupNames.length) return
  const selectedGroup = defaultGroup && groupNames.includes(defaultGroup)
    ? defaultGroup
    : (groupNames.includes(addonActiveGroup) ? addonActiveGroup : groupNames[0])
  addonActiveGroup = selectedGroup

  groupNames.forEach((g)=>{
    const btn = document.createElement("button")
    btn.textContent = g
    btn.style.padding = "8px 12px"
    btn.style.borderRadius = "999px"
    btn.style.border = "1px solid #ddd"
    btn.style.background = g===selectedGroup ? "#34c759" : "#fff"
    btn.style.color = g===selectedGroup ? "#fff" : "#000"

    btn.onclick = ()=>{
      addonActiveGroup = g
      document.querySelectorAll("#addonModalCategories button").forEach(b=>{
        b.style.background="#fff"
        b.style.color="#000"
      })
      btn.style.background="#34c759"
      btn.style.color="#fff"
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
  itemsEl.innerHTML = ""
  const selected = new Set(getSelectedAddonValues(addonPickerTargetHidden))
  const editingCurrentValue = addonPickerTargetHidden ? addonPickerTargetHidden.value : ""

  addonGroups[group].forEach(name=>{
    if(!data.addon[name]) return;

    const div = document.createElement("div")
    div.style.padding = "12px"
    div.style.borderBottom = "1px solid #eee"
    div.style.cursor = "pointer"

    const en = addonNameMap[name] || ""
    div.textContent = en ? `${name} ${en}` : name
    const alreadySelected = selected.has(name)
    if(alreadySelected){
      div.style.opacity = "0.45"
      div.style.cursor = "not-allowed"
    } else if(editingCurrentValue && name === editingCurrentValue){
      div.style.background = "#f2fdf6"
    }

    div.onclick = ()=>{
      if(alreadySelected) return
      if(addonPickerTargetRow){
        setAddonValue(addonPickerTargetRow, name)
        document.getElementById("addonModal").style.display = "none"
        calc()
        return
      }
      const added = addAddon(name)
      if(!added) return
      document.getElementById("addonModal").style.display = "none"
    }
    itemsEl.appendChild(div)
  })
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

const firstGroup = mainActiveGroup
if(firstGroup && mainGroups[firstGroup] && mainGroups[firstGroup][0]){
  main.value = mainGroups[firstGroup][0]
}
updateMainPickerLabel()


document.getElementById("sauce1").value = ""
updateSaucePickerLabel("sauce1")

updateAddonUI()

calc()
}

function createAddonSelect(removable = true){
  const wrapper = document.createElement("div")
  wrapper.className = "addon-row"
  // Touch swipe-to-remove for mobile
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let isSwiping = false;

  wrapper.addEventListener("touchstart", (e) => {
    if (wrapper.dataset.dragging === "1") return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = false;
  });

  wrapper.addEventListener("touchmove", (e) => {
    if (wrapper.dataset.dragging === "1") return;
    currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const diffX = currentX - startX;
    const diffY = currentY - startY;

    // only trigger swipe if horizontal movement is dominant
    if (!isSwiping) {
      if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
        isSwiping = true;
      } else {
        return;
      }
    }

    e.preventDefault();

    if (diffX < 0) {
      wrapper.style.transform = `translateX(${diffX}px)`;
      wrapper.style.opacity = Math.max(0.5, 1 + diffX / 200);
    }
  });

  wrapper.addEventListener("touchend", (e) => {
    if (wrapper.dataset.dragging === "1") return;
    const diff = currentX - startX;

    if (!isSwiping) {
      startX = 0;
      currentX = 0;
      return;
    }

    if (diff < -80) {
      wrapper.style.transition = "all 0.2s ease";
      wrapper.style.transform = "translateX(-120%)";
      wrapper.style.opacity = "0";

      setTimeout(() => {
        wrapper.remove();
        updateAddonUI();
        calc();
      }, 200);
    } else {
      wrapper.style.transition = "all 0.2s ease";
      wrapper.style.transform = "translateX(0)";
      wrapper.style.opacity = "1";
    }

    isSwiping = false;
    startX = 0;
    currentX = 0;
  });

  wrapper.style.display = "flex"
  wrapper.style.alignItems = "center"
  wrapper.style.gap = "8px"
  wrapper.style.marginTop = "8px"
  wrapper.style.position = "relative"
  wrapper.style.overflow = "visible"

  const display = document.createElement("div")
  display.style.flex = "1"
  display.style.marginTop = "12px"
  display.style.padding = "14px"
  display.style.borderRadius = "14px"
  display.style.border = "1px solid #e5e5ea"
  display.style.background = "#f9f9f9"
  display.style.color = "#000"
  display.style.fontSize = "17px"
  display.style.lineHeight = "1.4"
  display.style.minHeight = "48px"
  display.style.fontWeight = "400"
  display.style.position = "relative"
  display.style.zIndex = "1"
  display.style.display = "flex"
  display.style.alignItems = "center"
  display.style.cursor = "pointer"
  display.textContent = "尚未選擇加料"
  display.onclick = ()=>{
    openAddonPicker(addonActiveGroup, wrapper)
  }

  const hiddenValue = document.createElement("input")
  hiddenValue.type = "hidden"
  hiddenValue.dataset.role = "addon-value"
  hiddenValue.value = ""

  wrapper.appendChild(display)
  wrapper.appendChild(hiddenValue)

  if(removable){
    const controls = document.createElement("div")
    controls.style.display = "flex"
    controls.style.gap = "6px"
    controls.style.alignItems = "center"

    const dragBtn = document.createElement("button")
    dragBtn.textContent = "≡"
    dragBtn.dataset.role = "drag-addon"
    dragBtn.style.border = "none"
    dragBtn.style.background = "#e5e5ea"
    dragBtn.style.borderRadius = "50%"
    dragBtn.style.width = "28px"
    dragBtn.style.height = "28px"
    dragBtn.style.display = "flex"
    dragBtn.style.alignItems = "center"
    dragBtn.style.justifyContent = "center"
    dragBtn.style.fontSize = "15px"
    dragBtn.style.cursor = "grab"
    dragBtn.style.color = "#1c1c1e"
    dragBtn.style.transition = "all 0.15s ease"
    dragBtn.style.opacity = "0.7"
    dragBtn.style.touchAction = "none"
    dragBtn.onpointerdown = (e) => {
      startAddonDrag(e, wrapper)
    }

    const removeBtn = document.createElement("button")
    removeBtn.textContent = "−"
    removeBtn.dataset.role = "remove-addon"
    removeBtn.style.border = "none"
    removeBtn.style.background = "#e5e5ea"
    removeBtn.style.borderRadius = "50%"
    removeBtn.style.width = "28px"
    removeBtn.style.height = "28px"
    removeBtn.style.display = "flex"
    removeBtn.style.alignItems = "center"
    removeBtn.style.justifyContent = "center"
    removeBtn.style.fontSize = "18px"
    removeBtn.style.cursor = "pointer"
    removeBtn.style.color = "#1c1c1e"
    removeBtn.style.transition = "all 0.15s ease"
    removeBtn.style.opacity = "0.6"

    removeBtn.onclick = (e) => {
      e.stopPropagation();
      wrapper.remove()
      updateAddonUI()
      calc()
    }

    controls.appendChild(dragBtn)
    controls.appendChild(removeBtn)
    wrapper.appendChild(controls)
  }

  return wrapper
}

function setAddonValue(wrapper, value){
  const hidden = wrapper.querySelector('input[data-role="addon-value"]')
  const display = wrapper.firstElementChild
  if(!hidden || !display) return
  hidden.value = value || ""
  if(!value){
    display.textContent = "尚未選擇加料"
    display.style.color = "#8e8e93"
    return
  }
  const en = addonNameMap[value] || ""
  display.textContent = en ? `${value} ${en}` : value
  display.style.color = "#000"
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
  updateAddonUI()
  calc()
  return true
}

function updateAddonUI(){
  const count = document.querySelectorAll("#addonList .addon-row").length
  const label = document.getElementById("addonLabel")
  const empty = document.getElementById("addonEmpty")
  label.textContent = `Add-ons (${count})`
  empty.style.display = count ? "none" : "block"

  // show swipe hint only when there are add-ons
  const hint = document.getElementById("swipeHint")
  if (hint) {
    hint.style.display = count ? "block" : "none"
  }
}

function startAddonDrag(e, wrapper){
  if(!e || !wrapper) return
  const container = document.getElementById("addonList")
  if(!container) return

  e.preventDefault()
  e.stopPropagation()
  wrapper.dataset.dragging = "1"
  wrapper.style.opacity = "0.8"
  wrapper.style.zIndex = "3"

  const startY = e.clientY
  let currentY = e.clientY

  const onMove = (ev) => {
    ev.preventDefault()
    currentY = ev.clientY
    const diffY = currentY - startY
    wrapper.style.transform = `translateY(${diffY}px)`

    const rows = Array.from(container.querySelectorAll(".addon-row")).filter(r => r !== wrapper)
    const target = rows.find(row => {
      const rect = row.getBoundingClientRect()
      return currentY < rect.top + rect.height / 2
    })

    if(target){
      container.insertBefore(wrapper, target)
    } else {
      container.appendChild(wrapper)
    }
  }

  const onUp = () => {
    wrapper.style.transform = "none"
    wrapper.style.opacity = "1"
    wrapper.style.zIndex = "1"
    delete wrapper.dataset.dragging
    document.removeEventListener("pointermove", onMove)
    document.removeEventListener("pointerup", onUp)
    calc()
  }

  document.addEventListener("pointermove", onMove, { passive:false })
  document.addEventListener("pointerup", onUp)
}

function getSauceDisplayText(value){
  if(value === "__NONE__") return "不加醬 · No sauce"
  if(!value) return "尚未選擇醬料 · Choose sauce"
  const en = sauceNameMap[value] || ""
  return en ? `${value} ${en}` : value
}

function updateSaucePickerLabel(target = "sauce1"){
  if(target === "sauce1"){
    const picker = document.getElementById("sauce1Picker")
    const value = document.getElementById("sauce1").value
    if(!picker) return
    picker.textContent = getSauceDisplayText(value)
    picker.style.color = value ? "#000" : "#8e8e93"
    return
  }

  const row = document.querySelector("#sauce2List .sauce-row")
  if(!row) return
  const hidden = row.querySelector('input[data-role="sauce-value"]')
  const display = row.querySelector('[data-role="sauce-display"]')
  const value = hidden ? hidden.value : ""
  if(display){
    display.textContent = getSauceDisplayText(value)
    display.style.color = value ? "#000" : "#8e8e93"
  }
}

function openSaucePicker(target = "sauce1"){
  const modal = document.getElementById("sauceModal")
  const itemsEl = document.getElementById("sauceItems")
  if(!modal || !itemsEl) return

  modal.style.display = "block"
  itemsEl.innerHTML = ""

  const sauce1Value = document.getElementById("sauce1").value
  const sauce2ValueInput = document.querySelector('#sauce2List input[data-role="sauce-value"]')
  const sauce2Value = sauce2ValueInput ? sauce2ValueInput.value : ""
  const selectedValue = target === "sauce1" ? sauce1Value : sauce2Value
  const normalizedSauce1 = sauce1Value === "__NONE__" ? "" : sauce1Value
  const normalizedSauce2 = sauce2Value === "__NONE__" ? "" : sauce2Value
  const otherSauceValue = target === "sauce2" ? normalizedSauce1 : normalizedSauce2
  const isBlocked = (name)=> !!otherSauceValue && name === otherSauceValue && name !== selectedValue

  if(target === "sauce1"){
    const noneRow = document.createElement("div")
    noneRow.style.padding = "12px"
    noneRow.style.borderBottom = "1px solid #eee"
    noneRow.style.cursor = "pointer"
    noneRow.textContent = "不加醬 · No sauce"
    if(selectedValue === "__NONE__"){
      noneRow.style.background = "#f2fdf6"
    }
    noneRow.onclick = ()=>{
      document.getElementById("sauce1").value = "__NONE__"
      const sauce2List = document.getElementById("sauce2List")
      if(sauce2List) sauce2List.innerHTML = ""
      const sauce2Btn = document.getElementById("sauce2Btn")
      if(sauce2Btn) sauce2Btn.style.display = "inline-block"
      updateSaucePickerLabel("sauce1")
      modal.style.display = "none"
      calc()
    }
    itemsEl.appendChild(noneRow)
  }

  Object.keys(data.sauce).forEach(name=>{
    const div = document.createElement("div")
    div.style.padding = "12px"
    div.style.borderBottom = "1px solid #eee"
    div.style.cursor = "pointer"
    const en = sauceNameMap[name] || ""
    div.textContent = en ? `${name} ${en}` : name

    if(isBlocked(name)){
      div.style.opacity = "0.45"
      div.style.cursor = "not-allowed"
    } else if(name === selectedValue){
      div.style.background = "#f2fdf6"
    }

    div.onclick = ()=>{
      if(isBlocked(name)) return
      if(target === "sauce1"){
        document.getElementById("sauce1").value = name
      } else {
        const row = document.querySelector("#sauce2List .sauce-row")
        const hidden = row ? row.querySelector('input[data-role="sauce-value"]') : null
        if(hidden) hidden.value = name
      }
      updateSaucePickerLabel(target)
      modal.style.display = "none"
      calc()
    }

    itemsEl.appendChild(div)
  })

  modal.onclick = (e)=>{
    if(e.target.id === "sauceModal") modal.style.display = "none"
  }
}

function createSauceSelect(){
  const wrapper = document.createElement("div")
  wrapper.className = "sauce-row"

  let startX = 0, startY = 0, currentX = 0, isSwiping = false;

  wrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = false;
  });

  wrapper.addEventListener("touchmove", (e) => {
    currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;

    if (!isSwiping) {
      if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
        isSwiping = true;
      } else return;
    }

    e.preventDefault();

    if (diffX < 0) {
      wrapper.style.transform = `translateX(${diffX}px)`;
      wrapper.style.opacity = Math.max(0.5, 1 + diffX / 200);
    }
  });

  wrapper.addEventListener("touchend", () => {
    const diff = currentX - startX;

    if (isSwiping && diff < -80) {
      wrapper.style.transition = "all 0.2s ease";
      wrapper.style.transform = "translateX(-120%)";
      wrapper.style.opacity = "0";

      setTimeout(() => {
        wrapper.remove();

        // restore button after swipe delete
        const btn = document.getElementById("sauce2Btn")
        if(btn) btn.style.display = "inline-block"

        calc();
      }, 200);
    } else {
      wrapper.style.transition = "all 0.2s ease";
      wrapper.style.transform = "translateX(0)";
      wrapper.style.opacity = "1";
    }

    isSwiping = false;
    startX = 0;
    currentX = 0;
  });

  wrapper.style.display = "flex"
  wrapper.style.alignItems = "center"
  wrapper.style.gap = "8px"
  wrapper.style.marginTop = "8px"

  const display = document.createElement("div")
  display.dataset.role = "sauce-display"
  display.style.flex = "1"
  display.style.padding = "14px"
  display.style.borderRadius = "14px"
  display.style.border = "1px solid #e5e5ea"
  display.style.background = "#f9f9f9"
  display.style.color = "#8e8e93"
  display.style.fontSize = "17px"
  display.style.lineHeight = "1.4"
  display.style.minHeight = "48px"
  display.style.display = "flex"
  display.style.alignItems = "center"
  display.style.cursor = "pointer"
  display.textContent = "尚未選擇醬料 · Choose sauce"
  display.onclick = ()=>{
    openSaucePicker("sauce2")
  }

  const hiddenValue = document.createElement("input")
  hiddenValue.type = "hidden"
  hiddenValue.dataset.role = "sauce-value"
  hiddenValue.value = ""

  const removeBtn = document.createElement("button")
  removeBtn.textContent = "−"
  removeBtn.style.border = "none"
  removeBtn.style.background = "#e5e5ea"
  removeBtn.style.borderRadius = "50%"
  removeBtn.style.width = "28px"
  removeBtn.style.height = "28px"
  removeBtn.style.display = "flex"
  removeBtn.style.alignItems = "center"
  removeBtn.style.justifyContent = "center"
  removeBtn.style.fontSize = "18px"

removeBtn.onclick = (e)=>{
  e.stopPropagation()
  wrapper.remove()

  // 🔥 顯示按鈕
  const btn = document.getElementById("sauce2Btn")
  if(btn) btn.style.display = "inline-block"

  calc()
}

  wrapper.appendChild(display)
  wrapper.appendChild(hiddenValue)
  wrapper.appendChild(removeBtn)

  return wrapper
}

function addSauce2(){
  const container = document.getElementById("sauce2List")
  if(container.children.length > 0) return

  const item = createSauceSelect()
  container.appendChild(item)

  // 🔥 隱藏按鈕
  const btn = document.getElementById("sauce2Btn")
  if(btn) btn.style.display = "none"

  openSaucePicker("sauce2")
}

let lastCal = 0;
let lastProtein = 0;
let resultEnabled = false;
let resultMode = "";

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
    resultEl.innerHTML = `<div style="font-size:14px;color:#8e8e93;font-weight:500;">請先選擇醬料或不加醬 · Choose sauce or no sauce</div>`
    resultMode = "hint"
  }
}

function showResultStats(summaryText, breakdownHtml){
  const resultEl = document.getElementById("result")
  if(resultMode !== "stats"){
    resultEl.innerHTML =
`<div style="font-size:20px;font-weight:600;">🔥 <span id="calVal">0.0</span> kcal</div>
<div style="font-size:26px;color:#34c759;font-weight:700;margin-top:6px;"><span id="proVal">0</span> g protein</div>
<div id="summaryLine" style="margin-top:8px;font-size:12px;color:#6e6e73;line-height:1.4;"></div>
<div id="breakdownLine" style="margin-top:10px;font-size:13px;color:#8e8e93;line-height:1.5;"></div>`
    resultMode = "stats"
  }

  const summaryEl = document.getElementById("summaryLine")
  const breakdownEl = document.getElementById("breakdownLine")
  if(summaryEl) summaryEl.textContent = summaryText
  if(breakdownEl) breakdownEl.innerHTML = breakdownHtml
}

function calc(){
let total = {cal:0, protein:0}
let breakdown = []

let main = document.getElementById("main").value

if(main && data.main[main]){
  total.cal += data.main[main].cal
  total.protein += data.main[main].protein
  breakdown.push(`${main}: ${data.main[main].cal} kcal`)
}

if(document.getElementById("double").checked && main){
  if(data.addon[main]){
    total.cal += data.addon[main].cal
    total.protein += data.addon[main].protein
    breakdown.push(`雙份肉 ${main}: ${data.addon[main].cal} kcal`)
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
const noSauceSelected = sauce1 === "__NONE__"
if(noSauceSelected){
  sauce1 = ""
}

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

const resultEl = document.getElementById("result")
const hasSauce = !!sauce1 || !!sauce2 || noSauceSelected
if(!hasSauce){
  resultEnabled = false
  resultEl.classList.remove("active")
  resultEl.style.visibility = "visible"
  showResultHint()
  updateResultVisibility()
  return
}

const selectedSauceCount = (sauce1 ? 1 : 0) + (sauce2 ? 1 : 0)
const summaryText = `主餐 1 份 + 加料 ${selectedAddonNames.length} 份 + 醬料 ${selectedSauceCount} 種`
showResultStats(summaryText, breakdown.join("<br>"))

const calEl = document.getElementById("calVal")
const proEl = document.getElementById("proVal")

const calDecimals = (Math.round(total.cal * 10) % 10 === 0) ? 0 : 1
animateNumber(calEl, lastCal, total.cal, calDecimals)
animateNumber(proEl, lastProtein, total.protein, 0)

lastCal = total.cal
lastProtein = total.protein

  resultEnabled = true

  // Ensure result is visible when calculated
  resultEl.style.visibility = "visible"
  resultEl.classList.add("active")
  setTimeout(() => resultEl.classList.remove("active"), 600)
  if (navigator.vibrate) navigator.vibrate(5);
  updateResultVisibility()
}

init()

function updateResultVisibility(){
  const resultEl = document.getElementById("result")

  if(!resultEnabled){
    resultEl.style.opacity = "1"
    resultEl.style.pointerEvents = "none"
    return
  }

  resultEl.style.opacity = "1"
  resultEl.style.pointerEvents = "none"
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

function toggleDisclaimer(){
  const el = document.getElementById("disclaimerDetail")
  el.style.display = el.style.display === "none" ? "block" : "none"
}

function resetAll(){
  const main = document.getElementById("main")
  const firstGroup = Object.keys(mainGroups).find(g => (mainGroups[g] || []).length > 0)
  if(firstGroup && mainGroups[firstGroup] && mainGroups[firstGroup][0]){
    main.value = mainGroups[firstGroup][0]
    mainActiveGroup = firstGroup
  } else {
    main.value = ""
  }
  updateMainPickerLabel()

  document.getElementById("double").checked = false
  document.getElementById("addonList").innerHTML = ""
  addonActiveGroup = Object.keys(addonGroups)[0] || ""

  const sauce1 = document.getElementById("sauce1")
  sauce1.value = ""
  updateSaucePickerLabel("sauce1")
  const sauce2List = document.getElementById("sauce2List")
  sauce2List.innerHTML = ""
  const sauce2Btn = document.getElementById("sauce2Btn")
  if(sauce2Btn) sauce2Btn.style.display = "inline-block"

  lastCal = 0
  lastProtein = 0
  resultMode = ""

  const addonModal = document.getElementById("addonModal")
  const mainModal = document.getElementById("mainModal")
  const sauceModal = document.getElementById("sauceModal")
  if(addonModal) addonModal.style.display = "none"
  if(mainModal) mainModal.style.display = "none"
  if(sauceModal) sauceModal.style.display = "none"

  updateAddonUI()
  calc()
}
