// 代码生成相关的功能
class CodeGenerator {
    constructor() {
        this.componentTypeMap = {
            'EDIT_ITEM': 10,            // 单行文本框
            'EDIT_TEXT_LARGE': 18,      // 多行文本框
            'TIME_ITEM': 24,            // 时间选择器
            'POPU_ITEM': 21,            // 下拉选择框
            'TEXT_VIEW_SINGLE_SELECT': 1, // 单选框
            'TEXT_VIEW_ONE': 6,         // 按钮
            'SELECT_CONTACTS': 9,       // 选择联系人
            'SELECT_DEPTE': 30,         // 选择部门
            'UPLOAD_ITEM': 26,          // 上传附件
            'NULL_VIEW': 7              // 空白分隔
        };

        this.behaviorTypeMap = {
            'popup_edit': 'POPUP_EDIT',         // 弹窗编辑
            'time_select': 'TIME_SELECT',       // 时间选择
            'select_contacts': 'SELECT_CONTACTS', // 选择联系人
            'submitapi': 'SUBMITAPI'            // 提交API
        };
    }

    // 生成Activity代码
    generateActivityCode(formTitle, formItems) {
        const code = `
package com.longruan.monitor.test;

import android.os.Bundle;
import com.alibaba.android.arouter.facade.annotation.Route;
import com.longruan.commonlibrary.base.BaseActivity;
import com.longruan.commonlibrary.databinding.CommonMultipleActivityBinding;
import com.longruan.commonlibrary.lrdynamic.bean.DynamicFormEnum;
import com.longruan.commonlibrary.lrdynamic.bean.RecordsBean;
import com.longruan.commonlibrary.util.RecordsBeanFactoy;

@Route(path = RouterHub.FORM_ACTIVITY)
public class GeneratedFormActivity extends BaseActivity<CommonMultipleActivityBinding, BaseViewModel> {
    @Override
    protected int getLayoutResId() {
        return R.layout.common_multiple_activity;
    }

    @Override
    protected void init() {
        initToolBar("${formTitle || '表单标题'}");
        RecordsBeanFactoy recordsBeanFactoy = RecordsBeanFactoy.getInstance();
        
        ${formItems.map(item => `
        recordsBeanFactoy.addBean(new RecordsBean(
            DynamicFormEnum.ItemFlagEnum.${item.type},
            "${item.title}",
            "${item.field}",
            "${item.defaultValue}",
            ${item.required},
            ${item.behaviorType ? `DynamicFormEnum.VariousBehavior.${this.behaviorTypeMap[item.behaviorType]}` : 'null'}
        ));`).join('\n        ')}
    }
}`;
        
        return code.trim();
    }

    // 格式化代码
    formatCode(code) {
        // 这里可以添加代码格式化的逻辑
        return code;
    }

    // 复制代码到剪贴板
    copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// 导出 CodeGenerator 类
window.CodeGenerator = CodeGenerator; 