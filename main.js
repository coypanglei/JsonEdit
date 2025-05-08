// 默认常量
const DEFAULT_BASE_URL = "http://192.168.1.11:3427";
const DEFAULT_API_URL = "http://192.168.1.11:3423";

// 获取当前 baseurl/apiurl（优先localStorage，否则用默认值）
function getBaseUrl() {
  return localStorage.getItem('baseurl') || DEFAULT_BASE_URL;
}
function getApiUrl() {
  return localStorage.getItem('apiurl') || DEFAULT_API_URL;
}

// 获取完整接口地址
function getRequestUrl(method, httppath) {
  if (method === 'GetBase' || method === 'PostBase') {
    return getBaseUrl().replace(/\/$/, '') + '/' + httppath.replace(/^\//, '');
  } else if (['PostApi', 'PostApiJson', 'GetApi'].includes(method)) {
    return getApiUrl().replace(/\/$/, '') + '/' + httppath.replace(/^\//, '');
  }
  // 兜底
  return httppath;
}

// 设置弹窗逻辑
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
settingsBtn.onclick = toggleSettings;

function toggleSettings() {
  if (settingsModal.style.display === 'none' || settingsModal.style.display === '') {
    // 打开时填充当前值
    document.getElementById('baseurlInput').value = parsedJson.baseurl || '';
    document.getElementById('apiurlInput').value = parsedJson.apiurl || '';
    settingsModal.style.display = 'block';
    document.querySelector('.modal-overlay').classList.add('show');
  } else {
    settingsModal.style.display = 'none';
    document.querySelector('.modal-overlay').classList.remove('show');
  }
}

function saveSettings() {
  parsedJson.baseurl = document.getElementById('baseurlInput').value;
  parsedJson.apiurl = document.getElementById('apiurlInput').value;
  document.getElementById('jsonInput').value = JSON.stringify(parsedJson, null, 2);
  settingsModal.style.display = 'none';
  document.querySelector('.modal-overlay').classList.remove('show');
  // 可选：刷新主表单
  document.getElementById('output').innerHTML = generateForm(parsedJson);
}
let parsedJson = {};
let isJsonVisible = false;

function toggleJsonInput() {
  const jsonSection = document.querySelector('.json-input-section');
  const overlay = document.querySelector('.modal-overlay');
  isJsonVisible = !isJsonVisible;
  if (isJsonVisible) {
    jsonSection.classList.add('show');
    overlay.classList.add('show');
  } else {
    jsonSection.classList.remove('show');
    overlay.classList.remove('show');
  }
}

// 点击遮罩层关闭弹窗
document.querySelector('.modal-overlay').addEventListener('click', toggleJsonInput);

function copyJson() {
  const jsonInput = document.getElementById('jsonInput');
  jsonInput.select();
  document.execCommand('copy');
  
  const copyButton = document.querySelector('.copy-button');
  const originalText = copyButton.textContent;
  copyButton.textContent = '复制成功！';
  setTimeout(() => {
    copyButton.textContent = originalText;
  }, 2000);
}
  const jsonSection = document.querySelector('.json-input-section');
  const overlay = document.querySelector('.modal-overlay');
  isJsonVisible = !isJsonVisible;
  if (isJsonVisible) {
    jsonSection.classList.add('show');
    overlay.classList.add('show');
  } else {
    jsonSection.classList.remove('show');
    overlay.classList.remove('show');
  }

// 默认的 JSON 字符串
const defaultJson = `{
  "hinttitle": "传感器编号/地点",
  "searchkeyword": "Search",

  "filtercriteria": [{
    "dicname": "水文监测点位",
    "fieldname": "monitorlocation",
    "Title": "部门",
    "departmant": "more",
    "type": "int",
    
    "Method": "GetBase",
    "Path": "",
    "Key": "Department",
    "Value": "Department"
  }],
  "loginparams": [{
      "name": "ID",
      "value": "UID"
    },
    {
      "name": "deptid",
      "value": "SITE_DEPT_ID"
    }
  ],
  "method": "GetApi",
  "httppath": "api/ShuiHai/YSL/RTDATA"
  
}`;
// 页面加载时自动解析默认的 JSON
window.onload = function() {
  document.getElementById('jsonInput').value = defaultJson;
  parseJson();
};
function parseJson() {
  const jsonInput = document.getElementById('jsonInput').value;
  const validationMessage = document.getElementById('validationMessage');
  const output = document.getElementById('output');

  try {
    parsedJson = JSON.parse(jsonInput);
    output.innerHTML = generateForm(parsedJson);
    validationMessage.textContent = '解析成功';
    validationMessage.className = 'validation-message success';
  } catch (error) {
    validationMessage.textContent = '无效的JSON格式';
    validationMessage.className = 'validation-message error';
  }
}

function formatJson() {
  const jsonInput = document.getElementById('jsonInput').value;
  const validationMessage = document.getElementById('validationMessage');

  try {
    const formattedJson = JSON.stringify(JSON.parse(jsonInput), null, 2);
    document.getElementById('jsonInput').value = formattedJson;
    validationMessage.textContent = '格式化成功';
    validationMessage.className = 'validation-message format';
  } catch (error) {
    validationMessage.textContent = '无效的JSON格式';
    validationMessage.className = 'validation-message error';
  }
}

function validateJson() {
  const jsonInput = document.getElementById('jsonInput').value;
  const validationMessage = document.getElementById('validationMessage');

  try {
    JSON.parse(jsonInput);
    validationMessage.textContent = 'JSON格式有效';
    validationMessage.className = 'validation-message success';
  } catch (error) {
    validationMessage.textContent = '无效的JSON格式';
    validationMessage.className = 'validation-message error';
  }
}

function generateForm(json) {
  let formHtml = '<form>';

  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const value = json[key];
      formHtml += `<div class="form-group">`;

      // 映射显示名称
      let displayName = key;
      if (key === 'hinttitle') {
        displayName = '搜索框默认值';
      } else if (key === 'searchkeyword') {
        displayName = '搜索条件';
      } else if (key === 'filtercriteria') {
        displayName = '筛选条件';
      } else if (key === 'loginparams') {
        displayName = '登录参数';
      } else if (key === 'method') {
        displayName = '列表请求方式';
      } else if (key === 'httppath') {
        displayName = '列表请求地址';
      }

      if (key === 'hinttitle' || key === 'searchkeyword' || key === 'httppath') {
        formHtml += `<label>${displayName}:</label>`;
        formHtml += `<input type="text" value="${value}" oninput="updateJson('${key}', this.value)" />`;
        if (key === 'httppath') {
          formHtml += `<button type="button" class="add-button" onclick="testApi()">测试接口</button>`;
        }
      } else if (key === 'method') {
        formHtml += `<label>${displayName}:</label>`;
        formHtml += `<select oninput="updateJson('${key}', this.value)">`;
        formHtml += `<option value="PostApiJson" ${value === 'PostApiJson' ? 'selected' : ''}>PostApiJson</option>`;
        formHtml += `<option value="PostApi" ${value === 'PostApi' ? 'selected' : ''}>PostApi</option>`;
        formHtml += `<option value="PostBase" ${value === 'PostBase' ? 'selected' : ''}>PostBase</option>`;
        formHtml += `<option value="GetBase" ${value === 'GetBase' ? 'selected' : ''}>GetBase</option>`;
        formHtml += `<option value="GetApi" ${value === 'GetApi' ? 'selected' : ''}>GetApi</option>`;
        formHtml += `</select>`;
      } else if (key === 'loginparams') {
        formHtml += `<label>${displayName}:</label>`;
        value.forEach((item, index) => {
          formHtml += `<div class="loginparams-item">`;
          formHtml += `<select oninput="updateJson('${key}[${index}].value', this.value)">`;
          formHtml += `<option value="ImageUrl" ${item.value === 'ImageUrl' ? 'selected' : ''}>ImageUrl</option>`;
          formHtml += `<option value="DisplayName" ${item.value === 'DisplayName' ? 'selected' : ''}>DisplayName</option>`;
          formHtml += `<option value="LoginName" ${item.value === 'LoginName' ? 'selected' : ''}>LoginName</option>`;
          formHtml += `<option value="DeptID" ${item.value === 'DeptID' ? 'selected' : ''}>DeptID</option>`;
          formHtml += `<option value="SiteDeptID" ${item.value === 'SiteDeptID' ? 'selected' : ''}>SiteDeptID</option>`;
          formHtml += `<option value="rootDeptId" ${item.value === 'rootDeptId' ? 'selected' : ''}>rootDeptId</option>`;
          formHtml += `<option value="rootDeptName" ${item.value === 'rootDeptName' ? 'selected' : ''}>rootDeptName</option>`;
          formHtml += `<option value="DeptName" ${item.value === 'DeptName' ? 'selected' : ''}>DeptName</option>`;
          formHtml += `<option value="DeptType" ${item.value === 'DeptType' ? 'selected' : ''}>DeptType</option>`;
          formHtml += `<option value="UID" ${item.value === 'UID' ? 'selected' : ''}>UID</option>`;
          formHtml += `<option value="IDCard" ${item.value === 'IDCard' ? 'selected' : ''}>IDCard</option>`;
          formHtml += `<option value="Token" ${item.value === 'Token' ? 'selected' : ''}>Token</option>`;
          formHtml += `</select>`;
          formHtml += `<input type="text" value="${item.name}" oninput="updateJson('${key}[${index}].name', this.value)" />`;
          formHtml += `<button type="button" class="remove-button" onclick="removeLoginParam(${index})">删除</button>`;
          formHtml += `</div>`;
        });
        formHtml += `<button type="button" class="add-button" onclick="addLoginParam()">添加</button>`;
      } else if (key === 'filtercriteria') {
        formHtml += `<label>${displayName}:</label>`;
        value.forEach((item, index) => {
          formHtml += `<div class="filtercriteria-item">`;
          for (const fieldName in item) {
            if (item.hasOwnProperty(fieldName)) {
              // 映射显示名称
              let displayName = fieldName;
              // 这里可以根据不同的字段名来映射不同的显示名称
              if (fieldName === 'dicname') {
              displayName = '接口需要的名称';
              formHtml += `<div class="filtercriteria-field">`;
              formHtml += `<label>${displayName}:</label>`;
              formHtml += `<input type="text" value="${item[fieldName]}" oninput="updateJson('${key}[${index}].${fieldName}', this.value)" />`;
              formHtml += `</div>`;
              } else if (fieldName === 'fieldname') {
              displayName = '传给后台的名称';
              formHtml += `<div class="filtercriteria-field">`;
              formHtml += `<label>${displayName}:</label>`;
              formHtml += `<input type="text" value="${item[fieldName]}" oninput="updateJson('${key}[${index}].${fieldName}', this.value)" />`;
              formHtml += `</div>`;
              } else if (fieldName === 'departmant') {
              displayName = '单选多选';
              formHtml += `<div class="filtercriteria-field">`;
              formHtml += `<label>${displayName}:</label>`;
              formHtml += `<select oninput="updateJson('${key}[${index}].${fieldName}', this.value)" value="${item[fieldName]}">`;
              formHtml += `<option value="one" ${item[fieldName] === 'one' ? 'selected' : ''}>单选</option>`;
              formHtml += `<option value="two" ${item[fieldName] === 'two' ? 'selected' : ''}>多选</option>`;
              formHtml += `</select>`;
              formHtml += `</div>`;
              } else if (fieldName === 'type') {
              displayName = '类型';
              formHtml += `<div class="filtercriteria-field">`;
              formHtml += `<label>${displayName}:</label>`;
              formHtml += `<select oninput="updateJson('${key}[${index}].${fieldName}', this.value)" value="${item[fieldName]}">`;
              formHtml += `<option value="int" ${item[fieldName] === 'int' ? 'selected' : ''}>int</option>`;
              formHtml += `<option value="string" ${item[fieldName] === 'string' ? 'selected' : ''}>string</option>`;
              formHtml += `</select>`;
              formHtml += `</div>`;
              } else if (fieldName === 'Title') {
              displayName = '显示数据';
              formHtml += `<div class="filtercriteria-field">`;
              formHtml += `<label>${displayName}:</label>`;
              formHtml += `<input type="text" value="${item[fieldName]}" oninput="updateJson('${key}[${index}].${fieldName}', this.value)" />`;
              formHtml += `</div>`;
              } else if (fieldName === 'Method') {
              displayName = '请求方式';
              formHtml += `<div class="filtercriteria-field">`;
                formHtml += `<label>${displayName}:</label>`;
              formHtml += `<select oninput="updateJson('${key}[${index}].${fieldName}', this.value)" value="${item[fieldName]}">`;
              formHtml += `<option value="PostApi" ${item[fieldName] === 'PostApi' ? 'selected' : ''}>PostApi</option>`;
              formHtml += `<option value="PostBase" ${item[fieldName] === 'PostBase' ? 'selected' : ''}>PostBase</option>`;
              formHtml += `<option value="GetBase" ${item[fieldName] === 'GetBase' ? 'selected' : ''}>GetBase</option>`;
              formHtml += `<option value="GetApi" ${item[fieldName] === 'GetApi' ? 'selected' : ''}>GetApi</option>`;
              formHtml += `</select>`;
              formHtml += `</div>`;
              } else if (fieldName === 'Path') {
              displayName = '地址';
              formHtml += `<div class="filtercriteria-field">`;
              formHtml += `<label>${displayName}:</label>`;
              formHtml += `<input type="text" value="${item[fieldName]}" oninput="updateJson('${key}[${index}].${fieldName}', this.value)" />`;
              formHtml += `</div>`;
              } else if (fieldName === 'Key') {
              displayName = '自定义取值';
              formHtml += `<div class="filtercriteria-field">`;
              formHtml += `<label>${displayName}:</label>`;
              formHtml += `<input type="text" value="${item[fieldName]}" oninput="updateJson('${key}[${index}].${fieldName}', this.value)" />`;
              formHtml += `</div>`;
              } else if (fieldName === 'Value') {
              displayName = '自定义显示的值';
              
              formHtml += `<div class="filtercriteria-field">`;
              formHtml += `<label>${displayName}:</label>`;
              formHtml += `<input type="text" value="${item[fieldName]}" oninput="updateJson('${key}[${index}].${fieldName}', this.value)" />`;
              formHtml += `</div>`;
              }
              
            
            }
          }
          
          formHtml += `<button type="button" class="remove-button" onclick="removeFilterCriteria(${index})">删除</button>`;
          formHtml += `</div>`;
        });
        formHtml += `<button type="button" class="add-button" onclick="addFilterCriteria()">添加</button>`;
      } else {
        formHtml += `<label>${displayName}:</label>`;
        formHtml += `<pre>${JSON.stringify(value, null, 2)}</pre>`;
      }

      formHtml += `</div>`;
    }
  }

  formHtml += `</form>`;
  return formHtml;
}

