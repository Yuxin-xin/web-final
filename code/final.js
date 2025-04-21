// 显示最终得分
function showResult() {
    const score = localStorage.getItem('gooseGameScore') || 0;
    document.querySelector('#final-score span').textContent = score;
}

// 页面加载时显示结果
window.onload = showResult;