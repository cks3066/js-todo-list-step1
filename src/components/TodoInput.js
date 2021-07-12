import { KEY_ENTER, KEY_ESC } from "./../constants/constants.js";

/* �Է¹޴� ������Ʈ */
export default function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  //���ξ����� �߰��ϱ�
  const addTodoItem = ({ target, key }) => {
    //�������θ� �̷���� ���ڿ��� todoItem���� ��ȿ���� ����
    if (key === KEY_ENTER && target.value.trim()) {
      onAdd(target.value);
      target.value = "";
    } else if (key === KEY_ESC) {
      target.value = "";
    }
  };

  $todoInput.addEventListener("keyup", addTodoItem);
  // troubleshooting: ���� ���� �Լ��� ������ ���Ŀ� �Ʒ��� �̺�Ʈ�����ʸ� ��ġ��Ű�ϱ� �� �۵��Ѵ�.
}
