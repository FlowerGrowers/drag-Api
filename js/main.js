const draggableList = document.getElementById('draggable-list');
const checkBtn = document.querySelector('#check-btn');

const richesPeople = ['有钱人1', '有钱人2', '有钱人3', '有钱人4', '有钱人5', '有钱人6', '有钱人7',
	'有钱人8', '有钱人9', '有钱人10'
];

// 存储li
let listItems = [];
let dragStartIndex;

createList();

function createList() {
	[...richesPeople]
	.map(item => ({
			value: item,
			sort: Math.random()
		}))
		.sort((a, b) => a.sort - b.sort)
		.map(a => a.value)
		.forEach((item, index) => {
			const listItem = document.createElement("li");
			listItem.setAttribute('data-index', index);
			listItem.innerHTML =
				`
					<span class='number'>${index+1}</span>
					<div class='draggable' draggable='true'>
					<p class='person-name'>${item}</p>
					<i class='fas fa-grip-lines'></i>
					</div>
					`;
			listItems.push(listItem);
			draggableList.appendChild(listItem);
		});

	addEventListeners();
}

function dragStart(e) {
	dragStartIndex = this.closest('li').getAttribute('data-index');
	console.log(dragStartIndex)
}

function dragEnter(e) {
	this.classList.add('over')
}

function dragOver(e) {
	e.preventDefault();
}

function dragLeave(e) {
	this.classList.remove('over')
}

function dragDrop(e) {
	const dragEndIndex = this.getAttribute('data-index');
	console.log(dragEndIndex)
	swapItems(dragStartIndex, dragEndIndex)
	this.classList.remove('over')
}

function swapItems(fromIndex, toIndex) {
	const itemOne = listItems[fromIndex].querySelector('.draggable')
	const itemTwo = listItems[toIndex].querySelector('.draggable')
	
	listItems[fromIndex].appendChild(itemTwo);
	listItems[toIndex].appendChild(itemOne);
}

// 查验排序
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richesPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
	const draggables = document.querySelectorAll('.draggable');
	const dragListItems = document.querySelectorAll('.draggable-list>li');
	draggables.forEach(item => item.addEventListener('dragstart', dragStart));
	dragListItems.forEach(item => {
		item.addEventListener('dragenter', dragEnter);
		item.addEventListener('dragover', dragOver);
		item.addEventListener('dragleave', dragLeave);
		item.addEventListener('drop', dragDrop);
	})
}

checkBtn.addEventListener('click',checkOrder);