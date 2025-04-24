// 通用工具类
class Utils {
    // 显示消息提示
    static showMessage(text, type, duration = 3000) {
        const message = document.getElementById('message');
        message.textContent = text;
        message.className = 'message ' + type;
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, duration);
    }

    // 复制文本到剪贴板
    static copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    // 保存数据到localStorage
    static saveToStorage(key, value) {
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    }

    // 从localStorage获取数据
    static getFromStorage(key, defaultValue = null) {
        const value = localStorage.getItem(key);
        if (value === null) return defaultValue;
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    }

    // 从localStorage删除数据
    static removeFromStorage(key) {
        localStorage.removeItem(key);
    }
}

window.Utils = Utils; 