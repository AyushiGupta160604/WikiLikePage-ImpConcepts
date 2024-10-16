document.querySelectorAll('.foldable').forEach(foldable => {
    foldable.addEventListener('click', () => {
        const content = foldable.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const tocList = document.getElementById('TocList');
    const headers = document.querySelectorAll('section h1, section h2, section h3, section h4, section h5, section h6');
    let lastList = tocList;
    let currentLevel = 1;

    headers.forEach(header => {
        const headerLevel = parseInt(header.tagName.charAt(1));
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        const headerId = header.textContent.replace(/\s+/g, '-').toLowerCase();

        if (!header.id) {
            header.id = headerId;
        }

        anchor.href = `#${header.id}`;
        anchor.textContent = header.textContent;
        listItem.appendChild(anchor);

        if (headerLevel > currentLevel) {
            let newList = document.createElement('ol');
            lastList.lastElementChild.appendChild(newList);
            lastList = newList;
        } 
        else if (headerLevel < currentLevel) {
            let diff = currentLevel - headerLevel;
            while (diff > 0) {
                lastList = lastList.parentElement.closest('ol');
                diff--;
            }
        }

        lastList.appendChild(listItem);
        currentLevel = headerLevel;
    });
});