function updateJson(key, value) {
  const keys = key.split('.');
  let current = parsedJson;

  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (k.endsWith(']')) {
      const index = parseInt(k.match(/\[(\d+)\]/)[1]);
      const arrayKey = k.split('[')[0];
      if (!current[arrayKey]) {
        current[arrayKey] = [];
      }
      current = current[arrayKey][index];
    } else {
      if (!current[k]) {
        current[k] = {};
      }
      current = current[k];
    }
  }

  const lastKey = keys[keys.length - 1];
  if (lastKey.endsWith(']')) {
    const index = parseInt(lastKey.match(/\[(\d+)\]/)[1]);
    const arrayKey = lastKey.split('[')[0];
    current[arrayKey][index] = value;
  } else {
    current[lastKey] = value;
  }

  document.getElementById('jsonInput').value = JSON.stringify(parsedJson, null, 2);
}

function addLoginParam() {
  if (!parsedJson.loginparams) {
    parsedJson.loginparams = [];
  }
  parsedJson.loginparams.push({ name: 'imageUrl', value: 'ImageUrl' });
  document.getElementById('output').innerHTML = generateForm(parsedJson);
}

function removeLoginParam(index) {
  parsedJson.loginparams.splice(index, 1);
  document.getElementById('output').innerHTML = generateForm(parsedJson);
}

