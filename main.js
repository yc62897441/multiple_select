const select = document.querySelector('select')
const options = document.querySelectorAll('option')

// 建立新元素，當作 select 收合時的顯示選項
const headOption = document.createElement("option")
const defaultText = '請選擇選項'
headOption.text = defaultText
select.insertBefore(headOption, options[0])
headOption.selected = true
headOption.disabled = true
headOption.hidden = true

// 有被選取的選項
let optionsInHeadOption = []

select.addEventListener('input', function () {
  // 被選取選項的文字內容
  const inputOptionText = this.options[this.selectedIndex].text

  // 有被選取的選項，上底色；取消選取時，移除底色
  if (this.options[this.selectedIndex].style.backgroundColor === '') {
    this.options[this.selectedIndex].style.backgroundColor = '#999999'
  } else {
    this.options[this.selectedIndex].style.backgroundColor = ''
  }

  // 維持選取欄收合時，都是顯示 headOption
  this.options.selected = false
  headOption.selected = true

  // 確認「被選取選項的文字內容」是否已經在 optionsInHeadOption 之中；如果是，則從 optionsInHeadOption 刪除該項；如果否，則把該項加入 optionsInHeadOption
  let isInOptionsInHeadOption = false
  const temp = []
  optionsInHeadOption.forEach(item => {
    if (item === inputOptionText) {
      isInOptionsInHeadOption = true
    } else if (item !== defaultText) {
      temp.push(item)
    }
  })
  if (isInOptionsInHeadOption) {
    optionsInHeadOption = temp
  } else {
    optionsInHeadOption.push(inputOptionText)
  }

  // 把 optionsInHeadOption 中的項目的文字套到 headOption；如果沒有任何項目，則套回 defaultText
  headOption.text = ''
  for (let i = 0; i < optionsInHeadOption.length; i++) {
    if (i === 0) {
      headOption.text = optionsInHeadOption[i]
    } else {
      headOption.text += `, ${optionsInHeadOption[i]}`
    }
  }
  if (headOption.text === '') {
    headOption.text = defaultText
  }
})
