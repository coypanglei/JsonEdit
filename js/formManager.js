import { componentTypeMap, behaviorTypeMap } from './constants.js';

export class FormManager {
    constructor() {
        this.formItems = [];
        this.dragStartIndex = -1;
        this.dragEndIndex = -1;
    }

    addFormItem(type) {
        const itemId = 'form-item-' + Date.now();
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
        return itemId;
    }

    updateFormItem(itemId, field, value) {
        const index = this.formItems.findIndex(item => item.id === itemId);
        if (index !== -1) {
            this.formItems[index][field] = value;
        }
    }

    deleteFormItem(itemId) {
        const index = this.formItems.findIndex(item => item.id === itemId);
        if (index !== -1) {
            this.formItems.splice(index, 1);
        }
    }

    moveFormItem(fromIndex, toIndex) {
        if (fromIndex === toIndex) return;
        const item = this.formItems.splice(fromIndex, 1)[0];
        this.formItems.splice(toIndex, 0, item);
    }

    getFormItems() {
        return this.formItems;
    }

    getFormItem(itemId) {
        return this.formItems.find(item => item.id === itemId);
    }

    toJSON() {
        const jsonOutput = {};
        this.formItems.forEach(item => {
            jsonOutput[item.field || item.title] = item.defaultValue || '';
        });
        return jsonOutput;
    }

    fromJSON(jsonData) {
        this.formItems = [];
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
            
            if (key.toLowerCase().includes('time')) {
                formItem.type = 'TIME_ITEM';
            } else if (typeof value === 'boolean') {
                formItem.type = 'TEXT_VIEW_SINGLE_SELECT';
            }
            
            this.formItems.push(formItem);
        });
    }

    generateCode(formTitle) {
        return `package com.longruan.monitor.test;

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
        initToolBar("${formTitle}");
        RecordsBeanFactoy recordsBeanFactoy = RecordsBeanFactoy.getInstance();
        
        ${this.formItems.map(item => `
        recordsBeanFactoy.addBean(new RecordsBean(
            DynamicFormEnum.ItemFlagEnum.${item.type},
            "${item.title}",
            "${item.field}",
            "${item.defaultValue}",
            ${item.required},
            ${item.behaviorType ? `DynamicFormEnum.VariousBehavior.${behaviorTypeMap[item.behaviorType]}` : 'null'}
        ));`).join('\n        ')}
    }
}`;
    }
} 