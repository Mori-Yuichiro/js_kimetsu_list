const kimetsuEle = document.getElementById('all');
const kisatsuEle = document.getElementById('kisatsu');
const hashiraEle = document.getElementById('hashira');
const oniEle = document.getElementById('oni');
const contentsEle = document.getElementById('contents');

const apiFunction = async (value) => {
    const response = await fetch(`https://ihatov08.github.io/kimetsu_api/api/${value}.json`);
    const data = await response.json();
    return data;
}

const startLoad = () => {
    const loadElement = document.createElement('div');
    loadElement.setAttribute('id', 'load');

    const p = document.createElement('p')
    p.setAttribute('id', 'loading');
    p.innerHTML = 'Loading...';
    loadElement.appendChild(p);
    contentsEle.appendChild(loadElement);
}

const stopLoad = () => {
    const loadElement = document.getElementById('load');
    contentsEle.removeChild(loadElement);
}

// ページの初期表示に使用
const initFunc = async () => {
    startLoad();
    const result = await apiFunction('all');
    showData(result);
    stopLoad();
}

initFunc();

kimetsuEle.addEventListener('click', async () => {
    await eventFunction('all');
})

kisatsuEle.addEventListener('click', async () => {
    await eventFunction('kisatsutai');
})

hashiraEle.addEventListener('click', async () => {
    await eventFunction('hashira');
})

oniEle.addEventListener('click', async () => {
    await eventFunction('oni');
})

const eventFunction = async (value) => {
    const dataAreaExist = document.getElementsByClassName('data-area');
    if (dataAreaExist !== undefined) {
        removeElement(dataAreaExist);
    }
    startLoad();
    const result = await apiFunction(value);
    showData(result);
    stopLoad();
}

// 取得データを表示
const showData = (result) => {
    result.forEach((data, index) => {
        const dataElement = document.createElement('div');
        dataElement.setAttribute('class', 'data-area')
        dataElement.setAttribute('id', `data-area-${index}`)
        const nameArea = document.createElement('p');
        const imageArea = document.createElement('img');
        const categoryArea = document.createElement('p');

        nameArea.setAttribute('id', 'name');
        nameArea.innerHTML = data.name;

        imageArea.setAttribute('src', `https://ihatov08.github.io${data.image}`);

        categoryArea.setAttribute('id', 'category');
        categoryArea.innerHTML = data.category;

        dataElement.appendChild(nameArea);
        dataElement.appendChild(imageArea);
        dataElement.appendChild(categoryArea);
        contentsEle.appendChild(dataElement);
    })
}

// 表示データを削除
const removeElement = (classList) => {
    const length = classList.length;
    for (let i = 0; i < length; i++) {
        let content = document.getElementById(`data-area-${i}`);
        content.remove();
    }
}
