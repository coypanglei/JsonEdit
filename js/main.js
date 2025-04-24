import { FormManager } from './formManager.js';
import { UIManager } from './uiManager.js';

class FormConfigTool {
    constructor() {
        this.formManager = new FormManager();
        this.uiManager = new UIManager(this.formManager);
        this.initialize();
    }

    initialize() {
        // 初始化组件点击事件
        const componentItems = document.querySelectorAll('.component-item');
        componentItems.forEach(item => {
            item.addEventListener('click', () => {
                const type = item.getAttribute('data-type');
                this.formManager.addFormItem(type);
                this.uiManager.updateFormArea();
                this.uiManager.updatePreview();
            });
        });

        // 初始化表单标题变化监听
        const formTitle = document.getElementById('formTitle');
        formTitle.addEventListener('input', () => {
            document.getElementById('previewTitle').textContent = formTitle.value || '表单标题';
        });

        // 初始化JSON相关按钮
        document.getElementById('parseJson').addEventListener('click', () => {
            const jsonInput = document.getElementById('jsonInput').value;
            try {
                const jsonData = JSON.parse(jsonInput);
                this.formManager.fromJSON(jsonData);
                this.uiManager.updateFormArea();
                this.uiManager.updatePreview();
                alert('JSON解析成功！');
            } catch (error) {
                alert('JSON格式错误：' + error.message);
            }
        });

        document.getElementById('copyJson').addEventListener('click', () => {
            const jsonString = JSON.stringify(this.formManager.toJSON(), null, 4);
            const jsonInput = document.getElementById('jsonInput');
            jsonInput.value = jsonString;
            jsonInput.select();
            document.execCommand('copy');
            alert('JSON已复制到剪贴板！');
        });

        // 初始化代码相关按钮
        document.getElementById('previewCode').addEventListener('click', () => {
            this.toggleCodePreview();
        });

        document.getElementById('generateCode').addEventListener('click', () => {
            this.generateActivityCode();
        });
    }

    toggleCodePreview() {
        const codePreview = document.getElementById('codePreview');
        if (codePreview.style.display === 'none') {
            this.generateActivityCode();
            codePreview.style.display = 'block';
        } else {
            codePreview.style.display = 'none';
        }
    }

    generateActivityCode() {
        const formTitle = document.getElementById('formTitle').value || '表单标题';
        const code = this.formManager.generateCode(formTitle);
        document.getElementById('codePreview').textContent = code;
        document.getElementById('codePreview').style.display = 'block';
    }
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new FormConfigTool();
}); 