const buttonNode = document.querySelector('button');
const inputNodeId = document.querySelector("input[name = 'id']");
const inputNodeName = document.querySelector("input[name = 'name']");
const inputNodePrice = document.querySelector("input[name = 'price']");
const tbodyNode = document.querySelector('tbody');
let productList = [];

buttonNode.addEventListener('click', () => {
    let check = kiemTraDeTrong();
    if (check) {
        themSanPham();
    }
})

window.addEventListener('load', () => {
    const productJson = localStorage.getItem('key');
    if (productJson === null) {
        productList = [];
    } else {
        productList = JSON.parse(productJson);
        productList.forEach(product => {
            eventClickBtn(productList, product)
        })
    }
});

/////// Hàm dùng chung cho chương trình
// 1. Hàm Kiểm tra bỏ trống
function kiemTraDeTrong() {
    let result = true;
    if (inputNodeId.value === '' || inputNodeName.value === '' || inputNodePrice.value === '') {
        alert("vui lòng không để trống.");
        result = false;
    }
    return result;
}
// 2. Hàm Kiểm tra trùng lặp sản phẩm
function trungLapSanPham() {
    let result = true;
    for (let i = 0; i < productList.length; i += 1) {
        if (inputNodeId.value.trim() === productList[i].id) {
            alert("mã sản phẩm đã tồn tại.");
            result = false;
            break;
        }
    }
    return result;
}
// 3. Hàm thêm sản phẩm 
function themSanPham() {
    let result = trungLapSanPham();
    if (result) {
        const product = {
            id: inputNodeId.value.trim(),
            name: inputNodeName.value,
            price: inputNodePrice.value
        }
        productList.push(product);
        // 4. Save Data to localStorage
        localStorage.setItem('key', JSON.stringify(productList));
        alert("Lưu thành công");
        // Xóa các trường input sau khi lưu thành công
        inputNodeId.value = "";
        inputNodeName.value = "";
        inputNodePrice.value = "";
        // 5. Hàm Xử lý UI (DOM) hiển thị thông tin sản phẩm
        eventClickBtn(productList, product);
    }
}

// 5. Hàm Xử lý UI (DOM) hiển thị thông tin sản phẩm
function eventClickBtn(paramArr, product) {
    const trNode = document.createElement('tr');
    tbodyNode.appendChild(trNode);
    trNode.innerHTML = `
            <td>${product.id}</td>
            <td>
                <p class="name-label">${product.name}</p>
                <input type="text" name="name" class="hidden name-input" value="${product.name}" />
            </td>
            <td>
                <p class="price-label">${product.price}</p>
                <input type="text" name="name" class="hidden price-input" value="${product.price}" />
            </td>
            <td>
                <a class="action-button edit-button" href="#">Edit</a>
                <a class="action-button delete-button" href="#">Delete</a>
                <button class="save-button hidden">Lưu</button>
                <button class="cancel-button hidden">Quay Lại</button>
            </td>
        `
    const editButtonNode = trNode.querySelector('.edit-button');
    const delButtonNode = trNode.querySelector('.delete-button');
    const nameLabelNode = trNode.querySelector('.name-label');
    const nameInputNode = trNode.querySelector('.name-input');
    const priceLabelNode = trNode.querySelector('.price-label');
    const priceInputNode = trNode.querySelector('.price-input');
    const saveButtonNode = trNode.querySelector('.save-button');
    const cancelButtonNode = trNode.querySelector('.cancel-button');

    editButtonNode.addEventListener('click', () => {
        nameLabelNode.classList.add('hidden');
        priceLabelNode.classList.add('hidden');
        nameInputNode.classList.remove('hidden');
        priceInputNode.classList.remove('hidden');
        editButtonNode.classList.add('hidden');
        delButtonNode.classList.add('hidden');
        saveButtonNode.classList.remove('hidden');
        cancelButtonNode.classList.remove('hidden');
    })
    delButtonNode.addEventListener('click', () => {
        let choice = confirm(`Bạn có muốn xóa sản phẩm (id=${product.id})`);
        if (choice) {
            let viTri = -1;
            for (let i = 0; i < paramArr.length; i += 1) {
                if (paramArr[i].id === product.id) {
                    trNode.remove();
                    viTri = i;
                    break;
                }
            }
            console.log(paramArr[viTri]);
            paramArr.splice(viTri, 1);
            localStorage.setItem('key', JSON.stringify(paramArr));
        }
    })
    saveButtonNode.addEventListener('click', () => {
        if (nameInputNode.value === '' || priceInputNode.value === '') {
            alert('Vui lòng không để trống.');
        } else {
            product.name = nameInputNode.value;
            product.price = priceInputNode.value;
            localStorage.setItem('key', JSON.stringify(paramArr));
            alert("Lưu thành công");
            nameInputNode.classList.add('hidden');
            priceInputNode.classList.add('hidden');
            saveButtonNode.classList.add('hidden');
            cancelButtonNode.classList.add('hidden');
            nameLabelNode.classList.remove('hidden');
            nameLabelNode.innerHTML = nameInputNode.value;
            priceLabelNode.classList.remove('hidden');
            priceLabelNode.innerHTML = priceInputNode.value;
            editButtonNode.classList.remove('hidden');
            delButtonNode.classList.remove('hidden');
        }
    })
    cancelButtonNode.addEventListener('click', () => {
        nameInputNode.classList.add('hidden');
        priceInputNode.classList.add('hidden');
        saveButtonNode.classList.add('hidden');
        cancelButtonNode.classList.add('hidden');
        nameLabelNode.classList.remove('hidden');
        priceLabelNode.classList.remove('hidden');
        editButtonNode.classList.remove('hidden');
        delButtonNode.classList.remove('hidden');
    })
}





