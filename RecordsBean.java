package com.longruan.commonlibrary.lrdynamic.bean;

import static com.longruan.commonlibrary.lrdynamic.bean.DynamicFormEnum.VariousBehavior.EDIT_SELECT;

import android.os.Parcel;
import android.os.Parcelable;

import com.blankj.utilcode.util.GsonUtils;
import com.longruan.commonlibrary.bean.CommRefreshBean;
import com.longruan.commonlibrary.bean.SxApiBean;
import com.longruan.commonlibrary.http.ApiService;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

/**
 * @author panglei  序列化 在界面传递
 */
public class RecordsBean implements Parcelable, Serializable {


    /**
     * 编辑的类型
     */
    private int paramType;
    /**
     * 标题
     */
    private String titile;

    /**
     * field 与后台相关的字段
     * 做映射使用
     */

    private String field;
    /**
     * Name 副标题
     */
    private String Name;
    private HashMap map;
    private SxApiBean sxApiBean;

    public SxApiBean getSxApiBean() {
        return sxApiBean;
    }

    public void setSxApiBean(SxApiBean sxApiBean) {
        this.sxApiBean = sxApiBean;
    }

    //设置内部类的请求方式
    public RecordsBean setSxApiBeanThis(SxApiBean sxApiBean) {
        this.sxApiBean = sxApiBean;
        return this;
    }
    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    private RecordBeanClickInterface recordBeanClickInterface;

    /**
     * field 与后台相关的字段 特殊情况
     * 做映射使用
     */

    private String fieldTwo;

    public String getFieldTwo() {
        return fieldTwo;
    }

    public void setFieldTwo(String fieldTwo) {
        this.fieldTwo = fieldTwo;
    }

    /**
     * @description 获取属性功能
     * @author 庞磊
     * @time 2023/8/25 11:15
     *
     */

    /**
     * @param name     属性取值 后台配置 数据字典
     * @param fieldTwo 给后台传值
     * @return
     */
    public RecordsBean getShuXing(String name, String fieldTwo) {

        HashMap<String, String> hashMap = new HashMap<>(3);
        hashMap.put("name", name);
        setMap(hashMap);
        setCategory(ApiService.DATADICTIONGRY_LIST);
        setFieldTwo(fieldTwo);
        return this;

    }

    ;


    HttpBean httpBean;

    public HttpBean getHttpBean() {
        return httpBean;
    }


    //设置内部类的请求方式
    public RecordsBean setHttpBean(HttpBean httpBean) {
        this.httpBean = httpBean;
        return this;
    }


    public RecordsBean setFieldTwoThis(String fieldTwo) {
        this.fieldTwo = fieldTwo;
        return this;
    }


    public RecordBeanClickInterface getRecordBeanClickInterface() {
        return recordBeanClickInterface;
    }

    public void setRecordBeanClickInterface(RecordBeanClickInterface recordBeanClickInterface) {
        this.recordBeanClickInterface = recordBeanClickInterface;
    }

    public RecordsBean setRecordBeanClickInterfaceThis(RecordBeanClickInterface recordBeanClickInterface) {
        this.recordBeanClickInterface = recordBeanClickInterface;
        return this;
    }

    /**
     * default 默认值 没有数据时默认显示使用
     */
    private String defaultValue;

    /**
     * 订单排序数字
     */
    private int ordernum;

    /**
     * 所属行为
     */
    private String type = EDIT_SELECT;

    /**
     * 分类使用的类型 接口获取时的区分
     */
    private String category;

    /**
     * 是否是编辑
     */
    private boolean edit = true;
    /**
     * 是否必填
     */
    private boolean require;

    /**
     * 特殊需求专用
     */
    private String changeType;

    /**
     * 特殊需求专用
     * 返回值是 object
     */
    private Object carryObject;

    /**
     * 当前数据的集合
     * 当需要嵌套recylerview使用
     */
    private List<RecordsBean> list = new ArrayList<>();


    /**
     * Ui 属性值 json
     */
    private String style;


    /**
     * Ui 备注 styleObject
     */
    private String remark;


    /**
     * 用来界面显示的值
     */
    private String value;

    /**
     * 真正使用的值 例如传递的值
     */
    private String selectValue;

    /**
     * 级别
     */
    private int level;