function addFilterCriteria() {
  if (!parsedJson.filtercriteria) {
    parsedJson.filtercriteria = [];
  }
  parsedJson.filtercriteria.push({
    dicname: '',
    fieldname: '',
    Title: '',
    departmant: '',
    type: '',
    Method: '',
    Path: '',
    Key: '',
    Value: ''
  });
  document.getElementById('output').innerHTML = generateForm(parsedJson);
}

function removeFilterCriteria(index) {
  parsedJson.filtercriteria.splice(index, 1);
  document.getElementById('output').innerHTML = generateForm(parsedJson);
}

function getUserToken() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.Token || '';
}

async function testApi() {
  const method = parsedJson.method;
  const httppath = parsedJson.httppath;
  // 组装参数
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const params = {
    search: '',
    PageSize: 23,
    deptid: user.DeptID || '',
    PageIndex: 1
  };
  // 拼接 loginparams
  if (Array.isArray(parsedJson.loginparams)) {
    parsedJson.loginparams.forEach(item => {
      if (item && item.name && item.value && user[item.value] !== undefined) {
        params[item.name] = user[item.value];
      }
    });
  }
  // 合并自定义参数
  customParams.forEach(param => {
    if (param.key) params[param.key] = param.value;
  });
  const url = getRequestUrl(method, httppath);
  const token = getUserToken();

  let response, result;
  try {
    if (method === 'GetBase' || method === 'GetApi') {
      const query = new URLSearchParams(params).toString();
      response = await fetch(query ? `${url}?${query}` : url, {
        method: 'GET',
        headers: { usertoken: token }
      });
    } else if (method === 'PostBase' || method === 'PostApi') {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          usertoken: token
        },
        body: new URLSearchParams(params).toString()
      });
    } else if (method === 'PostApiJson') {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          usertoken: token
        },
        body: JSON.stringify(params)
      });
    } else {
      response = await fetch(url, {
        method: 'GET',
        headers: { usertoken: token }
      });
    }
    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      document.getElementById('output').innerHTML = `<div class="error">返回不是有效JSON：<pre>${text}</pre></div>`;
      return;
    }
    let typeMsg = '';
    if (json && json.Data && Array.isArray(json.Data.rows)) {
      typeMsg = '<span style="color:green;font-weight:bold;">【正常类型】Data.rows为数组</span>';
    } else if (json && json.Data && typeof json.Data === 'object') {
      typeMsg = '<span style="color:orange;font-weight:bold;">【非正常类型】Data为对象，无rows数组</span>';
    } else {
      typeMsg = '<span style="color:red;font-weight:bold;">【未知类型】</span>';
    }
    document.getElementById('api-result-area').innerHTML =
    typeMsg +
    '<pre>' + JSON.stringify(json, null, 2) + '</pre>' +
    '<button id="gotoJsonConfigBtn" class="add-button" style="margin-top:10px;">跳转到JSON配置</button>';

    document.getElementById('gotoJsonConfigBtn').onclick = function() {
      // 只存 Data.rows，如果有，否则存 Data
      let toSave = (json && json.Data && Array.isArray(json.Data.rows)) ? json.Data.rows : json.Data;
      localStorage.setItem('apiResultData', JSON.stringify(toSave));
      window.location.href = 'index.html#json-config';
    };
  } catch (e) {
    document.getElementById('output').innerHTML = `<div class="error">请求失败: ${e}</div>`;
  }
}
// 存储自定义参数
let customParams = [];

