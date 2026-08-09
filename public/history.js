document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('historyList')
  const key = 'tizita_history'
  const items = JSON.parse(localStorage.getItem(key) || '[]')

  if (!items || items.length === 0) {
    list.innerHTML = '<div class="response-content">No history yet.</div>'
  } else {
    items.forEach(item => {
      const div = document.createElement('div')
      div.className = 'history-item'

      const ts = document.createElement('div')
      ts.className = 'ts'
      ts.textContent = new Date(item.timestamp).toLocaleString()

      const q = document.createElement('div')
      q.className = 'q'
      q.textContent = item.question

      const a = document.createElement('div')
      a.className = 'a'
      a.textContent = item.answer

      div.appendChild(ts)
      div.appendChild(q)
      div.appendChild(a)
      list.appendChild(div)
    })
  }

  const clearBtn = document.getElementById('clearHistory')
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all saved history?')) {
        localStorage.removeItem(key)
        list.innerHTML = '<div class="response-content">No history yet.</div>'
      }
    })
  }
})