    /**
     *
     */
    private int position;


    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public RecordsBean setRemarkThis(String remark) {
        this.remark = remark;
        return this;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getParamType() {
        return paramType;
    }

    public void setParamType(int paramType) {
        this.paramType = paramType;
    }

    public String getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public RecordsBean setStyleThis(String style) {
        this.style = style;
        return this;
    }

    public int getParamtype() {
        return paramType;
    }

    public void setParamtype(int paramtype) {
        this.paramType = paramtype;
    }

    public String getTitile() {
        return titile;
    }

    public void setTitile(String titile) {
        this.titile = titile;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }


    public int getOrdernum() {
        return ordernum;
    }

    public void setOrdernum(int ordernum) {
        this.ordernum = ordernum;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public HashMap getMap() {
        return map;
    }

    public void setMap(HashMap map) {
        this.map = map;
    }

    public RecordsBean setMapThis(HashMap map) {
        this.map = map;
        return this;
    }

    public void setStyleBean(CommRefreshBean commRefreshBean) {
        this.style = GsonUtils.toJson(commRefreshBean);
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public RecordsBean setCategoryThis(String category) {
        this.category = category;
        return this;
    }

    public void setList(List<RecordsBean> list) {
        this.list = list;
    }

    public RecordsBean() {
    }

    public RecordsBean(int paramtype, String titile, String field, String defaultvalue) {
        this.paramType = paramtype;
        this.titile = titile;
        this.field = field;
        this.defaultValue = defaultvalue;
    }

    /**
     * @param paramtype    类型
     * @param titile       标题
     * @param field        和后台关联参数
     * @param defaultvalue 默认显示值
     * @param require      是否必填
     * @param type         行为
     */
    public RecordsBean(@DynamicFormEnum.ItemFlagEnum int paramtype, String titile, String field, String defaultvalue, boolean require, String type) {
        this.require = require;
        this.paramType = paramtype;
        this.titile = titile;
        this.field = field;
        this.defaultValue = defaultvalue;
        this.type = type;
    }


    public RecordsBean(int paramType, String titile, String field, String defaultValue, String style, String type) {
        this.paramType = paramType;
        this.titile = titile;
        this.field = field;
        this.defaultValue = defaultValue;
        this.style = style;
        this.type = type;
    }

    public RecordsBean(@DynamicFormEnum.ItemFlagEnum int paramType, String titile, String field, String defaultValue, String style, String type, boolean require) {
        this.paramType = paramType;
        this.titile = titile;
        this.field = field;
        this.defaultValue = defaultValue;
        this.style = style;
        this.type = type;
        this.require = require;
    }

    public RecordsBean(int paramType, String titile, String svalue, String field, String defaultValue, String style, String type, boolean require) {
        this.paramType = paramType;
        this.titile = titile;
        this.field = field;
        this.value = svalue;
        this.defaultValue = defaultValue;
        this.style = style;
        this.type = type;
        this.require = require;
    }

    public RecordsBean(@DynamicFormEnum.ItemFlagEnum int paramType, String titile, String field, String defaultValue, String style, boolean require) {
        this.paramType = paramType;
        this.titile = titile;
        this.field = field;
        this.defaultValue = defaultValue;
        this.style = style;
        this.require = require;
    }

    public Object getCarryObject() {
        return carryObject;
    }

    public void setCarryObject(Object carryObject) {
        this.carryObject = carryObject;
    }


    public String getSelectValue() {
        return selectValue;
    }

    public void setSelectValue(String selectValue) {
        this.selectValue = selectValue;
    }


    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public RecordsBean setValueThis(String value) {
        this.value = value;
        return this;
    }

    private int spanSize;

    public int getSpanSize() {
        return spanSize;
    }

    public void setSpanSize(int spanSize) {
        this.spanSize = spanSize;
    }


    public boolean isEdit() {
        return edit;
    }

    public void setEdit(boolean edit) {
        this.edit = edit;
    }

    public RecordsBean setEditThis(boolean edit) {
        this.edit = edit;
        return this;
    }

    public boolean getRequire() {
        return require;
    }

    public void setRequire(boolean require) {
        this.require = require;
    }


    public String getChangeType() {
        return changeType;
    }

    public void setChangeType(String changeType) {
        this.changeType = changeType;
    }


    public RecordsBean setChangeTypeThis(String changeType) {
        this.changeType = changeType;
        return this;
    }

    public boolean isRequire() {
        return require;
    }

    public List<RecordsBean> getList() {
        return list;
    }

    @Override
    public String toString() {
        return "RecordsBean{" +
                "paramType=" + paramType +
                ", titile='" + titile + '\'' +
                ", field='" + field + '\'' +
                ", fieldTwo='" + fieldTwo + '\'' +
                ", defaultValue='" + defaultValue + '\'' +
                ", ordernum=" + ordernum +
                ", type='" + type + '\'' +
                ", category='" + category + '\'' +
                ", edit=" + edit +
                ", require=" + require +
                ", changeType='" + changeType + '\'' +
                ", carryObject=" + carryObject +
                ", list=" + list +
                ", style='" + style + '\'' +
                ", value='" + value + '\'' +
                ", selectValue='" + selectValue + '\'' +
                ", level=" + level +
                ", position=" + position +
                ", spanSize=" + spanSize +
                '}';
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeParcelable((Parcelable) this.recordBeanClickInterface, flags);
        dest.writeInt(this.paramType);
        dest.writeString(this.titile);
        dest.writeString(this.field);
        dest.writeSerializable(this.map);
        dest.writeString(this.defaultValue);
        dest.writeInt(this.ordernum);
        dest.writeString(this.type);
        dest.writeString(this.category);
        dest.writeByte(this.edit ? (byte) 1 : (byte) 0);
        dest.writeByte(this.require ? (byte) 1 : (byte) 0);
        dest.writeString(this.changeType);
        dest.writeParcelable((Parcelable) this.carryObject, flags);
        dest.writeList(this.list);
        dest.writeString(this.style);
        dest.writeString(this.value);
        dest.writeString(this.selectValue);
        dest.writeInt(this.spanSize);
        dest.writeInt(this.level);
        dest.writeInt(this.position);
        dest.writeString(this.fieldTwo);
        dest.writeString(this.remark);
        dest.writeString(this.Name);
    }

    protected RecordsBean(Parcel in) {
        this.recordBeanClickInterface = in.readParcelable(RecordBeanClickInterface.class.getClassLoader());
        this.paramType = in.readInt();
        this.titile = in.readString();
        this.field = in.readString();
        this.map = (HashMap) in.readSerializable();
        this.defaultValue = in.readString();
        this.ordernum = in.readInt();
        this.type = in.readString();
        this.category = in.readString();
        this.edit = in.readByte() != 0;
        this.require = in.readByte() != 0;
        this.changeType = in.readString();
        this.carryObject = in.readParcelable(Object.class.getClassLoader());
        this.list = new ArrayList<RecordsBean>();
        in.readList(this.list, RecordsBean.class.getClassLoader());
        this.style = in.readString();
        this.value = in.readString();
        this.selectValue = in.readString();
        this.spanSize = in.readInt();
        this.level = in.readInt();
        this.position = in.readInt();
        this.fieldTwo = in.readString();
        this.remark = in.readString();
        this.Name=in.readString();
    }

    public static final Creator<RecordsBean> CREATOR = new Creator<RecordsBean>() {
        @Override
        public RecordsBean createFromParcel(Parcel source) {
            return new RecordsBean(source);
        }

        @Override
        public RecordsBean[] newArray(int size) {
            return new RecordsBean[size];
        }
    };

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RecordsBean)) return false;
        RecordsBean that = (RecordsBean) o;
        return getParamType() == that.getParamType() && getOrdernum() == that.getOrdernum() && isEdit() == that.isEdit() && isRequire() == that.isRequire() && getLevel() == that.getLevel() && getPosition() == that.getPosition() && getSpanSize() == that.getSpanSize() && Objects.equals(getTitile(), that.getTitile()) && Objects.equals(getField(), that.getField()) && Objects.equals(getMap(), that.getMap()) && Objects.equals(getRecordBeanClickInterface(), that.getRecordBeanClickInterface()) && Objects.equals(getFieldTwo(), that.getFieldTwo()) && Objects.equals(getHttpBean(), that.getHttpBean()) && Objects.equals(getDefaultValue(), that.getDefaultValue()) && Objects.equals(getType(), that.getType()) && Objects.equals(getCategory(), that.getCategory()) && Objects.equals(getChangeType(), that.getChangeType()) && Objects.equals(getCarryObject(), that.getCarryObject()) && Objects.equals(getList(), that.getList()) && Objects.equals(getStyle(), that.getStyle()) && Objects.equals(getRemark(), that.getRemark()) && Objects.equals(getValue(), that.getValue()) && Objects.equals(getSelectValue(), that.getSelectValue());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getParamType(), getTitile(), getField(), getMap(), getRecordBeanClickInterface(), getFieldTwo(), getHttpBean(), getDefaultValue(), getOrdernum(), getType(), getCategory(), isEdit(), isRequire(), getChangeType(), getCarryObject(), getList(), getStyle(), getRemark(), getValue(), getSelectValue(), getLevel(), getPosition(), getSpanSize());
    }
}
