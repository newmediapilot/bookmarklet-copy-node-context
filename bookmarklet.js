// Bookmarklet for element picking and copying metadata
// Usage: add a bookmark with URL starting "javascript:" followed by this code.
// Example: javascript:(function(){/* code */})();

(function () {
  // Create overlay style for highlight
  const style = document.createElement('style');
  style.textContent = `
    .bookmarklet-highlight { box-shadow: inset 0 0 0 3px rgba(0,0,0,.9); }
  `;
  document.head.appendChild(style);

  let currentTarget = null;

  // Helper to build CSS selector path
  function getSelector(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return '';
    const parts = [];
    while (el && el.nodeType === Node.ELEMENT_NODE) {
   let part = el.localName.toLowerCase();

  if (el.id) part += `#${el.id}`;
  else {
    const classes = [...el.classList].filter(c => c !== 'bookmarklet-highlight');
    if (classes.length) part += '.' + classes.join('.');
  }
      parts.unshift(part);
      el = el.parentElement;
    }
    return parts.join(' > ');
  }

  // Helper to build XPath
  function getXPath(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return '';
    const idx = (sibling, name) => {
      let count = 0;
      while (sibling) {
        if (sibling.nodeName === name) count++;
        sibling = sibling.previousSibling;
      }
      return count;
    };
    const walk = el => {
      if (!el || el.nodeType !== Node.ELEMENT_NODE) return '';
      const parent = el.parentNode;
      if (!parent) return `/${el.localName}`;
      const name = el.localName.toLowerCase();
      const index = idx(el.previousSibling, name);
      return walk(parent) + '/' + name + '[' + (index || 1) + ']';
    };
    return walk(el);
  }

  // Gather all attributes of an element
  function getAttributes(el) {
    const attrs = {};
    for (const attr of el.attributes) {
      attrs[attr.name] = attr.value;
    }
    return attrs;
  }

  // Build parent hierarchy array
  function getHierarchy(el) {
    const arr = [];
    while (el && el.nodeType === Node.ELEMENT_NODE) {
      arr.push(el.localName.toLowerCase());
      el = el.parentElement;
    }
    return arr.reverse();
  }

  // Update highlight on hover
  function mouseMove(e) {
    const target = e.target;
    if (target === currentTarget) return;
    if (currentTarget) currentTarget.classList.remove('bookmarklet-highlight');
    currentTarget = target;
    if (currentTarget && currentTarget !== document.documentElement) {
      currentTarget.classList.add('bookmarklet-highlight');
    }
  }

  // On click, copy data and cleanup
  function mouseClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!currentTarget) return;

    const rect = currentTarget.getBoundingClientRect();
    const data = {
      tag: currentTarget.tagName.toLowerCase(),
      text: currentTarget.textContent.trim(),
      id: currentTarget.id || null,
url: window.location.href,
      classes: [...currentTarget.classList].filter(c => c !== 'bookmarklet-highlight'),
      selector: getSelector(currentTarget),
      xpath: getXPath(currentTarget),
      attributes: getAttributes(currentTarget),
       outerHTML: currentTarget.outerHTML,
       computedStyles: (function(){ const cs = getComputedStyle(currentTarget); const desired = ['color','fontSize','fontFamily','backgroundColor','display','position']; const obj={}; desired.forEach(p=>{ obj[p]=cs.getPropertyValue(p); }); return obj; })(),
      rect: {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      },
      hierarchy: getHierarchy(currentTarget)
    };

    const json = JSON.stringify(data, null, 2);
    // Copy to clipboard using Clipboard API
    navigator.clipboard.writeText(json).then(() => {
      console.log('Element data copied to clipboard:', json);
    }, err => {
      console.error('Could not copy text: ', err);
    });

    cleanup();
  }

  function cleanup() {
    document.removeEventListener('mousemove', mouseMove, true);
    document.removeEventListener('click', mouseClick, true);
    if (currentTarget) currentTarget.classList.remove('bookmarklet-highlight');
    style.parentNode.removeChild(style);
  }

  // Attach listeners
  document.addEventListener('mousemove', mouseMove, true);
  document.addEventListener('click', mouseClick, true);
})();