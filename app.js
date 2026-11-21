(() => {
  const subs = document.querySelectorAll('.sub[data-open]')
  subs.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const open = btn.classList.contains('is-open')
      const scope = btn.closest('.subs')
      const peers = scope ? scope.querySelectorAll('.sub[data-open]') : subs
      peers.forEach((b) => {
        b.classList.remove('is-open')
        const hint = b.querySelector('.sub-hint')
        if (hint) hint.textContent = '展开'
      })
      if (!open) {
        btn.classList.add('is-open')
        const hint = btn.querySelector('.sub-hint')
        if (hint) hint.textContent = '收起'
      }
    })
  })

  document.querySelectorAll('[data-mod-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mod = btn.closest('.mod')
      if (!mod) return
      const open = mod.classList.toggle('is-open')
      btn.setAttribute('aria-expanded', open ? 'true' : 'false')
      const label = btn.querySelector('.mod-toggle')
      if (label) label.textContent = open ? '收起' : '展开'
      if (!open) {
        mod.querySelectorAll('.sub.is-open').forEach((s) => {
          s.classList.remove('is-open')
          const hint = s.querySelector('.sub-hint')
          if (hint) hint.textContent = '展开'
        })
      }
    })
  })

  const mods = document.querySelectorAll('.mod')
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in')
        })
      },
      { threshold: 0.12 },
    )
    mods.forEach((m) => io.observe(m))
  } else {
    mods.forEach((m) => m.classList.add('in'))
  }
})()
