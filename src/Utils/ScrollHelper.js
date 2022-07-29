const isScrolledIntoView = (container, element) => {
    let scrollTop = container.scrollTop;
    let scrollBot = scrollTop + container.clientHeight;
    let containerRect = container.getBoundingClientRect();
    let eleRect = element.getBoundingClientRect();
    let rect = {
        top: eleRect.top - containerRect.top,
        right: eleRect.right - containerRect.right,
        bottom: eleRect.bottom - containerRect.bottom,
        left: eleRect.left - containerRect.left,
    };
    let eleTop = rect.top + scrollTop;
    let eleBot = eleTop + element.offsetHeight;
    let visibleTop = eleTop < scrollTop ? scrollTop : eleTop;
    let visibleBot = eleBot > scrollBot ? scrollBot : eleBot;

    return visibleBot - visibleTop > 0;
};

export { isScrolledIntoView };
