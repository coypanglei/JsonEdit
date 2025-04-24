// 表单管理类
class FormManager {
    constructor() {
        this.formItems = [];
        this.selectedItem = null;
    }

    // 添加表单项
    addFormItem(type) {
        const itemId = 'form-item-' + Date.now() + Math.random().toString(36).substr(2, 9);
        const formItem = {
            id: itemId,
            type: type,
            title: '新建表单项',
            field: '',
            defaultValue: '',
            required: false,
            behaviorType: ''
        };
        this.formItems.push(formItem);
        return formItem;
    }

    // 删除表单项
    deleteFormItem(itemId) {
        const index = this.formItems.findIndex(item => item.id === itemId);
        if (index > -1) {
            this.formItems.splice(index, 1);
            if (this.selectedItem === itemId) {
                this.selectedItem = null;
            }
        }
    }

    // 移动表单项
    moveFormItem(itemId, direction) {
        const index = this.formItems.findIndex(item => item.id === itemId);
        if (direction === 'up' && index > 0) {
            const temp = this.formItems[index];
            this.formItems[index] = this.formItems[index - 1];
            this.formItems[index - 1] = temp;
        } else if (direction === 'down' && index < this.formItems.length - 1) {
            const temp = this.formItems[index];
            this.formItems[index] = this.formItems[index + 1];
            this.formItems[index + 1] = temp;
        }
    }

    // 选择表单项
    selectFormItem(itemId) {
        this.selectedItem = itemId;
        return this.formItems.find(item => item.id === itemId);
    }

    // 更新表单项属性
    updateFormItem(itemId, properties) {
        const item = this.formItems.find(item => item.id === itemId);
        if (item) {
            Object.assign(item, properties);
        }
    }

    // 获取所有表单项
    getFormItems() {
        return this.formItems;
    }

    // 设置表单项列表
    setFormItems(items) {
        this.formItems = items;
    }

    // 获取选中的表单项
    getSelectedItem() {
        if (!this.selectedItem) return null;
        return this.formItems.find(item => item.id === this.selectedItem);
    }

    // 保存到localStorage
    saveToStorage() {
        Utils.saveToStorage('formItems', this.formItems);
    }

    // 从localStorage加载
    loadFromStorage() {
        const items = Utils.getFromStorage('formItems', []);
        this.setFormItems(items);
    }
}

window.FormManager = FormManager; 