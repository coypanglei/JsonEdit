// UI管理类
class UIManager {
    constructor(formManager) {
        this.formManager = formManager;
    }

    // 更新表单设计区域
    updateFormArea() {
        const formDesignArea = document.getElementById('formDesignArea');
        formDesignArea.innerHTML = '';
        
        const formItems = this.formManager.getFormItems();
        if (formItems.length === 0) {
            formDesignArea.innerHTML = `
                <div class="form-placeholder" style="text-align: center; color: #999; padding: 40px 0;">
                    从左侧点击组件添加到表单
                </div>
            `;
            return;
        }

        formItems.forEach(item => {
            const itemElement = this.createFormItemElement(item);
            formDesignArea.appendChild(itemElement);
        });
    }

    // 创建表单项元素
    createFormItemElement(item) {
        const itemElement = document.createElement('div');
        itemElement.className = 'form-item';
        itemElement.id = item.id;
        itemElement.draggable = true;
        
        itemElement.innerHTML = `
            <div class="form-item-header">
                <div class="form-item-title">
                    <span class="form-item-drag-handle">⋮⋮</span>
                    ${item.title}
                </div>
                <div class="form-item-actions">
                    <span class="form-item-action">↑</span>
                    <span class="form-item-action">↓</span>
                    <span class="form-item-action">×</span>
                </div>
            </div>
            <div class="form-item-content">
                <div class="preview-item"></div>
            </div>
        `;

        this.bindFormItemEvents(itemElement);
        return itemElement;
    }

    // 绑定表单项事件
    bindFormItemEvents(itemElement) {
        // 点击选中
        itemElement.addEventListener('click', (e) => {
            if (!e.target.classList.contains('form-item-action')) {
                this.selectFormItem(itemElement.id);
            }
        });

        // 拖拽事件
        itemElement.addEventListener('dragstart', () => {
            itemElement.classList.add('dragging');
        });

        itemElement.addEventListener('dragend', () => {
            itemElement.classList.remove('dragging');
            this.updateFormArea();
        });
    }

    // 更新属性面板
    updatePropertyPanel(item) {
        const propertyPanel = document.getElementById('propertyPanel');
        if (!item) {
            propertyPanel.style.display = 'none';
            return;
        }

        propertyPanel.style.display = 'block';
        document.getElementById('prop-title').value = item.title || '';
        document.getElementById('prop-field').value = item.field || '';
        document.getElementById('prop-defaultValue').value = item.defaultValue || '';
        document.getElementById('prop-required').checked = item.required || false;
        document.getElementById('prop-type').value = item.behaviorType || '';
    }

    // 更新预览区域
    updatePreview() {
        const previewContent = document.getElementById('previewContent');
        previewContent.innerHTML = '';
        
        this.formManager.getFormItems().forEach(item => {
            const previewItem = this.createPreviewItem(item);
            previewContent.appendChild(previewItem);
        });
    }

    // 创建预览项
    createPreviewItem(item) {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.style.marginBottom = '15px';

        // 添加标题
        const title = document.createElement('div');
        title.className = 'preview-item-title';
        title.style.marginBottom = '5px';
        title.style.fontWeight = 'bold';
        title.textContent = item.title;
        if (item.required) {
            title.innerHTML += '<span style="color: red;">*</span>';
        }

        // 添加输入区域
        const inputArea = this.createPreviewInputArea(item);

        previewItem.appendChild(title);
        previewItem.appendChild(inputArea);
        return previewItem;
    }

    // 创建预览输入区域
    createPreviewInputArea(item) {
        const inputArea = document.createElement('div');
        inputArea.className = 'preview-item-input';

        switch(item.type) {
            case 'EDIT_ITEM':
                inputArea.innerHTML = `<input type="text" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" placeholder="${item.defaultValue || '请输入'}">`;
                break;
            case 'EDIT_TEXT_LARGE':
                inputArea.innerHTML = `<textarea style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; min-height: 80px;" placeholder="${item.defaultValue || '请输入'}"></textarea>`;
                break;
            case 'TIME_ITEM':
                inputArea.innerHTML = `<input type="datetime-local" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">`;
                break;
            case 'POPU_ITEM':
                inputArea.innerHTML = `<select style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">${item.defaultValue || '请选择'}</option>
                </select>`;
                break;
            case 'TEXT_VIEW_SINGLE_SELECT':
                inputArea.innerHTML = `<div style="display: flex; gap: 10px;">
                    <label><input type="radio" name="${item.field}"> 是</label>
                    <label><input type="radio" name="${item.field}"> 否</label>
                </div>`;
                break;
            case 'TEXT_VIEW_ONE':
                inputArea.innerHTML = `<button style="width: 100%; padding: 8px; background-color: #1890ff; color: white; border: none; border-radius: 4px;">${item.title}</button>`;
                break;
            case 'SELECT_CONTACTS':
            case 'SELECT_DEPTE':
                inputArea.innerHTML = `<div style="display: flex; align-items: center; gap: 10px;">
                    <input type="text" style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" placeholder="请选择" readonly>
                    <button style="padding: 8px; background-color: #1890ff; color: white; border: none; border-radius: 4px;">选择</button>
                </div>`;
                break;
            case 'UPLOAD_ITEM':
                inputArea.innerHTML = `<div style="border: 1px dashed #ddd; padding: 20px; text-align: center; border-radius: 4px;">
                    <div style="margin-bottom: 10px;">点击或拖拽文件到此处上传</div>
                    <button style="padding: 8px; background-color: #1890ff; color: white; border: none; border-radius: 4px;">选择文件</button>
                </div>`;
                break;
            case 'NULL_VIEW':
                inputArea.innerHTML = `<div style="height: 20px;"></div>`;
                break;
        }

        return inputArea;
    }

    // 选择表单项
    selectFormItem(itemId) {
        // 取消之前选中的项
        document.querySelectorAll('.form-item').forEach(el => {
            el.classList.remove('selected');
        });

        // 设置新选中的项
        const element = document.getElementById(itemId);
        if (element) {
            element.classList.add('selected');
        }

        // 更新属性面板
        const item = this.formManager.selectFormItem(itemId);
        this.updatePropertyPanel(item);
    }
}

window.UIManager = UIManager; 