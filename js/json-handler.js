// JSON 处理相关的功能
class JsonHandler {
    constructor() {
        this.formItems = [];
        this.onFormItemsChanged = null;
    }

    // 解析 JSON 数据
    parseJson(jsonString) {
        try {
            const jsonData = JSON.parse(jsonString);
            this.formItems = [];
            
            // 为每个 JSON 字段创建表单项
            Object.entries(jsonData).forEach(([key, value]) => {
                const itemId = 'form-item-' + Date.now() + Math.random().toString(36).substr(2, 9);
                const formItem = {
                    id: itemId,
                    type: 'EDIT_ITEM',
                    title: key,
                    field: key,
                    defaultValue: value.toString(),
                    required: true,
                    behaviorType: ''
                };
                
                // 根据值类型选择合适的表单项类型
                if (key.toLowerCase().includes('time')) {
                    formItem.type = 'TIME_ITEM';
                } else if (typeof value === 'boolean') {
                    formItem.type = 'TEXT_VIEW_SINGLE_SELECT';
                }
                
                this.formItems.push(formItem);
            });

            if (this.onFormItemsChanged) {
                this.onFormItemsChanged(this.formItems);
            }
            
            return true;
        } catch (error) {
            console.error('JSON解析错误:', error);
            return false;
        }
    }

    // 生成 JSON 数据
    generateJson(formItems) {
        const jsonOutput = {};
        formItems.forEach(item => {
            jsonOutput[item.field || item.title] = item.defaultValue || '';
        });
        return JSON.stringify(jsonOutput, null, 4);
    }

    // 设置表单项变化的回调
    setOnFormItemsChanged(callback) {
        this.onFormItemsChanged = callback;
    }
}

// 导出 JsonHandler 类
window.JsonHandler = JsonHandler; 