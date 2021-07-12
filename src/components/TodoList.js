import TodoCount from "./TodoCount.js";
import { ALL, ACTIVE, COMPLETED } from "../constants/constants.js";

/* todoList�� �����ִ� ������Ʈ */
export default function TodoList() {
  this.todoItems = [];
  this.todoCount = new TodoCount();
  this.$todoList = document.querySelector("#todo-list");
  this.$filters = document.querySelector(".filters");

  //�ֽ�ȭ�� item�� �޾ƿͼ� render�Լ��� ����
  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
    this.todoCount.setCount(this.todoItems);
    /* ���� ��� �ؾ� �� �� �ǿ��� �������� �����ϰų� 
       �����ϸ� ��ü����� �Ѿ�� ������ �ִ� */
  };

  //������ �ϳ��� html ���ø��� �߰��ؼ� ȭ�鿡 �����ֱ�
  this.render = (items) => {
    this.$todoList.innerHTML = ""; //���� �־��� html�� ���� ���� �Ŀ� �ٽ� �����Ѵ�
    items.map((todo) => {
      this.$todoList.insertAdjacentHTML(
        "beforeend",
        this.todoItemTemplate(todo)
      );
    });
    // const template = items.map(this.todoItemTemplate);
    // this.$todoList.insertAdjacentHTML("beforeend", template);
    // troubleShooting: �� �� �ٰ� ���� �ڵ��� ���� ���� item ���̿� ',' �� ���ԵǴ� ������ �־���.
  };

  //todoItem ����Ʈ �ϳ��� html ���ø�
  this.todoItemTemplate = (item) => {
    return `<li id="${item.id}" class="${item.completed && COMPLETED}">
    					<div class="view">
      					<input class="toggle" type="checkbox" ${
                  item.completed === true ? "checked" : ""
                }/>
      					<label class="label">${item.content}</label>
      					<button class="destroy"></button>
    					</div>
    					<input class="edit" value=""/>
  					</li>`;
  };

  //�ؾ��� �ϸ� �����ֱ�
  this.renderActive = (items) => {
    const activeItems = items.filter((todo) => {
      if (!todo.completed) {
        return true;
      }
    });
    this.render(activeItems);
    this.todoCount.setCount(activeItems);
  };

  //�Ϸ��� �ϸ� �����ֱ�
  this.renderCompleted = (items) => {
    const completedItems = items.filter((todo) => {
      if (todo.completed) {
        return true;
      }
    });
    this.render(completedItems);
    this.todoCount.setCount(completedItems);
  };

  //���͸� �� �����۵鸸 �����ϱ�
  /* selected Ŭ������ �߰��ؼ� �����Ǵ� css�� �԰� �ؾ� �ϴµ�
    �� �κ��� ���� �������� ���ߴ�.  */
  this.filterTodo = ({ target }) => {
    switch (target.className) {
      case ALL:
        this.render(this.todoItems);
        break;
      case ACTIVE:
        this.renderActive(this.todoItems);
        break;
      case COMPLETED:
        this.renderCompleted(this.todoItems);
        break;
    }
  };

  this.$filters.addEventListener("click", this.filterTodo);
}
