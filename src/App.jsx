import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')
  const [listItems, setListItems] = useState([])
  const listQue = []

  function addListItem(numbers, sum) {
    const summary = numbers.join(' + ')
    let result = ''
    
    if (sum > 9) {
      result = ` = ${sum} (${String(sum).split('').join(' + ')})`
    } else {
      result = ` = ${sum}`
    }
    const li = <li key={listQue.length + 1}>{summary + result}</li>

    listQue.push(li)
    setListItems(listQue)
  }

  function calcRoot(input, numbers) {
    const sum = numbers.reduce((acc, s) => {
      const n = Number.parseInt(s, 10)
      return acc += n
    }, 0)

    const sumNumbers = String(sum).split('')

    if (numbers.length > 1) {
      addListItem(numbers, sum)
    }

    if (sumNumbers.length > 1) {
      return calcRoot(input, sumNumbers)
    }

    return sum
  }

  function handler(e) {
    const input = e.target.value
    const parsed = Number.parseInt(input, 10)
    
    if (isNaN(parsed)) {
      setResultValue('')
      setInputValue('')
      setListItems([])
      return
    } else {
      setInputValue(parsed)
      
      if (parsed <= 9) {
        setResultValue(parsed)
        setListItems([])
      } else {
        setResultValue(calcRoot(input, input.split('')))
      }
    }
  }

  return (
    <div>
      <input id='input' type='number' title='calculate' value={inputValue} onChange={handler} />
      <p><strong id='result'>{resultValue}</strong></p>
      <ul id='summary'>
        {listItems}
      </ul>
    </div>
  )
}

export default App