// 页面初始化时读取自定义参数
function loadCustomParams() {
  const saved = localStorage.getItem('customParams');
  if (saved) {
    try {
      customParams = JSON.parse(saved);
    } catch (e) {
      customParams = [];
    }
  }
}

// 渲染自定义参数输入区
function renderCustomParams() {
  const list = document.getElementById('custom-params-list');
  list.innerHTML = '';
  customParams.forEach((param, idx) => {
    list.innerHTML += `
      <div style="margin-bottom:4px;">
        <input type="text" placeholder="key" value="${param.key}" onchange="updateCustomParamKey(${idx}, this.value)" style="width:100px;">
        <input type="text" placeholder="value" value="${param.value}" onchange="updateCustomParamValue(${idx}, this.value)" style="width:160px;">
        <button onclick="removeCustomParam(${idx})">删除</button>
      </div>
    `;
  });
}
function addCustomParam() {
  customParams.push({key:'', value:''});
  renderCustomParams();
  localStorage.setItem('customParams', JSON.stringify(customParams));
}
function updateCustomParamKey(idx, val) {
  customParams[idx].key = val;
  localStorage.setItem('customParams', JSON.stringify(customParams));
}
function updateCustomParamValue(idx, val) {
  customParams[idx].value = val;
  localStorage.setItem('customParams', JSON.stringify(customParams));
}
function removeCustomParam(idx) {
  customParams.splice(idx, 1);
  renderCustomParams();
  localStorage.setItem('customParams', JSON.stringify(customParams));
}

