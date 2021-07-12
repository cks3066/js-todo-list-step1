import { TODOITEMS, KEY_ENTER, KEY_ESC } from "./../constants/constants.js";

export default function ChangeTodos(setState) {
  this.setState = setState;
  this.$todoList = document.querySelector("#todo-list");
  this.todoItems = [];

  this.changeStatus = ({ target }) => {
    this.todoItems = JSON.parse(localStorage.getItem(TODOITEMS));

    if (target.classList.contains("toggle")) {
      this.toggleTodo(target);
    } else if (target.classList.contains("destroy")) {
      this.deleteTodo(target);
    }
  };

  //�Ϸ�� ���¸� boolean������ �ݴ밪���� ��ȭ��Ŵ
  this.toggleTodo = (target) => {
    this.todoItems.map((todo) => {
      //troubleShooting: todo.id�� �������̱� ������ === ��� ���� �� �ٸ��� ���´�. �׷��� String���� �ٲ��ִ� ���� ���ڴ�.
      if (target.closest("li").id === todo.id) {
        todo.completed = !todo.completed;
      }
    });
    this.setState(this.todoItems);
  };

  //������ item�� id�� �ٸ� �͵鸸 filter�ؼ� ���ο� �����͸� ����
  this.deleteTodo = (target) => {
    this.todoItems = this.todoItems.filter((todo) => {
      //troubleShooting: return�� ����� �Ѵ�. ���� ������ �ɷ� �ð��� ���� ���. ������ �� ���� �����ؾ� �Ѵ�.
      return todo.id !== target.closest("li").id;
    });
    this.setState(this.todoItems);
  };

  //���� Ŭ������ �� li �±׿� editing Ŭ���� �߰�
  this.editTodo = ({ target }) => {
    this.todoItems = JSON.parse(localStorage.getItem(TODOITEMS));

    if (target.classList.contains("label")) {
      target.closest("li").classList.add("editing");
      //�ڵ����� ���� inputâ autofocus ����
      target.parentNode.nextSibling.nextSibling.focus();
    }
  };

  //������ �Ϸ��� �� ������ �ֽ�ȭ �� ���
  this.finishEdit = ({ target, key }) => {
    if (key === KEY_ENTER && target.value.trim()) {
      this.todoItems.map((todo) => {
        if (target.closest("li").id === todo.id) {
          todo.content = target.value;
        }
      });
      target.closest("li").classList.remove("editing");
      this.setState(this.todoItems);
    } else if (key === KEY_ESC) {
      target.closest("li").classList.remove("editing");
    }
  };

  this.$todoList.addEventListener("click", this.changeStatus);
  this.$todoList.addEventListener("dblclick", this.editTodo);
  this.$todoList.addEventListener("keyup", this.finishEdit);
}
