export class UIManager {
    constructor(formManager) {
        this.formManager = formManager;
    }

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

        formItems.forEach((item, index) => {
            const itemElement = this.createFormItemElement(item, index);
            formDesignArea.appendChild(itemElement);
        });
    }

    createFormItemElement(item, index) {
        const itemElement = document.createElement('div');
        itemElement.className = 'form-item';
        itemElement.id = item.id;
        itemElement.draggable = true;
        
        itemElement.innerHTML = this.getFormItemTemplate(item);
        
        this.addDragListeners(itemElement, index);
        this.addClickListeners(itemElement, item);
        this.addPropertyChangeListeners(itemElement, item);
        
        return itemElement;
    }

    getFormItemTemplate(item) {
        return `
            <div class="form-item-header">
                <div class="form-item-title">
                    <span class="form-item-drag-handle">⋮⋮</span>
                    ${item.title}
                </div>
                <div class="form-item-actions">
                    <span class="form-item-action edit-btn">编辑</span>
                    <span class="form-item-action">↑</span>
                    <span class="form-item-action">↓</span>
                    <span class="form-item-action">×</span>
                </div>
            </div>
            <div class="form-item-content">
                <div class="preview-item"></div>
            </div>
            <div class="form-item-property" style="display: none;">
                <div class="property-group">
                    <div class="property-title">基本属性</div>
                    <div class="property-item">
                        <label class="property-label">标题</label>
                        <input type="text" class="property-input" data-field="title" value="${item.title}">
                    </div>
                    <div class="property-item">
                        <label class="property-label">字段名</label>
                        <input type="text" class="property-input" data-field="field" value="${item.field || ''}">
                    </div>
                    <div class="property-item">
                        <label class="property-label">提示文本</label>
                        <input type="text" class="property-input" data-field="defaultValue" value="${item.defaultValue || ''}">
                    </div>
                </div>
                <div class="property-group">
                    <div class="property-title">高级属性</div>
                    <div class="property-item">
                        <label class="property-label">
                            <input type="checkbox" class="property-checkbox" data-field="required" ${item.required ? 'checked' : ''}>
                            必填项
                        </label>
                    </div>
                    <div class="property-item">
                        <label class="property-label">行为类型</label>
                        <select class="property-select" data-field="behaviorType">
                            <option value="">无</option>
                            <option value="popup_edit" ${item.behaviorType === 'popup_edit' ? 'selected' : ''}>弹窗编辑</option>
                            <option value="time_select" ${item.behaviorType === 'time_select' ? 'selected' : ''}>时间选择</option>
                            <option value="select_contacts" ${item.behaviorType === 'select_contacts' ? 'selected' : ''}>选择联系人</option>
                            <option value="submitapi" ${item.behaviorType === 'submitapi' ? 'selected' : ''}>提交API</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }

    addDragListeners(itemElement, index) {
        itemElement.addEventListener('dragstart', (e) => {
            this.formManager.dragStartIndex = index;
            itemElement.classList.add('dragging');
        });
        
        itemElement.addEventListener('dragend', (e) => {
            itemElement.classList.remove('dragging');
            if (this.formManager.dragStartIndex !== -1 && this.formManager.dragEndIndex !== -1) {
                this.formManager.moveFormItem(this.formManager.dragStartIndex, this.formManager.dragEndIndex);
                this.updateFormArea();
                this.updatePreview();
            }
            this.formManager.dragStartIndex = -1;
            this.formManager.dragEndIndex = -1;
        });
        
        itemElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            const rect = itemElement.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            this.formManager.dragEndIndex = e.clientY < midY ? index : index + 1;
        });
    }

    addClickListeners(itemElement, item) {
        itemElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('form-item-action')) {
                const action = e.target.textContent;
                if (action === '×') {
                    this.formManager.deleteFormItem(item.id);
                    this.updateFormArea();
                    this.updatePreview();
                } else if (action === '↑' || action === '↓') {
                    const index = this.formManager.getFormItems().findIndex(i => i.id === item.id);
                    const newIndex = action === '↑' ? index - 1 : index + 1;
                    if (newIndex >= 0 && newIndex < this.formManager.getFormItems().length) {
                        this.formManager.moveFormItem(index, newIndex);
                        this.updateFormArea();
                        this.updatePreview();
                    }
                } else if (action === '编辑' || action === '收起') {
                    const propertyPanel = itemElement.querySelector('.form-item-property');
                    const isVisible = window.getComputedStyle(propertyPanel).display === 'block';
                    propertyPanel.style.display = isVisible ? 'none' : 'block';
                    e.target.textContent = isVisible ? '编辑' : '收起';
                }
            } else {
                const allItems = document.querySelectorAll('.form-item');
                allItems.forEach(item => item.classList.remove('selected'));
                itemElement.classList.add('selected');
            }
        });
    }

    addPropertyChangeListeners(itemElement, item) {
        const propertyInputs = itemElement.querySelectorAll('.property-input, .property-select, .property-checkbox');
        propertyInputs.forEach(input => {
            input.addEventListener('change', () => {
                const field = input.getAttribute('data-field');
                const value = input.type === 'checkbox' ? input.checked : input.value;
                this.formManager.updateFormItem(item.id, field, value);
                this.updateFormArea();
                this.updatePreview();
            });
        });
    }

    updatePreview() {
        const previewContent = document.getElementById('previewContent');
        previewContent.innerHTML = '';
        
        this.formManager.getFormItems().forEach(item => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.style.marginBottom = '10px';
            
            previewItem.innerHTML = this.getPreviewTemplate(item);
            previewContent.appendChild(previewItem);
        });
    }

    getPreviewTemplate(item) {
        switch(item.type) {
            case 'EDIT_ITEM':
                return `
                    <div class="form-group">
                        <label>${item.title}${item.required ? ' *' : ''}</label>
                        <input type="text" class="property-input" placeholder="${item.defaultValue}" disabled>
                    </div>`;
            case 'EDIT_TEXT_LARGE':
                return `
                    <div class="form-group">
                        <label>${item.title}${item.required ? ' *' : ''}</label>
                        <textarea class="property-input" rows="3" placeholder="${item.defaultValue}" disabled></textarea>
                    </div>`;
            case 'TIME_ITEM':
                return `
                    <div class="form-group">
                        <label>${item.title}${item.required ? ' *' : ''}</label>
                        <input type="text" class="property-input" value="${item.defaultValue || '2024-01-01 00:00:00'}" disabled>
                    </div>`;
            case 'POPU_ITEM':
                return `
                    <div class="form-group">
                        <label>${item.title}${item.required ? ' *' : ''}</label>
                        <select class="property-select" disabled>
                            <option>${item.defaultValue || '请选择'}</option>
                        </select>
                    </div>`;
            case 'TEXT_VIEW_SINGLE_SELECT':
                return `
                    <div class="form-group">
                        <label>${item.title}${item.required ? ' *' : ''}</label>
                        <div style="margin-top: 5px;">
                            <label style="font-weight: normal;">
                                <input type="radio" name="radio_${item.id}" checked disabled> ${item.defaultValue || '选项1'}
                            </label>
                        </div>
                    </div>`;
            default:
                return `
                    <div class="form-group">
                        <label>${item.title}${item.required ? ' *' : ''}</label>
                        <div class="property-input" style="background-color: #f5f5f5; padding: 8px;">
                            ${item.defaultValue || `${item.type} 组件`}
                        </div>
                    </div>`;
        }
    }
} 