// 页面初始化时渲染
document.addEventListener('DOMContentLoaded', function() {
  loadCustomParams();
  renderCustomParams();
});
function rsaEncode(str) {
  const publicKey = 
    "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDI5A4eJHaqmR8W7LHR8FBISASa" +
    "UqlAyFkjxTkel0YzaxHYneLEAgO/iSl4slzygoNxhDxm1I2c0MOPWWS5p6CIlKeF" +
    "UGXrLj6tvNhFGfXC9ODyxG0gzPm3DGlT2LT8SPG6amJQi9pONOpwedQgLPD2P2p9" +
    "vb9Ll9dOQeppSupPhQIDAQAB\n" +
    "-----END PUBLIC KEY-----";
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(str);
}

function getCurrentDateTime() {
  // 格式：yyyy-MM-dd HH:mm:ss
  const now = new Date();
  const pad = n => n < 10 ? '0' + n : n;
  return now.getFullYear() + '-' +
    pad(now.getMonth() + 1) + '-' +
    pad(now.getDate()) + ' ' +
    pad(now.getHours()) + ':' +
    pad(now.getMinutes()) + ':' +
    pad(now.getSeconds());
}

async function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  if (!username || !password) {
    alert('请输入账号和密码');
    return;
  }
  const loginObj = {
    loginName: username,
    loginPass: password,
    loginDate: getCurrentDateTime()
  };
  const entity = JSON.stringify(loginObj);
  const encrypted = rsaEncode(entity);
  if (!encrypted) {
    alert('加密失败');
    return;
  }
  const url = getBaseUrl().replace(/\/$/, '') + '/Home/mobilelogin';
  const params = new URLSearchParams({ logindata: encrypted }).toString();
  try {
    const resp = await fetch(url + '?' + params, { method: 'GET' });
    const text = await resp.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      alert('返回数据不是有效的JSON：\n' + text);
      return;
    }
    if (result && result.Code === 200 && result.Data) {
      // 存储用户信息
      localStorage.setItem('user', JSON.stringify(result.Data));
      alert('登录成功！\n' + result.Message);
    } else {
      alert('登录失败：' + (result && result.Message ? result.Message : text));
    }
  } catch (e) {
    alert('请求失败：' + e);
  }
}
